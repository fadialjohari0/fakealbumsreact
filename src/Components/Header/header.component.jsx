import React from "react";
import styles from "./header.module.scss";

const Header = ({ title }) => {
  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>{title}</h1>
      <p className={styles.whatsNew}>Whats new</p>
    </div>
  );
};

export default Header;
