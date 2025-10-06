"use client";

import React, { useEffect, useState } from "react";
import { apiarea } from "../../../library/axios";
import { API_ROUTE } from "../../../const/apiRouter";
import { useRouter } from "next/navigation";
import { Pagination, Loader, Grid, Menu, Text, Pill, Button, Group, Table, ActionIcon } from "@mantine/core"; // Thêm Pill vào import
import { IconChevronDown, IconChevronUp, IconFilterFilled, IconLayoutGrid, IconList } from "@tabler/icons-react";
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
   const [sortZone, setSortZone] = useState<"asc" | "desc" | null>(null);
  const [sortPrice, setSortPrice] = useState<"asc" | "desc" | null>(null);
    // 👇 Thêm state cho chế độ hiển thị
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");


  const router = useRouter();

  useEffect(() => {
    // Load view mode from localStorage
    const storedMode = localStorage.getItem('view_mode');
    if (storedMode) {
      setViewMode(storedMode as "grid" | "list");
    }
  }, []);

  useEffect(() => {
    // Save view mode to localStorage whenever it changes
    localStorage.setItem('view_mode', viewMode);
  }, [viewMode]);

  


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
      localStorage.setItem("view_mode", viewMode);
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

  // ----- Helpers -----
  const extractNumberFromZone = (zoneName?: string): number | null => {
    if (!zoneName) return null;
    const match = zoneName.match(/(\d+(\.\d+)?)/); // bắt số trong tên phân khu
    if (match) return Number(match[1]);
    const digits = zoneName.replace(/[^\d.]/g, "");
    return digits ? Number(digits) : null;
  };

  const parsePriceNumber = (p?: string): number => {
    if (!p) return 0;
    const cleaned = String(p).replace(/\s/g, "").replace(/[₫VND,]/gi, "");
    const digitsOnly = cleaned.replace(/[^\d.-]/g, "");
    const n = Number(digitsOnly);
    return isNaN(n) ? 0 : n;
  };

  // ✅ Sort logic
  const sortedData = [...filteredData];

  if (sortZone || sortPrice) {
    sortedData.sort((a, b) => {
      // 1) sort theo zone
      if (sortZone) {
        const na = extractNumberFromZone(a.zone_name);
        const nb = extractNumberFromZone(b.zone_name);

        if (na !== null && nb !== null && na !== nb) {
          return sortZone === "asc" ? na - nb : nb - na;
        }
        if (na !== null && nb === null) return sortZone === "asc" ? -1 : 1;
        if (na === null && nb !== null) return sortZone === "asc" ? 1 : -1;

        const cmp = (a.zone_name || "").localeCompare(b.zone_name || "", undefined, {
          sensitivity: "base",
          numeric: true,
        });
        if (cmp !== 0) return sortZone === "asc" ? cmp : -cmp;
      }

      // 2) sort theo giá
      if (sortPrice) {
        const pa = parsePriceNumber(a.price);
        const pb = parsePriceNumber(b.price);
        if (pa !== pb) return sortPrice === "asc" ? pa - pb : pb - pa;
      }

      return 0;
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
  ).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ""), 10);
    const numB = parseInt(b.replace(/\D/g, ""), 10);
    return numA - numB;
  }) as string[];

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
    color: "#555", // Hoặc bạn có thể điều chỉnh màu nếu cần
  }}
>
  {label} {/* Chỉ hiển thị nhãn */}
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
 const handleSortZone = (value: "asc" | "desc") => {
    setSortZone((prev) => (prev === value ? null : value));
  };

  // Toggle price
  const handleSortPrice = (value: "asc" | "desc") => {
    setSortPrice((prev) => (prev === value ? null : value));
  };


  // Hàm để xóa giá trị đã chọn
  const handleRemoveSelected = (value: string) => {
    setSelectedZones((prev) => prev.filter((v) => v !== value));
    setSelectedBuildingTypes((prev) => prev.filter((v) => v !== value));
    setSelectedStatuses((prev) => prev.filter((v) => v !== value));
    setSelectedDirections((prev) => prev.filter((v) => v !== value));
  };

  // Hàm để xóa tất cả các giá trị đã chọn
  const handleClearAll = () => {
    setSelectedZones([]);
    setSelectedBuildingTypes([]);
    setSelectedStatuses([]);
    setSelectedDirections([]);
  };

  // Kiểm tra xem có giá trị nào được chọn không
  const hasSelectedItems = [
    ...selectedZones,
    ...selectedBuildingTypes,
    ...selectedStatuses,
    ...selectedDirections,
  ].length > 0;

  return (
    <div className={styles.wrapper}>

         <div style={{ marginBottom: 20 }}>
            <h2>
              Lọc theo tiêu chí:
              {[...selectedZones, ...selectedBuildingTypes, ...selectedStatuses, ...selectedDirections].map((item) => (
                <Pill key={item} withRemoveButton onRemove={() => handleRemoveSelected(item)}
                 
                >
                 <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <IconFilterFilled size={12} />
      <span>{item}</span>
    </div>
                </Pill>
              ))}
              {/* Nút xóa tất cả chỉ hiển thị khi có ít nhất một giá trị được chọn */}
              {hasSelectedItems && (
                <Pill onClick={handleClearAll} variant="outline" color="red" style={{ marginLeft: '8px' }}>
                  Xóa tất cả
                </Pill>
              )}
            </h2>
          </div>

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
           
            </Grid>
            <div style={{ marginTop: 12 }}>
              <h2>Sắp xếp:</h2>

   <Group gap="sm" mt={10}>
      <Button
        size="xs"
        variant={sortZone === "asc" ? "filled" : "outline"}
        color={sortZone === "asc" ? "blue" : "gray"}
        onClick={() => handleSortZone("asc")}
      >
        ↑ Phân khu thấp - cao
      </Button>

      <Button
        size="xs"
        variant={sortZone === "desc" ? "filled" : "outline"}
        color={sortZone === "desc" ? "blue" : "gray"}
        onClick={() => handleSortZone("desc")}
      >
        ↓ Phân khu cao - thấp
      </Button>

      <Button
        size="xs"
        variant={sortPrice === "asc" ? "filled" : "outline"}
        color={sortPrice === "asc" ? "blue" : "gray"}
        onClick={() => handleSortPrice("asc")}
      >
        ↑ Giá thấp - cao
      </Button>

      <Button
        size="xs"
        variant={sortPrice === "desc" ? "filled" : "outline"}
        color={sortPrice === "desc" ? "blue" : "gray"}
        onClick={() => handleSortPrice("desc")}
      >
        ↓ Giá cao - thấp
      </Button>
        {/* 👇 Nút chuyển Grid / List */}
        <h1>View:</h1>
          <ActionIcon
  variant={viewMode === "grid" ? "filled" : "outline"}
  color={viewMode === "grid" ? "blue" : "gray"}
  size="sm"
  onClick={() => setViewMode("grid")}
  aria-label="Chế độ lưới"
>
  <IconLayoutGrid size={16} />
</ActionIcon>

<ActionIcon
  variant={viewMode === "list" ? "filled" : "outline"}
  color={viewMode === "list" ? "blue" : "gray"}
  size="sm"
  onClick={() => setViewMode("list")}
  aria-label="Chế độ danh sách"
>
  <IconList size={16} />
</ActionIcon>
    </Group>
      </div>
          </div>
     {loading ? (
        <Loader />
      ) : sortedData.length > 0 ? (
        <>
          {viewMode === "grid" ? (
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
                    <p style={{ fontSize: "14px" }}>
                      Tên nhà: {item.building_name ?? "Chưa có"}
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      Phòng ngủ: {item.bedroom ?? "Chưa có"}
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      Giá:{" "}
                      {item.price
                        ? new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(Number(item.price))
                        : "Chưa có"}
                    </p>
                    <p style={{ fontSize: "14px" }}>
                      Hướng: {item.direction ?? "Chưa có"}
                    </p>
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
          ) : (
            // 📝 List View
        <div className={styles.listContainer}>
  <Table highlightOnHover withTableBorder withColumnBorders>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Khu</Table.Th>
        <Table.Th>Tên nhà</Table.Th>
        <Table.Th>Loại</Table.Th>
        <Table.Th>Phòng ngủ</Table.Th>
        <Table.Th>Hướng</Table.Th>
        <Table.Th>Giá</Table.Th>
        <Table.Th>Trạng thái</Table.Th>
      </Table.Tr>
    </Table.Thead>

    <Table.Tbody>
      {paginatedData.map((item) => (
        <Table.Tr
          key={item.id}
          onClick={() => handleGoToDetailPage(item)}
          style={{ cursor: "pointer" }}
        >
          <Table.Td>{item.zone_name}</Table.Td>
          <Table.Td>{item.building_name}</Table.Td>
          <Table.Td>{item.building_type}</Table.Td>
          <Table.Td>{item.bedroom ?? "Chưa có"}</Table.Td>
          <Table.Td>{item.direction ?? "Chưa có"}</Table.Td>
          <Table.Td>
            {item.price
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(Number(item.price))
              : "Chưa có"}
          </Table.Td>
        <Table.Td>
  <div
    // className={styles.statusBadge}
    style={{
    color:
      item.status === "Đang bán"
        ? "#4CAF50"
        : item.status === "Đã bán"
        ? "#F44336"
        : item.status === "Đã đặt cọc"
        ? "#FFC107"
        : "#000",
  }}
  >
    {item.status ?? "Không rõ"}
  </div>
</Table.Td>
        </Table.Tr>
      ))}
    </Table.Tbody>
  </Table>
</div>

          )}


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