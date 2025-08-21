'use client';

import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  SimpleGrid,
  TextInput,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks';
import { createProject } from '../../../api/apicreateproject'; // 🔁 sửa đường dẫn nếu cần

interface CreateViewProps {
  onSearch: () => Promise<void>;
  language: 'vi' | 'en';
}

const CreateView = ({ onSearch, language }: CreateViewProps) => {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name_vi: '',
      address_vi: '',
      type_vi: '',
      investor_vi: '',
      name_en: '',
      address_en: '',
      type_en: '',
      investor_en: '',
      picture: '',
    },
    validate: {
      name_vi: language === 'vi' ? isNotEmpty('Tên dự án không được để trống') : undefined,
      address_vi: language === 'vi' ? isNotEmpty('Địa chỉ không được để trống') : undefined,
      type_vi: language === 'vi' ? isNotEmpty('Kiểu không được để trống') : undefined,
      investor_vi: language === 'vi' ? isNotEmpty('Nhà đầu tư không được để trống') : undefined,
      name_en: language === 'en' ? isNotEmpty('Project name cannot be empty') : undefined,
      address_en: language === 'en' ? isNotEmpty('Address cannot be empty') : undefined,
      type_en: language === 'en' ? isNotEmpty('Type cannot be empty') : undefined,
      investor_en: language === 'en' ? isNotEmpty('Investor cannot be empty') : undefined,
      picture: isNotEmpty(language === 'vi' ? 'Tên hình ảnh không được để trống' : 'Picture name cannot be empty'),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    open();
    try {
      await createProject(values);
      await onSearch();
      modals.closeAll();
    } catch (error) {
      console.error('Lỗi khi tạo dự án:', error);
      alert(language === 'vi' ? 'Đã xảy ra lỗi khi tạo dự án.' : 'Error occurred while creating project.');
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
      <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />

      <SimpleGrid cols={1}>
        {language === 'vi' && (
          <>
            <TextInput
              label="Tên dự án"
              placeholder="Nhập tên dự án"
              withAsterisk
              mt="md"
              {...form.getInputProps('name_vi')}
            />
            <TextInput
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              withAsterisk
              mt="md"
              {...form.getInputProps('address_vi')}
            />
            <TextInput
              label="Kiểu"
              placeholder="Nhập kiểu"
              withAsterisk
              mt="md"
              {...form.getInputProps('type_vi')}
            />
            <TextInput
              label="Nhà đầu tư"
              placeholder="Nhập nhà đầu tư"
              withAsterisk
              mt="md"
              {...form.getInputProps('investor_vi')}
            />
          </>
        )}

        {language === 'en' && (
          <>
            <TextInput
              label="Project Name"
              placeholder="Enter project name"
              withAsterisk
              mt="md"
              {...form.getInputProps('name_en')}
            />
            <TextInput
              label="Address"
              placeholder="Enter address"
              withAsterisk
              mt="md"
              {...form.getInputProps('address_en')}
            />
            <TextInput
              label="Type"
              placeholder="Enter type"
              withAsterisk
              mt="md"
              {...form.getInputProps('type_en')}
            />
            <TextInput
              label="Investor"
              placeholder="Enter investor"
              withAsterisk
              mt="md"
              {...form.getInputProps('investor_en')}
            />
          </>
        )}
      </SimpleGrid>

      <TextInput
        label={language === 'vi' ? 'Tên hình ảnh' : 'Picture Name'}
        placeholder={language === 'vi' ? 'Nhập tên hình ảnh' : 'Enter picture name'}
        withAsterisk
        mt="md"
        {...form.getInputProps('picture')}
      />

      <Group justify="flex-end" mt="lg">
        <Button
          type="submit"
          color="#3598dc"
          loading={visible}
          leftSection={<IconCheck size={18} />}
        >
          {language === 'vi' ? 'Lưu' : 'Save'}
        </Button>
        <Button
          variant="outline"
          color="black"
          type="button"
          loading={visible}
          onClick={() => modals.closeAll()}
          leftSection={<IconX size={18} />}
        >
          {language === 'vi' ? 'Đóng' : 'Close'}
        </Button>
      </Group>
    </Box>
  );
};

export default CreateView;



