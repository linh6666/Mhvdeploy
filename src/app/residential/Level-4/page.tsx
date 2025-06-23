"use client";
import { Image, SimpleGrid, Text, Stack } from "@mantine/core";
import { IconDiamonds } from "@tabler/icons-react";
import React from "react";
import Link from "next/link";

import styles from "./Level-4.module.css";

// Component hiển thị item tầng trong danh sách
const KeyAreaItem = ({ level, link }: { level: number; link: string }) => {
  const isCurrentLevel = level === 4; // Kiểm tra nếu là tầng 16

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
    { level: 21, link: "/residential/Level-21" },
    { level: 20, link: "/residential/Level-20" },
    { level: 19, link: "/residential/Level-19" },
    { level: 18, link: "/residential/Level-18" },
    { level: 17, link: "/residential/Level-17" },
    { level: 16, link: "/residential/Level-16" },
    { level: 15, link: "/residential/Level-15" },
    { level: 14, link: "/residential/Level-14" },
    { level: 13, link: "/residential/Level-13" },
    { level: 12, link: "/residential/Level-12" },
    { level: 11, link: "/residential/Level-11" },
    { level: 10, link: "/residential/Level-10" },
    { level: 9, link: "/residential/Level-9" },
    { level: 8, link: "/residential/Level-8" },
    { level: 7, link: "/residential/Level-7" },
    { level: 6, link: "/residential/Level-6" },
    { level: 5, link: "/residential/Level-5" },
    { level: 4, link: "/residential/Level-4" },
  ];

  return (
    <SimpleGrid cols={3} spacing="xl" className={styles.simpleGrid}>
      {/* Cột trái: hình ảnh tổng có polygon tương tác */}
      <div className={styles.imageWrapper}>
        <Image
          src="/assets/images/Levelimg/level-04.png"
          alt="Model"
          className={styles.image}
        />
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="491.678"
  height="253.96"
  viewBox="0 0 491.678 253.96"
  className={styles.svgContainer}
>
  <path
    id="Path_443"
    data-name="Path 443"
    d="M20150.461-2839.453v207.245h-274.289v45.716h-216.389V-2817.1h98.543v32.509h247.881v-54.859Z"
    transform="translate(-19659.283 2839.953)"
    fill="#84a7a1"
    stroke="#294b61"
    strokeWidth="1"
    opacity="0.6"
    style={{ mixBlendMode: 'multiply', isolation: 'isolate' }}
  />
</svg>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="711.121"
  height="257.008"
  viewBox="0 0 711.121 257.008"
  className={styles.svgContainer1}
>
  <path
    id="Path_441"
    data-name="Path 441"
    d="M19440.34-2996.917v55.874h219.439v71.114h99.559v85.336h247.881v-52.827h143.242V-3040.6h-143.242v43.685Z"
    transform="translate(-19439.84 3041.102)"
    fill="#f4ddb3"
    stroke="#294b61"
    strokeWidth="1"
    opacity="0.6"
    style={{ mixBlendMode: 'multiply', isolation: 'isolate' }}
  />
</svg>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="361.646"
  height="408.377"
  viewBox="0 0 361.646 408.377"
  className={styles.svgContainer2}
>
  <path
    id="Path_440"
    data-name="Path 440"
    d="M19317.414-2803.321v16.7h18.287v197.085h-256.008v-407.377h360.646v55.875H19220.9v83.3h22.35v54.417Z"
    transform="translate(-19079.193 2997.417)"
    fill="#f4ddb3"
    stroke="#294b61"
    strokeWidth="1"
    opacity="0.6"
    style={{ mixBlendMode: 'multiply', isolation: 'isolate' }}
  />
</svg>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="328.121"
  height="231.61"
  viewBox="0 0 328.121 231.61"
  className={styles.svgContainer3}
>
  <path
    id="Path_442"
    data-name="Path 442"
    d="M19658.764-2803.321v215.813h-327.121v-197.085h14.223v-33.525h38.6v33.525h57.906v-18.727Z"
    transform="translate(-19331.143 2818.618)"
    fill="#f4ddb3"
    stroke="#294b61"
    strokeWidth="1"
    opacity="0.6"
    style={{ mixBlendMode: 'multiply', isolation: 'isolate' }}
  />
</svg>



      
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
