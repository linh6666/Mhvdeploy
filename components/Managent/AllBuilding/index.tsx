"use client";

import React, { useEffect, useState } from "react";
import { apiarea } from "../../../library/axios";
import { API_ROUTE } from "../../../const/apiRouter";
import { useRouter } from "next/navigation";
import { Pagination, Loader, Grid, Menu, Text } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
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
  const [pageSize] = useState<number>(20);

  // Filter states
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [selectedBuildingTypes, setSelectedBuildingTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedDirections, setSelectedDirections] = useState<string[]>([]);

  // Sort states
  const [sortPrice, setSortPrice] = useState<"asc" | "desc" | "">("");
  const [sortZone, setSortZone] = useState<"asc" | "desc" | "">("");

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

  // ✅ Filter data
  const filteredData = allData.filter((item) => {
    const zoneMatch =
      selectedZones.length === 0 ||
      selectedZones.includes(item.zone_name?.split(".")[0] || "");
    const buildingTypeMatch =
      selectedBuildingTypes.length === 0 ||
      selectedBuildingTypes.includes(item.building_type);
    const statusMatch =
      selectedStatuses.length === 0 || selectedStatuses.includes(item.status);
    const directionMatch =
      selectedDirections.length === 0 || selectedDirections.includes(item.direction);

    return zoneMatch && buildingTypeMatch && statusMatch && directionMatch;
  });

  // ✅ Sort logic
  let sortedData = [...filteredData];

  if (sortZone) {
    sortedData.sort((a, b) => {
      if (a.zone_name < b.zone_name) return sortZone === "asc" ? -1 : 1;
      if (a.zone_name > b.zone_name) return sortZone === "asc" ? 1 : -1;
      return 0;
    });
  }

  if (sortPrice) {
    sortedData.sort((a, b) => {
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;
      return sortPrice === "asc" ? priceA - priceB : priceB - priceA;
    });
  }

  // ✅ Pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Helpers để toggle chọn trong menu
  const toggleValue = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Options
  const zoneOptions = Array.from(
    new Set(allData.map((item) => item.zone_name?.split(".")[0]).filter(Boolean))
  ) as string[];

  const buildingTypeOptions = Array.from(
    new Set(allData.map((item) => item.building_type).filter(Boolean))
  ) as string[];

  const statusOptions = Array.from(
    new Set(allData.map((item) => item.status).filter(Boolean))
  ) as string[];

  const directionOptions = Array.from(
    new Set(allData.map((item) => item.direction).filter(Boolean))
  ) as string[];

  // ✅ Component FilterItem
  const FilterItem = ({
    label,
    options,
    selected,
    setSelected,
  }: {
    label: string;
    options: string[];
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  }) => {
    const [opened, setOpened] = useState(false);

    return (
      <Menu shadow="md" width={200} onOpen={() => setOpened(true)} onClose={() => setOpened(false)}>
        <Menu.Target>
          <Text
            size="sm"
            fw={500}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: selected.length > 0 ? "#1E88E5" : "#555",
            }}
          >
            {selected.length > 0 ? selected.join(", ") : label}
            {opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
          </Text>
        </Menu.Target>
        <Menu.Dropdown>
          {options.map((opt) => (
            <Menu.Item key={opt} onClick={() => toggleValue(opt, setSelected)}>
              <Text
                size="sm"
                fw={selected.includes(opt) ? 600 : 400}
                c={selected.includes(opt) ? "blue" : "black"}
              >
                {opt}
              </Text>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    );
  };

  // ✅ Component FilterSortPrice
  const FilterSortPrice = () => {
    const [opened, setOpened] = useState(false);

    return (
      <Menu shadow="md" width={150} onOpen={() => setOpened(true)} onClose={() => setOpened(false)}>
        <Menu.Target>
          <Text
            size="sm"
            fw={500}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: sortPrice ? "#1E88E5" : "#555",
            }}
          >
            {sortPrice === "asc" ? "Giá ↑" : sortPrice === "desc" ? "Giá ↓" : "Sắp xếp giá"}
            {opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
          </Text>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => setSortPrice("asc")}>
            <Text c={sortPrice === "asc" ? "blue" : "black"} fw={sortPrice === "asc" ? 600 : 400}>
              Giá tăng dần
            </Text>
          </Menu.Item>
          <Menu.Item onClick={() => setSortPrice("desc")}>
            <Text c={sortPrice === "desc" ? "blue" : "black"} fw={sortPrice === "desc" ? 600 : 400}>
              Giá giảm dần
            </Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );
  };

  // ✅ Component FilterSortZone
  const FilterSortZone = () => {
    const [opened, setOpened] = useState(false);

    return (
       <Menu shadow="md" width={180} onOpen={() => setOpened(true)} onClose={() => setOpened(false)}>
      <Menu.Target>
        <Text
          size="sm"
          fw={500}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: sortZone ? "#1E88E5" : "#555",
          }}
        >
          {sortZone === "asc"
            ? "Phân khu ↑ (tăng dần)"
            : sortZone === "desc"
            ? "Phân khu ↓ (giảm dần)"
            : "Sắp xếp phân khu"}
          {opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}
        </Text>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => setSortZone("asc")}>
          <Text c={sortZone === "asc" ? "blue" : "black"} fw={sortZone === "asc" ? 600 : 400}>
            Tăng dần theo số phân khu
          </Text>
        </Menu.Item>
        <Menu.Item onClick={() => setSortZone("desc")}>
          <Text c={sortZone === "desc" ? "blue" : "black"} fw={sortZone === "desc" ? 600 : 400}>
            Giảm dần theo số phân khu
          </Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
    );
  };

  return (
    <div className={styles.wrapper}>
      {loading ? (
        <Loader />
      ) : sortedData.length > 0 ? (
        <>
          {/* Filters */}
          <div style={{ marginBottom: 20 }}>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
                <FilterItem
                  label="Chọn khu vực"
                  options={zoneOptions}
                  selected={selectedZones}
                  setSelected={setSelectedZones}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
                <FilterItem
                  label="Chọn loại nhà"
                  options={buildingTypeOptions}
                  selected={selectedBuildingTypes}
                  setSelected={setSelectedBuildingTypes}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
                <FilterItem
                  label="Chọn trạng thái"
                  options={statusOptions}
                  selected={selectedStatuses}
                  setSelected={setSelectedStatuses}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
                <FilterItem
                  label="Chọn hướng"
                  options={directionOptions}
                  selected={selectedDirections}
                  setSelected={setSelectedDirections}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
                <FilterSortZone />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
                <FilterSortPrice />
              </Grid.Col>
            </Grid>
          </div>

          {/* Cards */}
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

          {/* Pagination */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20, gap: 20 }}>
            <Pagination total={totalPages} value={page} onChange={setPage} />
          </div>
        </>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </div>
  );
}
