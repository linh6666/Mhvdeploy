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
          src="/assets/giaodien/chung/he_thong_tien_ich.jpg"
          alt="Eco Retreat Long An Aerial View"
        />
            <SideNavigation className={styles.sideNavOverlay} />
      </div>


    </div>
  );
}
