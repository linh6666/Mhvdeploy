import React from "react";
// Import Next.js Image component để tối ưu hóa hình ảnh
import Image from "next/image";
import classes from "./Introduce.module.css";

const people = [
  {
    name: "Ông Nguyễn Đức Việt",
    title: "Sáng lập viên – CEO",
    // Đảm bảo đường dẫn này đúng với thư mục /public của bạn
    image: "/images/Nguyen dưc viet.jpg",
  },
  {
    name: "Bà Phùng Bích Thảo",
    title: "Sáng lập viên – CFOO",
    image: "/images/Bà Phùng Bích Thảo.avif",
  },
  {
    name: "Ông Nguyễn Thanh Tuấn",
    title: "CTO",
    image: "/images/Ông Nguyễn Thanh Tuấn.avif",
  },
];

export default function Introduce() {
  return (
    <section className={classes.section}>
      <div className="max-w-[1000px] mx-auto px-4">
        {/* Tiêu đề - Giữ nguyên theo code bạn đã gửi */}
        <h2 className={classes.title}>
          <span>R</span>esource
        </h2>

        {/* Wrapper cho các card cá nhân */}
        <div className={classes.peopleWrapper}>
          {people.map((person, idx) => (
            <div key={idx} className={classes.card}>
              {/* Sử dụng Next.js Image component */}
              <Image
                src={person.image}
                alt={person.name}
                // width và height là kích thước gốc của ảnh (hoặc kích thước mong muốn)
                // Next.js sẽ tối ưu hóa tự động
                width={300} // Ví dụ: ảnh gốc có chiều rộng 300px
                height={400} // Ví dụ: ảnh gốc có chiều cao 400px (tỷ lệ 3:4)
                className={classes.image}
                priority={true} // Có thể set true cho các ảnh quan trọng để load sớm
              />
              <div className={classes.caption}>
                <p className="font-semibold text-lg">{person.name}</p> {/* text-lg dùng từ Tailwind */}
                <p className="text-sm">{person.title}</p> {/* text-sm dùng từ Tailwind */}
              </div>
            </div>
          ))}
        </div>

        {/* Nút - Giữ nguyên theo code bạn đã gửi */}
        <div>
          <button className={classes.button}>
          Great leadership makes great team
          </button>
        </div>
      </div>
    </section>
  );
}