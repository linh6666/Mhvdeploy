import React from "react";
import { Card, Text, Title, List, ListItem, Stack, Anchor, Box } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import styles from "./Notes.module.css";

interface DisplayApartment {
  id: string;
  bedrooms: number;
  bathrooms: number;
  features?: string;
}

const displayApartments: DisplayApartment[] = [
  { id: "5510", bedrooms: 2, bathrooms: 1 },
  { id: "5804", bedrooms: 1, bathrooms: 1, features: "Study (N)" },
  { id: "5807", bedrooms: 2, bathrooms: 2 },
  { id: "6310", bedrooms: 1, bathrooms: 1 },
  { id: "6404", bedrooms: 1, bathrooms: 1 },
];

export default function App() {
  return (
    <Box className={styles.container}>
      <Stack gap="md">
        {/* Notes */}
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Title order={2} className={styles.cardTitle}>
            Notes
          </Title>
          <Text className={styles.subtitle}>Developer Incentive</Text>
          <List spacing="xs" pl="md" size="sm" className={styles.text}>
            <ListItem>No FIRB Fee Payable</ListItem>
            <ListItem>$0 Stamp Duty - Local only portion (Level 64 and above only)</ListItem>
            <ListItem>5% Rebate at Settlement</ListItem>
            <ListItem>5% Deposit</ListItem>
          </List>
        </Card>

        {/* Inspect Now */}
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Title order={2} className={styles.cardTitle}>
            Inspect Now
          </Title>
          <Text className={styles.text}>
            All apartments are available for inspection. Keys can be booked by calling or SMS to Colliers Project Phone 0411 101 030 and collected from Colliers office.
          </Text>
          <Text className={styles.text}>
            Ground Floor, 367 Collins Street, Melbourne
          </Text>
        </Card>

        {/* Display Apartments */}
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Title order={2} className={styles.cardTitle}>
            Display Apartments
          </Title>
          <Text className={styles.text}>
            Below are the fully furnished display apartments on site:
          </Text>
          <List spacing="xs" pl="md" size="sm" className={styles.text}>
            {displayApartments.map((apt) => (
              <ListItem key={apt.id}>
                {apt.id} – {apt.bedrooms} Bed {apt.bathrooms} Bath
                {apt.features ? ` + ${apt.features}` : ""}
              </ListItem>
            ))}
          </List>
        </Card>

        {/* Project Video */}
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Title order={2} className={styles.cardTitle}>
            Project Video
          </Title>
          <Text className={styles.text}>
            Can be downloaded in the below link:
          </Text>
          <Anchor
            href="https://www.dropbox.com/sh/m7uzagranoqwmcb/AAdD6RuONhH-VH78Wz0ewla?dl=0"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <IconExternalLink size={16} />
            Download Project Video
          </Anchor>
          <Text className={styles.footerText}>
            ai//smf.com.vn/project/14/documents
          </Text>
        </Card>
      </Stack>
    </Box>
  );
}

