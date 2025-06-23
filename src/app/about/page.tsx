
import React from "react";
import { Metadata } from "next";

import PageAbout from "../../../pages/PegaAbout";
export const metadata: Metadata = {
  title: "Giới thiệu Mô Hình Việt",
  description: "Tìm hiểu về Mô Hình Việt, công ty tiên phong sáng tạo và phát triển mô hình.",
};

export default function Interactive() {
  
  return (
    <>
      <PageAbout />
    </>
  );
}
