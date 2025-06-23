"use client";
import {
  IconChevronsRight,
  IconX,
} from "@tabler/icons-react"; // ✅ Icon từ Tabler
import { Image, SimpleGrid, Text, Stack } from "@mantine/core";
import React, { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import styles from "./detailproject.module.css";
import DrawerRight from "../DrawerRight/DrawerRight"; 

export default function ModelInteractive() {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // ✅ Trạng thái Drawer
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const imageHeight = e.currentTarget.getBoundingClientRect().height;
    const mouseY = e.clientY - e.currentTarget.getBoundingClientRect().top;
    setHoveredFloor(mouseY < imageHeight * 0.5 ? 1 : 2);
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const imageHeight = e.currentTarget.getBoundingClientRect().height;
    const touchY = e.touches[0].clientY - e.currentTarget.getBoundingClientRect().top;
    setHoveredFloor(touchY < imageHeight * 0.5 ? 1 : 2);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setHoveredFloor(null);
  };

  const handleMouseEnter = (floor: number) => {
    if (isMobile) return;
    setHoveredFloor(floor);
  };

  return (
    <>
      {/* ✅ Nút mở Drawer bên phải */}
      {!isDrawerOpen && (
        <div
          className={styles.drawerToggle}
          onClick={() => setIsDrawerOpen(true)}
        >
          <IconChevronsRight size={24} color="white" />
        </div>
      )}

      {/* ✅ Drawer trượt vào từ bên phải */}
      {isDrawerOpen && (
        <div className={styles.drawer}>
          {/* Nút đóng Drawer */}
          <div
            className={styles.drawerClose}
            onClick={() => setIsDrawerOpen(false)}
          >
            <IconX size={20} color="white" />
          </div>

          {/* Nội dung Drawer (ví dụ: key areas) */}
          <div className={styles.openDrawer}>
            <DrawerRight />
          </div>
        </div>
      )}

      {/* ✅ Giao diện gốc: hình ảnh & key area (desktop) */}
      <SimpleGrid
        cols={2}
        spacing="xl"
        className={`${styles.simpleGrid} ${isDrawerOpen ? styles.shiftLeft : ''}`}
      >
        <div
          className={styles.imageWrapper}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouch}
          onTouchEnd={() => setHoveredFloor(null)}
        >
          <Image
            src={
              isMobile
                ? "/assets/images/INTERACTIVE/model_color.png"
                : "/assets/images/INTERACTIVE/model_bw.png"
            }
            alt="Model"
            className={styles.image}
          />

          {/* Overlay tầng 1 */}
          <div
            className={`${styles.floorOverlay} ${
              hoveredFloor === 1 && !isMobile ? styles.show : ""
            }`}
          >
            <Image src="/assets/images/INTERACTIVE/recidential.png" alt="Residential" />
            <Text className={`${styles.overlayText} ${styles.overlayText1}`}>Residential</Text>
          </div>

          {/* Overlay tầng 2 */}
          <div
            className={`${styles.floorOverlay} ${
              hoveredFloor === 2 && !isMobile ? styles.show : ""
            }`}
          >
            <Image src="/assets/images/INTERACTIVE/commercial.png" alt="Commercial" />
            <Text className={`${styles.overlayText} ${styles.overlayText2}`}>Commercial</Text>
          </div>
        </div>

        {/* Giao diện desktop vẫn giữ nguyên */}
        <Stack className={styles.keyAreas}>
          <Text fw={500} className={styles.keyAreasTitle}>
            Key Areas
          </Text>
          <Link
            href="/residential"
            className={styles.keyAreaItem}
            style={{ textDecoration: "none" }}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
            onTouchEnd={() => setHoveredFloor(null)}
          >
            <div className={styles.diamondShape}></div>
            <Text className={styles.keyAreaItemText}>Residential</Text>
          </Link>
          <Link
            href="/commercial"
            className={styles.keyAreaItem}
            style={{ textDecoration: "none" }}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
            onTouchEnd={() => setHoveredFloor(null)}
          >
            <div className={styles.diamondShape}></div>
            <Text className={styles.keyAreaItemText}>Commercial</Text>
          </Link>
        </Stack>
      </SimpleGrid>
    </>
  );
}