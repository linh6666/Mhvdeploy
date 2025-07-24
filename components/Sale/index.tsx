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
import styles from "./Sale.module.css";
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
  image_url?: string;
}

export default function DetailInteractive() {
  const [projects, setProjects] = useState<Project[]>([]);

  // const projectPaths = [
  //   "/chi-tiet-du-an/du-an-1",
  //   "/chi-tiet-du-an/du-an-2",
  //   "/chi-tiet-du-an",
  //   "/chi-tiet",
  //   // thêm các đường dẫn khác
  // ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await apiarea.get(API_ROUTE.GET_PROJECT, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(res.data.data);
      } catch (error) {
        console.error("Lỗi khi fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <AppContainer>
      <div className={styles.container}>
        {/* Thanh tìm kiếm / lọc */}
        <div className={styles.searchSection}>
          <Select
            placeholder="Vị trí"
            leftSection={<IconMapPin size={16} />}
            className={styles.input}
            data={[]}
            clearable
          />
          <Select
            placeholder="Loại dự án"
            leftSection={<IconBuilding size={16} />}
            className={styles.input}
            data={[]}
            clearable
          />
          <TextInput
            placeholder="Tìm kiếm một dự án"
            leftSection={<IconSearch size={16} />}
            className={styles.inputGrow}
          />
        </div>

        {/* Danh sách dự án */}
        <div className={styles.cardGrid}>
          {projects.map((project) => (
            <Card
              key={project.id}
              shadow="sm"
              radius="md"
              withBorder
              padding="0"
              className={styles.card}
            >
              <Image
                src={
                  project.image_url ||
                  "https://via.placeholder.com/800x400?text=No+Image"
                }
                alt={project.name}
                fallbackSrc="https://via.placeholder.com/800x400?text=No+Image"
                className={styles.cardImage}
              />

              <Stack gap="xs" p="md" style={{ flexGrow: 1 }}>
                <Text fw={500}>{project.name}</Text>
                <Text size="sm" c="dimmed">
                  {project.address}
                </Text>
                <Text size="sm" c="dimmed">
                  {project.type}
                </Text>
              </Stack>
              <Button
                onClick={() => {
                  localStorage.setItem("project_id", project.id);
                  window.location.href = `/chi-tiet-quan-ly?pageId=${project.id}`;
                }}
                className={`${styles.baseButton} ${styles.primaryButton}`}
              >
                Đi tới dự án
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </AppContainer>
  );
}
