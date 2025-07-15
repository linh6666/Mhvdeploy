'use client';

import { Container, Title, SimpleGrid } from '@mantine/core';
import Image from 'next/image';
import styles from './ShoppingCart.module.css'; // import CSS module

const services = [
  {
    id: 1,
    title: 'INTERACTIVE MODELS',
    imageSrc: '/THUMBNAIL/MH-TUONG-TAC.jpg',
    alt: 'INTERACTIVE MODELS',
  },
  {
    id: 2,
    title: 'REGIONAL MASTER PLAN',
    imageSrc: '/THUMBNAIL/2-MH-QH-VUNG.jpg',
    alt: 'REGIONAL MASTER PLAN',
  },
  {
    id: 3,
    title: 'URBAN AREA MASTER PLAN MODEL',
    imageSrc: '/THUMBNAIL/3-MH-QH-KDT.JPG',
    alt: 'URBAN AREA MASTER PLAN MODEL',
  },
  {
    id: 4,
    title: 'HIGH-RISE',
    imageSrc: '/THUMBNAIL/4-MH-CAO-TANG.jpg',
    alt: 'HIGH-RISE',
  },
  {
    id: 5,
    title: 'CONCEPT DESIGNS',
    imageSrc: '/THUMBNAIL/5-MH-Y-TUONG.jpg',
    alt: 'CONCEPT DESIGNS',
  },
  {
    id: 6,
    title: 'VILLAS & INTERIORS',
    imageSrc: '/THUMBNAIL/6-MH-BT-NT.jpg',
    alt: 'VILLAS & INTERIORS',
  },
  {
    id: 7,
    title: 'COMMERCIAL MODELS',
    imageSrc: '/THUMBNAIL/7-MH-THUONG-MAI.JPG',
    alt: 'COMMERCIAL MODELS',
  },
  {
    id: 8,
    title: 'INDUSTRIAL FACTORY',
    imageSrc: '/THUMBNAIL/8-MH-NHA-MAY-KCN.JPG',
    alt: 'INDUSTRIAL FACTORY',
  },
  {
    id: 9,
    title: 'UNIVERSITY MODEL',
    imageSrc: '/THUMBNAIL/9-MH-CS-GIAO-DUC.jpg',
    alt: 'UNIVERSITY MODEL',
  },
  {
    id: 10,
    title: 'MODEL DETAILS',
    imageSrc: '/THUMBNAIL/10-CHI-TIET-MH.JPG',
    alt: 'MODEL DETAILS',
  },
  {
    id: 11,
    title: 'MODEL IN SHOWROOM',
    imageSrc: '/THUMBNAIL/11-MH-TRUNG-BAY.jpg',
    alt: 'MODEL IN SHOWROOM',
  },
  {
    id: 12,
    title: 'TRANSPORT & INSTALL',
    imageSrc: '/THUMBNAIL/12-VAN-CHUYEN-MH.jpg',
    alt: 'TRANSPORT & INSTALL',
  },
];

const ShoppingCart = () => {
  return (
    <section className={styles.section}>
      <Container size="lg" className={styles.container}>
    <h2 className={styles.title}>
  <span className={styles.firstLetter}>W</span>
  <span className={styles.restText}>hat We Do</span>
</h2>

        <SimpleGrid cols={{ base: 1, sm: 2 }} >
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





