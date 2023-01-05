import React from "react";
import styles from "./index.module.css";

const CustomHighLight = ({text}) => {
  return <code className={styles.textHighlight}>{text}</code>;
};

export default CustomHighLight;
