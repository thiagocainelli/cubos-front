import { apiRequest } from "../utils/apiRequest";

export async function login(authLoginDto: AuthLoginDto) {
  return apiRequest<VerifyAuthDto>("post", `/auth/login`, authLoginDto);
}

export async function register(createUserDto: CreateUsersDto) {
  return apiRequest<VerifyAuthDto>("post", `/auth/register`, createUserDto);
}

export async function verifyToken() {
  return apiRequest<ReadUsersDto>("get", `/auth/verify-token`);
}
