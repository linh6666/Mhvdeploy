"use client";
import React, { useState, useEffect } from "react";
import { Input, Button, RangeSlider } from "@mantine/core";
import styles from "./DrawerRight.module.css";
import { apifilter } from "../../library/axios";
import { API_ROUTE } from "../../const/apiRouter";
import ResultsTable from "./ResultsTable";

// Interface cho response filter
interface FilterTypeResponse {
  status: string[];
  bedroom: (number | string)[];
  direction: string[];
  price: number[];
}

// Interface cho kết quả lọc
interface ResultItem {
  building_name: string;
  zone_name: string;
  bedroom: number;
  status: string;
  direction: string;
  price: number;
  // Nếu có thêm trường nào từ API, bạn thêm vào đây
}

export default function FilterForm() {
  const [statusOptions, setStatusOptions] = useState<string[]>([]);
  const [bedroomOptions, setBedroomOptions] = useState<string[]>([]);
  const [directionOptions, setDirectionOptions] = useState<string[]>([]);
  const [priceBounds, setPriceBounds] = useState<[number, number] | null>(null);

  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedBedrooms, setSelectedBedrooms] = useState<string>("");
  const [direction, setDirection] = useState<string>("");

  const [manualKeyword, setManualKeyword] = useState<string>("");
  const [filterSummary, setFilterSummary] = useState<string>("");

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const [rangeValue, setRangeValue] = useState<[number, number]>([0, 10000000000]);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    apifilter
      .get<FilterTypeResponse>(API_ROUTE.GET_FILTER_TYPE)
      .then((res) => {
        const d = res.data;
        setStatusOptions(d.status || []);
        setDirectionOptions(d.direction || []);
        setBedroomOptions((d.bedroom || []).map((b) => b.toString()));
        if (d.price?.length >= 2) {
          const nums = d.price.filter((n) => !isNaN(n)).sort((a, b) => a - b);
          setPriceBounds([nums[0], nums[nums.length - 1]]);
          setRangeValue([nums[0], nums[nums.length - 1]]);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (priceBounds) {
      setMinPrice(rangeValue[0].toString());
      setMaxPrice(rangeValue[1].toString());
    }
  }, [rangeValue, priceBounds]);

  useEffect(() => {
    const parts: string[] = [];
    if (selectedStatus) parts.push(selectedStatus);
    if (selectedBedrooms) parts.push(`${selectedBedrooms} phòng ngủ`);
    if (direction) parts.push(`Hướng ${direction}`);
    if (minPrice && maxPrice) parts.push(`${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`);
    setFilterSummary(parts.join(" - "));
  }, [selectedStatus, selectedBedrooms, direction, minPrice, maxPrice]);

  const formatPrice = (numStr: string) => {
    const num = Number(numStr);
    if (num >= 1_000_000_000) return `${num / 1_000_000_000} tỉ`;
    if (num >= 1_000_000) return `${num / 1_000_000} triệu`;
    return `${num} đ`;
  };

  const handleStatusClick = (st: string) => {
    setSelectedStatus(st === selectedStatus ? "" : st);
  };

  const handleBedroomsClick = (b: string) => {
    setSelectedBedrooms(b === selectedBedrooms ? "" : b);
  };

  const handleDirectionClick = (d: string) => {
    setDirection(d === direction ? "" : d);
  };

  const handleClear = () => {
    setSelectedStatus("");
    setSelectedBedrooms("");
    setDirection("");
    setRangeValue(priceBounds || [0, 10000000000]);
    setManualKeyword("");
    setFilterSummary("");
    setResults([]);
    setShowResults(false);
  };

  const handleSearch = async () => {
    const payload: Record<string, unknown> = {};

    if (selectedStatus) payload.status = selectedStatus;
    if (selectedBedrooms && selectedBedrooms !== "NaN") {
      const bedNum = parseInt(selectedBedrooms);
      if (!isNaN(bedNum)) payload.bedroom = bedNum;
    }
    if (direction) payload.direction = direction;

    const min = Number(minPrice);
    const max = Number(maxPrice);
    if (!isNaN(min)) payload.min_price = min;
    if (!isNaN(max)) payload.max_price = max;

    const filterValues = [selectedStatus, selectedBedrooms, direction].join(" ");
    if (manualKeyword && !filterValues.includes(manualKeyword)) {
      payload.apartment_number = manualKeyword.trim();
    }

    try {
      const resp = await apifilter.post(API_ROUTE.GET_FILTER, payload);
      const data = resp.data;
      setResults(Array.isArray(data) ? (data as ResultItem[]) : data ? [data as ResultItem] : []);
      setShowResults(true);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Lỗi khi gọi filter API:", e.message);
      } else {
        console.error("Lỗi không xác định khi gọi filter API:", e);
      }
      alert("Dữ liệu này không có !!");
    }
  };

  return (
    <div className={styles.container}>
      {!showResults ? (
        <div className={styles.content}>
          <div className={styles.searchWrapper}>
            <Input
              value={filterSummary || manualKeyword}
              onChange={(e) => setManualKeyword(e.currentTarget.value)}
              classNames={{ wrapper: styles.inputWrapper, input: styles.searchInput }}
              placeholder="Search Apartment Number ..."
            />
          </div>

          <div className={styles.section}>
            <div className={styles.label}>Status:</div>
            <div className={styles.buttonRow}>
              {statusOptions.map((st, i) => (
                <StatusButton
                  key={st}
                  label={st}
                  isSelected={selectedStatus === st}
                  onClick={() => handleStatusClick(st)}
                  bgColor={`bg${(i % 3) + 1}`}
                />
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.label}>Bedrooms:</div>
            <div className={styles.diamondRow}>
              {bedroomOptions
                .filter((b) => b !== "0" && b !== "0.0")
                .map((b) => (
                  <DiamondButton
                    key={b}
                    label={b.replace(".0", "")}
                    isSelected={selectedBedrooms === b}
                    onClick={() => handleBedroomsClick(b)}
                  />
                ))}
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.label}>Price:</div>
            <RangeSlider
              min={priceBounds ? priceBounds[0] : 0}
              max={priceBounds ? priceBounds[1] : 10000000000}
              step={Math.max(
                1_000_000,
                priceBounds ? Math.round((priceBounds[1] - priceBounds[0]) / 100) : 1_000_000
              )}
              value={rangeValue}
              onChange={setRangeValue}
              label={(v) =>
                v >= 1_000_000_000 ? `${v / 1_000_000_000} tỉ` : `${v / 1_000_000} triệu`
              }
              styles={{
                track: { backgroundColor: "#e0e0e0" },
                bar: { backgroundColor: "#bb8d38" },
                thumb: { backgroundColor: "#bb8d38", border: "2px solid white" },
              }}
            />
          </div>

       <div className={styles.section}>
  <div className={styles.label}>Direction:</div>
  <div className={styles.buttonRow}>
    {directionOptions.map((d) => (
      <StatusButton
        key={d}
        label={d}
        isSelected={direction === d}
        onClick={() => handleDirectionClick(d)}
        // ❌ Không truyền bgColor nữa
      />
    ))}
  </div>
</div>

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

// ========== Components phụ ==========

const StatusButton = ({
  label,
  isSelected,
  onClick,
  bgColor,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  bgColor?: string;
}) => (
  <button
  className={`${styles.statusBtn} ${bgColor ? styles[bgColor as keyof typeof styles] : ""} ${isSelected ? styles.selected : ""}`}
  onClick={onClick}
>
  {label}
</button>

);

const DiamondButton = ({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
 <button
  className={`${styles.diamond} ${isSelected ? styles.selectedDiamond : ""}`}
  onClick={onClick}
>
  <span className={styles.diamondText}>{label}</span>
</button>

);
