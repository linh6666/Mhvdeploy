
import { BASE_API_FASTAPI } from "../config";
import { API_ROUTE } from "../const/apiRouter"; // Đảm bảo đã khai báo REGISTER

export async function registerUser(
  email: string,
  full_name: string,
  password: string,
  phone:string,
  confirm_password: string
) {
  const payload = {
    email,
    full_name,
    password,
    phone,
    confirm_password,
  };

  const res = await fetch(`${BASE_API_FASTAPI}${API_ROUTE.REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "Registration failed");
  }

  const data = await res.json();
  return data;
}
