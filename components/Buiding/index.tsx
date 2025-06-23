'use client';

import React from "react";
import { useParams } from "next/navigation";

import { SideNavigation } from "./detailBuling/index";
import styles from "./App.module.css";

const zoneImages: Record<string, string> = {
  "Phân Khu 1": "/assets/Project/phan_khu_1.png",
  "Phân Khu 2": "/assets/Project/phan_khu_2.png",
  "Phân Khu 3": "/assets/Project/phan_khu_3.png",
   "Phân Khu 4": "/assets/Project/phan_khu_4.png",
    "Phân Khu 5": "/assets/Project/phan_khu_5.png",
     "Phân Khu 6": "/assets/Project/phan_khu_6.png",
      "Phân Khu 7": "/assets/Project/phan_khu_7.png",
       "Phân Khu 8": "/assets/Project/phan_khu_8.png",
        "Phân Khu 9": "/assets/Project/phan_khu_9.png",
  // Thêm phân khu và ảnh tương ứng
};

export default function App() {
  const params = useParams();
  const rawZoneParam = params && typeof params.zone === "string" ? params.zone : "";
  const zoneParam = decodeURIComponent(rawZoneParam);

  const imageUrl = zoneImages[zoneParam] || null;

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        {imageUrl && (
          <img
            className={styles.image}
            src={imageUrl}
            alt={`Hình ảnh ${zoneParam}`}
          />
        )}
         <SideNavigation  className={styles.sideNavOverlay} zoneParam={zoneParam} />
      </div>

    </div>
  );
}
