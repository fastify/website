import React from "react";
import styles from "./index.module.css";

const CustomHighLight = ({text}) => {
  return <span className={styles.textHighlight}>{text}</span>;
};

export default CustomHighLight;
