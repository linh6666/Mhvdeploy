'use client';

import React, { useState } from "react";
import { useParams } from "next/navigation";
import HouseTypePage from "./HouseType/index";
import styles from "./House.module.css";
import { slugify } from "../../library/slugify";
import Image from "next/image";
import type { BuildingDetail } from "./HouseType/index"; // Đảm bảo export ở file HouseType

interface AppProps {
  projectId: string;
}

export default function App({ projectId }: AppProps) {
  const params = useParams();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<BuildingDetail | null>(null);

  if (!params) return <div>Đang tải...</div>;

  const rawZoneParam = typeof params.zone === "string" ? params.zone : "";
  const rawTypeParam = typeof params.type === "string" ? params.type : "";

  const zoneParam = decodeURIComponent(rawZoneParam);
  const typeParamFromURL = decodeURIComponent(rawTypeParam);

  const zoneSlug = slugify(zoneParam);
  const displayType = selectedType || typeParamFromURL || zoneSlug;
  const typeSlug = slugify(displayType);

  const fallbackImage = `/assets/giaodien/${zoneSlug}/${typeSlug}.png`;

  const handleSelectType = (type: string, detail: BuildingDetail) => {
    setSelectedType(type);
    setSelectedDetail(detail); // lưu lại detail để lấy image_url
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {selectedDetail?.image_url ? (
          <Image
            className={styles.image}
            src={selectedDetail.image_url}
            alt={`Hình ảnh ${zoneParam} - ${displayType}`}
            width={1000}
            height={690}
            unoptimized // Bắt buộc nếu ảnh từ external URL mà không cấu hình trong next.config.js
          />
        ) : (
          <Image
            className={styles.image}
            src={fallbackImage}
            width={1000}
            height={690}
            alt={`Hình ảnh ${zoneParam} - ${displayType}`}
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              target.onerror = null;
              target.src = `/assets/giaodien/${zoneSlug}/${zoneSlug}.png`;
            }}
          />
        )}

        <HouseTypePage
          projectId={projectId}
          className={styles.sideNavOverlay}
          zoneParam={zoneParam}
          onSelectType={handleSelectType}
        />
      </div>
    </div>
  );
}
