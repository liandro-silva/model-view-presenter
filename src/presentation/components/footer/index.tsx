import React, { memo } from "react";

import styles from "./styles.scss";

const Footer: React.FC = () => {
  return <footer className={styles.footer} />;
};

export default memo(Footer);
