'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { IconChevronsLeft } from "@tabler/icons-react";
import styles from "./HouseType.module.css";
import { apiarea } from "../../../library/axios";
import { API_ROUTE } from "../../../const/apiRouter";
import Image from "next/image";

interface BuildingDetail {
  id?: string;
  building_name?: string;
  building_type?: string;
  zone?: string;
  zone_name?: string;
  amenity?: string;
  amenity_type?: string;
  [key: string]: any;
}

interface HouseTypePageProps {
  zoneParam: string;
  onSelectType?: (type: string) => void;
  className?: string; // ✅ Thêm prop className vào đây
}

const HouseTypePage: React.FC<HouseTypePageProps> = ({ zoneParam, onSelectType, className }) => {
  const params = useParams();
  const router = useRouter();

  const typeRaw = params?.type ?? "";
  const typeFromURL = decodeURIComponent(Array.isArray(typeRaw) ? typeRaw[0] : typeRaw);

  const [buildingDetails, setBuildingDetails] = useState<BuildingDetail[]>([]);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>(typeFromURL);
  const [houseDetail, setHouseDetail] = useState<any>(null);

  const handleGoBack = () => {
    router.push(`/building-type/${encodeURIComponent(zoneParam)}`);
  };

  const fetchHouseDetail = async (detail: BuildingDetail) => {
    const url = API_ROUTE.GET_HOUSE_DETAIL(
      detail.zone || "",
      detail.zone_name || "",
      detail.building_type || "",
      detail.building_name || ""
    );

    try {
      const res = await apiarea.get(url);
      console.log("Chi tiết nhà:", res.data);
      setHouseDetail(res.data);
    } catch (err) {
      console.error("Lỗi chi tiết nhà:", err);
    }
  };

  const handleSelectType = (selected: string) => {
    setSelectedType(selected);
    onSelectType?.(selected);

    const detail = buildingDetails.find(
      (d) => (d.building_name?.trim() || "Không rõ loại nhà") === selected
    );
    if (detail) {
      fetchHouseDetail(detail);
    }
  };

  function groupByBuildingName(details: BuildingDetail[]): BuildingDetail[] {
    const uniqueMap = new Map<string, BuildingDetail>();

    for (const detail of details) {
      const key = detail.building_name?.trim() || "Không rõ loại nhà";
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, detail);
      }
    }

    return Array.from(uniqueMap.values());
  }

  useEffect(() => {
    async function fetchDetail(zone: string, typeName: string) {
      if (!zone || !typeName) {
        setDetailError("Thiếu tham số phân khu hoặc loại nhà");
        setBuildingDetails([]);
        return;
      }

      try {
        setDetailLoading(true);
        setDetailError("");
        setBuildingDetails([]);

        const apiUrl = API_ROUTE.GET_AREA_DETAIL_BY_TYPE(zone, typeName);
        const res = await apiarea.get(apiUrl);

        if (res.data.records && res.data.records.length > 0) {
          const groupedDetails = groupByBuildingName(res.data.records);
          setBuildingDetails(groupedDetails);
        } else {
          setDetailError("Không tìm thấy dữ liệu cho loại nhà này");
          setBuildingDetails([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải chi tiết:", error);
        setDetailError("Lỗi tải chi tiết");
        setBuildingDetails([]);
      } finally {
        setDetailLoading(false);
      }
    }

    if (typeFromURL) {
      fetchDetail(zoneParam, typeFromURL);
    } else {
      setBuildingDetails([]);
      setDetailError("");
    }
  }, [zoneParam, typeFromURL]);

  return (
    <div className={`${styles.container} ${className || ""}`} >
      <div className={styles.logoWrapper}>
        <Image src="/logo.png" alt="Eco Retreat Logo" className={styles.logoImage} />
      </div>

      {detailLoading ? (
        <p>Đang tải chi tiết...</p>
      ) : detailError ? (
        <p style={{ color: "red" }}>{detailError}</p>
      ) : buildingDetails.length === 0 && typeFromURL ? (
        <p>Không có loại nhà nào</p>
      ) : (
        <>
          <h2 className={styles.mainHeading}>{typeFromURL || "Chọn loại nhà"}</h2>
          <div className={styles.scrollContainer}>
            <div className={styles.buttonGroup}>
              {buildingDetails.map((detail) => {
                const buildingType = detail.building_name?.trim() || "Không rõ loại nhà";
                const isActive = selectedType === buildingType;

                return (
                  <Button
                    key={detail.id || buildingType}
                    className={`${styles.button} ${isActive ? styles.active : ""}`}
                    title={detail.building_name}
                    onClick={() => handleSelectType(buildingType)}
                  >
                    {buildingType}
                  </Button>
                );
              })}
            </div>
          </div>
        </>
      )}

      <div className={styles.bottomButtons}>
        <Button variant="filled" className={styles.bottomButton} onClick={handleGoBack}>
          <IconChevronsLeft size={20} />
        </Button>
      </div>
    </div>
  );
};

export default HouseTypePage;




