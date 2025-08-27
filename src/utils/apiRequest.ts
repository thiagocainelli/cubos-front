/* eslint-disable import/no-cycle */
import axios, { AxiosError, CancelTokenSource } from 'axios';
import { parseCookies } from 'nookies';
import { signOutData } from '../contexts/AuthContext';

let failedRequestsQueue: {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError<unknown, any>) => void;
}[] = [];

const cancelTokens: { [key: string]: CancelTokenSource } = {};
const RETRY_COUNT = 3;

export function setupAPIClient() {
  const { 'auth.token': token } = parseCookies();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const apiForm = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  api.interceptors.response.use(
    (response) => {
      const { 'auth.token': ck } = parseCookies();
      if (ck) {
        response.headers.Authorization = ck;
      }
      return response;
    },
    (error: AxiosError) => {
      const { 'auth.token': cookies } = parseCookies();
      if (error.response !== undefined && error.response.status === 401 && cookies) {
        const originalConfig = error.config;

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (cookies: string) => {
              if (!originalConfig) return;
              if (originalConfig.headers !== undefined)
                originalConfig.headers.Authorization = `Bearer ${cookies ?? null}`;
              resolve(api(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        const { 'auth.token': cookies } = parseCookies();
        if (!cookies) {
          signOutData();
        }
      }
      return Promise.reject(error);
    }
  );

  return { api, apiForm };
}

export async function apiRequest<T>(
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  data?: any,
  config?: any,
  isFormData: boolean = false,
  cancelKey?: string,
  retries: number = RETRY_COUNT
): Promise<T> {
  const { api, apiForm } = setupAPIClient();
  const client = isFormData ? apiForm : api;

  if (cancelKey && cancelTokens[cancelKey]) {
    cancelTokens[cancelKey].cancel('Requisição cancelada.');
  }

  const source = axios.CancelToken.source();
  if (cancelKey) cancelTokens[cancelKey] = source;

  let attempt = 0;

  while (attempt < retries) {
    try {
      const response = await client.request<T>({
        url: endpoint,
        method,
        data,
        cancelToken: source.token,
        ...config,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Requisição cancelada:', error.message);
        throw error;
      }

      attempt++;
      if (attempt >= retries) {
        handleError(error);
        throw error;
      }
    } finally {
      if (cancelKey) delete cancelTokens[cancelKey];
    }
  }

  throw new Error('Falha na requisição após várias tentativas.');
}

const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 401) {
      console.error('Usuário não autenticado. Faça login novamente.');
      signOutData();
    } else if (status === 403) {
      console.error('Acesso negado. Você não tem permissão para essa ação.');
    } else if (status === 500) {
      console.error('Erro no servidor. Tente novamente mais tarde.');
    } else {
      console.error(error.response?.data?.message || 'Erro desconhecido.');
    }
  } else {
    console.error('Erro inesperado:', error);
  }
};
