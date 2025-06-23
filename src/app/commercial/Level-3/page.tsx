"use client";
import { Image, SimpleGrid, Text, Stack } from "@mantine/core";
import { IconDiamonds } from "@tabler/icons-react";
import React from "react";
import Link from "next/link";

import styles from "./Level-3.module.css";

// Component hiển thị item tầng trong danh sách
const KeyAreaItem = ({ level, link }: { level: number; link: string }) => {
  const isCurrentLevel = level === 3; // Kiểm tra nếu là tầng 16

  return (
    <Link
      href={link}
      className={styles.keyAreaItem}
      style={{ textDecoration: "none" }}
    >
      <div className={styles.diamondShape}></div>
      <Text
        className={`${styles.keyAreaItemText} ${
          isCurrentLevel ? styles.currentLevel : ""
        }`}
      >
        Level {level}
      </Text>
    </Link>
  );
};


export default function ResidentialPage() {
  const levels = [
    { level: 3, link: "/commercial/Level-3" },
    { level: 2, link: "/commercial/Level-2" },
    { level: 1, link: "/commercial/Level-1" },
  ];

  return (
    <SimpleGrid cols={3} spacing="xl" className={styles.simpleGrid}>
      {/* Cột trái: hình ảnh tổng có polygon tương tác */}
      <div className={styles.imageWrapper}>
        <Image
          src="/assets/images/Levelimg/level-03.png"
          alt="Model"
          className={styles.image}
        />

        {/* SVG đè lên hình */}
        {/* <svg viewBox="0 0 900 500" className={styles.svgOverlay}>
          <polygon
            id="apt-path-accurate"
            className={styles.floorPolygon}
            points="
      60,30   120,20   180,20   240,20   300,20   360,20   420,20   480,20
      540,20  600,20   660,20   720,20   780,20   840,30   870,60
      870,180  870,320
      860,440   820,470   740,470   720,450   660,450   640,470   580,470
      560,450   500,450   480,470   420,470   400,450   340,450   320,470
      260,470   240,450   180,450   160,470   80,470   40,440   30,420
      30,320  30,180
      40,60
    "
          />
        </svg> */}

        {/* Ảnh nổi bật khi hover vào polygon */}
        {/* <Image
          src="/assets/images/Levelimg/level-20-21-hover.png"
          alt="Hover Highlight"
          className={styles.hoverImage}
        /> */}
      </div>

      {/* Cột giữa: Status */}
      <div className={styles.keyAreass}>
        <div>
          <Text fw={500} className={styles.keyAreasTitle}>
            Status
          </Text>
          <div>
            <div className={`${styles.statusContent} ${styles.available}`}>
              Available
            </div>
            <div className={`${styles.statusContent} ${styles.interested}`}>
              Interested
            </div>
            <div className={`${styles.statusContent} ${styles.deposit}`}>
              Deposit
            </div>
            <div className={`${styles.statusContent} ${styles.sold}`}>Sold</div>
          </div>
        </div>
        <div>
          <Text fw={500} className={styles.keyAreasTitle}>
            Key
          </Text>
          <div>
            <div className={`${styles.statusContent} ${styles.bed1}`}>
              1 Bedroom
            </div>
            <div className={`${styles.statusContent} ${styles.bed2}`}>
              2 Bedrooms
            </div>
            <div className={`${styles.statusContent} ${styles.bed3}`}>
              3 Bedrooms
            </div>
          </div>
        </div>
      </div>

      {/* Cột phải: danh sách tầng */}
      <Stack className={styles.keyAreas}>
        <Text fw={500} className={styles.keyAreasTitle}>
          Level
        </Text>
        <div className={styles.keyAreaList}>
          {levels.map(({ level, link }) => (
            <KeyAreaItem key={level} level={level} link={link} />
          ))}
        </div>
      </Stack>
    </SimpleGrid>
  );
}
