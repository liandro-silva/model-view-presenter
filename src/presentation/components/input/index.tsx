import React, { useCallback, useContext } from "react";
import Context from "@/presentation/contexts/form";
import styles from "./styles.scss";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { errorState } = useContext(Context);
  const error = errorState[props.name];
  const enableInput = useCallback(
    (event: React.FocusEvent<HTMLInputElement, Element>) => {
      event.target.readOnly = false;
    },
    []
  );

  const getStatus = (): string => {
    return "🔴";
  };

  const getTitle = (): string => {
    return error;
  };
  return (
    <div className={styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
