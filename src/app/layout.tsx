// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";   // 👈 import ModalsProvider
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
             // 👈 đừng quên css của modals
import { AuthProvider } from "./hooks/AuthProvider";
import LayoutContent from "./LayoutContent";

export const metadata = {
  title: "Mô Hình Việt",
  description: "Mô Hình Việt - Tiên Phong Sáng Tạo",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>
          <Notifications position="top-right" />
          <ModalsProvider>   {/* 👈 bọc ModalsProvider */}
            <AuthProvider>
              <LayoutContent>{children}</LayoutContent>
            </AuthProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
