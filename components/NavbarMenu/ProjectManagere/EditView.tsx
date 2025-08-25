"use client";

import {
  Box,
  Button,
  Group,
  JsonInput,
  LoadingOverlay,
  TextInput,
} from "@mantine/core";
import { useForm, isNotEmpty } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { API_ROUTE } from "../../../const/apiRouter";
import { api } from "../../../library/axios";
import { CreateProjectPayload } from "../../../api/apigetproject";

interface EditViewProps {
  onSearch: () => Promise<void>;
  role: CreateProjectPayload; // nhận toàn bộ object project
  language?: "vi" | "en";
}

const EditView = ({ onSearch, role, language = "vi" }: EditViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm<CreateProjectPayload>({
    initialValues: { ...role },
    validate: {
      building_name: isNotEmpty(
        language === "vi" ? "Tên nhà không được để trống" : "Building Name cannot be empty"
      ),
      bedroom: isNotEmpty(
        language === "vi" ? "Số phòng không được để trống" : "Bedroom cannot be empty"
      ),
      zone_name: isNotEmpty(
        language === "vi" ? "Tên khu không được để trống" : "Zone Name cannot be empty"
      ),
      building_type: isNotEmpty(
        language === "vi" ? "Loại nhà không được để trống" : "Building Type cannot be empty"
      ),
      direction: isNotEmpty(
        language === "vi" ? "Hướng nhà không được để trống" : "Direction cannot be empty"
      ),
      status: isNotEmpty(
        language === "vi" ? "Trạng thái không được để trống" : "Status cannot be empty"
      ),
      description: isNotEmpty(
        language === "vi" ? "Mô tả không được để trống" : "Description cannot be empty"
      ),
    },
  });

  // Cập nhật form khi role thay đổi
  useEffect(() => {
    console.log("Role mới nhận:", role);
    form.setValues(role);
  }, [role]);

  const handleSubmit = async (values: CreateProjectPayload) => {
    console.log("==== Form submit ====");
    console.log("Giá trị form nhận:", values);

    open(); // bật loading overlay

    try {
      const url =
        API_ROUTE.EDIT_LIST_DETAIL_ECOPARK.replace("{ecopark_id}", role.id) +
        `?lang=${language}`;

      const payload = {
        ...values,
        bedroom: Number(values.bedroom),
        description:
          typeof values.description === "string"
            ? values.description
            : JSON.stringify(values.description),
      };

      console.log("PATCH URL:", url);
      console.log("Payload gửi:", payload);

      const response = await api.patch(url, payload);

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        console.log("Cập nhật dự án thành công!");
        await onSearch(); // reload dữ liệu
        modals.closeAll();
      } else {
        console.warn("Server trả status khác 200:", response.status);
        modals.open({
          title: language === "vi" ? "Lỗi" : "Error",
          children: (
            <div>
              {language === "vi"
                ? `Server trả status ${response.status}`
                : `Server returned status ${response.status}`}
            </div>
          ),
        });
      }
    } catch (error: any) {
      console.error("Lỗi khi gọi API PATCH:", error);

      if (error.response) {
        console.error("Response lỗi từ server:", error.response.data);
        console.error("Status code:", error.response.status);
      }

      modals.open({
        title: language === "vi" ? "Lỗi" : "Error",
        children: (
          <div>
            {language === "vi"
              ? "Đã xảy ra lỗi khi cập nhật dự án. Xem console để biết chi tiết."
              : "An error occurred while updating the project. Check console for details."}
          </div>
        ),
      });
    } finally {
      close(); // tắt loading overlay
      console.log("==== Form submit kết thúc ====");
    }
  };

  return (
    <Box
      component="form"
      miw={320}
      mx="auto"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <TextInput
        label={language === "vi" ? "Tên khu" : "Zone Name"}
        placeholder={language === "vi" ? "Nhập khu" : "Enter zone name"}
        withAsterisk
        mt="md"
        {...form.getInputProps("zone_name")}
      />

      <TextInput
        label={language === "vi" ? "Tên nhà" : "Building Name"}
        placeholder={language === "vi" ? "Nhập tên nhà" : "Enter building name"}
        withAsterisk
        mt="md"
        {...form.getInputProps("building_name")}
      />

      <TextInput
        label={language === "vi" ? "Số phòng" : "Bedroom"}
        placeholder={language === "vi" ? "Nhập số phòng" : "Enter bedroom"}
        withAsterisk
        mt="md"
        {...form.getInputProps("bedroom")}
      />

      <TextInput
        label={language === "vi" ? "Loại nhà" : "Building Type"}
        placeholder={language === "vi" ? "Nhập loại nhà" : "Enter building type"}
        withAsterisk
        mt="md"
        {...form.getInputProps("building_type")}
      />

      <TextInput
        label={language === "vi" ? "Hướng nhà" : "Direction"}
        placeholder={language === "vi" ? "Nhập hướng nhà" : "Enter direction"}
        withAsterisk
        mt="md"
        {...form.getInputProps("direction")}
      />

      <TextInput
        label={language === "vi" ? "Trạng thái" : "Status"}
        placeholder={language === "vi" ? "Nhập trạng thái" : "Enter status"}
        withAsterisk
        mt="md"
        {...form.getInputProps("status")}
      />

      <JsonInput
        label={language === "vi" ? "Mô tả" : "Description"}
        placeholder={language === "vi" ? "Nhập mô tả" : "Enter description"}
        formatOnBlur
        autosize
        minRows={4}
        {...form.getInputProps("description")}
      />

      <Group justify="flex-end" mt="lg">
        <Button
          type="submit"
          color="#3598dc"
          loading={visible}
          leftSection={<IconCheck size={18} />}
        >
          {language === "vi" ? "Lưu" : "Save"}
        </Button>
        <Button
          variant="outline"
          color="black"
          type="button"
          loading={visible}
          onClick={() => modals.closeAll()}
          leftSection={<IconX size={18} />}
        >
          {language === "vi" ? "Đóng" : "Close"}
        </Button>
      </Group>
    </Box>
  );
};

export default EditView;




