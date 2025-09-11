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
  Modal,
} from "@mantine/core";
import { IconMapPin, IconBuilding, IconSearch } from "@tabler/icons-react";
import styles from "./Sale.module.css";
import AppContainer from "../../common/AppContainer";
import { apiarea } from "../../library/axios";
import { API_ROUTE } from "../../const/apiRouter";

interface Project {
  id: string;
  name: string;
  address: string;
  type: string;
  investor: string;
  image_url?: string;
}

interface RequestState {
  [projectId: string]: {
    loading: boolean;
    sent: boolean;
    status?: "pending" | "approved" | "rejected";
    requestId?: string;
  };
}

interface Role {
  id: string;
  name: string;
}

interface RequestItem {
  id: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export default function DetailInteractive() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [requestState, setRequestState] = useState<RequestState>({});
  const [openedProjectId, setOpenedProjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ role_id: "", request_message: "" });
  const [roleOptions, setRoleOptions] = useState<Role[]>([]);

  const projectPaths = [
    "/chi-tiet-quan-ly",
    "/chi-tiet-du-an/du-an-2",
    "/chi-tiet-du-an/12",
    "/chi-tiet/1",
  ];

  // fetch projects + requests
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);

    if (!storedToken) {
      setShowLoginModal(true);
      return;
    }

    const fetchProjectsAndRequests = async (lang: "vi" | "en" = "vi") => {
      try {
        const currentToken = localStorage.getItem("access_token");

        // fetch projects có kèm lang
        const projectRes = await apiarea.get(
          `${API_ROUTE.GET_PROJECT}?lang=${lang}`,
          {
            headers: { Authorization: `Bearer ${currentToken}` },
          }
        );
        setProjects(projectRes.data.data);

        // Lấy projectIds để call request
        const projectIds = projectRes.data.data.map((p: Project) => p.id);

        // fetch requests cho tất cả projectIds
        const initialState: RequestState = {};
        for (const projectId of projectIds) {
          const reqRes = await apiarea.get(
            `${API_ROUTE.GET_LIST_REQUEST}?skip=0&limit=100&lang=${lang}&project_id=${projectId}`,
            { headers: { Authorization: `Bearer ${currentToken}` } }
          );

          const requests: RequestItem[] = reqRes.data.data;
          const myReq = requests
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )[0];

          initialState[projectId] = {
            loading: false,
            sent: !!myReq,
            status: myReq?.status,
            requestId: myReq?.id,
          };
        }

        setRequestState(initialState);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjectsAndRequests();
  }, []);

  // fetch roles khi mở modal
  useEffect(() => {
    if (openedProjectId) {
      const fetchRoles = async () => {
        try {
          const currentToken = localStorage.getItem("access_token");
          const res = await apiarea.get("/api/v1/roles/", {
            headers: { Authorization: `Bearer ${currentToken}` },
          });
          setRoleOptions(res.data.data);
        } catch (error) {
          console.error("Lỗi khi fetch roles:", error);
        }
      };
      fetchRoles();
    }
  }, [openedProjectId]);

  // gửi request
  const handleSendRequest = async (projectId: string) => {
    setRequestState((prev) => ({
      ...prev,
      [projectId]: { ...prev[projectId], loading: true },
    }));

    try {
      const url = `https://www.mohinhviet.com.vn/api/v1/req/${projectId}`;
      const currentToken = localStorage.getItem("access_token");

      await apiarea.post(url, formData, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      // GET lại request list **chỉ cho project hiện tại**
      const reqRes = await apiarea.get(
        `${API_ROUTE.GET_LIST_REQUEST}?skip=0&limit=100&lang=vi&project_id=${projectId}`,
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );
      const requests: RequestItem[] = reqRes.data.data;
      const myReq = requests
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        )[0];

      setRequestState((prev) => ({
        ...prev,
        [projectId]: {
          loading: false,
          sent: true,
          status: myReq?.status,
          requestId: myReq?.id,
        },
      }));

      setOpenedProjectId(null);
      alert("Gửi yêu cầu thành công!");
    } catch (error) {
      console.error(error);
      alert("Gửi yêu cầu thất bại, thử lại sau.");
      setRequestState((prev) => ({
        ...prev,
        [projectId]: { ...prev[projectId], loading: false },
      }));
    }
  };

  return (
    <AppContainer>
      <div className={styles.container}>
        {/* Modal đăng nhập */}
        <Modal
          opened={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          title="Thông báo"
          centered
        >
          <Text>Bạn cần đăng nhập để xem danh sách quản lý bán hàng.</Text>
          <Button
            mt="md"
            fullWidth
            onClick={() => (window.location.href = "/dang-nhap")}
          >
            Đăng nhập ngay
          </Button>
        </Modal>

        {/* Modal gửi request */}
        <Modal
          opened={openedProjectId !== null}
          onClose={() => setOpenedProjectId(null)}
          title="Gửi yêu cầu tham gia dự án"
          centered
        >
          <Select
            label="Chọn vai trò"
            placeholder="Chọn vai trò của bạn"
            data={roleOptions.map((r) => ({ value: r.id, label: r.name }))}
            value={formData.role_id}
            onChange={(value) =>
              setFormData({ ...formData, role_id: value || "" })
            }
            mb="sm"
          />
          <TextInput
            label="Nội dung yêu cầu"
            placeholder="Nhập nội dung yêu cầu"
            value={formData.request_message}
            onChange={(e) =>
              setFormData({ ...formData, request_message: e.currentTarget.value })
            }
            mb="sm"
          />
          <Button
            fullWidth
            style={{ backgroundColor: "#406c88", color: "white" }}
            onClick={() => openedProjectId && handleSendRequest(openedProjectId)}
          >
            Gửi
          </Button>
        </Modal>

        {token && (
          <>
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
              {projects.map((project, index) => {
                const { loading, status } = requestState[project.id] || {
                  loading: false,
                  status: undefined,
                };

                return (
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
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        padding: "0 16px 16px",
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: "#406c88",
                          color: "white",
                          flex: 1,
                        }}
                        onClick={() => {
                          if (status === "approved") {
                            const path =
                              projectPaths[index] || "/chi-tiet-quan-ly";
                            window.location.href = `${path}?pageId=${project.id}`;
                          } else {
                            setFormData({ role_id: "", request_message: "" });
                            setOpenedProjectId(project.id);
                          }
                        }}
                        disabled={status === "pending" || loading}
                        loading={loading}
                      >
                        {status === "pending"
                          ? "Đang chờ xác nhận"
                          : status === "approved"
                          ? "Đi tới dự án"
                          : "Gửi yêu cầu"}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </AppContainer>
  );
}

