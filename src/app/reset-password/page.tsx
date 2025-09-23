
import React from "react";
import PageContact from "../../../components/ResetPassword";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Lấy lại mật khẩu - Mô Hình Việt",
  description: "lấy lại mật khẩu với Mô Hình Việt.",
};


export default function ResePassword() {
  return (
    <>
     <Suspense fallback={<div>Đang tải...</div>}>

     <PageContact />
     </Suspense>
      
    </>
  );
}
