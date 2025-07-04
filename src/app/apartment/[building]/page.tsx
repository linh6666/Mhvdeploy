

// src/app/apartment/[building]/page.tsx
import CustomerDetails from "../../../../components/CustomerDetails";

interface PageProps {
  params: Promise<{
    building: string;
  }>;
}

// Chuyển đổi thành hàm async
export default async function CartPage({ params }: PageProps) {
  // Chờ để lấy giá trị của params
  const resolvedParams = await params;
  return <CustomerDetails building={resolvedParams.building} />;
}