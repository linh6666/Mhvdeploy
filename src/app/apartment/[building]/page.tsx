import { apiarea } from "../../../../library/axios";
import { API_ROUTE } from "../../../../const/apiRouter";
import styles from "./BuildingDetailPage.module.css";
import Image from "next/image";

interface RecordItem {
  id: number;
  zone: string;
  zone_name: string;
  building_name: string;
  building_type: string;
  amenity: string;
  amenity_type: string;
  image_url: string; // Assuming you have an image URL in your data
}

interface PageProps {
  params: {
    building: string;
  };
}

export default async function BuildingDetailPage({ params }: PageProps) {
  const { building } = await params; 
  const buildingName = decodeURIComponent(building);
  let buildingData: RecordItem | null = null;

  try {
    const res = await apiarea.get(API_ROUTE.GET_AREA_DETAIL);
    const allRecords: RecordItem[] = Array.isArray(res.data.records) ? res.data.records : [];

    buildingData = allRecords.find((item) => item.building_name === buildingName) || null;
  } catch (error) {
    console.error("Lỗi khi gọi API chi tiết:", error);
  }

  if (!buildingData) {
    return <div style={{ padding: "1rem" }}>❌ Không tìm thấy toà nhà: {buildingName}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <h1>Chi tiết: {buildingName}</h1>
        <ul style={{ lineHeight: 1.8 }}>
          <li><strong>Zone:</strong> {buildingData.zone}</li>
          <li><strong>Zone Name:</strong> {buildingData.zone_name}</li>
          <li><strong>Loại toà nhà:</strong> {buildingData.building_type}</li>
          <li><strong>Tiện ích:</strong> {buildingData.amenity}</li>
          <li><strong>Loại tiện ích:</strong> {buildingData.amenity_type}</li>
        </ul>
      </div>
    <div className={styles.imageContainer}>
  <Image src={`/images/${buildingData.image_url}`} alt={buildingName} className={styles.image} />
</div>
    </div>
  );
}