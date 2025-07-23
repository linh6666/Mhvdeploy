import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string; // chính là project_id
}

export const getProjectIdFromToken = (): string => {
  if (typeof window === "undefined") return "";

  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("⚠️ Không tìm thấy access_token trong localStorage");

  const decoded = jwtDecode<DecodedToken>(token);

  if (!decoded.sub) {
    throw new Error("⚠️ Không tìm thấy project_id (sub) trong access_token");
  }

  return decoded.sub;
};
