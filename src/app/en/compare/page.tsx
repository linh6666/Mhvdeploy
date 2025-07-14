import React from "react";
import styles from "./compare.module.css"; // Import CSS Module
import Link from "next/link";

export default function App() {
  return (
    <div className={styles.container}>
      <div className={styles.cardWrapper}>
        {/* First Property Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>01201-7-10</div>
          <div className={styles.cardContent}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Product/ Building Type:</label>
              <input 
                type="text" 
                value="Residences" 
                className={styles.inputField}
                readOnly
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Product/ Building ID:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Location:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Number of Storey:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Direction of Building/ House:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Selling Price:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Tax:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Status:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Rate:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
          </div>
        </div>

        {/* Second Property Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>01201-7-11</div>
          <div className={styles.cardContent}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Product/ Building Type:</label>
              <input 
                type="text" 
                value="Residences" 
                className={styles.inputField}
                readOnly
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Product/ Building ID:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Location:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Number of Storey:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Direction of Building/ House:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Selling Price:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Tax:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Status:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Rate:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
          </div>
        </div>

        {/* Third Property Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>01201-7-12</div>
          <div className={styles.cardContent}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Product/ Building Type:</label>
              <input 
                type="text" 
                value="Residences" 
                className={styles.inputField}
                readOnly
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Product/ Building ID:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Location:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Number of Storey:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Direction of Building/ House:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Selling Price:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Tax:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Status:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Rate:</label>
              <input 
                type="text" 
                className={styles.inputField}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <Link href="/cart" className={styles.button}>
  GO BACK
</Link>
          <button className={styles.button}>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            SEARCH LOT
          </button>
          <button className={styles.button}>COMPARE</button>
          <button className={styles.button}>SEND TO EMAIL</button>
          <button className={styles.button}>PRINT</button>
        </div>
      </div>
    </div>
  );
}


