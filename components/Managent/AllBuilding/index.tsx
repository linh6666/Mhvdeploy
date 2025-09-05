"use client";

import React, { useEffect, useState } from "react";
import { apiarea } from "../../../library/axios";
import { API_ROUTE } from "../../../const/apiRouter";
import { useRouter } from "next/navigation";
import { Pagination, MultiSelect, Loader, Grid } from "@mantine/core";
import styles from "./App.module.css";

interface RecordItem {
  id: number;
  zone: string;
  zone_name: string;
  building_name: string;
  building_type: string;
  amenity: string;
  amenity_type: string;
  status: string;
  price: string;
  direction: string;
  bedroom: string;
}

interface AllListProps {
  projectId: string;
}

export default function AllList({ projectId }: AllListProps) {
  const [allData, setAllData] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
//   const [pageSize, setPageSize] = useState<number>(20);
const [pageSize] = useState<number>(20);
  
  // Filter states
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedBuildingTypes, setSelectedBuildingTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedDirections, setSelectedDirections] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchAll = async () => {
      if (!projectId) return;

      setLoading(true);
      try {
        const token = localStorage.getItem("access_token");
        const endpoint = API_ROUTE.GET_LIST_DETAIL_ECOPARK;

        const res = await apiarea.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
          params: { lang: "vi" },
        });

        console.log("API response:", res.data);

        if (Array.isArray(res.data.items)) {
          setAllData(res.data.items);
        } else {
          setAllData([]);
        }
      } catch (error) {
        console.error("Lỗi gọi API:", error);
        setAllData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [projectId]);

  const handleGoToDetailPage = (buildingData: RecordItem) => {
    const encodedName = encodeURIComponent(buildingData.building_name);
    localStorage.setItem("building_data", JSON.stringify(buildingData));
    localStorage.setItem("project_id", projectId);
    router.push(`/apartment/${encodedName}`);
  };

  // ✅ Tính dữ liệu hiển thị theo trang
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter data
  const filteredData = allData.filter(item => {
    const zoneMatch = selectedZones.length === 0 || selectedZones.includes(item.zone_name);
    const buildingTypeMatch = selectedBuildingTypes.length === 0 || selectedBuildingTypes.includes(item.building_type);
    const statusMatch = selectedStatuses.length === 0 || selectedStatuses.includes(item.status);
    const directionMatch = selectedDirections.length === 0 || selectedDirections.includes(item.direction);

    return zoneMatch && buildingTypeMatch && statusMatch && directionMatch;
  });

  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loader />
      ) : filteredData.length > 0 ? (
        <>
          {/* Filters */}
          <div style={{ marginBottom: 20 }}>
              <Grid>
                 <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                     <MultiSelect
  data={Array.from(
    new Set(
      allData
        .map(item => item.zone_name?.split(".")[0]) // lấy phần trước dấu .
        .filter(Boolean) // bỏ null/undefined
    )
  ) as string[]}
  label="Chọn khu vực"
  value={selectedZones}
  onChange={setSelectedZones}
  placeholder="Chọn khu vực"
/>
                 </Grid.Col>

       

 <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
<MultiSelect
  data={Array.from(new Set(allData.map(item => item.building_type).filter(Boolean))) as string[]}
  label="Chọn loại nhà"
  value={selectedBuildingTypes}
  onChange={setSelectedBuildingTypes}
  placeholder="Chọn loại nhà"
/>
 </Grid.Col>

 <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
<MultiSelect
  data={Array.from(new Set(allData.map(item => item.status).filter(Boolean))) as string[]}
  label="Chọn trạng thái"
  value={selectedStatuses}
  onChange={setSelectedStatuses}
  placeholder="Chọn trạng thái"
/>

 </Grid.Col>

 <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
<MultiSelect
  data={Array.from(new Set(allData.map(item => item.direction).filter(Boolean))) as string[]}
  label="Chọn hướng"
  value={selectedDirections}
  onChange={setSelectedDirections}
  placeholder="Chọn hướng"
/>
 </Grid.Col>

</Grid>

          </div>

          <div className={styles.gridContainer}>
            {paginatedData.map((item) => (
              <div
                key={item.id}
                className={styles.buildingCard}
                onClick={() => handleGoToDetailPage(item)}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.buildingHeader}>
                  <span className={styles.buildingName}>{item.zone_name}</span>
                </div>
                <div className={styles.buildingDetails}>
                  <p>Tên nhà: {item.building_name ?? "Chưa có"}</p>
                  <p>Phòng ngủ: {item.bedroom ?? "Chưa có"}</p>
                  <p>
                    Giá:{" "}
                    {item.price
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Number(item.price))
                      : "Chưa có"}
                  </p>
                  <p>Hướng: {item.direction ?? "Chưa có"}</p>
                </div>
                <div
                  className={styles.statusBadge}
                  style={{
                    backgroundColor:
                      item.status === "Đang bán"
                        ? "#4CAF50"
                        : item.status === "Đã bán"
                        ? "#F44336"
                        : item.status === "Đã đặt cọc"
                        ? "#FFC107"
                        : "#000",
                    color: "#fff",
                  }}
                >
                  {item.status ?? "Không rõ"}
                </div>
              </div>
            ))}
          </div>

          {/* Mantine Pagination */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20, gap: 20 }}>
            <Pagination
              total={totalPages}
              value={page}
              onChange={setPage}
            />
          </div>
        </>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </div>
  );
}
