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
import { sendPasswordResetEmail } from "../../../api/apiSendemail"; // ✅ Đã dùng đúng
import styles from "./forgotPassword.module.css";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
      // ✅ Gửi email thực sự
      await sendPasswordResetEmail(values.email);

      // ✅ Nếu thành công
      setMessage("Email sent successfully! Please check your email inbox.");
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
          {/* <Text size="xl" fw={700} className={styles.title}>
            WELCOME TO
          </Text> */}

          {/* Logo */}
          <Image
            src="/assets/logo/LOGO_login.png"
            alt="MHV Logo"
            width={120}
            height="auto"
            className={styles.logo}
          />

          <Text size="md" className={styles.description}>
            QUÊN MẬT KHẨU?
            <br />
          Đừng lo lắng! Vui lòng nhập địa chỉ email của bạn.
            <br />
            
Chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu.
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
                QUÊN MẬT KHẨU
              </Button>
            </SimpleGrid>
          </form>

          {/* ✅ Thông báo sau khi gửi */}
          {message && (
            <Text
              size="sm"
              color={message.toLowerCase().includes("fail") ? "red" : "green"}
              mt="sm"
            >
              {message}
            </Text>
          )}

          <Text size="xs" className={styles.termsText}>
           Bạn đã có tài khoản?{" "}
            <a href="/dang-ky" className={styles.phoneNumber}>
              Đăng Ký
            </a>
          </Text>
        </Stack>
      </Paper>
    </Box>
  );
}