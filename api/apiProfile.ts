import { api } from "../library/axios";

export const getCurrentUser = async () => {
  const res = await api.get("/api/v1/users/me");
  return res.data;
};
