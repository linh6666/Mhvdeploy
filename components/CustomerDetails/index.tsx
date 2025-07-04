"use client"; // 👈 Bắt buộc

import React, { useEffect, useState } from "react";
import { apifilter } from "../../library/axios";
import { API_ROUTE } from "../../const/apiRouter";
import Image from "next/image";
import Link from "next/link";
import styles from "./BuildingDetailPage.module.css";
import { IconArrowLeft } from "@tabler/icons-react";

interface RecordItem {
  id: number;
  zone: string;
  zone_name: string;
  building_name: string;
  building_type: string;
  amenity: string;
  amenity_type: string;
  image_url: string;
  direction?: string;
  status?: string;
  bedroom?: number | string;
  price?: number | string;
}

interface CustomerDetailsProps {
  building: string;
}

export default function CustomerDetails({ building }: CustomerDetailsProps) {
  const [buildings, setBuildings] = useState<RecordItem[]>([]);
  const buildingName = decodeURIComponent(building);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Đang gọi API filter...");
        const res = await apifilter.post(API_ROUTE.GET_FILTER, {
          building_name: buildingName,
        });
        setBuildings(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Lỗi khi gọi API filter:", error);
      }
    }

    fetchData();
  }, [buildingName]);

  if (buildings.length === 0) {
    return <div style={{ padding: "1rem" }}>❌ Không tìm thấy toà nhà: {buildingName}</div>;
  }

  // ✅ Sửa lỗi ESLint: không dùng any
  const isValid = (value: string | number | undefined | null): boolean => {
    return (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "NaN" &&
      !(typeof value === "number" && isNaN(value))
    );
  };

  return (
    <div className={styles.border}>
      {buildings.map((buildingData, index) => (
        <div className={styles.container} key={index}>
          <h1 style={{ marginBottom: "1rem" }}>
            Chi tiết các căn thuộc: {buildingName}
          </h1>

          <div className={styles.box}>
            <div className={styles.details}>
              <ul style={{ lineHeight: 1.8 }}>
                {isValid(buildingData.zone_name) && (
                  <li><strong>Tên phân khu:</strong> {buildingData.zone_name}</li>
                )}
                {isValid(buildingData.building_type) && (
                  <li><strong>Loại toà nhà:</strong> {buildingData.building_type}</li>
                )}
                {isValid(buildingData.amenity_type) && (
                  <li><strong>Loại tiện ích:</strong> {buildingData.amenity_type}</li>
                )}
                {isValid(buildingData.direction) && (
                  <li><strong>Hướng:</strong> {buildingData.direction}</li>
                )}
                {isValid(buildingData.bedroom) && (
                  <li><strong>Số phòng ngủ:</strong> {buildingData.bedroom}</li>
                )}
                {isValid(buildingData.price) && (
                  <li><strong>Giá:</strong> {Number(buildingData.price).toLocaleString()} VNĐ</li>
                )}
                {isValid(buildingData.status) && (
                  <li><strong>Trạng thái:</strong> {buildingData.status}</li>
                )}
              </ul>
            </div>

            <div className={styles.imageContainer}>
              <Image
                src={buildingData.image_url || "/THUMBNAIL/4-MH-CAO-TANG.jpg"}
                alt={buildingData.building_name}
                className={styles.image}
                width={300}
                height={100}
              />
            </div>
          </div>

          <div className={styles.backButtonContainer}>
            <Link href="/DetailManagent" className={styles.backButton}>
              <IconArrowLeft size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
