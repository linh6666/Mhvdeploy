"use client";
import { useState } from "react";
import Link from "next/link";
import useAuth from "../../hook/useAuth";
import { IconUser } from "@tabler/icons-react";

interface LoginButtonProps {
  isMobile?: boolean;
}

export default function LoginButton({ isMobile = false }: LoginButtonProps) {
  const { user, isLoggedIn, logout, error } = useAuth(); // Lấy thông tin người dùng từ hook
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleLogout = async () => {
    await logout(); // Gọi hàm logout
    window.alert("Logout thành công"); // Hiển thị thông báo alert
  };

  return (
    <>
      {isLoggedIn && user ? ( // Kiểm tra trạng thái đăng nhập
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={toggleMenu}
            className={
              isMobile
                ? "flex items-center gap-2 text-white bg-[#bb8d38] hover:bg-[#e09e09] px-4 py-2 text-sm font-medium rounded-full"
                : "hidden md:inline-flex items-center gap-2 text-white bg-[#bb8d38] hover:bg-[#e09e09] focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-[45px] text-sm px-4 py-3 text-center"
            }
          >
            <IconUser />
            {user.full_name} {/* Hiển thị tên người dùng */}
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    My Profile
                  </Link>
                </li>
                
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login">
          <button
            type="button"
            className={
              isMobile
                ? "text-white bg-[#bb8d38] hover:bg-[#e09e09] px-6 py-2 text-xs font-medium rounded-full"
                : "hidden md:inline-block text-white bg-[#bb8d38] hover:bg-[#e09e09] focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-[45px] text-xs px-2 py-1 text-center"
            }
          >
            Log In
          </button>
        </Link>
      )}

      {/* Hiển thị thông báo lỗi nếu có lỗi trong khi lấy thông tin người dùng */}
      {error && (
        <div className="text-red-500 text-sm mt-2">
          <p>{error}</p>
        </div>
      )}
    </>
  );
}

