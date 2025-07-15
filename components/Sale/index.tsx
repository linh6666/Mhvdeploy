import { Card, Image, Stack, Text, Button, TextInput, Select } from "@mantine/core";
import { IconMapPin, IconBuilding, IconSearch } from '@tabler/icons-react';
import styles from "./Sale.module.css";


export default function App() {
  return (
    <div className={styles.container}>
      {/* Search Section */}
      <div className={styles.searchSection}>
      <Select
  placeholder="Vị Trí"
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
  placeholder="Loại dự án"
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
          placeholder="
Tìm kiếm một dự án"
          leftSection={<IconSearch size={16} />}
          className={styles.inputGrow}
        />
      </div>

      {/* Card Grid */}
      <div className={styles.cardGrid}>
        {/* Card 1 */}
        {/* <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
          <Image
            src="https://img.heroui.chat/image/places?w=800&h=400&u=1"
            height={160}
            alt="BIM Hung Thang"
            style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
          />
          <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
            <Text fw={500}>BIM Hung Thang</Text>
            <Text size="sm" c="dimmed">Hùng Thắng, Hạ Long, Quảng Ninh, Việt Nam</Text>
            <Text size="sm" c="dimmed">
6%, nhiều biệt thự và nhà để bán</Text>
          </Stack>
          <Button className={`${styles.baseButton} ${styles.primaryButton}`}>
            
Đi tới dự án
          </Button>
        </Card> */}


         <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
          <Image
            src="https://img.heroui.chat/image/places?w=800&h=400&u=1"
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
   href="/chi-tiet-quan-ly"
          className={`${styles.baseButton} ${styles.primaryButton}`}>


            Đi tới dự án
          </Button>
        </Card>

        {/* Card 2 */}
      

        {/* Card 3 */}
     <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
               <Image
                 src="https://img.heroui.chat/image/places?w=800&h=400&u=3"
                 height={160}
                 alt="HIGHRISE MELBOURNE"
                 style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
               />
               <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
                 <Text fw={500}>HIGHRISE MELBOURNE</Text>
                 <Text size="sm" c="dimmed">Tây Melbourne</Text>
                 <Text size="sm" c="dimmed">6%, bao gồm 24 tầng, hướng biển</Text>
               </Stack>
                 <Button
           component="a"
        href=""
           className={`${styles.baseButton} ${styles.primaryButton}`}
       
         >
           Đi tới dự án
         </Button>
             </Card>
       <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
          <Image
            src="https://img.heroui.chat/image/places?w=800&h=400&u=2"
            height={160}
            alt="Ecopark"
            style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
          />
          <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
            <Text fw={500}>Thanh Xuan Valley</Text>
            <Text size="sm" c="dimmed">Thung Lũng Thanh Xuân </Text>
            <Text size="sm" c="dimmed">8%</Text>
          </Stack>
          <Button
      component="a"
      href=" "
      className={`${styles.baseButton} ${styles.primaryButton}`}
     // Mở liên kết ở tab mới (nếu cần)
    >
    Đi tới dự án 
    </Button>
    </Card>
   <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
          <Image
            src="https://img.heroui.chat/image/places?w=800&h=400&u=5"
            height={160}
            alt="Park Hill"
            style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
          />
          <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
            <Text fw={500}>SUN PREMIER VILLAGE PRIMAVERA</Text>
            <Text size="sm" c="dimmed">Nam Phú Quốc, Việt Nam</Text>
            <Text size="sm" c="dimmed">5%</Text>
          </Stack>
          <Button disabled className={`${styles.baseButton} ${styles.disabledButton}`}>
           
Chờ phê duyệt
          </Button>
        </Card>
        
      </div>
    </div>
  );
}
