"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Managent from "../../../components/Managent/Managent";

export default function InteractiveClient() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("pageId");

  if (!projectId) return <div>Không có projectId trong URL</div>;

  return <Managent projectId={projectId} />;
}
