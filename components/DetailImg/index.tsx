'use client';

import { Button, Card, Group, Loader } from '@mantine/core';
import { IconChevronsLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef, useMemo } from 'react';
import styles from './Detailimg.module.css';
import Image from 'next/image';

type VideoItem = {
  id: number;
  src: string;
  label: string;
};

export default function VideoCard() {
  const router = useRouter();

  const videos: VideoItem[] = useMemo(() => [
    {
      id: 1,
      src: '/video/gioi_thieu_du_an.mp4',
      label: 'Video 1',
    },
    {
      id: 2,
      src: '/video/teaser_sk.mp4',
      label: 'Video 2',
    },
  ], []);

  const [currentVideo, setCurrentVideo] = useState(videos[0].src);
  const [thumbnails, setThumbnails] = useState<{ [id: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let loaded = 0;
    let cancelled = false;

    videos.forEach((video) => {
      if (thumbnails[video.id]) {
        loaded += 1;
        if (loaded === videos.length) setLoading(false);
        return;
      }

      const videoEl = document.createElement('video');
      videoEl.src = video.src;
      videoEl.crossOrigin = 'anonymous';

      const onLoadedMetadata = () => {
        videoEl.currentTime = 0.8;
      };

      const onSeeked = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 160;
        canvas.height = 90;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL();
          if (!cancelled) {
            setThumbnails((prev) => ({
              ...prev,
              [video.id]: thumbnailUrl,
            }));
          }
        }

        loaded += 1;
        if (loaded === videos.length && !cancelled) {
          setLoading(false);
        }

        videoEl.remove();
        canvas.remove();
      };

      const onError = () => {
        loaded += 1;
        if (loaded === videos.length && !cancelled) {
          setLoading(false);
        }
        videoEl.remove();
      };

      videoEl.addEventListener('loadedmetadata', onLoadedMetadata);
      videoEl.addEventListener('seeked', onSeeked);
      videoEl.addEventListener('error', onError);
    });

    return () => {
      cancelled = true;
    };
  }, [videos, thumbnails]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Trình duyệt chặn autoplay
      });
    }
  }, [currentVideo]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 1000, margin: '100px auto' }}>
      <video
        key={currentVideo}
        ref={videoRef}
        controls
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: 8,
          display: 'block',
        }}
        src={currentVideo}
      >
        Trình duyệt của bạn không hỗ trợ video.
      </video>

      <Group mt="md" align="center" style={{ width: '100%' }}>
        {loading ? (
          <Loader />
        ) : (
          videos.map((video) => (
            <Image
              key={video.id}
              src={thumbnails[video.id]}
              alt={video.label}
              style={{
                width: 150,
                height: 'auto',
                cursor: 'pointer',
                border: currentVideo === video.src ? '3px solid #8B994A' : '1px solid #ccc',
                borderRadius: 8,
                objectFit: 'cover',
              }}
              onClick={() => setCurrentVideo(video.src)}
            />
          ))
        )}

        <div style={{ flexGrow: 1 }} />

        <Button className={styles.button} variant="outline" onClick={() => router.push("/Detail2")}>
          <IconChevronsLeft size={20} />
        </Button>
      </Group>
    </Card>
  );
}
