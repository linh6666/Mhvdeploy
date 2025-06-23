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
import { useRouter } from "next/navigation";

import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const router = useRouter();

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
          <Text size="xl" fw={700} className={styles.title}>
            WELCOME TO
          </Text>

          <Image
            src="/assets/logo/LOGO_login.png"
            alt="MHV Logo"
            width={120}
            height="auto"
            className={styles.logo}
          />

          <Text size="sm" className={styles.description}>
            Kindly{" "}
            <a href="/register" className={styles.registerLink}>
              Register
            </a>{" "}
            to access Viet Model Australia.
            <br />
            If you are already registered, please login below.
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: "100%" }}>
            <SimpleGrid cols={1} spacing="sm" verticalSpacing="xs">
              <div>
                <Input
                  type="text"
                  placeholder="Email/Mobile number"
                  classNames={{ input: styles.customInput }}
                  {...form.getInputProps("username")}
                />
              </div>
              <div>
                <PasswordInput
                  placeholder="Password"
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
                LOGIN
              </Button>
            </SimpleGrid>
          </form>

          <a href="/forgot-password" className={styles.forgotText}>
            <Text size="sm">Forgot Password ?</Text>
          </a>

          <Text size="xs" className={styles.termsText}>
            For additional assistance, please contact us at
            <br />
            <span className={styles.phoneNumber}>+61421189379</span>
          </Text>
        </Stack>
      </Paper>
    </Box>
  );
}


