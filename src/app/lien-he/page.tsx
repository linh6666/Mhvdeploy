
import React from "react";
import PageContact from "../../../components/PageContact";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Liên hệ - Mô Hình Việt",
  description: "Liên hệ với Mô Hình Việt để biết thêm chi tiết về sản phẩm và dịch vụ.",
};


export default function Interactive() {
  return (
    <>
      <PageContact />
    </>
  );
}
