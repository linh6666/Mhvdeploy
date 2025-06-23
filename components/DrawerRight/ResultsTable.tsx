import React from "react";
import { Table, Button } from "@mantine/core";
import styles from "./ResultsTable.module.css";

interface Props {
  data: any[];
  onBack: () => void;
}

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
      <Table highlightOnHover withColumnBorders className={styles.tableBorder}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Căn hộ</th>
            <th>Trạng thái</th>
            <th>Phòng ngủ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.building_name || "--"}</td>
              <td>{item.status || "--"}</td>
              <td>{item.bedroom || "--"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ marginTop: "24px", textAlign: "right" }}>
       <Button
    onClick={onBack}
    style={{ backgroundColor: "#bb8d38", color: "white" }}
  >Quay lại bộ lọc</Button>
      </div>
    </div>
  );
}
