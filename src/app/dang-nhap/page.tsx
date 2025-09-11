"use client";

import {
  Box,
  Button,
  Paper,
  Stack,
  Text,
  Image,
  SimpleGrid,
  PasswordInput,
  Input,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { loginUser } from "../../../api/apiLogin";
import axios from "axios";
import { notifications } from "@mantine/notifications";

import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        /^\S+@\S+\.\S+$/.test(value.trim()) ? null : "Email không hợp lệ",
      password: (value) =>
        value.trim().length >= 8 ? null : "Mật khẩu phải ít nhất 8 ký tự",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const response = await loginUser(values.username, values.password);

      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);
        window.location.href = "/";
      } else {
        notifications.show({
          title: "Đăng nhập thất bại",
          message: "Sai tài khoản hoặc mật khẩu, vui lòng thử lại.",
          color: "red",
        });
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        notifications.show({
          title: "Lỗi đăng nhập",
          message: error.response?.data?.detail || "Sai tài khoản hoặc mật khẩu",
          color: "red",
        });
      } else {
        notifications.show({
          title: "Lỗi hệ thống",
          message: (error as Error).message || "Có lỗi xảy ra, vui lòng thử lại",
          color: "red",
        });
      }
    }
  };

  return (
    <Box className={styles.container}>
      <Paper p="xl" className={styles.paper}>
        <Stack align="center" className={styles.stack}>
          <Image
            src="/assets/logo/LOGO_login.png"
            alt="MHV Logo"
            width={120}
            height="auto"
            className={styles.logo}
          />

          <Text size="sm" className={styles.description}>
            Vui lòng{" "}
            <a href="/dang-ky" className={styles.registerLink}>
              Đăng Ký
            </a>{" "}
            để truy cập Mô Hình Việt
            <br />
            Nếu bạn đã đăng ký, vui lòng đăng nhập bên dưới.
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: "100%" }}>
            <SimpleGrid cols={1} spacing="sm" verticalSpacing="xs">
              <Input
                type="text"
                placeholder="Email/Số Điện Thoại"
                classNames={{ input: styles.customInput }}
                {...form.getInputProps("username")}
              />

              <PasswordInput
                placeholder="Mật Khẩu"
                classNames={{ input: styles.customInput }}
                {...form.getInputProps("password")}
              />

              <Button
                type="submit"
                fullWidth
                radius="md"
                size="md"
                mt="md"
                className={styles.button}
              >
                ĐĂNG NHẬP
              </Button>
            </SimpleGrid>
          </form>

          <a href="/quen-mat-khau" className={styles.forgotText}>
            <Text size="sm">Quên Mật Khẩu?</Text>
          </a>

          <Text size="xs" className={styles.termsText}>
            Để được hỗ trợ thêm, vui lòng liên hệ với chúng tôi tại
            <br />
            <span className={styles.phoneNumber}>+61421189379</span>
          </Text>
        </Stack>
      </Paper>
    </Box>
  );
}
