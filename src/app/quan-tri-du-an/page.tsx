
import React from "react";
import { Metadata } from "next";

import { ProjectManagement } from "../../../components/ProjectManagement";
export const metadata: Metadata = {
  title: "Quản lý dự án cho doanh nghiệp.  ",
  description: "Quản lý dự án hiệu quả tốt nhất!",
};

export default function Interactive() {
  
  return (
    <>
      <ProjectManagement />
    </>
  );
}
