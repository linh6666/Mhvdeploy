import React from "react";
import { Table, Button } from "@mantine/core";
import styles from "./ResultsTable.module.css";

interface ResultItem {
  building_name: string;
  zone_name: string;
  bedroom: string | number;
  status: string;
  price: number | string;
  direction: string;
}

interface Props {
  data: ResultItem[];
  onBack: () => void;
}

// Hàm định dạng giá bán thành dạng tiền tệ VNĐ
const formatCurrency = (value: number | string): string => {
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(number)) return "--";
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });
};

// Hàm kiểm tra giá trị hợp lệ (không null, undefined, NaN)
const isValid = (value: unknown): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === "number" && (isNaN(value) || !isFinite(value))) return false;
  if (typeof value === "string" && (value.trim() === "" || value.toLowerCase() === "nan")) return false;
  return true;
};

// Kiểm tra toàn bộ dòng có đủ dữ liệu không
const isRowValid = (item: ResultItem): boolean => {
  return (
    isValid(item.building_name) &&
    isValid(item.zone_name) &&
    isValid(item.bedroom) &&
    isValid(item.status) &&
    isValid(item.price) &&
    isValid(item.direction)
  );
};

export default function ResultsTable({ data, onBack }: Props) {
  const filteredData = data.filter(isRowValid);

  if (!filteredData.length)
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <p>Không có kết quả</p>
        <Button
          onClick={onBack}
          mt="md"
          style={{ backgroundColor: "#bb8d38", color: "white" }}
        >
          Quay lại bộ lọc
        </Button>
      </div>
    );

  return (
    <div>
      <div className={styles.scrollableTableWrapper}>
        <Table
          highlightOnHover
          withColumnBorders
          className={styles.tableBorder}
        >
          <thead>
            <tr>
              <th>Tên</th>
              <th>Khu vực</th>
              <th>Phòng</th>
              <th>Trạng thái</th>
              <th>Giá</th>
              <th>Hướng</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.building_name}</td>
                <td>{item.zone_name}</td>
                <td>{item.bedroom}</td>
                <td>{item.status}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{item.direction}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div style={{ marginTop: "24px", textAlign: "right" }}>
        <Button
          onClick={onBack}
          style={{ backgroundColor: "#bb8d38", color: "white" }}
        >
          Quay lại bộ lọc
        </Button>
      </div>
    </div>
  );
}
