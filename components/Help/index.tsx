'use client';

import { Button } from '@mantine/core';
import { IconChevronsLeft } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import styles from "./App.module.css";

export default function TroGiupPage() {
  const router = useRouter();

  return (
    <div
  style={{
    height: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    width: '1000px',
    margin: '80px auto',
  }}
>

   

      <iframe
        src="/hdsd.pdf"
        width="100%"
        height="100%"
        style={{ flex: 1, border: '1px solid #ccc', borderRadius: '8px' }}
      />

       <div className={styles.bottomButtons}>
        <Button className={styles.button1} variant="outline" onClick={() => router.back()}>
          <IconChevronsLeft size={20} />
        </Button>
      </div>
    </div>
  );
}
