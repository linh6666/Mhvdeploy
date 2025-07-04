import { Card, Image, Stack, Text, Button, TextInput, Select } from "@mantine/core";
import { IconMapPin, IconBuilding, IconSearch } from '@tabler/icons-react';
import styles from "./DetailInteractive.module.css";
import AppContainer from "../../common/AppContainer";


export default function DetailInteractive () {
  return (
<AppContainer>
 <div className={styles.container}>
      {/* Search Section */}
      <div className={styles.searchSection}>
      <Select
  placeholder="Location"
  leftSection={<IconMapPin size={16} />}
  className={styles.input}
  data={[
    { value: 'ha_long', label: 'Ha Long' },
    { value: 'hanoi', label: 'Hanoi' },
    { value: 'ho_chi_minh', label: 'Ho Chi Minh City' },
    // Thêm các tùy chọn khác ở đây
  ]}
     clearable
/>
<Select
  placeholder="Project Type"
  leftSection={<IconBuilding size={16} />}
  className={styles.input}
  data={[
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    // Thêm các tùy chọn khác ở đây
  ]}
   clearable
/>
        <TextInput
          placeholder="Search a project"
          leftSection={<IconSearch size={16} />}
          className={styles.inputGrow}
        />
      </div>

     
      <div className={styles.cardGrid}>
    
       

     
        {/* <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
          <Image
            src="https://img.heroui.chat/image/places?w=800&h=400&u=2"
            height={160}
            alt="Ecopark"
            style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
          />
          <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
            <Text fw={500}>Ecopark</Text>
            <Text size="sm" c="dimmed">Van Giang, Hung Yen, Vietnam</Text>
            <Text size="sm" c="dimmed">8%</Text>
          </Stack>
            <Button
      component="a"
   href="/Detail"
      className={`${styles.baseButton} ${styles.primaryButton}`}
  
    >
      Go To Project
    </Button>
        </Card> */}

        {/* Card 3 */}
        <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
          <Image
            src="https://img.heroui.chat/image/places?w=800&h=400&u=3"
            height={160}
            alt="Highrise Melbourne"
            style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
          />
          <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
            <Text fw={500}>ECO RETREAT</Text>
            <Text size="sm" c="dimmed">Long An</Text>
            <Text size="sm" c="dimmed">100%</Text>
          </Stack>
          <Button 
               component="a"
   href="/Detail2"
          className={`${styles.baseButton} ${styles.primaryButton}`}>


            Go To Project
          </Button>
        </Card>

   
        
      </div>
    </div>
</AppContainer>


   
  );
}
