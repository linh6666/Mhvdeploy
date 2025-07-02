// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { MantineProvider, Box } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AppContainer from "../../common/AppContainer";
import { AuthProvider } from "./hooks/AuthProvider";

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
          <AuthProvider>
            <Box
              style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Header />
              <Box component="main" style={{ flex: 1 }}>
                <AppContainer>{children}</AppContainer>
              </Box>
              <Footer />
            </Box>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

