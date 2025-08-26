"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./BuildingDetailPage.module.css";
import { IconArrowLeft } from "@tabler/icons-react";
import { apiarea } from "../../library/axios";
import { API_ROUTE } from "../../const/apiRouter";

interface RecordItem {
  id: number;
  zone: string;
  zone_name: string;
  building_name: string;
  building_type: string;
  amenity: string;
  amenity_type: string;
  direction?: string;
  status?: string;
  bedroom?: number | string;
  price?: number | string;
  port?: number;
}

interface ImageItem {
  image_url: string; // Điều chỉnh theo cấu trúc thực tế của dữ liệu hình ảnh
}

interface CustomerDetailsProps {
  building: string;
  projectId: string;
}

export default function CustomerDetails({ building, projectId }: CustomerDetailsProps) {
  const [buildingData, setBuildingData] = useState<RecordItem[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [port: number]: string[] }>({});
  const [selectedImagePerPort, setSelectedImagePerPort] = useState<{ [port: number]: string }>({});
  const buildingName = decodeURIComponent(building);

  useEffect(() => {
    const dataStr = localStorage.getItem("building_data");

    if (!dataStr) {
      console.warn("⚠️ Không tìm thấy building_data trong localStorage");
      return;
    }

    try {
      const parsed = JSON.parse(dataStr);
      const dataArray: RecordItem[] = Array.isArray(parsed)
        ? parsed
        : typeof parsed === "object" && parsed !== null
        ? [parsed]
        : [];

      if (dataArray.length === 0) {
        console.error("❌ Dữ liệu building_data không hợp lệ:", parsed);
        return;
      }

      const filtered = dataArray.filter(
        (item: RecordItem) => item.building_name === buildingName
      );
      setBuildingData(filtered);

      // Gọi ảnh cho từng port (không trùng lặp)
      const uniquePorts = [...new Set(filtered.map((item) => item.port).filter(Boolean))];

      uniquePorts.forEach(async (port) => {
        try {
          const res = await apiarea.get(API_ROUTE.GET_DETAIL_HOME, {
            params: { port, lang: "vi" },
          });

          const images = res.data?.items as ImageItem[] || [];
          const urls = images.map((img: ImageItem) => img.image_url);

          if (urls.length > 0) {
            setImageUrls((prev) => ({
              ...prev,
              [port!]: urls,
            }));
            setSelectedImagePerPort((prev) => ({
              ...prev,
              [port!]: urls[0], // đặt ảnh đầu tiên là ảnh chính
            }));
          }
        } catch (error) {
          console.error(`❌ Lỗi khi fetch ảnh cho port ${port}:`, error);
        }
      });
    } catch (error) {
      console.error("❌ Lỗi khi parse building_data từ localStorage:", error);
    }
  }, [buildingName]);

  const isValid = (value: string | number | undefined | null): boolean => {
    return (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== "NaN" &&
      !(typeof value === "number" && isNaN(value))
    );
  };

  if (buildingData.length === 0) {
    return <div style={{ padding: "1rem" }}>❌ Không tìm thấy tòa nhà: {buildingName}</div>;
  }

  return (
    <div className={styles.border}>
      {buildingData.map((item, index) => {
        const port = item.port!;
        const thumbnails = imageUrls[port] || [];
        const selectedImage = selectedImagePerPort[port];

        return (
          <div className={styles.container} key={index}>
            <h1 style={{ marginBottom: "1rem" }}>
              Chi tiết các căn thuộc: {buildingName}
            </h1>

            <div className={styles.box}>
              <div className={styles.details}>
                <ul style={{ lineHeight: 1.8 }}>
                  {isValid(item.zone_name) && (
                    <li><strong>Tên phân khu:</strong> {item.zone_name}</li>
                  )}
                  {isValid(item.building_type) && (
                    <li><strong>Loại toà nhà:</strong> {item.building_type}</li>
                  )}
                  {isValid(item.amenity_type) && (
                    <li><strong>Loại tiện ích:</strong> {item.amenity_type}</li>
                  )}
                  {isValid(item.direction) && (
                    <li><strong>Hướng:</strong> {item.direction}</li>
                  )}
                  {isValid(item.bedroom) && (
                    <li><strong>Số phòng ngủ:</strong> {item.bedroom}</li>
                  )}
                  {isValid(item.price) && (
                    <li><strong>Giá:</strong> {Number(item.price).toLocaleString()} VNĐ</li>
                  )}
                  {isValid(item.status) && (
                    <li><strong>Trạng thái:</strong> {item.status}</li>
                  )}
                 
                </ul>
              </div>

              {/* Hình ảnh chính và thumbnails */}
              <div className={styles.imageGallery}>
                <div className={styles.mainImage}>
                  <Image
                    src={selectedImage || "/THUMBNAIL/4-MH-CAO-TANG.jpg"}
                    alt={item.building_name}
                    width={400}
                    height={300}
                    className={styles.image}
                  />
                </div>

                {thumbnails.length > 1 && (
                  <div className={styles.thumbnailContainer}>
                    {thumbnails.map((url, idx) => (
                      <Image
                        key={idx}
                        src={url}
                        alt={`Hình ${idx + 1}`}
                        width={80}
                        height={60}
                        className={`${styles.thumbnail} ${
                          selectedImage === url ? styles.active : ""
                        }`}
                        onClick={() =>
                          setSelectedImagePerPort((prev) => ({
                            ...prev,
                            [port]: url,
                          }))
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.backButtonContainer}>
              <Link
                href={`/chi-tiet-quan-ly?pageId=${encodeURIComponent(projectId)}`}
                className={styles.backButton}
              >
                <IconArrowLeft size={24} />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
