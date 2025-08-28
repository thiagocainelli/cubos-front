type ReadFileDto = {
  uuid: string;
  userUuid: string;
  type: string;
  name: string;
  originalname: string;
  mimetype: string;
  file: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

type CreateFileDto = {
  userUuid: string;
  type: string;
  name: string;
  originalname: string;
  mimetype: string;
  file: string;
};

type UpdateFileDto = {
  userUuid?: string;
  type?: string;
  name?: string;
  originalname?: string;
  mimetype?: string;
  file?: string;
};
