type AuthLoginDto = {
  email: string;
  password: string;
};

type AuthForgotPasswordDto = {
  email: string;
};

type AuthResetPasswordDto = {
  newPassword: string;
  token: string;
};

type VerifyAuthDto = {
  accessToken: string;
  userData: ReadUserDto;
};

type SuccessAuthDto = {
  success: boolean;
};