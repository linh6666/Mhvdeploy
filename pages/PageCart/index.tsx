import React from "react";
import { Input, Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import ApartmentCard from "../PageCart/ApartmentCard/ApartmentCard";
import styles from "./Cart.module.css"; // ✅ Import module CSS
import Link from "next/link";

export default function App() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Search and filters section */}
        <div className={styles.searchFilters}>
          {/* Search Input */}
          <div className={styles.searchBox}>
            <Input
              placeholder="APT..."
              variant="unstyled"
              leftSection={<IconSearch size={18} />}
              classNames={{
                input: styles.searchInput,
              }}
            />
            <Button variant="light" color="gray" radius="md" className={styles.searchButton}>
              <IconSearch size={20} />
            </Button>
          </div>

          {/* Buttons */}
          <div className={styles.actionButtons}>
          <Link href="/compare" >
      <Button className={styles.compareButton}>
        Compare
      </Button>
    </Link>
            <Button  className={styles.emailButton} >
              Send to email
            </Button>
          </div>
        </div>

        {/* Apartment listings */}
        <div className={styles.listings}>
          <ApartmentCard
            aptNo="1601"
            status="Available"
            statusColor="primary"
            bedrooms={2}
            bathrooms={2}
            aspect="SE"
            description="The living room's largest piece of furniture is a big, white couch that sits behind the table and harmonizes well with the cream-colored walls, painted according to my mother's fondness for pastel hues. To maintain a refreshing atmosphere, we have installed an air conditioner since the room does not have any windows. Additionally, we have hung some landscape pictures and paintings to liven up the ambiance. A potted plant in the corner provides us with fresh air."
            imageUrl="https://img.heroui.chat/image/places?w=400&h=300&u=apt1"
          />
        </div>
      </div>
    </div>
  );
}

