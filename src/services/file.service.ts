import { apiRequest } from "../utils/apiRequest";


export async function getProfileImageByUserUuid(userUuid: string) {
  return apiRequest<ReadFileDto>(
    "get",
    `/files/profile-image-by-userUuid?userUuid=${userUuid}`
  );
}

export async function uploadProfileImage(formData: FormData) {
  return apiRequest<CreateFileDto>("post", "/files/profile-image", formData);
}

export async function updateProfileImage(formData: FormData) {
  return apiRequest<UpdateFileDto>( "put","/files/profile-image-by-userUuid",formData );
}

export async function deleteFile(uuid: string) {
  return apiRequest<void>("delete", `/files/delete?uuid=${uuid}`);
}

export async function getFilesListByUuid(
  page: number,
  itemsPerPage: number,
  userUuid: string
) {
  return apiRequest<ReadFileDto[]>(
    "get",
    `/files/list-by-userUuid?page=${page}&itemsPerPage=${itemsPerPage}&userUuid=${userUuid}`
  );
}
