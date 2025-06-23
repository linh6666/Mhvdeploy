"use client";
import { Image, SimpleGrid, Text, Stack } from "@mantine/core";
import { IconDiamonds } from "@tabler/icons-react";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import styles from "./commercial.module.css";

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
      level: 3,
      img: "/assets/images/Detailimg/level_3.png",
      link: "/commercial/Level-3",
    },
    {
      level: 2,
      img: "/assets/images/Detailimg/level_2.png",
      link: "/commercial/Level-2",
    },
    {
      level: 1,
      img: "/assets/images/Detailimg/level_1.png",
      link: "/commercial/Level-1",
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
