import React from "react";

import styles from "./styles.scss";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div className={styles.inputWrap}>
      <input {...props} />
      <span className={styles.status} />
    </div>
  );
};

export default Input;
