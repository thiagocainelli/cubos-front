type AuthLoginDto = {
  email: string;
  password: string;
};

type AuthRegisterDto = {
  email: string;
  password: string;
  name: string;
};

type AuthForgotPasswordDto = {
  email: string;
};

type AuthResetPasswordDto = {
  newPassword: string;
  token: string;
};

type VerifyAuthDto = {
  token: string;
  usersData: ReadUserDto;
};

type SuccessAuthDto = {
  success: boolean;
};
