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
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import styles from "./Announcement.module.css";

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
  const [actions, setActions] = useState<Record<string, string>>({});

  const skip = 0;
  const limit = 100;

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
  }, [idItem, language]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleConfirm = async (
    requestId: string,
    status: string,
    label: string
  ) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token || idItem.length === 0) return;

      const projectId = idItem[0];
      const url =
        API_ROUTE.EDIT_REQUEST.replace("{project_id}", projectId)
          .replace("{request_id}", requestId) + `?lang=${language}`;

      await apiarea.put(
        url,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setActions((prev) => ({ ...prev, [requestId]: status }));

      showNotification({
        title: language === "vi" ? "Thành công" : "Success",
        message: (language === "vi" ? "Đã " : "Done: ") + label,
        color: "green",
      });
    } catch (error) {
      console.error("Lỗi khi xác nhận thông báo:", error);
      showNotification({
        title: language === "vi" ? "Lỗi" : "Error",
        message: language === "vi" ? "Xác nhận thất bại" : "Failed to confirm",
        color: "red",
      });
    }
  };

  const handleActionSelect = (
    requestId: string,
    action: string,
    label: string
  ) => {
    modals.openConfirmModal({
      title: language === "vi" ? "Xác nhận" : "Confirm",
      centered: true,
      children: (
        <Text size="sm">
          {language === "vi"
            ? `Bạn có đồng ý ${label.toLowerCase()} không?`
            : `Do you agree to ${label.toLowerCase()}?`}
        </Text>
      ),
      labels: {
        confirm: language === "vi" ? "Đồng ý" : "Agree",
        cancel: language === "vi" ? "Hủy" : "Cancel",
      },
      confirmProps: { color: action === "approved" ? "green" : "red" },
      onConfirm: () => handleConfirm(requestId, action, label),
    });
  };

  const handleDelete = async (requestId: string) => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token || idItem.length === 0) return;

      const projectId = idItem[0];
      const url = API_ROUTE.DELETE_REQUEST
        .replace("{project_id}", projectId)
        .replace("{request_id}", requestId);

      await apiarea.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
        params: { lang: language },
      });

      setData((prev) => prev.filter((item) => item.id !== requestId));
      setNewCount((prev) => Math.max(prev - 1, 0));

      showNotification({
        title: language === "vi" ? "Thành công" : "Success",
        message:
          language === "vi" ? "Đã xóa thông báo" : "Notification deleted",
        color: "green",
      });
    } catch (error) {
      console.error("Lỗi khi xóa thông báo:", error);
      showNotification({
        title: language === "vi" ? "Lỗi" : "Error",
        message:
          language === "vi"
            ? "Xóa thông báo thất bại"
            : "Failed to delete notification",
        color: "red",
      });
    }
  };

  const openDeleteConfirm = (requestId: string) => {
    modals.openConfirmModal({
      title: language === "vi" ? "Xác nhận xóa" : "Confirm delete",
      centered: true,
      children: (
        <Text size="sm">
          {language === "vi"
            ? "Bạn có chắc chắn muốn xóa thông báo này không?"
            : "Are you sure you want to delete this notification?"}
        </Text>
      ),
      labels: {
        confirm: language === "vi" ? "Xóa" : "Delete",
        cancel: language === "vi" ? "Hủy" : "Cancel",
      },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        await handleDelete(requestId);
        modals.closeAll();
      },
    });
  };

  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Group justify="space-between" mb="sm">
        <Text fw={600} size="lg">
          {language === "vi" ? "Thông báo" : "Notifications"}
        </Text>
        {newCount > 0 && <Badge color="red">{newCount} mới</Badge>}
      </Group>
      <Divider mb="sm" />

      {data.length === 0 ? (
        <Text size="sm" c="dimmed">
          {language === "vi" ? "Không có thông báo" : "No notifications"}
        </Text>
      ) : (
        <ScrollArea h={300}>
          <Stack gap="sm">
            {data.map((item, index) => {
              const isNew = index < newCount;
              const selectedAction = actions[item.id];

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
                    <div
                      className={`${styles.userIconWrapper} ${
                        isNew ? styles.new : ""
                      }`}
                    >
                      <IconUser className={styles.userIcon} />
                    </div>

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

                    <Group style={{ marginLeft: "auto" }} gap="xs" wrap="nowrap">
                      {/* ✅ Nút Duyệt */}
                      <Button
                        size="xs"
                        color={selectedAction === "approved" ? "green" : "green.6"}
                        variant={selectedAction === "approved" ? "filled" : "light"}
                        disabled={selectedAction === "approved"} // Disable nếu đã approve
                        onClick={() =>
                          handleActionSelect(
                            item.id,
                            "approved",
                            language === "vi" ? "Duyệt" : "Approve"
                          )
                        }
                      >
                        {language === "vi" ? "Duyệt" : "Approve"}
                      </Button>

                      {/* ✅ Nút Từ chối */}
                      <Button
                        size="xs"
                        color={selectedAction === "rejected" ? "red" : "red.6"}
                        variant={selectedAction === "rejected" ? "filled" : "light"}
                        disabled={selectedAction === "rejected"} // Disable nếu đã rejected
                        onClick={() =>
                          handleActionSelect(
                            item.id,
                            "rejected",
                            language === "vi" ? "Từ chối" : "Reject"
                          )
                        }
                      >
                        {language === "vi" ? "Từ chối" : "Reject"}
                      </Button>

                      {/* ✅ Nút Xóa */}
                      <Button
                        size="xs"
                        color="#bb8d38"
                        variant="light"
                        onClick={() => openDeleteConfirm(item.id)}
                      >
                        {language === "vi" ? "Xóa" : "Delete"}
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
