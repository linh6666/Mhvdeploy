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
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { registerUser } from "../../../api/apiRegister";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation"; // ✅ App Router
import styles from "./registerPage.module.css";

export default function RegisterPage() {
  const [visible, { toggle }] = useDisclosure(false);
  const router = useRouter(); // ✅ Khởi tạo router

  const form = useForm({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      fullName: (value) =>
        value.trim().length === 0 ? "Full name is required" : null,
    
      email: (value) =>
        value.trim().length === 0
          ? "Email is required"
          : !/^\S+@\S+\.\S+$/.test(value)
          ? "Invalid email format"
          : null,
    
      phone: (value) =>
        value.trim().length === 0
          ? "Phone number is required"
          : !/^\d{10,}$/.test(value)
          ? "Phone must be at least 10 digits"
          : null,
    
      password: (value) =>
        value.trim().length === 0
          ? "Password is required"
          : value.length < 8
          ? "Password must be at least 8 characters"
          : null,
    
      confirmPassword: (value, values) =>
        value.trim().length === 0
          ? "Confirm password is required"
          : value.length < 8
          ? "Confirm password must be at least 8 characters"
          : value !== values.password
          ? "Passwords do not match"
          : null,
    }
    
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const res = await registerUser(
        values.email,
        values.fullName,
        values.password,
        values.confirmPassword,
        values.phone
      );
      console.log("Registration successful:", res);

      // ✅ Hiển thị thông báo thành công
      showNotification({
        title: "Thông báo",
        message: "Đăng ký thành công!",
        color: "green",
        icon: <span>✔️</span>,
      });

      form.reset(); // ✅ Xóa dữ liệu form

      setTimeout(() => {
        router.push("/login"); // ✅ Chuyển về trang login
      }, 1500);
    } catch (error: any) {
      console.error("Registration failed:", error.message);

      // ✅ Hiển thị thông báo lỗi
      showNotification({
        title: "Lỗi",
        message: error.message || "Đăng ký thất bại!",
        color: "red",
      });
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

          <Text size="md" className={styles.description}>
            Enter your details and start journey with us.
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <SimpleGrid cols={1} spacing="sm" verticalSpacing="xs">
              <Input
                type="text"
                placeholder="Full name"
                classNames={{ input: styles.customInput }}
                {...form.getInputProps("fullName")}
              />

              <Input
                type="email"
                placeholder="Email"
                classNames={{ input: styles.customInput }}
                {...form.getInputProps("email")}
              />

              <Input
                type="tel"
                placeholder="Mobile number"
                classNames={{ input: styles.customInput }}
                {...form.getInputProps("phone")}
              />

              <PasswordInput
                placeholder="Password"
                visible={visible}
                onVisibilityChange={toggle}
                classNames={{ input: styles.customInput }}
                {...form.getInputProps("password")}
              />

              <PasswordInput
                placeholder="Confirm password"
                visible={visible}
                onVisibilityChange={toggle}
                classNames={{ input: styles.customInput }}
                {...form.getInputProps("confirmPassword")}
              />

              <Button
                type="submit"
                fullWidth
                radius="md"
                size="md"
                mt="md"
                className={styles.button}
              >
                REGISTER
              </Button>
            </SimpleGrid>
          </form>

          <Text size="xs" className={styles.termsText}>
            Already have an account?{" "}
            <a href="/login" className={styles.phoneNumber}>
              Sign in
            </a>
          </Text>
        </Stack>
      </Paper>
    </Box>
  );
}
