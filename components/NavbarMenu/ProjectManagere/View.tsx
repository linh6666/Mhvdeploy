'use client';

import React, { useEffect } from 'react';
import { Tabs } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import ViewComponent from './Detailimg/index';
import ViewCreate from './Createimg/index';


type ViewProps = {
  idItem: string;
    port?: number; // thêm port
  onSearch: () => void;
  language: 'vi' | 'en';
};

const View = ({ idItem, port, onSearch, language }: ViewProps) => {
  useEffect(() => {
    console.log('Port value:', port); // test xem có nhận đúng không
  }, [port]);

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
       {/* Nếu ViewComponent thật sự cần mảng string[] → bạn phải truyền mảng vào: */}

<ViewComponent
  idItem={[idItem]} // bọc lại thành mảng
  port={port}
  language={language}
  onSearch={onSearch}
/>
      </Tabs.Panel>

      <Tabs.Panel value="messages">
        <ViewCreate  port={port} language={language} onSearch={onSearch} />
      </Tabs.Panel>

    
      </Tabs>
    </div>
  );
};

export default View;
