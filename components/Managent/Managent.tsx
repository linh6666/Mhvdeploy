"use client";
import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { apiarea } from "../../library/axios";
import { API_ROUTE } from "../../const/apiRouter";
import ZoneTabContent from "./Matrix";
import styles from "./App.module.css";

interface RecordItem {
  id: number;
  zone: string;
  zone_name: string;
  building_name: string;
  building_type: string;
  amenity: string;
  amenity_type: string;
}

export default function Managent() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [zoneNames, setZoneNames] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiarea.get<{ records: RecordItem[] }>(API_ROUTE.GET_AREA);
        const data = response.data.records;

        setRecords(data);

        const zoneSet = new Set<string>();
        data.forEach(item => {
          const parts = item.zone_name?.split(".") || [];

          parts.forEach(name => {
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
        console.error("Lỗi lấy dữ liệu phân khu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Kho hàng</h1>
      {records.length > 0 && (
        <ul>
          {records.map(record => (
            <li key={record.id}>
              {record.building_name} - {record.zone_name}
            </li>
          ))}
        </ul>
      )}
      <Tabs
        variant="outline"
        radius="xs"
        value={activeTab}
        onChange={setActiveTab}
        className={styles.tabList}
      >
        <Tabs.List>
          {zoneNames.map((zoneName) => (
            <Tabs.Tab key={zoneName} value={zoneName}>
              {zoneName}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <ZoneTabContent zoneNames={zoneNames} activeTab={activeTab} />
      </Tabs>
    </div>
  );
}




