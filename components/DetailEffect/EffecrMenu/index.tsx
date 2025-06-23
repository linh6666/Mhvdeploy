'use client';

import React, { useState } from "react";
import { Button } from "@mantine/core";
import { showNotification, Notifications } from "@mantine/notifications";
import { IconCheck, IconChevronsLeft, IconX } from "@tabler/icons-react";
import { API_ROUTE } from "../../../const/apiRouter";
import { apiarea } from "../../../library/axios";
import styles from "./EffecrMenu.module.css";
import { useRouter } from "next/navigation";

// ✅ Wrapper nhận props className
export const SideNavigation = ({ className }: { className?: string }) => {
  return (
    <>
      <Notifications position="top-right" zIndex={2077} />
      <SideNavigationInner className={className} />
    </>
  );
};

// ✅ Inner nhận className và áp dụng
const SideNavigationInner = ({ className }: { className?: string }) => {
  const router = useRouter();
  const [selectedEffect, setSelectedEffect] = useState<string | null>(null);

  const triggerLightingEffect = async (url: string, label: string) => {
    try {
      await apiarea.post(url);
      setSelectedEffect(label); // ✅ Đánh dấu nút đang được chọn
      showNotification({
        title: 'Thành công',
        message: `${label} đã được kích hoạt`,
        color: 'green',
        icon: <IconCheck size={18} />,
        autoClose: 900,
      });
    } catch (err: any) {
      console.error("Gọi hiệu ứng thất bại:", err?.response?.data || err.message || err);
      showNotification({
        title: 'Lỗi',
        message: err?.response?.data?.detail || err.message || 'Không thể kích hoạt hiệu ứng',
        color: 'red',
        icon: <IconX size={18} />,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <div className={styles.logoWrapper}>
        <img src="/logo.png" alt="Eco Retreat Logo" className={styles.logoImage} />
      </div>

      <h2 className={styles.mainHeading}>Hiệu ứng</h2>

      <div className={styles.buttonGroup}>
        {Array.from({ length: 5 }, (_, i) => {
          const label = `Hiệu ứng ánh sáng ${i + 1}`;
          const route = (API_ROUTE as any)[`POST_LIGHYING_${i + 1}`];
          return (
            <NavigationButton
              key={label}
              label={label}
              isActive={selectedEffect === label}
              onClick={() => triggerLightingEffect(route, label)}
            />
          );
        })}
      </div>

      <div className={styles.bottomButtons}>
        <Button className={styles.button1} variant="outline" onClick={() => router.back()}>
          <IconChevronsLeft size={20} />
        </Button>
      </div>
    </div>
  );
};

// ✅ Reusable button component
interface NavigationButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const NavigationButton = ({ label, isActive, onClick, className }: NavigationButtonProps) => {
  return (
    <Button
      className={`${styles.button} ${isActive ? styles.active : ""} ${className ?? ""}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
