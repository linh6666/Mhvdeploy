"use client";

import React from "react";


import { SideNavigation } from "./DetailUtilities/index";
import styles from "./App.module.css";
import Image from "next/image";
export default function App() {



  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Image
          className={styles.image}
          src="https://vietmodel.com.vn/api/v1/static/EcoRetreat/he_thong_tien_ich.png"
          alt="Eco Retreat Long An Aerial View"
            width={1000}
  height={690}
        />
            <SideNavigation className={styles.sideNavOverlay} />
      </div>


    </div>
  );
}
