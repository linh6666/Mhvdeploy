"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image } from "@mantine/core";


import LoginButton from "../../components/LoginButton/LoginButton";
import styles from "./Header.module.css";
import useAuth from "../../hook/useAuth"; // ✅ import hook

// menu mặc định
const baseLinks = [
  { label: "TRANG CHỦ", href: "/", highlight: true },
    { label: "GIỚI THIỆU", href: "/gioi-thieu" },
  { label: "TƯƠNG TÁC", href: "/Tuong-tac" },
{ label: "QUẢN LÝ BÁN HÀNG", href: "/quan-ly-ban-hang" },
  { label: "LIÊN HỆ", href: "/lien-he" },
  
];

const adminLink = { label: "QUẢN TRỊ HỆ THỐNG", href: "/quan-tri-he-thong" };

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentFlag, setCurrentFlag] = useState<"vn" | "en">("vn");
  const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ lấy user từ hook
  const { user } = useAuth();

  useEffect(() => {
    if (pathname.startsWith("/en")) {
      setCurrentFlag("en");
    } else {
      setCurrentFlag("vn");
    }
  }, [pathname]);

  // Tự động đóng dropdown nếu click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFlagDropdownOpen(false);
      }
    };
    if (isFlagDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFlagDropdownOpen]);

  const isActive = (href: string, highlight?: boolean) => {
    if (pathname === href) return styles.navActive;
    if (highlight) return styles.navHighlight;
    return styles.navNormal;
  };

  // ✅ nếu user có system_rank = 1 thì thêm ADMIN
  const navLinks = [...baseLinks];
  if (user && user.system_rank === 1) {
    navLinks.push(adminLink);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo + Flags + Menu Icon */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo-w.svg" alt="Logo" className={styles.logo} />
            </Link>

            {/* Flags for mobile */}
            <div className={styles.mobileOnlyFlags}>
              <Link href="/">
                <Image src="/images/vietnam.webp" alt="VN" width={20} height={14} />
              </Link>
              <Link href="/en">
                <Image src="/images/Australia.svg" alt="EN" width={20} height={14} />
              </Link>
            </div>
          </div>

          {/* Toggle Button (mobile only) */}
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className={styles.mobileToggle}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Right Section (Cart + Login + Flags) */}
        <div className="flex items-center gap-3 md:order-2">
          {/* <div className="hidden md:block">
            <Link href="/cart">
              <button className={styles.cartButton} aria-label="Cart">
                <IconShoppingCart size={16} />
              </button>
            </Link>
          </div> */}

          <div className={`hidden md:flex ${styles.loginLangBlock}`}>
            <LoginButton />
          </div>

          {/* Flag Dropdown */}
          <div className={styles.flagWrapper} ref={dropdownRef}>
            <Image
              src={currentFlag === "vn" ? "/images/vietnam.webp" : "/images/Australia.svg"}
              alt={currentFlag.toUpperCase()}
              width={30}
              height={20}
              className={styles.flag}
              onClick={() => setIsFlagDropdownOpen((prev) => !prev)}
            />

            {isFlagDropdownOpen && (
              <div className={styles.flagDropdown}>
                <Link href="/en" onClick={() => setCurrentFlag("en")} className={styles.flagItem}>
                  <Image
                    src="/images/Australia.svg"
                    alt="EN"
                    width={24}
                    height={16}
                    className={styles.flagIcon}
                  />
                  <span className={styles.langTextEn}>English</span>
                </Link>
                <Link href="/" onClick={() => setCurrentFlag("vn")} className={styles.flagItem}>
                  <Image
                    src="/images/vietnam.webp"
                    alt="VN"
                    width={24}
                    height={16}
                    className={styles.flagIcon}
                  />
                  <span className={styles.langTextVi}>Tiếng Việt</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map(({ label, href, highlight }) => (
              <li key={label}>
                <Link href={href}>
                  <span className={`${styles.navLink} ${isActive(href, highlight)}`}>
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContainer}>
            <ul className="text-white font-medium text-base">
              {navLinks.map(({ label, href, highlight }) => (
                <li key={label} className={styles.mobileMenuItem}>
                  <Link href={href} onClick={() => setIsMobileMenuOpen(false)}>
                    <span className={`${styles.mobileLink} ${isActive(href, highlight)}`}>
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Cart + Login in Mobile */}
            <div className="flex items-center justify-between pt-2">
              {/* <Link href="/cart">
                <button className={styles.cartButton} aria-label="Cart">
                  <IconShoppingCart size={14} />
                </button>
              </Link> */}
              <LoginButton isMobile />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
