"use client";

import React, { useEffect, useState } from "react";
import DetailArea from "../../../components/detailArea";

export default function Interactive() {
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("project_id");
    if (id) setProjectId(id);
  }, []);

  if (!projectId) return <div>Đang tải dữ liệu...</div>;

  return <DetailArea projectId={projectId} />;
}
