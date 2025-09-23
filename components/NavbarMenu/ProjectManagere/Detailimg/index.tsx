'use client';

import React, { useState, useEffect } from "react";
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
  images: ImageItem[];
}

export default function CustomerDetails({
  port,
  language = "vi",
  onSearch,
  images,
}: CustomerDetailsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<{ image: File | null }>({
    initialValues: { image: null },
  });

  // Cleanup URL object khi unmount hoặc thay đổi preview
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!port)
    return (
      <div>
        ⚠️ {language === "vi" ? "Port không hợp lệ" : "Invalid Port"}
      </div>
    );

  const handleEditClick = (img: ImageItem) => {
    setEditingImage(img);
    form.setFieldValue("image", null);
    setPreviewUrl(img.image_url);
  };

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

      await apiarea.put(
        `/api/v1/ecopark/update_image/${editingImage.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      notifications.show({
        title: language === "vi" ? "Thành công" : "Success",
        message: language === "vi" ? "Cập nhật ảnh thành công!" : "Image updated successfully!",
        color: "green",
      });

      form.reset();
      setEditingImage(null);
      setPreviewUrl(null);

      if (onSearch) await onSearch();
    } catch (err) {
      console.error(err);
      notifications.show({
        title: language === "vi" ? "Thất bại" : "Failed",
        message: language === "vi" ? "Cập nhật ảnh thất bại!" : "Failed to update image!",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      language === "vi" ? "Bạn có chắc muốn xóa ảnh này?" : "Are you sure to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await apiarea.delete(`${API_ROUTE.DETELE_IMGE}`, {
        params: { detal_ids: id },
      });

      notifications.show({
        title: language === "vi" ? "Thành công" : "Success",
        message: language === "vi" ? "Xóa ảnh thành công!" : "Image deleted successfully!",
        color: "green",
      });

      setSelectedImage(null);
      if (onSearch) await onSearch();
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

      <h2>{language === "vi" ? "Hình ảnh chi tiết của nhà" : "Detailed Images of the House"}</h2>

      <div style={{ display: "flex", gap: "2rem", marginTop: "1.5rem" }}>
        {/* Bảng ảnh */}
        <div style={{ flex: 1 }}>
          <Table
            highlightOnHover
            withTableBorder
            withColumnBorders
            style={{ maxWidth: "500px" }}
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
  width={150} // chiều ngang cố định
  height={100} // chiều cao cố định
  style={{ 
    cursor: "pointer", 
    width: "80px",  // fix cứng chiều ngang
    height: "40px", // fix cứng chiều cao
    objectFit: "cover" 
  }}
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
        </div>

        {/* Ảnh lớn bên phải */}
        {selectedImage && (
          <div style={{ flex: 1, textAlign: "center" }}>
            <Image
              src={selectedImage}
              alt="Full view"
              width={900}
              height={500}
              style={{
                width: "700px",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              }}
            />
            <Group justify="center" mt="sm">
              <Button variant="outline" color="red" onClick={() => setSelectedImage(null)}>
                {language === "vi" ? "Đóng ảnh lớn" : "Close image"}
              </Button>
            </Group>
          </div>
        )}
      </div>

      {/* Form edit ảnh */}
      {editingImage && (
        <div style={{ marginTop: "1rem", width: "500px" }}>
          <h3>{language === "vi" ? "Sửa hình ảnh" : "Edit Image"}</h3>

          {previewUrl && (
            <div style={{ marginBottom: 10 }}>
              <Image src={previewUrl} alt="Preview" width={100} height={50} style={{ objectFit: "cover" }} />
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
  );
}
