"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./BuildingDetailPage.module.css";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconChevronLeft, IconChevronRight, IconHeart } from "@tabler/icons-react";
import { apiarea } from "../../library/axios";
import { API_ROUTE } from "../../const/apiRouter";
import ContactModal from "./ModalContact/index";

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
  description: string;
  port?: number;
}

interface ImageItem {
  image_url: string;
}

interface CustomerDetailsProps {
  building: string;
  projectId: string;
}

export default function CustomerDetails({ building }: CustomerDetailsProps) {
  const [buildingData, setBuildingData] = useState<RecordItem[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [port: number]: string[] }>({});
  const [selectedImagePerPort, setSelectedImagePerPort] = useState<{ [port: number]: string }>({});
  const buildingName = decodeURIComponent(building);
  const [contactModalOpen, setContactModalOpen] = useState(false);
   const [isHeartActive, setIsHeartActive] = useState(false); // 🆕
  const router = useRouter();

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

      const uniquePorts = [...new Set(filtered.map((item) => item.port).filter(Boolean))];

      uniquePorts.forEach(async (port) => {
        try {
          const res = await apiarea.get(API_ROUTE.GET_DETAIL_HOME, {
            params: { port, lang: "vi" },
          });

          const images = (res.data?.items as ImageItem[]) || [];
          const urls = images.map((img: ImageItem) => img.image_url);

          if (urls.length > 0) {
            setImageUrls((prev) => ({
              ...prev,
              [port!]: urls,
            }));
            setSelectedImagePerPort((prev) => ({
              ...prev,
              [port!]: urls[0],
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

  const handlePrev = (port: number) => {
    const thumbnailsForPort = imageUrls[port] || [];
    if (thumbnailsForPort.length === 0) return;

    const current = selectedImagePerPort[port];
    const currentIndex = thumbnailsForPort.indexOf(current);
    const prevIndex =
      currentIndex > 0 ? currentIndex - 1 : thumbnailsForPort.length - 1;

    setSelectedImagePerPort((prev) => ({
      ...prev,
      [port]: thumbnailsForPort[prevIndex],
    }));
  };

  const handleNext = (port: number) => {
    const thumbnailsForPort = imageUrls[port] || [];
    if (thumbnailsForPort.length === 0) return;

    const current = selectedImagePerPort[port];
    const currentIndex = thumbnailsForPort.indexOf(current);
    const nextIndex =
      currentIndex >= 0 && currentIndex < thumbnailsForPort.length - 1
        ? currentIndex + 1
        : 0;

    setSelectedImagePerPort((prev) => ({
      ...prev,
      [port]: thumbnailsForPort[nextIndex],
    }));
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
            <div className={styles.header}>
  <h1 style={{ marginBottom: "1rem" }}>
              <strong> Chi tiết căn: {buildingName}</strong>
            </h1>
   <IconHeart
                onClick={() => setIsHeartActive((prev) => !prev)} // Đổi trạng thái khi nhấp
                style={{ color: isHeartActive ? 'red' : 'black' }} // Thay đổi màu sắc dựa trên trạng thái
              />

            </div>
          

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
                    <li>
                      <strong>Trạng thái:</strong>{" "}
                      <span
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
                      </span>
                    </li>
                  )}
                  {isValid(item.description) && (
                    <li>
                      <strong>Ghi chú:</strong>{" "}
                      <span style={{ whiteSpace: "pre-line", display: "inline-block" }}>
                        {item.description}
                      </span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Hình ảnh chính */}
              <div className={styles.imageGallery}>
                <div className={styles.mainImageContainer}>
                  <button className={styles.navButton} onClick={() => handlePrev(port)}>
                    <IconChevronLeft size={24} />
                  </button>

                  <Image
                    src={selectedImage || "/THUMBNAIL/4-MH-CAO-TANG.jpg"}
                    alt={item.building_name}
                    width={400}
                    height={300}
                    className={styles.image}
                  />

                  <button className={styles.navButton} onClick={() => handleNext(port)}>
                    <IconChevronRight size={24} />
                  </button>
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

            {/* 🆕 Nút MORE INFO + nút Back */}
            <div className={styles.backButtonContainer}>
           <button
          className={styles.infoButton}
          onClick={() => setContactModalOpen(true)} // Mở modal
        >
          Liên Hệ
        </button>

              <button onClick={() => router.back()} className={styles.backButton}>
                <IconArrowLeft size={24} />
              </button>
            </div>
              <ContactModal
        opened={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
          </div>
        );
      })}
    </div>
  );
}
