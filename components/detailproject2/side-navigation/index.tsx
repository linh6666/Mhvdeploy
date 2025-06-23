'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { showNotification, Notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconX,
  IconMoon,
  IconSun,
  IconSunset2,
} from "@tabler/icons-react";
import styles from "./SideNavigation.module.css";
import { API_ROUTE } from "../../../const/apiRouter";
import { apiarea } from "../../../library/axios";

interface SideNavigationProps {
  className?: string;
}

const SideNavigationInner = ({ className }: SideNavigationProps) => {
  const router = useRouter();
  const [loadingEffect, setLoadingEffect] = useState<null | string>(null);
  const [activeButton, setActiveButton] = useState<string | null>("sunset"); // 👈 Mặc định là sunset

  const handleEffect = async (url: string, key: string) => {
    try {
      setLoadingEffect(url);
      setActiveButton(key);
      const res = await apiarea.post(url);
      showNotification({
        title: 'Thành công',
        message: 'Nút bật thành công!',
        color: 'green',
        icon: <IconCheck size={18} />,
        autoClose: 1000,
      });
    } catch (err: any) {
      console.error("Gọi hiệu ứng thất bại:", err?.response?.data || err.message || err);
      showNotification({
        title: 'Lỗi',
        message: err?.response?.data?.detail || err.message || 'Lỗi không xác định',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 5000,
      });
    } finally {
      setLoadingEffect(null);
    }
  };

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.logoWrapper}>
        <img src="/logo.png" alt="Eco Retreat Logo" className={styles.logoImage} />
      </div>

      <h2 className={styles.mainHeading}>TRANG CHỦ</h2>

      <div className={styles.buttonGroup}>
        <NavigationButton label="GIỚI THIỆU DỰ ÁN" href="/gioi-thieu-du-an" />
        <NavigationButton label="HỆ THỐNG PHÂN KHU" href="/phan-khu" />
        <NavigationButton label="HỆ THỐNG TIỆN ÍCH" href="/tien-ich" />
        <NavigationButton label="HIỆU ỨNG ÁNH SÁNG" href="/hieu-ung" />
        <NavigationButton label="THƯ VIỆN HÌNH ẢNH" href="/thu-vien-hinh-anh" />
        <NavigationButton label="THƯ VIỆN VIDEO" href="/thu-vien-video" />
        <NavigationButton label="TRỢ GIÚP" href="/tro-giup" />
      <NavigationButton label="THOÁT" onClick={() => router.push("/interactive")} />

      </div>

      <div className={styles.bottomButtons}>
        <Button
          variant="filled"
          className={styles.bottomButton}
          onClick={() => handleEffect(API_ROUTE.PUT_SUN, 'sun')}
          loading={loadingEffect === API_ROUTE.PUT_SUN}
        >
          <IconSun size={17} />
          {activeButton === 'sun' && <span className={styles.buttonText}>SUN</span>}
        </Button>

        <Button
          variant="filled"
          className={styles.bottomButton}
          onClick={() => handleEffect(API_ROUTE.PUT_SUN_SET, 'sunset')}
          loading={loadingEffect === API_ROUTE.PUT_SUN_SET}
        >
          <IconSunset2 size={17} />
          {activeButton === 'sunset' && <span className={styles.buttonText}>SUNSET</span>}
        </Button>

        <Button
          variant="filled"
          className={`${styles.bottomButton} ${styles.nightButton}`}
          onClick={() => handleEffect(API_ROUTE.PUT_NIGHT, 'night')}
          loading={loadingEffect === API_ROUTE.PUT_NIGHT}
        >
          <IconMoon size={17} />
          {activeButton === 'night' && <span className={styles.buttonText}>NIGHT</span>}
        </Button>
      </div>
    </div>
  );
};

interface NavigationButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

const NavigationButton = ({ label, href, onClick }: NavigationButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <Button className={styles.button} onClick={handleClick}>
      {label}
    </Button>
  );
};

export const SideNavigation = ({ className }: SideNavigationProps) => {
  return (
    <>
      <Notifications position="top-right" zIndex={2077} />
      <SideNavigationInner className={className} />
    </>
  );
};
