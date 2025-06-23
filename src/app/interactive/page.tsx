
import React from "react";
import ModelInteractive from "../../../pages/ModelInteractive";
import { Metadata } from "next";
import DetailInteractive from "../../../pages/detailInteractive";

export const metadata: Metadata = {
  title: "Tương tác mô hình 3D - Mô Hình Việt",
  description: "Trải nghiệm mô hình tương tác sống động từ Mô Hình Việt.",
};

export default function Interactive() {
  return (
    <>
      <DetailInteractive />
    </>
  );
}
