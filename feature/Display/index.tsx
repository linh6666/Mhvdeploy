"use client";

import { useRouter } from "next/navigation";
import classes from "./display.module.css";

const Display = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/about");
   // ← Điều hướng sang trang /about
  };

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.heading}>
          <h2 className={classes.title}>
            <span className={classes.firstLetter}>C</span>húng tôi là MHV
          </h2>
          <p className={classes.description}>
            Chân thực và đầy cảm xúc, mô hình là cuộc sống thu nhỏ và là cây cầu ngắn nhất nhưng sống động nhất gắn bản vẽ với những công trình tương lai. Hiểu được điều đó, Mô hình Việt luôn nỗ lực hết mình nhằm cung cấp cho khách hàng không chỉ một mô hình kiến trúc, hơn thế nữa chúng tôi tái hiện lại ý tưởng một cách thuyết phục....
          </p>
        </div>

        <div className={classes.columns}>
          <div className={classes.columnBox}>
            <div className={classes.columnTitle}>
Lời hứa thương hiệu</div>
            <ul>
              <li>
                Tiếp tục giữu vững là công ty đi đâu trong công việc sản xuất <strong>MÔ HÌNH KIẾN TRÚC</strong> ở Việt Nam và là một trong những công ty tốt nhất ở châu Á.
              </li>
              <li>
                <strong>TIÊN PHONG</strong> mang sản phẩm mô hình Kiến trúc Việt Nam ra thị trường Quốc tế.
              </li>
            </ul>
          </div>
          <div className={classes.columnBox}>
            <div className={classes.columnTitle}>Sứ mệnh thương hiệu</div>
            <ul>
              <li>
                Chúng tôi nỗ lực <strong>SÁNG TẠO</strong>ra các giải pháp <strong>THÔNG MINH,HIỆU QUẢ</strong>để đáp ứng tối ưu nhu cầu của khách hàng, đối tác dựa trên tình độ chuyên môn cao của các <strong>"NGHỆ NHÂN"</strong>trong lĩnh vực mô hình kiến trúc kết hợp với công nghệ hiện đại, thiết bị tiên tiến, bằng tất cả <strong>NHIỆT HUYẾT</strong>và<strong>TRÁCH NHIỆM</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className={classes.buttonWrapper}>
          <button className={classes.button} onClick={handleClick}>
            Xem Thêm &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Display;
