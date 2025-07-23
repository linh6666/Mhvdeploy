"use client";

import React from "react";
import { SideNavigation } from "./SideArea/index";
import styles from "./App.module.css";
import Image from "next/image";

// 🟦 Khai báo props cho component
interface AppProps {
  projectId: string;
}

export default function App({ projectId }: AppProps) {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Image
          className={styles.image}
          src="https://vietmodel.com.vn/api/v1/static/EcoRetreat/pk.png"
          alt="Phân Khu"
          width={1000}
          height={690}
        />
        {/* 🟦 Truyền projectId sang SideNavigation */}
        <SideNavigation projectId={projectId} className={styles.sideNavOverlay} />
      </div>
    </div>
  );
}
