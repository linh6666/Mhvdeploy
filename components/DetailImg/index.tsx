"use client";

import { Button, Card, Group } from "@mantine/core";
import { IconChevronsLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import styles from "./Detailimg.module.css";
import Image from "next/image";

type VideoItem = {
  id: number;
  src: string; // YouTube video ID
  label: string;
};

export default function VideoCard() {
  const router = useRouter();

  const videos: VideoItem[] = useMemo(
    () => [
      {
        id: 1,
        src: "-_tvkX330UU",
        label: "Lễ khởi công",
      },
      {
        id: 2,
        src: "Ho5MF0AiLlM",
        label: "Giới thiệu tổng thể",
      },
    ],
    []
  );

  const [currentVideo, setCurrentVideo] = useState(videos[0].src);

  const thumbnails = useMemo(() => {
    const map: { [id: number]: string } = {};
    videos.forEach((video) => {
      map[video.id] = `https://img.youtube.com/vi/${video.src}/mqdefault.jpg`;
    });
    return map;
  }, [videos]);

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "100px auto",
      }}
    >
      <iframe
        key={currentVideo}
        src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&controls=1`}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "16 / 9",
          borderRadius: 8,
          display: "block",
        }}
      ></iframe>

      <Group mt="md" align="center" style={{ width: "100%" }}>
        {videos.map((video) => (
          <Image
            key={video.id}
            src={thumbnails[video.id]}
            alt={video.label}
            width={150}
            height={90}
            style={{
              cursor: "pointer",
              border:
                currentVideo === video.src
                  ? "3px solid #8B994A"
                  : "1px solid #ccc",
              borderRadius: 8,
              objectFit: "cover",
            }}
            onClick={() => setCurrentVideo(video.src)}
          />
        ))}

        <div style={{ flexGrow: 1 }} />

        <Button
          className={styles.button}
          variant="outline"
          onClick={() => router.push("/chi-tiet-du-an?pageId=${project.id}")}
        >
          <IconChevronsLeft size={20} />
        </Button>
      </Group>
    </Card>
  );
}
