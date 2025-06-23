'use client';

import { Card, Button, Group } from '@mantine/core';
import { useRef, useState, useEffect } from 'react';
import styles from './DetailIntroduce.module.css';
import { IconChevronsLeft } from '@tabler/icons-react';

import { apiarea } from '../../library/axios';  // bạn đổi đường dẫn cho đúng
import { API_ROUTE } from '../../const/apiRouter'; // bạn đổi đường dẫn cho đúng

export default function VideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const stopAndClearVideo = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  };

  const handleBack = () => {
    setIsVisible(false);
    stopAndClearVideo();

    setTimeout(() => {
      window.location.href = '/Detail2';
    }, 100);
  };

  // Hàm gọi API khi video play
  const handleVideoPlay = async () => {
    try {
      // Gọi API PUT_VIDEO dùng method PUT theo API bạn cung cấp
      await apiarea.post(API_ROUTE.PUT_VIDEO);
      console.log('Gọi API PUT_VIDEO thành công khi video play');
    } catch (error) {
      console.error('Lỗi gọi API PUT_VIDEO khi video play:', error);
    }
  };

  useEffect(() => {
    return () => {
      stopAndClearVideo();
    };
  }, []);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ maxWidth: 1000, margin: '100px auto' }}
    >
      {isVisible && (
        <video
          ref={videoRef}
          controls
          autoPlay
          onPlay={handleVideoPlay}  // <-- gọi API khi video play
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: 8,
            display: 'block',
          }}
          src="/video/gioi_thieu_du_an.mp4"
          onEnded={handleBack}
        >
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      )}

      <Group mt="md" style={{ width: '100%' }}>
        <div style={{ flexGrow: 1 }} />
        <Button
          className={styles.button}
          variant="outline"
          onClick={handleBack}
        >
          <IconChevronsLeft size={20} />
        </Button>
      </Group>
    </Card>
  );
}
