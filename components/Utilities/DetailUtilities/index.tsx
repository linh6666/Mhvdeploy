'use client';

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { IconChevronsLeft } from "@tabler/icons-react";
import styles from "./DetailUtilities.module.css";

import { apiarea } from "../../../library/axios";
import { API_ROUTE } from "../../../const/apiRouter";
import Image from "next/image";

interface MenuItem {
  amenity_type: string;
}

interface AmenityDetail {
  id: number;
  zone: string;
  zone_name: string;
  building_name: string;
  building_type: string;
  amenity: string;
  amenity_type: string;
}

interface SideNavigationProps {
  className?: string;
}

export const SideNavigation = ({ className }: SideNavigationProps) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const router = useRouter();

  const hasFetched = useRef(false); // Ngăn gọi API nhiều lần

  const handleGoBack = () => {
    router.push("/Detail2");
  };

  const fetchMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiarea.get(API_ROUTE.GET_UTILITIES);
      const records = res.data.records as { amenity_type: string }[];

      const normalized = records
        .map((item) => {
          const name = item.amenity_type.trim();
          const match = name.match(/^(.+?)\s*[\.\-]?\s*(\d+)/i);

          if (match) {
            const numPart = Number(match[2]);
            if (isNaN(numPart)) return null;
            const normalizedName = `${match[1].trim()} ${numPart}`;
            if (normalizedName.toLowerCase().includes("nan")) return null;
            return { amenity_type: normalizedName };
          } else {
            if (name.toLowerCase().includes("nan")) return null;
            return { amenity_type: name };
          }
        })
        .filter((item): item is MenuItem => item !== null);

      const uniqueMap = new Map<string, MenuItem>();
      for (const item of normalized) {
        if (!uniqueMap.has(item.amenity_type)) {
          uniqueMap.set(item.amenity_type, item);
        }
      }

      setMenuItems(Array.from(uniqueMap.values()));
    } catch (err) {
      console.error("Lỗi khi tải tiện ích:", err);
      setError("Không thể tải dữ liệu tiện ích.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAmenityDetail = async (amenityType: string) => {
    try {
      const encodedLabel = encodeURIComponent(amenityType);
      const url = `${API_ROUTE.GET_UTILITIES_DETAIL(encodedLabel)}`;
      const res = await apiarea.get(url);

      const records = res.data.records as AmenityDetail[];
      console.log("Chi tiết tiện ích:", records);
    } catch (error) {
      console.error("Lỗi khi gọi API chi tiết tiện ích:", error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchMenu();
    }
  }, []);

  return (
    <div className={`${styles.container} ${className ?? ""}`} >
      <div className={styles.logoWrapper}>
        <Image src="/logo.png" alt="Eco Retreat Logo" className={styles.logoImage}  width={128} // 8rem = 128px
  height={128}/>
      </div>

      <h2 className={styles.mainHeading}>Tiện Ích</h2>

      <div className={styles.buttonGroup}>
        {loading && <div>Đang tải...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && !error &&
          menuItems.map((item, idx) => (
            <NavigationButton
              key={`${item.amenity_type}-${idx}`}
              label={item.amenity_type}
              isActive={selectedLabel === item.amenity_type}
              onClick={() => {
                setSelectedLabel(item.amenity_type);
                fetchAmenityDetail(item.amenity_type);
              }}
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
  isActive: boolean;
  onClick: () => void;
}

const NavigationButton = ({ label, isActive, onClick }: NavigationButtonProps) => {
  return (
    <Button
      className={`${styles.button} ${isActive ? styles.active : ""}`}
      fullWidth
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
