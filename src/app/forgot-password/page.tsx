"use client";

import {
  Box,
  Button,
  Paper,
  Stack,
  Text,
  Image,
  SimpleGrid,
  Input,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { sendPasswordResetEmail } from "../../../api/apiSendemail"; // Nhập hàm gửi email
import styles from "./forgotPassword.module.css";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false); // Quản lý loading
  const [message, setMessage] = useState(""); // Hiển thị thông báo

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value) ? null : "Please enter a valid email address.";
      },
    },
  });

  const handleSubmit = async (values: { email: string }) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await sendPasswordResetEmail(values.email);

      // ✅ Cập nhật thông báo thành công
      setMessage("Email sent successfully! Please check your email inbox.");

      // ✅ Xóa toàn bộ dữ liệu trong form
      form.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message || "Failed to send email.");
      } else {
        setMessage("Failed to send email.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.container}>
      <Paper p="xl" className={styles.paper}>
        <Stack align="center" className={styles.stack}>
          {/* Tiêu đề */}
          <Text size="xl" fw={700} className={styles.title}>
            WELCOME TO
          </Text>

          {/* Logo */}
          <Image
            src="/assets/logo/LOGO_login.png"
            alt="MHV Logo"
            width={120}
            height="auto"
            className={styles.logo}
          />

          <Text size="md" className={styles.description}>
            FORGOT YOUR PASSWORD?
            <br />
            Don&apos;t worry! Please enter your email address.
            <br />
            We will send you a link to reset your password.
          </Text>

          {/* Form input */}
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <SimpleGrid cols={1} spacing="sm" verticalSpacing="xs">
              <Input
                type="email"
                placeholder="Email"
                {...form.getInputProps("email")}
                classNames={{ input: styles.customInput }}
              />

              <Button
                fullWidth
                radius="md"
                size="md"
                mt="md"
                type="submit"
                loading={loading}
                className={styles.button}
              >
                RESET PASSWORD
              </Button>
            </SimpleGrid>
          </form>

          {/* ✅ Thông báo sau khi gửi */}
          {message && (
            <Text
              size="sm"
              color={message.startsWith("Failed") ? "red" : "green"}
              mt="sm"
            >
              {message}
            </Text>
          )}

          <Text size="xs" className={styles.termsText}>
            Already have an account?{" "}
            <a href="/register" className={styles.phoneNumber}>
              Register
            </a>
          </Text>
        </Stack>
      </Paper>
    </Box>
  );
}
