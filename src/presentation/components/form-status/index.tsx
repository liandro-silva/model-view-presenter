import React from "react";
import Spinner from "../spinner";

import styles from "./styles.scss";

type Props = {
  message: string;
};

const FormStatus: React.FC<Props> = ({ message }: Props) => {
  return (
    <div className={styles.errorWrap}>
      <Spinner className={styles.spinner} />
      <span className={styles.error}>{message}</span>
    </div>
  );
};

export default FormStatus;
