import { api } from "../library/axios";
import { API_ROUTE } from "../const/apiRouter";

export interface CreateProjectPayload {
   id: string;
  building_name: string;
  bedroom: number;
  zone_name: string;
  building_type: string;
  status: string;
  direction: string;
  description: string;
}

// Đổi tên hàm từ CreateUserPayload thành createProject hoặc createUser
export const createProject = async (payload: CreateProjectPayload) => {
  const response = await api.post(API_ROUTE.GET_LIST_DETAIL_ECOPARK, payload);
  return response.data;
};