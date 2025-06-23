'use client';

import { Container, Title, SimpleGrid } from '@mantine/core';
import Image from 'next/image';
import styles from './ShoppingCart.module.css'; // import CSS module

const services = [
  {
    id: 1,
    title: 'DẪN ĐẦU CÔNG NGHỆ',
    imageSrc: '/THUMBNAIL/MH-TUONG-TAC.jpg',
    alt: 'Đầu tư công nghệ',
  },
  {
    id: 2,
    title: 'QUY HOẠCH VÙNG',
    imageSrc: '/THUMBNAIL/2-MH-QH-VUNG.jpg',
    alt: 'Quy hoạch vùng',
  },
  {
    id: 3,
    title: 'QUY HOẠCH KHU ĐÔ THỊ',
    imageSrc: '/THUMBNAIL/3-MH-QH-KDT.JPG',
    alt: 'Quy hoạch khu đô thị',
  },
  {
    id: 4,
    title: 'MÔ HÌNH CAO TẦNG',
    imageSrc: '/THUMBNAIL/4-MH-CAO-TANG.jpg',
    alt: 'Mô hình cao tầng',
  },
  {
    id: 5,
    title: 'MÔ HÌNH Ý TƯỞNG',
    imageSrc: '/THUMBNAIL/5-MH-Y-TUONG.jpg',
    alt: 'Mô hình ý tưởng',
  },
  {
    id: 6,
    title: 'BIỆT THỰ VÀ NỘI THẤT',
    imageSrc: '/THUMBNAIL/6-MH-BT-NT.jpg',
    alt: 'Biệt thự và nội thất',
  },
  {
    id: 7,
    title: 'MÔ HÌNH THƯƠNG MẠI',
    imageSrc: '/THUMBNAIL/7-MH-THUONG-MAI.JPG',
    alt: 'Mô hình thương mại',
  },
  {
    id: 8,
    title: 'NHÀ MÁY CÔNG NGHIỆP',
    imageSrc: '/THUMBNAIL/8-MH-NHA-MAY-KCN.JPG',
    alt: 'Nhà máy công nghiệp',
  },
  {
    id: 9,
    title: 'CƠ SỞ GIÁO DỤC',
    imageSrc: '/THUMBNAIL/9-MH-CS-GIAO-DUC.jpg',
    alt: 'Cơ sở giáo dục',
  },
  {
    id: 10,
    title: 'CHI TIẾT MÔ HÌNH',
    imageSrc: '/THUMBNAIL/10-CHI-TIET-MH.JPG',
    alt: 'Chi tiết mô hình',
  },
  {
    id: 11,
    title: 'MÔ HÌNH TRƯNG BÀY',
    imageSrc: '/THUMBNAIL/11-MH-TRUNG-BAY.jpg',
    alt: 'Mô hình trưng bày',
  },
  {
    id: 12,
    title: 'VẬN CHUYỂN VÀ LẮP ĐẶT',
    imageSrc: '/THUMBNAIL/12-VAN-CHUYEN-MH.jpg',
    alt: 'Vận chuyển và lắp đặt',
  },
];

const ShoppingCart = () => {
  return (
    <section className={styles.section}>
      <Container size="lg" className={styles.container}>
    <Title className={styles.title}>
  <span className={styles.firstLetter}>W</span>
  <span className={styles.restText}>hat We Do</span>
</Title>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          {services.map((service) => (
            <div key={service.id} className={styles.card}>
              <Image
                src={service.imageSrc}
                alt={service.alt}
                fill
                sizes="(max-width: 768px) 100vw, 474px"
                className={styles.image}
              />
              <div className={styles.overlay}>{service.title}</div>
            </div>
          ))}
        </SimpleGrid>
      </Container>
    </section>
  );
};

export default ShoppingCart;





