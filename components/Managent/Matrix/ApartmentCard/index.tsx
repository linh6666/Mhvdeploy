"use client";
import React, { useEffect, useState } from "react";
import { Modal, Text, Loader } from "@mantine/core";
import { apiarea } from "../../../../library/axios";
import { API_ROUTE } from "../../../../const/apiRouter";

interface BuildingDetail {
  zone_name: string;
  building_name: string;
  building_type: string;
  amenity: string;
  amenity_type: string;
}

interface BuildingDetailModalProps {
  opened: boolean;
  onClose: () => void;
  selected: BuildingDetail | null;
}

export default function BuildingDetailModal({
  opened,
  onClose,
  selected,
}: BuildingDetailModalProps) {
  const [detail, setDetail] = useState<BuildingDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!opened || !selected?.building_type || !selected?.zone_name) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await apiarea.get(
          API_ROUTE.GET_AREA_DETAIL_BY_TYPE(selected.zone_name, selected.building_type)
        );

        const records = res.data?.records;

        if (Array.isArray(records) && records.length > 0) {
          const found = records.find(
            (item: BuildingDetail) =>
              item.building_name === selected.building_name
          );
          setDetail(found || null);
        } else {
          setDetail(null);
        }
      } catch (error) {
        console.error("Lỗi khi fetch detail:", error);
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [opened, selected]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Thông Tin Nhà: ${selected?.building_name ?? "Không xác định"}`}
    >
      {loading ? (
        <Loader size="sm" />
      ) : detail ? (
        <>
          <Text>Khu vực: {detail.zone_name}</Text>
          <Text>Loại tòa nhà : {detail.building_type}</Text>
          <Text>Tên: {detail.
building_name}</Text>
          
        </>
      ) : (
        <Text>Không có dữ liệu</Text>
      )}
    </Modal>
  );
}




