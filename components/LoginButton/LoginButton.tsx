"use client";

import { useState } from "react";
import { IconUser } from "@tabler/icons-react";
import useAuth from "../../hook/useAuth";
import ProfileModal from "./Profile/index"; // ✅ import modal riêng
import Link from "next/link";

interface LoginButtonProps {
  isMobile?: boolean;
}

export default function LoginButton({ isMobile = false }: LoginButtonProps) {
  const { user, isLoggedIn, logout, error } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = async () => {
    await logout();
    window.alert("Đăng xuất thành công");
    window.location.href = "/";
  };

  return (
    <>
      {isLoggedIn && user ? (
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={toggleMenu}
            className={`flex items-center gap-1.5 text-white bg-[#bb8d38] font-medium text-sm px-2 py-1.5 rounded-full transition-all border-none hover:bg-[#e09e09] focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
              isMobile ? "" : "hidden md:inline-flex"
            }`}
          >
            <span style={{ fontSize: "14px" }}>{user.full_name}</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="py-1 text-sm text-gray-700">
                <li>
                <button
  onClick={() => {
    setIsProfileOpen(true); // mở modal
    setIsOpen(false);       // đóng dropdown
  }}
  className="w-full text-left px-4 py-2 hover:bg-gray-100"
>
  Hồ sơ cá nhân
</button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
       <Link href="/dang-nhap">
          <button
            type="button"
            className={
              isMobile
                ? "bg-white text-[#d4a64a] p-2 rounded-full flex items-center justify-center transition duration-300"
                : "hidden md:flex items-center justify-center bg-[#d4a64a] text-white p-1 text-xs font-medium rounded-full transition duration-300"
            }
          >
            <IconUser size={20} />
          </button>
        </Link>
      )}

      {/* ✅ Dùng modal import */}
     <ProfileModal
  opened={isProfileOpen}
  onClose={() => setIsProfileOpen(false)}
/>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          <p>{error}</p>
        </div>
      )}
    </>
  );
}

