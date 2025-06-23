"use client";

import { useRouter } from "next/navigation";
import classes from "./display.module.css";

const Display = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/about"); // ← Điều hướng sang trang /about
  };

  return (
    <section className={classes.section}>
      <div className={classes.container}>
        <div className={classes.heading}>
          <h2 className={classes.title}>
            <span className={classes.firstLetter}>W</span>e are MHV
          </h2>
          <p className={classes.description}>
            Realistic and full of emotions, the model is a miniature life and the shortest but most vivid bridge connecting the drawing with future works. Understanding that, Viet Model always tries its best to provide customers not only an architectural model, but also to convincingly recreate the idea....
          </p>
        </div>

        <div className={classes.columns}>
          <div className={classes.columnBox}>
            <div className={classes.columnTitle}>Brand Promise</div>
            <ul>
              <li>
                Continue to maintain a leading position in architectural model production in Vietnam and be one of the top companies in Asia.
              </li>
              <li>
                <strong>PIONEERING</strong> to bring Vietnamese architectural models to the international market.
              </li>
            </ul>
          </div>
          <div className={classes.columnBox}>
            <div className={classes.columnTitle}>Brand Mission</div>
            <ul>
              <li>
                We strive to create <strong>INNOVATIVE</strong> and <strong>EFFICIENT</strong> solutions to meet customer needs. Based on the high professionalism of <strong>"ARTISANS"</strong> in the field of architectural modeling combined with modern technology, cost-effective design, with all <strong>DEDICATION</strong> and <strong>RESPONSIBILITY</strong>.
              </li>
            </ul>
          </div>
        </div>

        <div className={classes.buttonWrapper}>
          <button className={classes.button} onClick={handleClick}>
            Learn more &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Display;
