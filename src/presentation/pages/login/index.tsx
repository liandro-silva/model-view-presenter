import React from "react";
import styles from "./styles.scss";

import { Footer, LoginHeader, Spinner } from "@/presentation/components";

const Login: React.FC = () => {
  return (
    <div className={styles.login}>
      <LoginHeader />

      <form className={styles.form}>
        <h2>Login</h2>
        <div className={styles.inputWrap}>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <span className={styles.status} />
        </div>
        <div className={styles.inputWrap}>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <span className={styles.status} />
        </div>
        <button className={styles.submit} type="submit">
          Entrar
        </button>
        <span className={styles.link}>Criar conta</span>
        <div className={styles.errorWrap}>
          <span className={styles.error}>Erro</span>
          <Spinner className={styles.spinner} />
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
