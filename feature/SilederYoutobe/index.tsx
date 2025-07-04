import React from "react";
import classes from "./SilederYoutobe.module.css";

export default function SilederYoutobe() {
  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <div className={classes.videoWrapper}>
          <h3 className={classes.title}>PREMIUM MODELCRAFT IN VIET NAM</h3>
          <div className={classes.videoContainer}>
          <iframe
  className={classes.iframe}
  src="https://www.youtube.com/embed/T1wOSectc2Y?rel=0&autoplay=1&mute=1"
  allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
