import { apiRequest } from "../utils/apiRequest";

export async function uploadFile(formData: FormData) {
  return apiRequest<ReadFileDto>("post", "/storage/create", formData);
}
