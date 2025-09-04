"use client";

import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { apiarea } from "../../../library/axios";
import { API_ROUTE } from "../../../const/apiRouter";
import { IconHome } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import styles from "./App.module.css";

interface RecordItem {
  id: number;
  zone: string;
  zone_name: string;
  building_name: string;
  building_type: string;
  amenity: string;
  amenity_type: string;
  status?: string;
  price:string;
direction:string;
bedroom:string;


}

interface ZoneTabContentProps {
  zoneNames: string[];
  activeTab: string | null;
  records: RecordItem[];
  projectId: string; // ✅ THÊM projectId để gọi API đúng
}

export default function ZoneTabContent({ zoneNames, projectId }: ZoneTabContentProps) {
  const [allData, setAllData] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAllData = async () => {
      if (!projectId) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const fullData: RecordItem[] = [];

        for (const zone of zoneNames) {
          const zoneParam = "pk"; // giả sử slug phân khu
          const zoneNamePath = encodeURIComponent(zone);

          const endpoint = API_ROUTE.GET_AREA_DETAIL
            .replace("{project_id}", projectId)
            .replace("{zone_param}", zoneParam)
            .replace("{zone_name_path}", zoneNamePath);

          const res = await apiarea.get(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
            params: { lang: "vi" },
          });

          if (Array.isArray(res.data)) {
            fullData.push(...res.data);
          }
        }

        setAllData(fullData);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [projectId, zoneNames]);

const handleGoToDetailPage = (buildingData: RecordItem) => {
  const encodedName = encodeURIComponent(buildingData.building_name);
  localStorage.setItem("building_data", JSON.stringify(buildingData));
  localStorage.setItem("project_id", projectId); // nếu muốn dùng ở trang chi tiết
  router.push(`/apartment/${encodedName}`);
};

  return (
    <>
      {zoneNames.map((zone) => {
        const zoneData = allData.filter((item) =>
          item.zone_name?.trim().startsWith(zone)
        );
        const groupedData: { [key: string]: Set<string> } = {};

        zoneData.forEach((item) => {
          const type = item.building_type;
          const name = item.building_name;
          if (type && type !== "null" && type !== "NaN" && type !== "") {
            if (!groupedData[type]) groupedData[type] = new Set();
            if (name && name !== "null" && name !== "NaN" && name !== "") {
              groupedData[type].add(name);
            }
          }
        });

        return (
         <Tabs.Panel key={zone} value={zone}>
  <div className={styles.wrapper}>
    {loading ? (
      <p>Đang tải dữ liệu...</p>
    ) : Object.keys(groupedData).length > 0 ? (
      <div>
        {Object.entries(groupedData).map(([type, nameSet]) => (
          <div key={type} className={styles.buildingGroup}>
            <strong className={styles.buildingTypeTitle}>{type}</strong>
            <div className={styles.gridContainer}>
              {[...nameSet].map((name, idx) => {
                const matchedItem = zoneData.find(
                  (item) => item.building_name === name
                );
                return (
                  <div
                    key={idx}
                    className={styles.buildingCard}
                    onClick={() => matchedItem && handleGoToDetailPage(matchedItem)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={styles.buildingHeader}>
                      <IconHome size={20} className={styles.buildingNameIcon} />
                      <span className={styles.buildingName}>{name}</span>
                    </div>
                    <div className={styles.buildingDetails}>
                       <p>Phòng ngủ: {matchedItem?.bedroom ?? "Chưa có"}</p>
    <p>
  Giá:{" "}
  {matchedItem?.price
    ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(matchedItem.price))
    : "Chưa có"}
</p>
    <p>Hướng: {matchedItem?.direction ?? "Chưa có"}</p>
   
  </div>  
                    <div
                      className={styles.statusBadge}
                      style={{
                        backgroundColor:
                          matchedItem?.status === "Đang bán"
                            ? "#4CAF50"
                            : matchedItem?.status === "Đã bán"
                            ? "#F44336"
                            : matchedItem?.status === "Đã đặt cọc"
                            ? "#FFC107"
                            : "#000",
                        color: "#fff",
                      }}
                    >
                      {matchedItem?.status ?? "Không rõ"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p>Không có dữ liệu</p>
    )}
  </div>
</Tabs.Panel>

        );
      })}
    </>
  );
}

