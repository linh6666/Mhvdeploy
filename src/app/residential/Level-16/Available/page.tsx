import React from "react";
import { Card, Button, Image, Stack, Text, Grid } from "@mantine/core"; // Đảm bảo import Col từ Mantine
import { IconInfoCircle } from "@tabler/icons-react"; // Import đúng Icon từ Tabler
import Link from "next/link";
import styles from "./Available.module.css"; // Đảm bảo đường dẫn đúng

// Định nghĩa component KeyAreaItem
const KeyAreaItem = ({ level, link }: { level: number; link: string }) => {
  const isCurrentLevel = level === 16; // Kiểm tra nếu là tầng 16

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


function ApartmentCard() {
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
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.gridContainer}>
          {/* Left side */}
          <div className={styles.sectionLeft}>
            <div className="flex items-center gap-3">
              <div className={styles.iconBox}>
                <IconInfoCircle className="text-white text-xl" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className={styles.aptNo}>APT No.</h3>
                <div className={styles.aptNoBox}>1601</div>
              </div>
            </div>

            <div className={styles.statusRow}>
              <h3 className={styles.label}>Status:</h3>
              <div className={styles.statusBox}>Available</div>
            </div>

            <div className={styles.bedRow}>
              <h3 className={styles.label}>Bedrooms:</h3>
              <div className={styles.squareBox}>
                <span className={styles.squareText}>2</span>
              </div>
            </div>

            <div className={styles.bathRow}>
              <h3 className={styles.label}>Bathrooms:</h3>
              <div className={styles.squareBox}>
                <span className={styles.squareText}>2</span>
              </div>
            </div>

            <div className={styles.aspectRow}>
              <h3 className={styles.label}>Aspect:</h3>
              <div className={styles.squareBox}>
                <span className={styles.squareText}>SE</span>
              </div>
            </div>

            <div className={styles.descContainer}>
              <h3 className={styles.descLabel}>Describe:</h3>
              <p className={styles.descText}>
                The living room's largest piece of furniture is a big, white couch that sits behind
                the table and harmonizes well with the cream-colored walls, painted according to my
                mother's fondness for pastel hues...
              </p>
            </div>

            <div className={styles.buttonWrapper}>
  <Link href="/login">
    <Button color="blue" className={styles.customButton}>
      MORE INFO
    </Button>
  </Link>
</div>
          </div>

          {/* Right side */}
         <div className={styles.rightSection}>
  {/* Bọc hai ảnh trong một div */}
  <div className={styles.imageContainer}>
    <Image
      alt="Living room with large windows"
      className={styles.image}
      src="https://img.heroui.chat/image/places?w=800&h=500&u=apt-living"
    />
    <Image
      alt="Modern kitchen with windows"
      className={styles.image}
      src="https://img.heroui.chat/image/places?w=800&h=500&u=apt-kitchen"
    />
  </div>

  {/* Đặt Stack ngay bên cạnh */}
  <div className={styles.keyAreas}>
    <Text fw={500} className={styles.keyAreasTitle}>
      Level
    </Text>
    <div className={styles.keyAreaList}>
      {levels.map(({ level, link }) => (
        <KeyAreaItem key={level} level={level} link={link} />
      ))}
    </div>
  </div>
</div>
          
        </div>
      </Card>
    </div>
  );
}

export default ApartmentCard;
