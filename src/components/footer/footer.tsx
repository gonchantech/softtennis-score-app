import React from "react";
import styles from "./footer.module.css";

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © 2025 ソフトテニススコアキーパー. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
