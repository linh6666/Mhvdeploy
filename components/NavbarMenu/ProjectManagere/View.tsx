'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Tabs } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import ViewComponent from './Detailimg/index';
import ViewCreate from './Createimg/index';
import { apiarea } from '../../../library/axios';
import { API_ROUTE } from '../../../const/apiRouter';

export type ImageItem = {
  id: string;
  image_url: string;
};

type ViewProps = {
  idItem: string;
  port?: number;
  language: 'vi' | 'en';
   onSearch?: () => void; 
};

const View = ({ idItem, port, language }: ViewProps) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
useEffect(() => {
  console.log("Loading state:", loading);
}, [loading]);
  // Hàm fetch ảnh từ API
  const fetchImages = useCallback(async () => {
    if (!port) return;
    try {
      setLoading(true);
      const res = await apiarea.get(API_ROUTE.GET_DETAIL_HOME, {
        params: { port, lang: language },
      });
      const imageData: ImageItem[] = Array.isArray(res.data)
        ? res.data
        : res.data?.items || [];
      setImages(imageData);
    } catch (err) {
      console.error('❌ Lỗi fetch ảnh:', err);
    } finally {
      setLoading(false);
    }
  }, [port, language]);

  // Fetch ảnh khi mount
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div>
      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="gallery" leftSection={<IconPhoto size={15} />}>
            {language === 'vi' ? 'Xem chi tiết hình ảnh' : 'View image details'}
          </Tabs.Tab>
          <Tabs.Tab value="messages" leftSection={<IconPhoto size={15} />}>
            {language === 'vi' ? 'Thêm mới hình ảnh' : 'Add new image'}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <ViewComponent
            idItem={[idItem]}      // bọc lại thành mảng string[]
            port={port}
            language={language}
            images={images}        // truyền state từ parent
            onSearch={fetchImages} // cho phép refresh từ ViewComponent
          />
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <ViewCreate
            port={port}
            language={language}
            onSearch={fetchImages} // upload xong sẽ gọi fetchImages và cập nhật images
          />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default View;
