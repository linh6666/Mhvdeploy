"use client";

import React from "react";


import { SideNavigation } from "./EffecrMenu/index";
import styles from "./DetailEffect.module.css";
import Image from "next/image";
export default function App() {



  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Image
          className={styles.image}
          src="/assets/giaodien/chung/phan_khu.png"
          alt="Eco Retreat Long An Aerial View"
        />
          <SideNavigation className={styles.sideNavOverlay} />
      </div>

   
    </div>
  );
}
