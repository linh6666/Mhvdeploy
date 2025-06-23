"use client";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconCamera,
  IconBrandLinkedin,
  IconBrandPinterest,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#294b61" }} className="text-white py-10">
      <div className="mx-auto w-full max-w-screen-xl text-center space-y-3 font-medium">
        {/* Hàng 1: Icons */}
        <div className="flex justify-center space-x-2 md:space-x-3">
          <a
            href="#"
            className="bg-white text-[#294b61] hover:text-[#bb8d38] rounded-full p-2 md:p-3 transition"
          >
            <IconBrandFacebook className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]" />
          </a>
          <a
            href="#"
            className="bg-white text-[#294b61] hover:text-[#bb8d38] rounded-full p-2 md:p-3 transition"
          >
            <IconBrandInstagram className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]" />
          </a>
          <a
            href="#"
            className="bg-white text-[#294b61] hover:text-[#bb8d38] rounded-full p-2 md:p-3 transition"
          >
            <IconCamera className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]" />
          </a>
          <a
            href="#"
            className="bg-white text-[#294b61] hover:text-[#bb8d38] rounded-full p-2 md:p-3 transition"
          >
            <IconBrandLinkedin className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]" />
          </a>
          <a
            href="#"
            className="bg-white text-[#294b61] hover:text-[#bb8d38] rounded-full p-2 md:p-3 transition"
          >
            <IconBrandPinterest className="w-[14px] h-[14px] md:w-[16px] md:h-[16px]" />
          </a>
        </div>

        {/* Hàng 2 đến 5: Thông tin liên hệ và địa chỉ */}
        <div className="text-[8px] md:text-[15px] space-y-2">
          <div>
            Hotline: +84 2436336688 | Tel: +84 889371188 | Email:
            info@mohinhviet.com
          </div>

          <div>
            Headquarters in Vietnam: No.751 Nguyen Khai, Thanh Tri Ward, Hoang
            Mai District, Hanoi, Vietnam
          </div>

          <div>
            Headquarters in Australia: 2B Mercer Rd, Armadale VIC 3143,
            Australia
          </div>

          <div>© 2025 All Rights Reserved By Viet Model</div>
        </div>
      </div>
    </footer>
  );
}
