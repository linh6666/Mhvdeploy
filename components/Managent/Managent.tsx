"use client";

import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { apiarea } from "../../library/axios";
import { API_ROUTE } from "../../const/apiRouter";
import ZoneTabContent from "./Matrix";
import AmenityContent from "./AmenityContent";
import HouseTypeContent from "./HouseTypeConten";
import Note from "./tai-lieu";
import styles from "./App.module.css";

interface AppProps {
  projectId: string;
}

interface RecordItem {
  id: number;
  zone: string;
  zone_name: string;
  building_name: string;
  building_type: string;
  amenity: string;
  amenity_type: string;
}

export default function Managent({ projectId }: AppProps) {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [zoneNames, setZoneNames] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<string>("warehouse");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Không tìm thấy access token.");

        const zoneParam = "pk";
        const lang = "vi";

        const endpoint = API_ROUTE.GET_AREA.replace(
          "{project_id}",
          projectId
        ).replace("{zone_param}", zoneParam);

        const res = await apiarea.get(endpoint, {
          params: { lang },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = Array.isArray(res.data) ? res.data : [];
        setRecords(data);

        const zoneSet = new Set<string>();
        data.forEach((item: RecordItem) => {
          const parts = item.zone_name?.split(".") || [];
          parts.forEach((name) => {
            const trimmed = name.trim();
            const normalized = trimmed.replace(/[a-zA-Z]$/, "");
            if (normalized) {
              zoneSet.add(normalized);
            }
          });
        });

        const uniqueZoneNames = Array.from(zoneSet);
        setZoneNames(uniqueZoneNames);
        if (uniqueZoneNames.length > 0) {
          setActiveTab(uniqueZoneNames[0]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phân khu:", error);
      }
    };

    fetchData();
  }, [projectId]);

  return (
    <div className={styles.container}>
      {/* Các tiêu đề dạng h1 nằm ngang */}
      <div className={styles.headerList}>
        <h1
          className={`${styles.titleTab} ${
            activeView === "warehouse" ? styles.titleTabActive : ""
          }`}
          onClick={() => setActiveView("warehouse")}
        >
          Kho hàng
        </h1>
        <h1
          className={`${styles.titleTab} ${
            activeView === "amenities" ? styles.titleTabActive : ""
          }`}
          onClick={() => setActiveView("amenities")}
        >
          Tài liệu
        </h1>
        <h1
          className={`${styles.titleTab} ${
            activeView === "houseType" ? styles.titleTabActive : ""
          }`}
          onClick={() => setActiveView("houseType")}
        >
          Danh sách giá
        </h1>
         <h1
          className={`${styles.titleTab} ${
            activeView === "note" ? styles.titleTabActive : ""
          }`}
          onClick={() => setActiveView("note")}
        >
          Ghi chú
        </h1>
      </div>

      {/* Nội dung tương ứng từng phần */}
      {activeView === "warehouse" && (
        <Tabs
          variant="outline"
          radius="xs"
          value={activeTab}
          onChange={setActiveTab}
          className={styles.tabList}
        >
          <Tabs.List>
            {zoneNames.map((zoneName) => (
              <Tabs.Tab
                key={zoneName}
                value={zoneName}
                className={styles.customTab}
              >
                {zoneName}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <ZoneTabContent
            zoneNames={zoneNames}
            activeTab={activeTab}
            records={records}
            projectId={projectId}
          />
        </Tabs>
      )}

      {activeView === "amenities" && <AmenityContent projectId={projectId} />}
      {activeView === "houseType" && <HouseTypeContent projectId={projectId} />}
        {activeView === "note" && <Note projectId={projectId} />}
    </div>
  );
}

