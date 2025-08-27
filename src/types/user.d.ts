type ReadUsersDto = {
  uuid?: string;
  name?: string;
  email?: string;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type ListUsersDto = {
  data: ReadUsersDto[];
  total: number;
};

type SelectUsersDto = {
  uuid: string;
  name: string;
};

type changePasswordDto = {
  newPassword?: String;
};

type CreateUsersDto = {
  uuid?: string;
  name?: string;
  email?: string;
  password?: string;
  type?: string;
};

type UpdateUsersDto = {
  name?: string;
  email?: string;
  password?: string;
};
