'use client';

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { IconChevronsLeft } from "@tabler/icons-react";
import styles from "./sideArea.module.css";

import { apiarea } from "../../../library/axios";
import { API_ROUTE } from "../../../const/apiRouter";
import Image from "next/image";

// Interface cho props
interface SideNavigationProps {
  className?: string;
}

interface MenuItem {
  zone_name: string;
  href: string;
}

export const SideNavigation = ({ className }: SideNavigationProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const hasFetched = useRef(false);

  const handleGoBack = () => {
    router.push("/Detail2");
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchMenu = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await apiarea.get(API_ROUTE.GET_AREA);
        const records = res.data.records as { zone_name: string }[];

        const normalized = records.map((item) => {
          const match = item.zone_name.match(/Phân khu\s*(\d+)/i);
          const zoneBase = match ? `Phân Khu ${match[1]}` : item.zone_name;
          return {
            zone_name: zoneBase,
            href: `/building-type/${encodeURIComponent(zoneBase)}`
          };
        });

        const uniqueMap = new Map<string, MenuItem>();
        for (const item of normalized) {
          if (!uniqueMap.has(item.zone_name)) {
            uniqueMap.set(item.zone_name, item);
          }
        }

        const uniqueZones = Array.from(uniqueMap.values());
        setMenuItems(uniqueZones);
      } catch (err) {
        console.error("Lỗi khi tải menu:", err);
        setError("Không thể tải dữ liệu phân khu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div
      className={`${styles.container} ${className || ""}`}
      // style={{ position: "relative" }}
    >
      <div className={styles.logoWrapper}>
        <Image src="/logo.png" alt="Eco Retreat Logo" className={styles.logoImage} />
      </div>

      <h2 className={styles.mainHeading}>Phân Khu</h2>

      <div className={styles.buttonGroup}>
        {loading && <div>Đang tải...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && !error &&
          menuItems.map((item, idx) => (
            <NavigationButton
              key={`${item.zone_name}-${idx}`}
              label={item.zone_name}
              href={item.href}
            />
          ))}
      </div>

      <div className={styles.bottomButtons}>
        <Button
          variant="filled"
          className={styles.bottomButton}
          onClick={handleGoBack}
        >
          <IconChevronsLeft size={20} />
        </Button>
      </div>
    </div>
  );
};

interface NavigationButtonProps {
  label: string;
  href: string;
}

const NavigationButton = ({ label, href }: NavigationButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <Button className={styles.button} onClick={handleClick} fullWidth>
      {label}
    </Button>
  );
};
