'use client';

import { Button, Card, Group, Image, Loader } from '@mantine/core';
import { IconChevronsLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Imagelibrary.module.css';

type ImageItem = {
  id: number;
  src: string;
  label: string;
};

export default function ImageGallery() {
  const router = useRouter();

  const images: ImageItem[] = [
    { id: 1, src: '/hinhanh/ecoretreat_1.jpg', label: 'hình 1' },
    { id: 2, src: '/hinhanh/ecoretreat_2.jpg', label: 'hình 2' },
    { id: 3, src: '/hinhanh/ecoretreat_3.jpg', label: 'hình 3' },
    { id: 4, src: '/hinhanh/ecoretreat_4.jpg', label: 'hình 4' },
    { id: 5, src: '/hinhanh/ecoretreat_5.jpg', label: 'hình 5' },
    { id: 6, src: '/hinhanh/ecoretreat_6.jpg', label: 'hình 6' },
    { id: 7, src: '/hinhanh/ecoretreat_7.jpg', label: 'hình 7' },
    { id: 8, src: '/hinhanh/ecoretreat_8.jpg', label: 'hình 8' },
  ];

  // Ảnh lớn hiện tại
  const [currentImage, setCurrentImage] = useState(images[0].src);

  // Loading ảnh lớn
  const [loading, setLoading] = useState(true);

  // Khi đổi ảnh lớn, bật lại loading
  useEffect(() => {
    setLoading(true);
    // Timeout để tránh loading treo lâu nếu ảnh lỗi hoặc không load được
    const timeout = setTimeout(() => {
      setLoading(false);
      console.warn('Image load timeout, set loading false');
    }, 100);

    return () => clearTimeout(timeout);
  }, [currentImage]);

  return (
  <Card
  shadow="sm"
  padding="lg"
  radius="md"
  withBorder
  style={{ maxWidth: 1000, margin: '100px auto', }} // chỉnh chiều cao 500px
>

      {/* Ảnh lớn hiển thị */}
      <div style={{ position: 'relative', minHeight: 360 }}>
        {loading && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          >
            <Loader />
          </div>
        )}

       <Image
  src={currentImage}
 
  alt="Ảnh hiện tại"
  radius="md"
  style={{
    width: '100%',
    height:590,
    objectFit: 'cover',
  }}
  onLoad={() => {
    console.log('Image loaded:', currentImage);
  }}
  onError={() => {
    console.error('Image failed to load:', currentImage);
  }}
/>

      </div>

      {/* Thumbnails */}
      <Group mt="md" align="center" style={{ width: '100%', overflowX: 'auto' }}>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.label}
            style={{
              width: 85,
              height: 'auto',
              cursor: 'pointer',
              border: currentImage === image.src ? '3px solid #8B994A' : '1px solid #ccc',
              borderRadius: 8,
              objectFit: 'cover',
              flexShrink: 0,
            }}
            onClick={() => setCurrentImage(image.src)}
          />
        ))}

        <div style={{ flexGrow: 1 }} />

        <Button className={styles.button} variant="outline" onClick={() => router.push("/Detail2")}>
          <IconChevronsLeft size={20} />
        </Button>
      </Group>
    </Card>
  );
}
