import { apiRequest } from "../utils/apiRequest";

export async function login(authLoginDto: AuthLoginDto) {
  return apiRequest<VerifyAuthDto>("post", `/auth/login`, authLoginDto);
}

export async function register(createUserDto: CreateUsersDto) {
  return apiRequest<VerifyAuthDto>("post", `/auth/register`, createUserDto);
}

export async function forgotPassword(
  authForgotPasswordDto: AuthForgotPasswordDto
) {
  return apiRequest<SuccessAuthDto>(
    "post",
    `/auth/forgot-password`,
    authForgotPasswordDto
  );
}

export async function resetPassword(
  authResetPasswordDto: AuthResetPasswordDto
) {
  return apiRequest<SuccessAuthDto>(
    "post",
    `/auth/reset-password`,
    authResetPasswordDto
  );
}

export async function verifyToken() {
  return apiRequest<ReadUsersDto>("get", `/auth/verify-token`);
}
