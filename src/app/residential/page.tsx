"use client";
import { Image, SimpleGrid, Text, Stack } from "@mantine/core";
import { IconDiamonds } from "@tabler/icons-react";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import styles from "./ResidentialPage.module.css";

// Component hiển thị Overlay cho tầng
const FloorOverlay = ({
  level,
  img,
  hoveredFloor,
}: {
  level: number;
  img: string;
  hoveredFloor: number | null;
}) => {
  return (
    <div
      className={`${styles.floorOverlay} ${
        hoveredFloor === level ? styles.show : ""
      }`}
      style={{
        transition: "opacity 0.3s ease",
      }}
    >
      <Image src={img} alt={`level_${level}`} />
      <Text className={styles.overlayText}>Level {level}</Text>
    </div>
  );
};

// Component hiển thị item tầng trong danh sách
const KeyAreaItem = ({
  level,
  link,
  onHover,
}: {
  level: number;
  link: string;
  onHover: () => void;
}) => {
  return (
    <Link
      href={link}
      className={styles.keyAreaItem}
      onMouseEnter={onHover}
      onMouseLeave={() => onHover()}
      style={{ textDecoration: "none" }}
    >
       <div className={styles.diamondShape}></div>
      <Text className={styles.keyAreaItemText}>Level {level}</Text>
    </Link>
  );
};

export default function ResidentialPage() {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleMouseEnter = useCallback(
    (level: number) => {
      if (isMobile) return;
      setHoveredFloor(level);
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setHoveredFloor(null);
    }
  }, [isMobile]);

  const levels = [
    {
      level: 21,
      img: "/assets/images/Detailimg/level_21.png",
      link: "/residential/Level-21",
    },
    {
      level: 20,
      img: "/assets/images/Detailimg/level_20.png",
      link: "/residential/Level-20",
    },
    {
      level: 19,
      img: "/assets/images/Detailimg/level_19.png",
      link: "/residential/Level-19",
    },
    {
      level: 18,
      img: "/assets/images/Detailimg/level_18.png",
      link: "/residential/Level-18",
    },
    {
      level: 17,
      img: "/assets/images/Detailimg/level_17.png",
      link: "/residential/Level-17",
    },
    {
      level: 16,
      img: "/assets/images/Detailimg/level_16.png",
      link: "/residential/Level-16",
    },
    {
      level: 15,
      img: "/assets/images/Detailimg/level_15.png",
      link: "/residential/Level-15",
    },
    {
      level: 14,
      img: "/assets/images/Detailimg/level_14.png",
      link: "/residential/Level-14",
    },
    {
      level: 13,
      img: "/assets/images/Detailimg/level_13.png",
      link: "/residential/Level-13",
    },
    {
      level: 12,
      img: "/assets/images/Detailimg/level_12.png",
      link: "/residential/Level-12",
    },
    {
      level: 11,
      img: "/assets/images/Detailimg/level_11.png",
      link: "/residential/Level-11",
    },
    {
      level: 10,
      img: "/assets/images/Detailimg/level_10.png",
      link: "/residential/Level-10",
    },
    {
      level: 9,
      img: "/assets/images/Detailimg/level_9.png",
      link: "/residential/Level-9",
    },
    {
      level: 8,
      img: "/assets/images/Detailimg/level_8.png",
      link: "/residential/Level-8",
    },
    {
      level: 7,
      img: "/assets/images/Detailimg/level_7.png",
      link: "/residential/Level-7",
    },
    {
      level: 6,
      img: "/assets/images/Detailimg/level_6.png",
      link: "/residential/Level-6",
    },
    {
      level: 5,
      img: "/assets/images/Detailimg/level_5.png",
      link: "/residential/Level-5",
    },
    {
      level: 4,
      img: "/assets/images/Detailimg/level_4.png",
      link: "/residential/Level-4",
    },
  ];

  const hoveredLevelImg =
    levels.find((l) => l.level === hoveredFloor)?.img ?? null;

  return (
    <SimpleGrid cols={2} spacing="xl" className={styles.simpleGrid}>
      {/* Cột trái: phần hình ảnh tương tác */}
      <div className={styles.imageWrapper}>
        <Image
          src={
            hoveredLevelImg ||
            (isMobile
              ? "/assets/images/INTERACTIVE/model_color.png"
              : "/assets/images/INTERACTIVE/model_bw.png")
          }
          alt="Model"
          className={styles.image}
        />
        {levels.map(({ level, img }) => (
          <FloorOverlay
            key={level}
            level={level}
            img={img}
            hoveredFloor={hoveredFloor}
          />
        ))}
      </div>

      {/* Cột phải: danh sách tầng */}
      <Stack className={styles.keyAreas}>
        <Text fw={500} className={styles.keyAreasTitle}>
          Level
        </Text>
        <div
          className={styles.keyAreaList}
          onMouseLeave={handleMouseLeave} // ✅ Thêm dòng này để mất hover khi rời chuột
        >
          {levels.map(({ level, link }) => (
            <KeyAreaItem
              key={level}
              level={level}
              link={link}
              onHover={() => handleMouseEnter(level)}
            />
          ))}
        </div>
      </Stack>
    </SimpleGrid>
  );
}
