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
  status?: string; // ✅ thêm dòng này để hỗ trợ status (nếu cần)
}

interface ZoneTabContentProps {
  zoneNames: string[];
  activeTab: string | null;
  records: RecordItem[];
}

export default function ZoneTabContent({ zoneNames }: ZoneTabContentProps) {
  const [allData, setAllData] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const res = await apiarea.get(API_ROUTE.GET_AREA_DETAIL);
        const originalData: RecordItem[] = Array.isArray(res.data.records)
          ? res.data.records
          : [];

        const expandedData: RecordItem[] = originalData.flatMap((item) => {
          const splitNames = item.zone_name.split(".").map((z) => z.trim());
          return splitNames.map((name) => ({ ...item, zone_name: name }));
        });

        setAllData(expandedData);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleGoToDetailPage = (buildingName: string) => {
    const encodedName = encodeURIComponent(buildingName);
    router.push(`/apartment/${encodedName}`); // ✅ đổi sang route mới
  };

  return (
    <>
      {zoneNames.map((zone) => {
        const zoneData = allData.filter((item) =>
          item.zone_name.startsWith(zone)
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
                      <table className={styles.table}>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Tên tòa nhà</th>
                            <th>Trạng Thái</th>
                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...nameSet].map((name, idx) => {
                            const matchedItem = zoneData.find(
                              (item) => item.building_name === name
                            ); // ✅ chỉ thêm dòng này
                            return (
                              <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>
                                  <span className={styles.buildingName}>
                                    <IconHome
                                      size={18}
                                      className={styles.buildingNameIcon}
                                    />
                                    {name}
                                  </span>
                                </td>
                             <td
  style={{
    color:
      matchedItem?.status === "Đang bán"
        ? "#4a7a96"
        : matchedItem?.status === "Đã bán"
        ? "#234257"
        : matchedItem?.status === "Đã đặt cọc"
        ? "#bb8d38"
        : "#000", // fallback
  }}
>
  {matchedItem?.status ?? "Không rõ"}
</td>

                                <td>
                                  <button
                                    onClick={() => handleGoToDetailPage(name)}
                                    className={styles.button}
                                  >
                                    Xem chi tiết
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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


