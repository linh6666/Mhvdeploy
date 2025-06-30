import React from "react";
import { Table, Button } from "@mantine/core";
import styles from "./ResultsTable.module.css";

interface Props {
  data: any[];
  onBack: () => void;
}

// Hàm định dạng giá bán thành dạng tiền tệ VNĐ
const formatCurrency = (value: number | string) => {
  const number = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(number)) return "--";
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });
};

export default function ResultsTable({ data, onBack }: Props) {
  if (!data.length)
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
              <th>khu vực</th>
              <th>Phòng</th>
              <th>Trạng thái</th>
              <th>Giá</th>
              <th>Hướng</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>

             <td>{item.building_name || "--"}</td>
                <td>{item.zone_name || "--"}</td>
                <td>{item.bedroom || "--"}</td>
              <td>{item.status || "--"}</td>
                <td>{item.price ? formatCurrency(item.price) : "--"}</td>
                <td>{item.direction || "--"}</td>
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
