import DetailIntroduce from "../../../components/DetailIntroduce/index";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới Thiệu dự án | Mô Hình Việt",
  description: "Xem video giới thiệu của dự án ",
};
export default function CartPage() {
  return (
    <>
     <DetailIntroduce/> 
    </>
  );
}
