'use client';

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { IconChevronsLeft } from "@tabler/icons-react";
import styles from "./detailBuling.module.css";
import { apiarea } from "../../../library/axios";
import { API_ROUTE } from "../../../const/apiRouter";

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
    <Button className={styles.button} onClick={handleClick}>
      {label}
    </Button>
  );
};

interface AreaDetailRecord {
  building_type: string;
  zone_name: string;
}

interface GroupedZone {
  zone: string;
  types: string[];
}

interface SideNavigationProps {
  zoneParam: string;
  className?: string; // ✅ Thêm className vào props
}

export const SideNavigation: React.FC<SideNavigationProps> = ({ zoneParam, className }) => {
  const router = useRouter();
  const [groupedZones, setGroupedZones] = useState<GroupedZone[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const hasFetched = useRef(false); // ✅ Ngăn gọi API 2 lần trong Strict Mode

  const handleGoBack = () => {
    router.push("/phan-khu");
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    async function fetchAreaDetail() {
      try {
        setLoading(true);
        setError("");

        const res = await apiarea.get(API_ROUTE.GET_AREA_DETAIL);
        const records: AreaDetailRecord[] = res.data?.records || [];

        if (records.length === 0) {
          setError("Không có dữ liệu phân khu");
          setGroupedZones([]);
          return;
        }

        const normalizedRecords = records.map(record => {
          const match = record.zone_name.match(/Phân khu\s*(\d+)/i);
          const normalizedZone = match ? `Phân Khu ${match[1]}` : (record.zone_name || "Không có tên phân khu");
          return {
            zone_name: normalizedZone,
            building_type: record.building_type?.trim() || "",
          };
        });

        const filteredRecords = normalizedRecords.filter(record => record.zone_name === zoneParam);

        if (filteredRecords.length === 0) {
          setError(`Không tìm thấy dữ liệu cho phân khu: ${zoneParam}`);
          setGroupedZones([]);
          return;
        }

        const grouped = filteredRecords.reduce((acc, record) => {
          const { zone_name, building_type } = record;

          if (!building_type || building_type.toLowerCase() === "nan") return acc;

          if (!acc[zone_name]) acc[zone_name] = new Set<string>();
          acc[zone_name].add(building_type);
          return acc;
        }, {} as Record<string, Set<string>>);

        const groupedZonesArray: GroupedZone[] = Object.entries(grouped).map(
          ([zone, typesSet]) => ({
            zone,
            types: Array.from(typesSet).sort(),
          })
        );

        setGroupedZones(groupedZonesArray);
        setError("");
      } catch (error) {
        console.error("Lỗi khi gọi API GET_AREA_DETAIL:", error);
        setError("Lỗi tải dữ liệu");
        setGroupedZones([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAreaDetail();
  }, [zoneParam]);

  return (
    <div className={`${styles.container} ${className || ""}`} >
      <div className={styles.logoWrapper}>
        <img src="/logo.png" alt="Eco Retreat Logo" className={styles.logoImage} />
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : groupedZones.length === 0 ? (
        <p>Không có loại nhà nào</p>
      ) : (
        groupedZones.map(({ zone, types }) => (
          <div key={zone} style={{ marginBottom: 24 }}>
            <h2 className={styles.mainHeading}>{zone}</h2>
            <div className={styles.buttonGroup}>
              {types.map((type) => (
                <NavigationButton
                  key={`${zone}-${type}`}
                  label={type}
                  href={`/house-type/${encodeURIComponent(zone)}/${encodeURIComponent(type)}`}
                />
              ))}
            </div>
          </div>
        ))
      )}

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
