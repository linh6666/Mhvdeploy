
"use client";

import React, { useRef } from "react";
import Image from "next/image";
import styles from "./PagaAbout.module.css";
import { SimpleGrid } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import AppContainer from "../../common/AppContainer";

const logos = [
  "/assets/images/Logo/Bim-group-1.png",
  "/assets/images/Logo/Bitexco.png",
  "/assets/images/Logo/CANOPY SANDS.png",
  "/assets/images/Logo/CDC HA NOI.png",
  "/assets/images/Logo/Ciputra.png",
  "/assets/images/Logo/dwp.png",
  "/assets/images/Logo/Ecopark.png",
  "/assets/images/Logo/Gamuda_Berhad_Logo.png",
  "/assets/images/Logo/gensler-logo-png-transparent@2x (1).png",
  "/assets/images/Logo/GMP.png",
  "/assets/images/Logo/HIM LAM.png",
  "/assets/images/Logo/HTT GROUP.png",
  "/assets/images/Logo/kume sekkei.png",
  "/assets/images/Logo/Lac Hong.png",
  "/assets/images/Logo/LOGO_login.png",
  "/assets/images/Logo/MIK group.png",
  "/assets/images/Logo/nihon sekkei.png",
  "/assets/images/Logo/PRINCE HOLDING GROUP.png",
  "/assets/images/Logo/Sun group.png",
  "/assets/images/Logo/Sunshine group.png",
  "/assets/images/Logo/TAHG.png",
  "/assets/images/Logo/tasco.png",
  "/assets/images/Logo/thurlow.png",
  "/assets/images/Logo/Vinhomes.png",
  "/assets/images/Logo/VSIP.png",
];

const clients = [
  {
    name: "Nikken Sekkei Civil Engineering, Nhật Bản",
    desc: " Quy hoạch tổng thể Nong Ping - Dương Đông - Vientiane - Sayaboury. ",
  },
  {
    name: "Nikken Sekkei Head Office, Nhật Bản",
    desc: "Ủy ban nhân dân thành phố Hồ Chí Minh.",
  },
  {
    name: "Aedas, Anh",
    desc: "Trung tâm thương mại Minh Khai.",
  },
  {
    name: "Nihon Sekkei, Nhật Bản",
    desc: "Trụ sở Viettel - Trụ sở Vietcom Bank.",
  },
  {
    name: "Venture International Property, Dubai UAE ",
    desc: " Cung điện hoàng gia - Royal Tower.",
  },
  {
    name: "TAHG, Dubai UAE",
    desc: "Biệt thự trên biển.",
  },
  {
    name: "Thurlow Corp, Melbourne Australia",
    desc: "Tòa tháp Elysian.",
  },
  {
    name: "Canopy Sands Development",
    desc: "Bay of Lights",
  },
  {
    name: "VKC",
    desc: " Urban Living Lab Diorama - MP Diorama",
  },
  {
    name: "Gensler Singapore Inc.",
    desc: "108 Storey Financial Tower - UOB Headquarter in HCMC",
  },
    {
    name: "Layan Best View Co., Ltd",
    desc: " Layan Verde Phuket",
  },

];

const AboutUs = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  return (
    <AppContainer>
      <section className={styles.heroSection}>
        <div className={styles.introSection}>
          <div className={styles.introCard}>
            <div className={styles.introContent}>
              <h1 className={styles.introTitle}>Mô hình Việt</h1>
              <h2 className={styles.introSubtitle}>
                Hành trình <span className={styles.highlight}>Tiên phong Sáng tạo</span>
              </h2>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" className={styles.introGrid}>
                <div className={styles.introDescriptionWrapper}>
                  <p className={styles.introDescription}>
                   Được khởi đầu từ năm 2001, Mô hình Việt tự hào là một trong những công ty sản xuất mô hình chuyên nghiệp, uy tín nhất tại Việt Nam, và là đơn vị tiên phong mang mô hình Việt Nam ra thị trường thế giới
                  </p>
                </div>

                <div className={styles.buttonGroup}>
                  <div className={styles.customButtonWrapper}>
                    <div
                      className={styles.customButton}
                      onClick={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <span className={styles.buttonNumber}>01</span>
                      <span className={styles.buttonText}>Về chúng tôi</span>
                      <IconChevronDown className={styles.iconWrapper} size={16} />
                    </div>
                  </div>

                  <div className={styles.customButtonWrapper}>
                    <div
                      className={styles.customButton}
                      onClick={() => clientsRef.current?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <span className={styles.buttonNumber}>02</span>
                      <span className={styles.buttonText}>Khách hàng</span>
                      <IconChevronDown className={styles.iconWrapper} size={16} />
                    </div>
                  </div>

                  <div className={styles.customButtonWrapper}>
                    <div
                      className={styles.customButton}
                      onClick={() => visionRef.current?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <span className={styles.buttonNumber}>03</span>
                      <span className={styles.buttonText}>Tầm nhìn</span>
                      <IconChevronDown className={styles.iconWrapper} size={16} />
                    </div>
                  </div>
                </div>
              </SimpleGrid>
            </div>
          </div>
        </div>

        <div ref={aboutRef} className={styles.body}>
          <div className={styles.container}>
            <div className={styles.leftPanel}>
              <div className={styles.card}>
                <h3>Đội Ngũ và Công Nghệ</h3>
                <p>
                 Với đội ngũ kỹ thuật viên chuyên nghiệp, trách nhiệm, cùng công nghệ cắt laser tiên tiến nhất và quy trình sản xuất, tuyển chọn vật liệu kỹ lưỡng, chúng tôi tâm huyết mang tới các giải pháp tiên phong sáng tạo để tạo ra ngày càng nhiều các mô hình kiến trúc hiệu quả, đẳng cấp thế giới phục vụ khách hàng.
                </p>
              </div>

              <div className={styles.card}>
                <h3>Hợp Tác và Uy Tín</h3>
                <p>
                  Hợp tác với nhiều nhà phát triển bất động sản tên tuổi tại Việt Nam như BIM Group, Ecopark, VinGroup, Bitexco, Gamuda, Ciputra, Sunshine Group cũng như nhiều nhà tư vấn kiến trúc đẳng cấp thế giới: Nikken Sekkei, Aedas, SOM, PTW, DWP và rất nhiều đối tác nổi tiếng khác. Chúng tôi vinh dự mang đến cho khách hàng kinh nghiệm, sự tin cậy trong nhiều năm qua và cả trong những năm tới.
                </p>
              </div>

              <div className={`${styles.card} ${styles.cardOrangeBrown}`}>
                <h3>Sáng Tạo và Trách Nhiệm</h3>
                <p>
                  Mô hình Việt hiểu rằng mỗi khách hàng không chỉ là nhà thiết kế mà còn là khán giả của tác phẩm mình. Vì thế, chúng tôi tận tâm mang đến những mô hình sinh động, ấn tượng với sự sáng tạo, khéo léo và nhiệt huyết, tạo nên “màn trình diễn tuyệt vời” của ý tưởng. Và kết quả của những nỗ lực không ngừng đó chính là niềm tin của khách hàng khắp nơi dành cho Mô hình Việt trong nhiều năm qua.
                </p>
              </div>
            </div>

            <div className={styles.rightPanel}>
              <div>
                <h2>
                  Khán giả cho<br />&quot;tác phẩm&quot;của mình
                </h2>
                <p>
                 Hãy cùng Mô hình Việt trải nghiệm những &ldquo;màn trình diễn tuyệt vời nhất của ý tưởng&rdquo; thông qua các sản phẩm, dịch vụ của chúng tôi
                </p>
              </div>
              <a href="#" className={styles.contactButton}>Gửi yêu cầu liên hệ</a>
            </div>
          </div>
        </div>

        <section className={styles.statsSection}>
          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>1500+</div>
              <div className={styles.statDescription}>Khách hàng và đối tác</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>900+</div>
              <div className={styles.statDescription}>Mô hình dự án</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10+</div>
              <div className={styles.statDescription}>quốc gia</div>
            </div>
          </div>
        </section>

        <div className={styles.logoSlider}>
          <div className={styles.logoTrack}>
            {[...logos, ...logos].map((logo, idx) => (
              <div key={idx} className={styles.logoItem}>
                <Image src={logo} alt={`logo-${idx}`} fill className={styles.logoImage} />
              </div>
            ))}
          </div>
        </div>

        <div ref={clientsRef} className={styles.clientsWrapper}>
          <div className={styles.clientsSection}>
            <div className={styles.clientsContainer}>
              <div className={styles.clientsTitle}>
                <h2>
                  <span className={styles.largeI}>K</span>hách hàng quốc tế<br />
                  và các dự án
                </h2>
              </div>
              <ul className={styles.clientsList}>
                {clients.map((client, idx) => (
                  <li key={idx}>
                    <span>{client.name}</span> - {client.desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.domesticSection}>
            <div className={styles.domesticContainer}>
              <div className={styles.domesticLeft}>
                <h2>
                  <span className={styles.bigLetter}>K</span>hách hàng{" "}
                  <span className={styles.lightText}>trong nước</span>
                  <span className={styles.lightText}>và các dự án</span>
                </h2>
              </div>
              <div className={styles.domesticRight}>
                <ul>
                  <li><span className={styles.highlight}>* Ecopark Group</span> &ndash; Khu đô thị Ecopark - Eco Central Park Vinh - EcoVillage Saigon River - Eco Retreat Long An. </li>
                  <li><span className={styles.highlight}>* Sunshine Group</span> &ndash; Sunshine Garden Village - Sunshine Riverside - Sunshine City - Sunshine Golden River - Sunshine Noble Crystal.</li>
                  <li><span className={styles.highlight}>* Bitexco Group</span> &ndash;  The Manor Central Park - The Manor Hue - The Manor Lào Cai.</li>
                  <li><span className={styles.highlight}>*  Vinhomes, VinGroup</span> &ndash; Vinhomes Sky Lake - Vinhomes Me Tri - Vinhomes Riverside - Vinhomes Star City Thanh Hóa.</li>
                  <li><span className={styles.highlight}>* BIM Group</span> &ndash; Khu đô thị Hùng Thắng, Hạ Long - Khách sạn Phú Quốc - Thanh Xuân Valley.</li>
                  <li><span className={styles.highlight}>* MIK Group</span> &ndash; The Matrix One - Imperial Smart City</li>
                  <li><span className={styles.highlight}>* Viện Quy hoạch Xây dựng Hà Nội (HUPI)</span> &ndash; Quy hoạch Hà Nội </li>
                  <li><span className={styles.highlight}>* VSIP</span> &ndash; VSIP Hải Dương - VSIP Bắc Ninh - VSIP Lạng Sơn</li>
                  <li><span className={styles.highlight}>* Hanoi People Committee </span> &ndash; Quy hoạch tổng thể Nội Bài, Nhật Tân, Hà Nội - Hanoi High_rise Limitation Study Masterplan.</li>
                   <li><span className={styles.highlight}>* Gamuda Land Vietnam </span> &ndash;  Quy hoạch tổng thể Gamuda Garden and its sub-project.</li>
                    <li><span className={styles.highlight}>* Sun Group </span> &ndash; Cầu Tứ Liên - Sun City - QHTT Nam Phú Quốc, QH Thị trấn Địa Trung Hải </li>
                     <li><span className={styles.highlight}>* Star Lake Development  </span> &ndash; Quy hoạch tổng thể Star Lake - Các mẫu biệt thự.</li>
                      <li><span className={styles.highlight}>* Alma, Israel </span> &ndash; Khu nghỉ dưỡng Alma</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section ref={visionRef} className={styles.visionSection}>
          <div className={styles.visionContainer}>
            <div className={styles.visionContent}>
              <div className={styles.visionHeadingContainer}>
                <h2 className={styles.visionHeading}>Tầm nhìn</h2>
              </div>

              <div className={styles.quoteBlock}>
                <p className={styles.quoteText}>
                  Mô hình Việt luôn không ngừng hướng tới vị thế <span className={styles.boldText}>ĐĂNG CẤP TOÀN CẦU </span>trong lĩnh vực mô hình kiến trúcở cả thị trường  trong nước và thế giới.
                </p>
                <p className={styles.quoteText}>
                  Chúng tôi nỗ lực <span className={styles.boldText}>SÁNG TẠO </span>ra các giải pháp <span className={styles.boldText}>THÔNG MINH,HIỆU QUẢ </span>để đáp ứng tối ưu nhu cầu của khách hàng, đối tác dựa trên trình độ chuyên môn cao của các &ldquo;NGHỆ NHÂN&rdquo;trong lĩnh vực mô hình kiến trúc kết hợp với công nghệ hiện đại ,thiết bị tiên tiến bằng tất cả <span className={styles.boldText}>NHIỆT HUYẾT VÀ TRÁCH NHIỆM</span>.
                </p>
              </div>
            </div>

            <div className={styles.visionImage}>
              <Image
                src="/images/iStock_666856650.tif"
                alt="Laser Cutting Machine"
                width={700}
                height={450}
                layout="responsive"
                objectFit="cover"
              />
            </div>
          </div>
        </section>
      </section>
    </AppContainer>
  );
};

export default AboutUs;