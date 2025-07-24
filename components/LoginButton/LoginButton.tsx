"use client";
import { useState } from "react";
import Link from "next/link";
import useAuth from "../../hook/useAuth";
import { IconUser } from "@tabler/icons-react";

interface LoginButtonProps {
  isMobile?: boolean;
}

export default function LoginButton({ isMobile = false }: LoginButtonProps) {
  const { user, isLoggedIn, logout, error } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = async () => {
    await logout();
    window.alert("Đăng xuất thành công");
  };

  return (
    <>
      {isLoggedIn && user ? (
        <div className="relative inline-block text-left">
        <button
  type="button"
  onClick={toggleMenu}
  className={`flex items-center gap-2 text-white bg-[#bb8d38] font-medium text-sm px-3 py-2 rounded-full transition-all border-none hover:bg-[#e09e09] focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
    isMobile ? "" : "hidden md:inline-flex"
  }`}
>
  <IconUser size={20} />
  <span>{user.full_name}</span>
</button>


          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Hồ sơ cá nhân
                  </Link>
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

      {error && (
        <div className="text-red-500 text-sm mt-2">
          <p>{error}</p>
        </div>
      )}
    </>
  );
}
