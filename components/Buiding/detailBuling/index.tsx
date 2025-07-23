'use client';

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { IconChevronsLeft } from "@tabler/icons-react";
import styles from "./detailBuling.module.css";
import { apiarea } from "../../../library/axios";
import { API_ROUTE } from "../../../const/apiRouter";
import Image from "next/image";

interface NavigationButtonProps {
  label: string;
  href: string;
}

const NavigationButton = ({ label, href }: NavigationButtonProps) => {
  const router = useRouter();
  const handleClick = () => router.push(href);
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
  projectId: string;
  className?: string;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({
  zoneParam,
  projectId,
  className
}) => {
  const router = useRouter();
  const [groupedZones, setGroupedZones] = useState<GroupedZone[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const hasFetched = useRef(false);

  const handleGoBack = () => router.push("/phan-khu");

  useEffect(() => {
    if (hasFetched.current || !projectId) return;
    hasFetched.current = true;

    async function fetchZoneDetail() {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("access_token");
        if (!token) {
          setError("Không tìm thấy access token.");
          return;
        }

        const zoneParamSlug = "pk"; // Giả sử zone là phân khu (pk), có thể điều chỉnh nếu động
        const zoneNamePath = encodeURIComponent(zoneParam); // "Phân Khu 1" → "Phân%20Khu%201"

        const endpoint = API_ROUTE.GET_AREA_DETAIL
          .replace("{project_id}", projectId)
          .replace("{zone_param}", zoneParamSlug)
          .replace("{zone_name_path}", zoneNamePath);

        const res = await apiarea.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
          params: { lang: "vi" },
        });

     const records: AreaDetailRecord[] = res.data || [];

        if (!records.length) {
          setError("Không có dữ liệu phân khu.");
          setGroupedZones([]);
          return;
        }

        // Gom nhóm theo zone và loại nhà
        const grouped = records.reduce((acc, record) => {
          const zone = record.zone_name?.trim() || "Không xác định";
          const type = record.building_type?.trim();
          if (!type || type.toLowerCase() === "nan") return acc;
          if (!acc[zone]) acc[zone] = new Set<string>();
          acc[zone].add(type);
          return acc;
        }, {} as Record<string, Set<string>>);

        const groupedZonesArray: GroupedZone[] = Object.entries(grouped).map(
          ([zone, typesSet]) => ({
            zone,
            types: Array.from(typesSet).sort(),
          })
        );

        setGroupedZones(groupedZonesArray);
      } catch (err) {
        console.error("❌ Lỗi khi gọi GET_AREA_DETAIL:", err);
        setError("Lỗi khi tải dữ liệu phân khu.");
        setGroupedZones([]);
      } finally {
        setLoading(false);
      }
    }

    fetchZoneDetail();
  }, [zoneParam, projectId]);

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.logoWrapper}>
        <Image
          src="/logo.png"
          alt="Eco Retreat Logo"
          className={styles.logoImage}
          width={128}
          height={128}
        />
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
        <Button variant="filled" className={styles.bottomButton} onClick={handleGoBack}>
          <IconChevronsLeft size={20} />
        </Button>
      </div>
    </div>
  );
};
