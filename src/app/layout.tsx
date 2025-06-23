import "./globals.css";
import { ReactNode } from "react";
import { MantineProvider, Box } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AppContainer from "../../common/AppContainer";
import Head from "next/head";
import { AuthProvider } from "../app/hooks/AuthProvider";

export const metadata = {
  title: "Mô Hình Việt",
  description: "Mô Hình Việt - Tiên Phong Sáng Tạo",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/* ✅ Thêm link Google Fonts vào đây */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <MantineProvider withGlobalStyles withNormalizeCSS>
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
    <AppContainer>

  {children}
      
    </AppContainer>




  
  </Box>
  <Footer />
</Box>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
