"use client";

import React, { useState, useEffect, useCallback } from "react";
import { apiarea } from "../../../../library/axios";
import { IconUser } from "@tabler/icons-react";
import { API_ROUTE } from "../../../../const/apiRouter";
import {
  Card,
  Text,
  ScrollArea,
  Divider,
  Stack,
  Badge,
  Button,
  Group,
  Menu,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

interface NotificationItem {
  id: string;
  request_message: string;
  created_at: string;
}

interface AnnouncementProps {
  idItem: string[];
  language: "vi" | "en";
}

export default function Announcement({ idItem, language }: AnnouncementProps) {
  const [data, setData] = useState<NotificationItem[]>([]);
  const [newCount, setNewCount] = useState(0);

  const skip = 0;
  const limit = 100;

  const options = [
    { value: "approved", label: "Duyệt" },
    { value: "pending", label: "Chờ" },
    { value: "rejected", label: "Từ chối" },
  ];

  // ✅ Lấy danh sách thông báo (dùng useCallback để fix warning)
  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token || idItem.length === 0) return;

      const projectId = idItem[0];
      const res = await apiarea.get(API_ROUTE.GET_LIST_REQUEST, {
        headers: { Authorization: `Bearer ${token}` },
        params: { skip, limit, lang: language, project_id: projectId },
      });

      const incoming: NotificationItem[] = res.data.data || [];

      setData((prevData) => {
        const fresh = incoming.filter(
          (item) => !prevData.some((prev) => prev.id === item.id)
        );
        setNewCount(fresh.length);
        return [...fresh, ...prevData];
      });
    } catch (error) {
      console.error("Lỗi gọi API GET_LIST_REQUEST:", error);
    }
  }, [idItem, language]); // ✅ thêm deps

  useEffect(() => {
    fetchData();
  }, [fetchData]); // ✅ fix warning

  // Xử lý xác nhận thông báo bằng JSON
  const handleConfirm = async (requestId: string, status: string) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token || idItem.length === 0) return;

      const projectId = idItem[0];

      const url = API_ROUTE.EDIT_REQUEST
        .replace("{project_id}", projectId)
        .replace("{request_id}", requestId);

      console.log("PUT URL:", apiarea.defaults.baseURL + url);

      await apiarea.put(
        url,
        {
          status,
          response_message: "Đã xử lý",
          approver_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", // TODO: thay bằng id thật từ user login
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { lang: language },
        }
      );

      showNotification({
        title: "Thành công",
        message: `Xác nhận: ${status}`,
        color: "green",
      });
      fetchData(); // reload dữ liệu
    } catch (error) {
      console.error("Lỗi khi xác nhận thông báo:", error);
      showNotification({
        title: "Lỗi",
        message: "Xác nhận thất bại",
        color: "red",
      });
    }
  };

  // Xử lý xóa thông báo
  const handleDelete = async (requestId: string) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token || idItem.length === 0) return;

      const projectId = idItem[0];

      const url = API_ROUTE.DELETE_REQUEST
        .replace("{project_id}", projectId)
        .replace("{request_id}", requestId);

      console.log("DELETE URL:", apiarea.defaults.baseURL + url);

      await apiarea.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
        params: { lang: language },
      });

      setData((prev) => prev.filter((item) => item.id !== requestId));
      setNewCount((prev) => Math.max(prev - 1, 0));

      showNotification({
        title: "Thành công",
        message: "Đã xóa thông báo",
        color: "green",
      });
    } catch (error) {
      console.error("Lỗi khi xóa thông báo:", error);
      showNotification({
        title: "Lỗi",
        message: "Xóa thông báo thất bại",
        color: "red",
      });
    }
  };

  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      {/* Header */}
      <Group justify="space-between" mb="sm">
        <Text fw={600} size="lg">
          Thông báo
        </Text>
        {newCount > 0 && <Badge color="red">{newCount} mới</Badge>}
      </Group>
      <Divider mb="sm" />

      {/* Nội dung */}
      {data.length === 0 ? (
        <Text size="sm" c="dimmed">
          Không có thông báo
        </Text>
      ) : (
        <ScrollArea h={300}>
          <Stack gap="sm">
            {data.map((item, index) => {
              const isNew = index < newCount;

              return (
                <Card
                  key={item.id}
                  shadow="xs"
                  p="sm"
                  radius="md"
                  withBorder
                  style={{
                    backgroundColor: isNew ? "#fff3f3" : "white",
                    borderColor: isNew ? "red" : "transparent",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <IconUser
                      size={20}
                      style={{ marginRight: 8, marginTop: 2 }}
                    />
                    {/* Nội dung thông báo */}
                    <div style={{ flex: 1 }}>
                      <Text size="sm" fw={isNew ? 700 : 500}>
                        {item.request_message || "Không có nội dung"}
                      </Text>
                      <Text size="xs" c="dimmed" mt={4}>
                        {new Date(item.created_at).toLocaleString("vi-VN", {
                          timeZone: "Asia/Ho_Chi_Minh",
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false,
                        })}
                      </Text>
                    </div>

                    {/* Nút xác nhận + xóa */}
                    <Group style={{ marginLeft: "auto" }}>
                      <Menu shadow="sm" width={140}>
                        <Menu.Target>
                          <Button size="xs" color="green" variant="light">
                            Xác nhận
                          </Button>
                        </Menu.Target>
                        <Menu.Dropdown>
                          {options.map((opt) => (
                            <Menu.Item
                              key={opt.value}
                              onClick={() => handleConfirm(item.id, opt.value)}
                            >
                              {opt.label}
                            </Menu.Item>
                          ))}
                        </Menu.Dropdown>
                      </Menu>

                      <Button
                        size="xs"
                        color="red"
                        variant="light"
                        onClick={() => handleDelete(item.id)}
                      >
                        Xóa
                      </Button>
                    </Group>
                  </div>
                </Card>
              );
            })}
          </Stack>
        </ScrollArea>
      )}
    </Card>
  );
}
