import Cart from "../../../pages/PageCart";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giỏ hàng | Mô Hình Việt",
  description: "Xem và quản lý các Mô Hình Việt tại giỏ hàng.",
};
export default function CartPage() {
  return (
    <>
     <Cart/> 
    </>
  );
}

