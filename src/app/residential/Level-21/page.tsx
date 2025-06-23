"use client";
import { Image, SimpleGrid, Text, Stack } from "@mantine/core";

import React from "react";
import Link from "next/link";

import styles from "./Level-21.module.css";

// Component hiển thị item tầng trong danh sách
const KeyAreaItem = ({ level, link }: { level: number; link: string }) => {
  const isCurrentLevel = level === 21; // Kiểm tra nếu là tầng 16

  return (
    <Link
      href={link}
      className={styles.keyAreaItem}
      style={{ textDecoration: "none" }}
    >
      <div className={styles.diamondShape}></div>
      <Text
        className={`${styles.keyAreaItemText} ${
          isCurrentLevel ? styles.currentLevel : ""
        }`}
      >
        Level {level}
      </Text>
    </Link>
  );
};

export default function ResidentialPage() {
  const levels = [
    { level: 21, link: "/residential/Level-21" },
    { level: 20, link: "/residential/Level-20" },
    { level: 19, link: "/residential/Level-19" },
    { level: 18, link: "/residential/Level-18" },
    { level: 17, link: "/residential/Level-17" },
    { level: 16, link: "/residential/Level-16" },
    { level: 15, link: "/residential/Level-15" },
    { level: 14, link: "/residential/Level-14" },
    { level: 13, link: "/residential/Level-13" },
    { level: 12, link: "/residential/Level-12" },
    { level: 11, link: "/residential/Level-11" },
    { level: 10, link: "/residential/Level-10" },
    { level: 9, link: "/residential/Level-9" },
    { level: 8, link: "/residential/Level-8" },
    { level: 7, link: "/residential/Level-7" },
    { level: 6, link: "/residential/Level-6" },
    { level: 5, link: "/residential/Level-5" },
    { level: 4, link: "/residential/Level-4" },
  ];

  return (
    <SimpleGrid cols={3} spacing="xl" className={styles.simpleGrid}>
      {/* Cột trái: hình ảnh tổng có polygon tương tác */}
      <div className={styles.imageWrapper}>
        <Image
          src="/assets/images/Levelimg/level-20-21.png"
          alt="Model"
          className={styles.image}
        />
        <svg
          className={styles.overlaySvg}
          xmlns="http://www.w3.org/2000/svg"
          width="1289.883"
          height="549.648"
          viewBox="0 0 1289.883 549.648"
        >
          <g
            id="Path_445"
            data-name="Path 445"
            transform="translate(-16394 6065.073)"
            fill="#84a7a1"
            opacity="0.6"
            style={{ mixBlendMode: "multiply", isolation: "isolate" }}
          >
            <path d="M17555.703125-5515.9248046875C17543.669921875-5515.9248046875 17531.720703125-5517.1767578125 17521.150390625-5519.54541015625C17515.751953125-5520.75439453125 17510.728515625-5522.24951171875 17506.216796875-5523.9873046875C17501.56640625-5525.779296875 17497.44921875-5527.83544921875 17493.978515625-5530.09912109375C17487.025390625-5534.6337890625 17479.146484375-5538.77880859375 17470.5625-5542.41845703125C17463.697265625-5545.3291015625 17456.3671875-5547.92529296875 17448.77734375-5550.13525390625C17435.849609375-5553.89892578125 17426.513671875-5555.25439453125 17426.419921875-5555.26806640625L17425.849609375-5555.349609375L17425.849609375-5554.77294921875L17425.849609375-5518.2919921875C17409.623046875-5518.22021484375 17022.42578125-5516.533203125 16747.267578125-5516.533203125C16747.251953125-5516.533203125 16747.24609375-5516.533203125 16747.228515625-5516.533203125C16582.97265625-5516.533203125 16490.21484375-5517.12548828125 16471.53125-5518.29296875C16457.1484375-5519.19189453125 16444.1484375-5522.30224609375 16432.892578125-5527.5380859375C16423.892578125-5531.7236328125 16415.98046875-5537.26953125 16409.373046875-5544.0224609375C16403.494140625-5550.03271484375 16399.7578125-5555.90673828125 16397.658203125-5559.7763671875C16395.580078125-5563.6044921875 16394.65234375-5566.27880859375 16394.5-5566.73876953125L16394.5-6010.25390625C16395.173828125-6011.2490234375 16399.7578125-6017.9794921875 16405.73828125-6025.9541015625C16411.68359375-6033.8828125 16420.263671875-6044.69775390625 16427.376953125-6051.19189453125C16430.103515625-6053.6826171875 16433.72265625-6055.822265625 16438.130859375-6057.55078125C16441.810546875-6058.99365234375 16446.0703125-6060.16357421875 16450.79296875-6061.0283203125C16459.279296875-6062.5830078125 16467.08984375-6062.75048828125 16470.052734375-6062.75048828125C16470.9765625-6062.75048828125 16471.501953125-6062.734375 16471.5078125-6062.734375L16471.515625-6062.734375L16471.5234375-6062.734375L17425.80859375-6062.734375C17425.654296875-6060.802734375 17425.13671875-6053.99462890625 17424.859375-6046.91064453125C17424.66796875-6042.009765625 17424.625-6037.935546875 17424.736328125-6034.80126953125C17424.87890625-6030.74853515625 17425.26953125-6028.29443359375 17425.93359375-6027.29833984375C17426.625-6026.26220703125 17428.16796875-6025.73681640625 17430.521484375-6025.73681640625C17435.046875-6025.7373046875 17442.521484375-6027.6708984375 17452.138671875-6031.32958984375C17463.515625-6035.658203125 17477.578125-6042.24462890625 17493.939453125-6050.90625C17511.55078125-6060.23046875 17527.822265625-6064.5732421875 17545.1484375-6064.5732421875C17563.3828125-6064.5732421875 17581.33984375-6059.7978515625 17602.1328125-6054.2685546875C17606.30859375-6053.15771484375 17610.626953125-6052.00927734375 17615.08203125-6050.86376953125C17625.546875-6048.17333984375 17635.64453125-6042.63671875 17645.099609375-6034.4091796875C17652.677734375-6027.8134765625 17659.861328125-6019.484375 17666.451171875-6009.65283203125C17672.318359375-6000.896484375 17676.6171875-5992.54541015625 17679.189453125-5987.08203125C17681.7578125-5981.62890625 17683.166015625-5977.89013671875 17683.3828125-5977.30126953125L17683.3828125-5615.5244140625C17683.3828125-5614.7666015625 17681.857421875-5611.2294921875 17678.451171875-5605.03466796875C17674.884765625-5598.55224609375 17670.216796875-5590.88427734375 17665.306640625-5583.443359375C17659.185546875-5574.16943359375 17652.93359375-5565.5732421875 17646.72265625-5557.89404296875C17639.283203125-5548.69677734375 17632.125-5541.10888671875 17625.447265625-5535.34130859375C17621.7421875-5532.14306640625 17617.1953125-5529.25439453125 17611.927734375-5526.75634765625C17606.908203125-5524.37451171875 17601.2109375-5522.3349609375 17594.99609375-5520.6943359375C17583.177734375-5517.57373046875 17569.591796875-5515.9248046875 17555.703125-5515.9248046875Z" stroke="none"/>
          </g>
        </svg>
      </div>

      {/* Cột giữa: Status */}
      <div className={styles.keyAreass}>
        <div>
          <Text fw={500} className={styles.keyAreasTitle}>
            Status
          </Text>
          <div>
            <div className={`${styles.statusContent} ${styles.available}`}>
              Available
            </div>
            <div className={`${styles.statusContent} ${styles.interested}`}>
              Interested
            </div>
            <div className={`${styles.statusContent} ${styles.deposit}`}>
              Deposit
            </div>
            <div className={`${styles.statusContent} ${styles.sold}`}>Sold</div>
          </div>
        </div>
        <div>
          <Text fw={500} className={styles.keyAreasTitle}>
            Key
          </Text>
          <div>
            <div className={`${styles.statusContent} ${styles.bed1}`}>
              1 Bedroom
            </div>
            <div className={`${styles.statusContent} ${styles.bed2}`}>
              2 Bedrooms
            </div>
            <div className={`${styles.statusContent} ${styles.bed3}`}>
              3 Bedrooms
            </div>
          </div>
        </div>
      </div>

      {/* Cột phải: danh sách tầng */}
      <Stack className={styles.keyAreas}>
        <Text fw={500} className={styles.keyAreasTitle}>
          Level
        </Text>
        <div className={styles.keyAreaList}>
          {levels.map(({ level, link }) => (
            <KeyAreaItem key={level} level={level} link={link} />
          ))}
        </div>
      </Stack>
    </SimpleGrid>
  );
}
