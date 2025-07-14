'use client';

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Box } from "@mantine/core";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AppContainer from "../../common/AppContainer";

export default function LayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // ❌ Không render layout nếu vào /vi hoặc /en
  const isLangRoute = pathname?.startsWith("/vi") || pathname?.startsWith("/en");

  if (isLangRoute) return <>{children}</>;

  return (
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
  );
}
