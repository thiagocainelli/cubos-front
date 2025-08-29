import { apiRequest } from "../utils/apiRequest";

export async function uploadFile(formData: FormData) {
  return apiRequest<ReadFileDto>("post", "/storage/create", formData);
}

export async function deleteFile(uuid: string) {
  return apiRequest<ReadFileDto>("delete", `/storage/delete?uuid=${uuid}`);
}
