import React, { useCallback } from "react";

import styles from "./styles.scss";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = (props: InputProps) => {
  const enableInput = useCallback(
    (event: React.FocusEvent<HTMLInputElement, Element>) => {
      event.target.readOnly = false;
    },
    []
  );
  return (
    <div className={styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span className={styles.status} />
    </div>
  );
};

export default Input;
