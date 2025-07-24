"use client";

import { Card, Button, Group } from "@mantine/core";
import { useRef, useState, useEffect } from "react";
import styles from "./DetailIntroduce.module.css";
import { IconChevronsLeft } from "@tabler/icons-react";

// import { apiarea } from '../../library/axios';
// import { API_ROUTE } from '../../const/apiRouter';

export default function VideoCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const stopAndClearVideo = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
  };

  const handleBack = () => {
    setIsVisible(false);
    stopAndClearVideo();

    setTimeout(() => {
      window.location.href = `/chi-tiet-du-an?pageId=123`;
    }, 100);
  };

  // Hàm gọi API khi video play
  // const handleVideoPlay = async () => {
  //   try {
  //     await apiarea.post(API_ROUTE.PUT_VIDEO);
  //     console.log('Gọi API PUT_VIDEO thành công khi video play');
  //   } catch (error) {
  //     console.error('Lỗi gọi API PUT_VIDEO khi video play:', error);
  //   }
  // };

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
      style={{
        width: "100%",
        maxWidth: "950px",
        margin: "100px auto",
      }}
    >
      {isVisible && (
        <iframe
          src="https://www.youtube.com/embed/G0hZ-uPof7A?autoplay=1&controls=1"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: 8,
            display: "block",
          }}
        ></iframe>
      )}

      <Group mt="md" style={{ width: "100%" }}>
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
