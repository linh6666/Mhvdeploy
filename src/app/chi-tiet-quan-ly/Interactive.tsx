"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Managent from "../../../components/Managent/Managent";
import { apiarea } from "../../../library/axios";
import { API_ROUTE } from "../../../const/apiRouter";

export default function InteractiveClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("pageId");

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token"); // 👈 dùng đúng key token của bạn nhé
      if (!token) {
        // ❌ Không có token → chuyển về trang đăng nhập
        router.push("/dang-nhap");
        return;
      }

      try {
        // 📡 Gọi API kiểm tra token có hợp lệ không
        const res = await apiarea.get(API_ROUTE.LOGIN_USERNAME, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data;

        // ✅ Token hợp lệ → cho phép vào trang
        // (tùy bạn muốn kiểm tra thêm quyền ở đây, ví dụ system_rank)
        if (!user || !user.username) {
          // ⚠️ Token có nhưng không hợp lệ → về trang chủ
          router.push("/");
          return;
        }
      } catch {
        // ⚠️ Token có nhưng gọi API thất bại → về trang chủ
        router.push("/");
        return;
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  if (checkingAuth) return <div>Đang kiểm tra quyền truy cập...</div>;

  if (!projectId) return <div>Không có projectId trong URL</div>;

  return <Managent projectId={projectId} />;
}

