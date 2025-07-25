'use client';

import { useEffect, useState } from "react";
import CustomerDetails from "../../../../components/CustomerDetails";
import { useParams } from "next/navigation";

export default function CartPage() {
  const { building } = useParams();
  const [projectId, setProjectId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("project_id");
    if (id) setProjectId(id);
  }, []);

  if (!projectId) return <div>Đang tải dữ liệu...</div>;

  // building là string | string[] | undefined => cần ép kiểu:
  return (
    <CustomerDetails
      projectId={projectId}
      building={typeof building === "string" ? building : ""}
    />
  );
}







