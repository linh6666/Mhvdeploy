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
// import { useRouter } from "next/navigation"; // Xóa dòng này nếu không sử dụng

import styles from "./LoginPage.module.css";

export default function LoginPage() {
  // const router = useRouter(); // Xóa dòng này nếu không sử dụng

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) =>
        /^\S+@\S+\.\S+$/.test(value.trim()) ? null : "Invalid email format",
      password: (value) =>
        value.trim().length >= 8 ? null : "Password must be at least 8 characters",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const response = await loginUser(values.username, values.password);

      if (response?.access_token) {
        localStorage.setItem("access_token", response.access_token);

        // ✅ Chuyển hướng về trang chủ và reload ngay
        window.location.href = "/";  // Sử dụng window.location.href để chuyển và reload
      } else {
        console.error("Đăng nhập không có access_token");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Login failed:",
          error.response?.data?.detail || "Unknown error"
        );
      } else {
        console.error("Login failed:", (error as Error).message || "Unknown error");
      }
    }
  };

  return (
    <Box className={styles.container}>
      <Paper p="xl" className={styles.paper}>
        <Stack align="center" className={styles.stack}>
          {/* <Text size="xl" fw={700} className={styles.title}>
            Chào Mừng
          </Text> */}

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
              <div>
                <Input
                  type="text"
                  placeholder="Email/Số Điện Thoại"
                  classNames={{ input: styles.customInput }}
                  {...form.getInputProps("username")}
                />
              </div>
              <div>
                <PasswordInput
                  placeholder="Mật Khẩu"
                  classNames={{ input: styles.customInput }}
                  {...form.getInputProps("password")}
                />
              </div>

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
