"use client";

import React, { useState } from "react";
import { Modal, Button, TextInput, Textarea, Stack, Group } from "@mantine/core";

interface ContactModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function ContactModal({ opened, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dữ liệu liên hệ:", formData);
    // TODO: Gửi dữ liệu form ở đây (fetch hoặc axios)
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Liên hệ với chúng tôi"
      centered
      size="lg"
    >
      <form onSubmit={handleSubmit}>
        <Stack >
          <TextInput
            label="Họ và tên"
            placeholder="Nhập tên"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextInput
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <TextInput
            label="Email"
            placeholder="Nhập Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Textarea
            label="Nội dung"
            placeholder="Nhập nội dung"
            name="message"
            value={formData.message}
            onChange={handleChange}
            minRows={4}
          />

         <Group justify="flex-end">
  <Button
    type="submit"
    color="yellow"
    styles={{
      root: {
        backgroundColor: "#bb8d38",
        "&:hover": { backgroundColor: "#a87f30" },
      },
    }}
  >
    Gửi
  </Button>
</Group>
        </Stack>
      </form>
    </Modal>
  );
}
