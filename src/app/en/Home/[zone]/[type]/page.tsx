import type { Metadata } from "next";
import Building from "../../../../../../thanh-phan/House";

export const metadata: Metadata = {
  title: "Giỏ hàng | Mô Hình Việt",
  description: "Xem và quản lý các Mô Hình Việt tại giỏ hàng.",
};
export default function Buildingtype() {
  return (
   <Building/>
  );
}