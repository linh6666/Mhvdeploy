"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Detailproject2 from "../../../../thanh-phan/chi-tiet-2"; // Default import

export default function InteractiveClient() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("pageId");

  if (!projectId) return <div>Không có projectId trong URL</div>;

  return <Detailproject2 projectId={projectId} />;
}