// "use client";
// import { useState } from "react";
// import { Card, Image, Stack, Text, Button, TextInput, Select } from "@mantine/core";
// import { IconMapPin, IconBuilding, IconSearch } from '@tabler/icons-react';
// import styles from "./DetailInteractive.module.css";
// import AppContainer from "../../common/AppContainer";


// export default function DetailInteractive () {

//   const [isApproved, setIsApproved] = useState(false); // ✅ Bổ sung state để xử lý button
//   return (
// <AppContainer>
//  <div className={styles.container}>
//       {/* Search Section */}
//       <div className={styles.searchSection}>
//       <Select
//   placeholder="Location"
//   leftSection={<IconMapPin size={16} />}
//   className={styles.input}
//   data={[
//     { value: 'ha_long', label: 'Ha Long' },
//     { value: 'hanoi', label: 'Hanoi' },
//     { value: 'ho_chi_minh', label: 'Ho Chi Minh City' },
//     // Thêm các tùy chọn khác ở đây
//   ]}
//      clearable
// />
// <Select
//   placeholder="Project Type"
//   leftSection={<IconBuilding size={16} />}
//   className={styles.input}
//   data={[
//     { value: 'residential', label: 'Residential' },
//     { value: 'commercial', label: 'Commercial' },
//     { value: 'industrial', label: 'Industrial' },
//     // Thêm các tùy chọn khác ở đây
//   ]}
//    clearable
// />
//         <TextInput
//           placeholder="Search a project"
//           leftSection={<IconSearch size={16} />}
//           className={styles.inputGrow}
//         />
//       </div>

     
//       <div className={styles.cardGrid}>
    
       

     
      

//         {/* Card 3 */}
//         <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
//           <Image
//             src="https://img.heroui.chat/image/places?w=800&h=400&u=1"
//             height={160}
//             alt="Highrise Melbourne"
//             style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
//           />
//           <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
//             <Text fw={500}>ECO RETREAT</Text>
//             <Text size="sm" c="dimmed">Long An</Text>
//             <Text size="sm" c="dimmed">100%</Text>
//           </Stack>
//           <Button 
//                component="a"
//    href="/en/Detail2"
//           className={`${styles.baseButton} ${styles.primaryButton}`}>


            
// Go To Project
//           </Button>
//         </Card>
//        <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
//           <Image
//             src="https://img.heroui.chat/image/places?w=800&h=400&u=8"
//             height={160}
//             alt="HIGHRISE MELBOURNE"
//             style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
//           />
//           <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
//             <Text fw={500}>HIGHRISE MELBOURNE</Text>
//             <Text size="sm" c="dimmed">Melbourne</Text>
//             <Text size="sm" c="dimmed">6%, 24 floors, sea view</Text>
//           </Stack>
//             <Button
//       component="a"
//    href="/en/Detail"
//       className={`${styles.baseButton} ${styles.primaryButton}`}
  
//     >
//     Go To Project
//     </Button>
//         </Card>



     
//       <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
//           <Image
//             src="https://img.heroui.chat/image/places?w=800&h=400&u=2"
//             height={160}
//             alt="Park Hill"
//             style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
//           />
//           <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
//             <Text fw={500}>THANH XUAN VALLEY</Text>
//             <Text size="sm" c="dimmed">Thung Lung - Thanh Xuan </Text>
//             <Text size="sm" c="dimmed">8%</Text>
//           </Stack>
//           <Button
//   disabled={isApproved}
//   onClick={() => setIsApproved(true)}
//   className={`${styles.baseButton} ${
//     isApproved ? styles.disabledButton : styles.primaryButton
//   }`}
// >
//   {isApproved ? "Wait for approval" : "Please approve"}
// </Button>

          
//         </Card>
    
//     <Card shadow="sm" radius="md" withBorder padding="0" className={styles.card}>
//           <Image
//             src="https://img.heroui.chat/image/places?w=800&h=400&u=5"
//             height={160}
//             alt="Park Hill"
//             style={{ borderTopLeftRadius: "var(--mantine-radius-md)", borderTopRightRadius: "var(--mantine-radius-md)" }}
//           />
//           <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
//             <Text fw={500}>SUN PREMIER VILLAGE PRIMAVERA </Text>
//             <Text size="sm" c="dimmed">Nam Phu Quoc, VietNam</Text>
//             <Text size="sm" c="dimmed">5%</Text>
//           </Stack>
//           <Button disabled className={`${styles.baseButton} ${styles.disabledButton}`}>
           

// Wait for approval
//           </Button>
//         </Card>

   
        
//       </div>
//     </div>
// </AppContainer>


   
//   );
// }
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Image,
  Stack,
  Text,
  Button,
  TextInput,
  Select,
} from "@mantine/core";
import { IconMapPin, IconBuilding, IconSearch } from "@tabler/icons-react";
import styles from "./DetailInteractive.module.css";
import AppContainer from "../../common/AppContainer";
import { apiarea } from "../../library/axios";
import { API_ROUTE } from "../../const/apiRouter";

// Định nghĩa interface cho dữ liệu dự án
interface Project {
  id: string;
  name: string;
  address: string;
  type: string;
  investor: string;
}

export default function DetailInteractive() {
  const [projects, setProjects] = useState<Project[]>([]);

  // Danh sách đường dẫn cho từng dự án
  const projectPaths = [
    '/chi-tiet-du-an/du-an-1',
    '/chi-tiet-du-an/du-an-2',
    '/en/Detail2"',
    '/en/Detail',
    // thêm các đường dẫn cho các dự án khác tại đây
  ];

  // Ảnh cố định để dùng cho các dự án
  const imageList = [
    "https://img.heroui.chat/image/places?w=800&h=400&u=1",
    "https://img.heroui.chat/image/places?w=800&h=400&u=2",
    "https://img.heroui.chat/image/places?w=800&h=400&u=3",
    "https://img.heroui.chat/image/places?w=800&h=400&u=4",
    "https://img.heroui.chat/image/places?w=800&h=400&u=5",
  ];

  // Gọi API lấy danh sách dự án
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await apiarea.get(API_ROUTE.GET_PROJECT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(res.data.data); // Lưu dữ liệu dự án
      } catch (error) {
        console.error("Lỗi khi fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <AppContainer>
      <div className={styles.container}>
        {/* Khu vực tìm kiếm / lọc */}
        <div className={styles.searchSection}>
          <Select
            placeholder="Vị trí"
            leftSection={<IconMapPin size={16} />}
            className={styles.input}
            data={[]} // bạn có thể bổ sung dữ liệu filter sau
            clearable
          />
          <Select
            placeholder="Loại dự án"
            leftSection={<IconBuilding size={16} />}
            className={styles.input}
            data={[]} // bạn có thể bổ sung dữ liệu filter sau
            clearable
          />
          <TextInput
            placeholder="Tìm kiếm một dự án"
            leftSection={<IconSearch size={16} />}
            className={styles.inputGrow}
          />
        </div>

        {/* Hiển thị danh sách dự án */}
        <div className={styles.cardGrid}>
          {projects.map((project, index) => (
            <Card
              key={project.id}
              shadow="sm"
              radius="md"
              withBorder
              padding="0"
              className={styles.card}
            >
              <Image
                src={imageList[index % imageList.length]} // Ảnh cố định theo index
                height={160}
                alt={project.name}
                style={{
                  borderTopLeftRadius: "var(--mantine-radius-md)",
                  borderTopRightRadius: "var(--mantine-radius-md)",
                }}
              />
              <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
                <Text fw={500}>{project.name}</Text>
                <Text size="sm" c="dimmed">{project.address}</Text>
                <Text size="sm" c="dimmed">{project.type}</Text>
              </Stack>
              <Button
                onClick={() => {
                  localStorage.setItem('project_id', project.id);
                  const projectPath = projectPaths[index]; // Lấy đường dẫn tương ứng với dự án
                  window.location.href = projectPath; // Chuyển trang
                }}
                className={`${styles.baseButton} ${styles.primaryButton}`}
              >
                Go To Project
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </AppContainer>
  );
}