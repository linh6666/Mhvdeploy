"use client";

import React, { useEffect, useState } from "react";
import { SideNavigation } from "./side-navigation/index";
import styles from "./App.module.css";
import { apiarea } from "../../library/axios";
import { API_ROUTE } from "../../const/apiRouter";
import { IconChevronsRight, IconX } from "@tabler/icons-react";
import DrawerRight from "../DrawerRight/DrawerRight";
import AppContainer from "../../common/AppContainer";
import Image from "next/image";

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const triggerSunsetEffect = async () => {
      try {
        const response = await apiarea.post(API_ROUTE.PUT_SUN_SET);
        console.log("✅ Gọi hiệu ứng SUNSET thành công:", response.data);
      } catch (error) {
        console.error("❌ Lỗi khi gọi hiệu ứng SUNSET:", error);
      }
    };

    triggerSunsetEffect();
  }, []);

  return (
 
<div className={styles.container}>
  

      {/* ✅ Drawer trượt vào từ bên trái */}
      {isDrawerOpen && (
        <div className={styles.drawer}>
          <div className={styles.drawerClose} onClick={() => setIsDrawerOpen(false)}>
            <IconX size={20} color="white" />
          </div>
          <div className={styles.openDrawer}>
            <DrawerRight />
          </div>
        </div>
      )}

      {/* ✅ Giao diện chính */}
      <div className={styles.mainContent}>
  {!isDrawerOpen && (
    <div className={styles.drawerToggle} onClick={() => setIsDrawerOpen(true)}>
      <IconChevronsRight size={24} color="white" />
    </div>
  )}
  <Image
    className={styles.image}
    src="/assets/Project/home.jpg"
    alt="Eco Retreat Long An Aerial View"
  />
  <SideNavigation className={styles.sideNavOverlay} />
</div>
    </div>

 
    
  );
}
