import React, { useState } from "react";
import { Input, Button } from "@mantine/core";
import styles from "./DrawerRight.module.css";
import { apifilter } from "../../library/axios";
import { API_ROUTE } from "../../const/apiRouter";
import ResultsTable from "./ResultsTable";

export default function FilterForm() {
  const [selectedStatus, setSelectedStatus] = useState<string>(""); // Không mặc định
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>(""); // Không mặc định
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const updateSearchKeyword = (status: string, bedroom: string) => {
    const parts = [];
    if (status) parts.push(status);
    if (bedroom) parts.push(`${bedroom} phòng ngủ`);
    setSearchKeyword(parts.join(" - "));
  };

  const handleStatusClick = (status: string) => {
    const newStatus = status === selectedStatus ? "" : status;
    setSelectedStatus(newStatus);
    updateSearchKeyword(newStatus, selectedBedrooms);
  };

  const handleBedroomsClick = (bedroom: string) => {
    const newBedroom = bedroom === selectedBedrooms ? "" : bedroom;
    setSelectedBedrooms(newBedroom);
    updateSearchKeyword(selectedStatus, newBedroom);
  };

  const handleClear = () => {
    setSelectedStatus("");
    setSelectedBedrooms("");
    setSearchKeyword("");
    setResults([]);
    setShowResults(false);
  };

  const handleSearch = async () => {
    const payload: Record<string, string> = {};

    if (selectedStatus) payload.status = selectedStatus;
    if (selectedBedrooms) payload.bedroom = selectedBedrooms;

    if (
      searchKeyword.trim() !== "" &&
      !searchKeyword.includes(selectedStatus) &&
      !searchKeyword.includes(selectedBedrooms)
    ) {
      payload.apartment_number = searchKeyword.trim();
    }

    try {
      const response = await apifilter.post(API_ROUTE.GET_FILTER, payload);
      const data = response.data;

      if (Array.isArray(data)) setResults(data);
      else if (data) setResults([data]);
      else setResults([]);

      setShowResults(true);
    } catch (error: any) {
      console.error("Lỗi khi gọi API filter:", error?.response?.data || error.message);
    }
  };

  return (
    <div className={styles.container}>
      {!showResults ? (
        <div className={styles.content}>
          {/* Ô input tìm kiếm */}
          <div className={styles.searchWrapper}>
            <Input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.currentTarget.value)}
              classNames={{
                wrapper: styles.inputWrapper,
                input: styles.searchInput
              }}
              placeholder="Search Apartment Number ..."
            />
          </div>

          {/* Bộ lọc trạng thái */}
          <div className={styles.section}>
            <div className={styles.label}>Status:</div>
            <div className={styles.buttonRow}>
              <StatusButton label="Đã bán" isSelected={selectedStatus === "Đã bán"} onClick={() => handleStatusClick("Đã bán")} bgColor="bg1" />
              <StatusButton label="Đang bán" isSelected={selectedStatus === "Đang bán"} onClick={() => handleStatusClick("Đang bán")} bgColor="bg2" />
            </div>
            <div className={styles.buttonRow}>
              <StatusButton label="Đã đặt cọc" isSelected={selectedStatus === "Đã đặt cọc"} onClick={() => handleStatusClick("Đã đặt cọc")} bgColor="bg3" />
            </div>
          </div>

          {/* Bộ lọc phòng ngủ */}
          <div className={styles.section}>
            <div className={styles.label}>Bedrooms:</div>
            <div className={styles.diamondRow}>
              <DiamondButton label="1" isSelected={selectedBedrooms === "1.0"} onClick={() => handleBedroomsClick("1.0")} />
              <DiamondButton label="2" isSelected={selectedBedrooms === "2.0"} onClick={() => handleBedroomsClick("2.0")} />
              <DiamondButton label="3" isSelected={selectedBedrooms === "3.0"} onClick={() => handleBedroomsClick("3.0")} />
            </div>
          </div>

          {/* Nút hành động */}
          <div className={styles.actionButtons}>
            <Button variant="outline" className={styles.clearBtn} onClick={handleClear}>
              Clear
            </Button>
            <Button className={styles.searchBtn} onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>
      ) : (
        <ResultsTable data={results} onBack={handleClear} />
      )}
    </div>
  );
}

// === Components phụ ===

const StatusButton = ({
  label,
  isSelected,
  onClick,
  bgColor
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  bgColor: string;
}) => (
  <button
    className={`${styles.statusBtn} ${styles[bgColor]} ${isSelected ? styles.selected : ''}`}
    onClick={onClick}
  >
    {label}
  </button>
);

const DiamondButton = ({
  label,
  isSelected,
  onClick
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    className={`${styles.diamond} ${isSelected ? styles.selectedDiamond : ''}`}
    onClick={onClick}
  >
    <span className={styles.diamondText}>{label}</span>
  </button>
);
