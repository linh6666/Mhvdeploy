"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import Search from "../SearchBar/SearchBar";
import LoginButton from "../LoginButton/LoginButton";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { label: "HOME", href: "/", highlight: true },
    { label: "INTERACTIVE", href: "/interactive" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
    { label: "SALE MANAGEMENT", href: "/Sale-Management" },
    { label: "MY PROJECT", href: "/My-Project" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/logo-w.svg" alt="Logo" className={styles.logo} />
        </Link>

        <div className="flex md:order-2 items-center gap-x-3 rtl:space-x-reverse relative">
          <div className="hidden md:block">
            {/* <Search ... /> */}
          </div>

          {/* Chỉ hiển thị trên desktop */}
          <div className="hidden md:block">
            <Link href="/cart">
              <button className={styles.cartButton} aria-label="Cart">
                <IconShoppingCart size={16} />
              </button>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className={styles.mobileToggle}
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

          <LoginButton />
        </div>

        <div className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map(({ label, href, highlight }) => (
              <li key={label}>
                <Link href={href}>
                  <span
                    className={`${styles.navLink} ${
                      pathname === href
                        ? styles.navActive
                        : href === "/"
                        ? styles.navNormal
                        : highlight
                        ? styles.navHighlight
                        : styles.navNormal
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContainer}>
            <ul className="text-white font-medium text-base">
              {navLinks.map(({ label, href, highlight }) => (
                <li key={label} className={styles.mobileMenuItem}>
                  <Link href={href} onClick={() => setIsMobileMenuOpen(false)}>
                    <span
                      className={`${styles.mobileLink} ${
                        pathname === href
                          ? styles.navActive
                          : href === "/"
                          ? styles.navNormal
                          : highlight
                          ? styles.navHighlight
                          : styles.navNormal
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-3">
                {/* <Search ... /> */}
                <Link href="/cart">
                  <button className={styles.cartButton} aria-label="Cart">
                    <IconShoppingCart size={14} />
                  </button>
                </Link>
              </div>
              <LoginButton isMobile />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
