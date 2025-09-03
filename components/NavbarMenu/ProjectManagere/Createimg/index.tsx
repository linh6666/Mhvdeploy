'use client';

import { useState } from 'react';
import { Box, Button, FileInput, Group, LoadingOverlay } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { apiarea } from "../../../../library/axios";
import { API_ROUTE } from "../../../../const/apiRouter";
import type { AxiosError } from "axios";

type CreateProps = {
  port?: number;
  onSearch: () => void;
  language: 'vi' | 'en';
  onClose?: () => void;
};

const ViewCreate = ({ port, onSearch, language, onClose }: CreateProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length < 1) {
      alert(language === 'vi' ? 'Vui lòng chọn ít nhất 1 file' : 'Please select at least one file');
      return;
    }

    if (!port) {
      alert('Missing API port');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Thêm files
      files.forEach((file) => formData.append("files", file));

      // Thêm description theo ngôn ngữ
      files.forEach((_, index) => {
        if (language === "vi") {
          formData.append("description_vi", `Ảnh số ${index + 1}`);
        } else {
          formData.append("description_en", `Image ${index + 1}`);
        }
      });

      const url = `${API_ROUTE.CREATE_IMGE_BUILDING.replace("{port}", String(port))}?lang=${language}`;
      const res = await apiarea.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Upload success:", res.data);
      onSearch();
      alert(language === "vi" ? "Tải ảnh thành công!" : "Upload successful!");
      if (onClose) onClose();
    } catch (err: unknown) {
      console.error("❌ Upload error:", err);

      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosErr = err as AxiosError;
        console.error("❌ Error response:", axiosErr.response?.data);
      }

      alert(language === "vi" ? "Có lỗi xảy ra khi tải ảnh" : "Error while uploading files");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" miw={321} mx="auto" onSubmit={handleSubmit}>
      <LoadingOverlay visible={loading} zIndex={1001} overlayProps={{ radius: "sm", blur: 2 }} />

      <FileInput
        label={language === "vi" ? "Tải ảnh lên" : "Upload files"}
        placeholder={language === "vi" ? "Chọn file..." : "Select files..."}
        multiple
        value={files}
        onChange={(value) => setFiles(value ?? [])}
      />

      <Group justify="flex-end" mt="lg">
        <Button
          type="submit"
          color="#3599dc"
          loading={loading}
          leftSection={<IconCheck size={19} />}
        >
          {language === "vi" ? "Lưu" : "Save"}
        </Button>
        <Button
          variant="outline"
          color="black"
          type="button"
          leftSection={<IconX size={19} />}
          onClick={onClose}
        >
          {language === "vi" ? "Đóng" : "Close"}
        </Button>
      </Group>
    </Box>
  );
};

export default ViewCreate;





