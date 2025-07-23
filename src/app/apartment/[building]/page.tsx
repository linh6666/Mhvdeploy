
// src/app/apartment/[building]/page.tsx
'use client';

import { useEffect, useState } from "react";
import CustomerDetails from "../../../../components/CustomerDetails";

interface PageProps {
  params: {
    building: string;
  };
}

export default function CartPage({ params }: PageProps) {
  const { building } = params;
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("project_id");
    if (id) setProjectId(id);
  }, []);

  if (!projectId) return <div>Đang tải dữ liệu...</div>;

  return <CustomerDetails projectId={projectId} building={building} />;
}
