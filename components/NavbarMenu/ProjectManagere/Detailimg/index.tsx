'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  ActionIcon,
  Tooltip,
  Button,
  Group,
  LoadingOverlay,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { apiarea } from "../../../../library/axios";
import { API_ROUTE } from "../../../../const/apiRouter";

interface ImageItem {
  id: string;
  image_url: string;
}

interface CustomerDetailsProps {
  idItem: string[];
  port?: number;
  language?: "vi" | "en";
  onSearch?: () => void;
}

export default function CustomerDetails({
  port,
  language = "vi",
  onSearch,
}: CustomerDetailsProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<{ image: File | null }>({
    initialValues: { image: null },
  });

  // Fetch ảnh từ API
  const fetchImages = async () => {
    if (!port) return;
    try {
      setLoading(true);
      const res = await apiarea.get(API_ROUTE.GET_DETAIL_HOME, {
        params: { port, lang: language },
      });

      const imageData: ImageItem[] = Array.isArray(res.data)
        ? res.data
        : res.data?.items || [];

      setImages(imageData);
      if (imageData.length > 0) setSelectedImage(imageData[0].image_url);
    } catch (err) {
      console.error("❌ Lỗi fetch ảnh:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [port, language]);

  if (!port)
    return (
      <div>
        ⚠️ {language === "vi" ? "Port không hợp lệ" : "Invalid Port"}
      </div>
    );

  // Mở form sửa ảnh
  const handleEditClick = (img: ImageItem) => {
    setEditingImage(img);
    form.setFieldValue("image", null);
    setPreviewUrl(img.image_url);
  };

  // Lưu sửa ảnh
  const handleSaveEdit = async (file: File | null) => {
    if (!editingImage) return;
    if (!file) {
      notifications.show({
        title: language === "vi" ? "Lỗi" : "Error",
        message: language === "vi" ? "Chọn file trước khi lưu!" : "Select a file first!",
        color: "red",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("lang", language);

      // Gọi API PUT
      const res = await apiarea.put(
        `/api/v1/ecopark/update_image/${editingImage.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ PUT response:", res.data);

      const updatedUrl = res.data?.image_url
        ? res.data.image_url + "?t=" + new Date().getTime()
        : editingImage.image_url;

      setImages(prev =>
        prev.map(img =>
          img.id === editingImage.id ? { ...img, image_url: updatedUrl } : img
        )
      );

      setSelectedImage(updatedUrl);
      setPreviewUrl(updatedUrl);

      form.reset();
      setEditingImage(null);
      onSearch?.();

      // 🔔 Thông báo thành công
      notifications.show({
        title: language === "vi" ? "Thành công" : "Success",
        message: language === "vi" ? "Cập nhật ảnh thành công!" : "Image updated successfully!",
        color: "green",
      });
    } catch (err) {
      console.error("❌ Lỗi cập nhật ảnh:", err);
      notifications.show({
        title: language === "vi" ? "Thất bại" : "Failed",
        message: language === "vi" ? "Cập nhật ảnh thất bại!" : "Failed to update image!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  // Xóa ảnh
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      language === "vi"
        ? "Bạn có chắc muốn xóa ảnh này?"
        : "Are you sure to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await apiarea.delete(`${API_ROUTE.DETELE_IMGE}`, {
        params: { detal_ids: id },
      });

      setImages(prev => prev.filter(img => img.id !== id));
      if (selectedImage === images.find(img => img.id === id)?.image_url) {
        setSelectedImage(images[0]?.image_url || null);
      }
      onSearch?.();

      // 🔔 Thông báo thành công
      notifications.show({
        title: language === "vi" ? "Thành công" : "Success",
        message: language === "vi" ? "Xóa ảnh thành công!" : "Image deleted successfully!",
        color: "green",
      });
    } catch (err) {
      console.error(err);
      notifications.show({
        title: language === "vi" ? "Thất bại" : "Failed",
        message: language === "vi" ? "Xóa ảnh thất bại!" : "Failed to delete image!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={loading} />

      <h2>
        {language === "vi"
          ? "Hình ảnh chi tiết của nhà"
          : "Detailed Images of the House"}
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginTop: "1.5rem",
          gap: 10,
        }}
      >
        {/* Bảng ảnh */}
        <Table
          highlightOnHover
          withTableBorder
          withColumnBorders
          style={{ marginTop: "1.5rem", maxWidth: "500px" }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{language === "vi" ? "Ảnh" : "Image"}</Table.Th>
              <Table.Th>{language === "vi" ? "Hành động" : "Actions"}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {images.map((img, idx) => (
              <Table.Tr key={img.id}>
                <Table.Td>
                  <Image
                    src={previewUrl && editingImage?.id === img.id ? previewUrl : img.image_url}
                    alt={`Thumbnail ${idx}`}
                    width={80}
                    height={60}
                    style={{ cursor: "pointer", objectFit: "cover" }}
                    onClick={() => setSelectedImage(img.image_url)}
                  />
                </Table.Td>
                <Table.Td>
                  <Group>
                    <Tooltip label={language === "vi" ? "Sửa" : "Edit"}>
                      <ActionIcon color="blue" variant="subtle" onClick={() => handleEditClick(img)}>
                        <IconPencil size={18} />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label={language === "vi" ? "Xóa" : "Delete"}>
                      <ActionIcon color="red" variant="subtle" onClick={() => handleDelete(img.id)}>
                        <IconTrash size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {/* Form sửa ảnh */}
        {editingImage && (
          <div style={{ marginTop: "1rem", width: "500px" }}>
            <h3>{language === "vi" ? "Sửa hình ảnh" : "Edit Image"}</h3>

            {previewUrl && (
              <div style={{ marginBottom: 10 }}>
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={100}
                  height={50}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}

            <FileInput
              label={language === "vi" ? "Chọn file ảnh" : "Select image file"}
              placeholder={language === "vi" ? "Chọn file" : "Select file"}
              accept="image/*"
              {...form.getInputProps("image", {
                onChange: (file: File | null) => {
                  if (file) setPreviewUrl(URL.createObjectURL(file));
                  else setPreviewUrl(editingImage?.image_url || null);
                },
              })}
              mt="sm"
            />

            <Group mt="md">
              <Button onClick={() => handleSaveEdit(form.values.image)}>
                {language === "vi" ? "Lưu" : "Save"}
              </Button>
              <Button
                variant="outline"
                color="gray"
                onClick={() => {
                  setEditingImage(null);
                  setPreviewUrl(null);
                  form.reset();
                }}
              >
                {language === "vi" ? "Hủy" : "Cancel"}
              </Button>
            </Group>
          </div>
        )}
      </div>
    </div>
  );
}
