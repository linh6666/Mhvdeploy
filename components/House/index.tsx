'use client';

import React, { useState } from "react";
import { useParams } from "next/navigation";
import HouseTypePage from "./HouseType/index";
import styles from "./House.module.css";
import { slugify } from "../../library/slugify";
import Image from "next/image";

export default function App() {
  const params = useParams();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  if (!params) return <div>Đang tải...</div>;

  const rawZoneParam = typeof params.zone === "string" ? params.zone : "";
  const rawTypeParam = typeof params.type === "string" ? params.type : "";

  const zoneParam = decodeURIComponent(rawZoneParam);
  const typeParamFromURL = decodeURIComponent(rawTypeParam);

  const zoneSlug = slugify(zoneParam);
  const displayType = selectedType || typeParamFromURL || zoneSlug;
  const typeSlug = slugify(displayType);

  const imageUrl = `/assets/giaodien/${zoneSlug}/${typeSlug}.png`;

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Image
          className={styles.image}
          src={imageUrl}
          alt={`Hình ảnh ${zoneParam} - ${displayType}`}
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null;
            target.src = `/assets/giaodien/${zoneSlug}/${zoneSlug}.png`;
          }}
        />
         <HouseTypePage  className={styles.sideNavOverlay}  zoneParam={zoneParam} onSelectType={setSelectedType} />

      </div>
     
    </div>
  );
}
