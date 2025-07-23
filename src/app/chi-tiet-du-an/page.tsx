// app/chi-tiet-du-an/page.tsx
'use client';

import React from "react";
import { useSearchParams } from "next/navigation";
import Detailproject2 from "../../../components/detailproject2";

export default function Interactive() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("pageId"); // Lấy pageId từ URL

  return (
    <Detailproject2 projectId={projectId as string} />
  );
}
