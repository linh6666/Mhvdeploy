import React from "react";
import { Card, Text } from "@mantine/core";
import styles from "./ApartmentCard.module.css";

export interface ApartmentProps {
  id: string;
  floor: number;
  bedrooms: number;
  bathrooms: number;
  price: number | string;
  status: "available" | "deposit" | "sold";
}

const formatPrice = (price: number | string) => {
  if (typeof price === "number" && price > 1) {
    return price.toLocaleString();
  }
  return price;
};

const ApartmentCard: React.FC<ApartmentProps> = ({
  id,
  bedrooms,
  bathrooms,
  price,
  status,
}) => {
  const statusClass = styles[status] || styles.unknown;

  return (
    <Card className={`${styles.card} ${statusClass}`}>
      <div className={styles.content}>
        <Text size="lg" fw={500}>
          {id}
        </Text>
        <Text size="sm">
          Bedroom: {bedrooms} | Bathroom: {bathrooms}
        </Text>
        <Text size="sm">Price: {formatPrice(price)}</Text>
        <Text size="sm" style={{ textTransform: "capitalize" }}>
          Status: {status}
        </Text>
      </div>
    </Card>
  );
};

export default ApartmentCard;