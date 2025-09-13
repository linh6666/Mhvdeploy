"use client";

import React, { useEffect, useState } from "react";
import { NavbarSimple } from "../../../components/NavbarMenu";
import { API_ROUTE } from "../../../const/apiRouter";
import { apiarea } from "../../../library/axios";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Bạn chưa đăng nhập!");
          setLoading(false);
          return;
        }

        const res = await apiarea.get(API_ROUTE.LOGIN_USERNAME, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data;
        if (user.system_rank !== 1) {
          setError("Bạn không có quyền truy cập trang này!");
        }
      } catch {
        setError("Không thể lấy thông tin user!");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Đang kiểm tra quyền truy cập...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <NavbarSimple />;
}

export default App;
