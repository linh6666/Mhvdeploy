'use client';

import { useEffect, useState } from "react";
import CustomerDetails from "../../../../components/CustomerDetails";
import { useParams } from "next/navigation";

interface BuildingData {
  // Định nghĩa các trường cần thiết trong buildingData
  id: number;
  zone: string;
  zone_name: string;
  building_name: string;
  building_type: string;
  amenity: string;
  amenity_type: string;
  direction?: string;
  status?: string;
  bedroom?: number | string;
  price?: number | string;
  port?: number;
}

export default function CartPage() {
  const { building } = useParams();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [buildingData, setBuildingData] = useState<BuildingData[] | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("project_id");
    const buildingDataStr = localStorage.getItem("building_data");

    if (id) setProjectId(id);
    if (buildingDataStr) {
      try {
        const parsed = JSON.parse(buildingDataStr);
        setBuildingData(parsed as BuildingData[]);
      } catch (e) {
        console.error("Lỗi khi parse building_data:", e);
      }
    }
  }, []);

  if (!projectId || !buildingData) return <div>Đang tải dữ liệu...</div>;

  return (
    <CustomerDetails
      projectId={projectId}
      building={typeof building === "string" ? building : ""}
    />
  );
}







