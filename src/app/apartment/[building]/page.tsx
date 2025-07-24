
// // src/app/apartment/[building]/page.tsx
// 'use client';

// import { useEffect, useState } from "react";
// import CustomerDetails from "../../../../components/CustomerDetails";

// interface PageProps {
//   params: {
//     building: string;
//   };
// }

// export default function CartPage({ params }: PageProps) {
//   const { building } = params;
//   const [projectId, setProjectId] = useState<string | null>(null);

//   useEffect(() => {
//     const id = localStorage.getItem("project_id");
//     if (id) setProjectId(id);
//   }, []);

//   if (!projectId) return <div>Đang tải dữ liệu...</div>;

//   return <CustomerDetails projectId={projectId} building={building} />;
// }



// src/app/apartment/[building]/page.tsx
import CustomerDetails from "../../../../components/CustomerDetails";

interface PageProps {
  params: Promise<{
    building: string;
    projectId: string;
  }>;
}

// Chuyển đổi thành hàm async
export default async function CartPage({ params }: PageProps) {
  // Chờ để lấy giá trị của params
  const resolvedParams = await params;

  return (
    <CustomerDetails
      projectId={resolvedParams.projectId}
      building={resolvedParams.building}
    />
  );
}

