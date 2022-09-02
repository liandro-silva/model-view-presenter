import React, { useContext } from "react";
import Context from "@/presentation/contexts/form";
import Spinner from "../spinner";
import styles from "./styles.scss";

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context);
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {state.isLoading && <Spinner className={styles.spinner} />}
      {errorState.main && (
        <span className={styles.error}>{errorState.main}</span>
      )}
    </div>
  );
};

export default FormStatus;
