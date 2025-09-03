'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Table } from "@mantine/core"; // ✅ thêm Mantine Table
import { apiarea } from "../../../../library/axios";
import { API_ROUTE } from "../../../../const/apiRouter";

interface ImageItem {
  image_url: string;
}

interface CustomerDetailsProps {
  idItem: string[];
  port?: number;
  language?: "vi" | "en";
  onSearch: () => void;
}

export default function CustomerDetails({
  port,
  language = "vi",
}: CustomerDetailsProps) {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!port) return;

    const fetchImages = async () => {
      try {
        const res = await apiarea.get(API_ROUTE.GET_DETAIL_HOME, {
          params: { port, lang: language },
        });

        const imageData: ImageItem[] = res.data?.items || [];
        const urls = imageData.map((img) => img.image_url);

        setImages(urls);
        if (urls.length > 0) setSelectedImage(urls[0]);
      } catch (err) {
        console.error(`❌ Lỗi khi fetch ảnh cho port ${port}:`, err);
      }
    };

    fetchImages();
  }, [port, language]);

  if (!port) return <div>⚠️ Port không hợp lệ</div>;

  return (
    <div>
      <h2>
        {language === "vi"
          ? "Hình ảnh chi tiết của nhà!"
          : "Detailed Images of the House!"}
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginTop: "1.5rem",
          gap: 10,
        }}
      >
        {/* Ảnh lớn */}


        {/* Bảng thumbnail */}
        <Table
          highlightOnHover
          withTableBorder
          withColumnBorders
          style={{ marginTop: "1.5rem", maxWidth: "500px" }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Ảnh Thumbnail</Table.Th>
              <Table.Th>Trạng thái</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {images.map((url, idx) => (
              <Table.Tr key={idx}>
                <Table.Td>
                  <Image
                    src={url}
                    alt={`Thumbnail ${idx}`}
                    width={80}
                    height={60}
                    style={{
                      cursor: "pointer",
                  
                      objectFit: "cover",
                    }}
                   
                  />
                </Table.Td>
                <Table.Td>
                  {selectedImage === url ? "Đang chọn" : "Chưa chọn"}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
