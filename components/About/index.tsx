"use client";

import { Title, Text } from "@mantine/core";

export default function TestPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <Title order={1}>Trang Test</Title>
      <Text mt="md">
        Đây là một trang test đơn giản, không dùng Container, chỉ dùng padding
        và text cơ bản.
      </Text>
    </div>
  );
}
