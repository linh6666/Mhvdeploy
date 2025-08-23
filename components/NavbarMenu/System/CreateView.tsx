"use client";

import {
  Box,
  Button,

  Group,
  LoadingOverlay,

  NativeSelect,

  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { createUser } from "../../../api/apicreatesystem"; // 🔁 sửa đường dẫn nếu cần

interface CreateViewProps {
  onSearch: () => Promise<void>;
}

const CreateView = ({ onSearch }: CreateViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

const form = useForm({
  initialValues: {
    rank_total: 0,
    description: '',
  },
  validate: {
    rank_total: isNotEmpty("Email không được để trống"),
    description: isNotEmpty("Họ và tên không được để trống"),
  },
});
  const handleSubmit = async (values: typeof form.values) => {
    open();
    try {
      await createUser(values); // ✅ values đã có phone
      await onSearch();
      modals.closeAll();
    } catch (error) {
      console.error("Lỗi khi tạo user:", error);
      alert("Đã xảy ra lỗi khi tạo người dùng.");
    } finally {
      close();
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

      {/* <TextInput
        label="Cấp bậc"
        placeholder="Nhập cấp bậc"
        withAsterisk
        mt="md"
        {...form.getInputProps("rank_total")}
      /> */}
      <NativeSelect
        rightSection={<IconChevronDown size={16} />}
        label="Cấp bậc"
         data={['0','1', '2', '3', '4', '5', '6', '7', '8']}
        mt="md"
           {...form.getInputProps("rank_total")}
      />

      <TextInput
        label="Tên vai trò"
        placeholder="Nhập tên vai trò"
        withAsterisk
        mt="md"
        {...form.getInputProps("description")}
      />

  

  

    

      <Group justify="flex-end" mt="lg">
        <Button
          type="submit"
          color="#3598dc"
          loading={visible}
          leftSection={<IconCheck size={18} />}
        >
          Lưu
        </Button>
        <Button
          variant="outline"
          color="black"
          type="button"
          loading={visible}
          onClick={() => modals.closeAll()}
          leftSection={<IconX size={18} />}
        >
          Đóng
        </Button>
      </Group>
    </Box>
  );
};

export default CreateView;


