import React from "react";
import { Button } from "@mantine/core";
import { IconVideo } from "@tabler/icons-react";
import styles from "./ApartmentCard.module.css"; // ✅ Import module CSS

interface ApartmentCardProps {
  aptNo: string;
  status: string;
  statusColor: "primary" | "secondary" | "success" | "warning" | "danger";
  bedrooms: number;
  bathrooms: number;
  aspect: string;
  description: string;
  imageUrl: string;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({
  aptNo,
  status,
  statusColor,
  bedrooms,
  bathrooms,
  aspect,
  description,
  imageUrl,
}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardWrapper}>
        {/* Image section on mobile (top) */}
        <div className={styles.mobileImageWrapper}>
          <img src={imageUrl} alt={`Apartment ${aptNo}`} className={styles.imageMobile} />
          <Button variant="default" size="xs" radius="xl" className={styles.videoButton}>
            <IconVideo size={20} />
          </Button>
        </div>

        {/* Left section - Details */}
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
            <p className={styles.descriptionText}>
              {description.length > 150 && typeof window !== "undefined" && window.innerWidth < 768
                ? `${description.substring(0, 150)}...`
                : description}
            </p>
          </div>
        </div>

        {/* Right section - Image (desktop only) */}
        <div className={styles.desktopImageWrapper}>
          <img src={imageUrl} alt={`Apartment ${aptNo}`} className={styles.imageDesktop} />
          <Button variant="default" size="xs" radius="xl" className={styles.videoButton}>
            <IconVideo size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
