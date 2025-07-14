'use client';

import React from "react";
import { Button } from "@mantine/core";
import { IconVideo } from "@tabler/icons-react";
import Image from "next/image";
import styles from "./ApartmentCard.module.css";

interface ApartmentCardProps {
  aptNo: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  aspect: string;
  description: string;
  imageUrl: string;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  aptNo,
  status,
  bedrooms,
  bathrooms,
  aspect,
  description,
  imageUrl,
}) => {
  // ✅ Xử lý rút gọn mô tả khi trên mobile
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const shortDescription =
    description.length > 150 && isMobile
      ? `${description.substring(0, 150)}...`
      : description;

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardWrapper}>
        {/* ✅ Mobile image section */}
        <div className={styles.mobileImageWrapper}>
          <Image
            src={imageUrl}
            alt={`Apartment ${aptNo}`}
            width={400}
            height={300}
            className={styles.imageMobile}
          />
          <Button variant="default" size="xs" radius="xl" className={styles.videoButton}>
            <IconVideo size={20} />
          </Button>
        </div>

        {/* ✅ Apartment details */}
        <div className={styles.details}>
          <div className={styles.topInfo}>
            <div className={styles.infoBlock}>
              <span className={styles.label}>APT No.</span>
              <div className={styles.aptNumber}>{aptNo}</div>
            </div>

            <div className={styles.infoBlock}>
              <span className={styles.label}>Status:</span>
              <div className={styles.status}>{status}</div>
            </div>
          </div>

          <div className={styles.roomInfo}>
            <div className={styles.roomBlock}>
              <span className={styles.label}>Bedrooms:</span>
              <div className={styles.rotatedBox}>
                <span className={styles.rotateBack}>{bedrooms}</span>
              </div>
            </div>

            <div className={styles.roomBlock}>
              <span className={styles.label}>Bathrooms:</span>
              <div className={styles.rotatedBox}>
                <span className={styles.rotateBack}>{bathrooms}</span>
              </div>
            </div>

            <div className={styles.roomBlock}>
              <span className={styles.label}>Aspect:</span>
              <div className={styles.rotatedBox}>
                <span className={styles.rotateBack}>{aspect}</span>
              </div>
            </div>
          </div>

          <div className={styles.descriptionBlock}>
            <span className={styles.label}>Describe:</span>
            <p className={styles.descriptionText}>{shortDescription}</p>
          </div>
        </div>

        {/* ✅ Desktop image section */}
        <div className={styles.desktopImageWrapper}>
          <Image
            src={imageUrl}
            alt={`Apartment ${aptNo}`}
            width={400}
            height={300}
            className={styles.imageDesktop}
          />
          <Button variant="default" size="xs" radius="xl" className={styles.videoButton}>
            <IconVideo size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;

