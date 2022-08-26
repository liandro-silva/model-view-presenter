import React, { useState } from "react";
import styles from "./styles.scss";
import Context from "@/presentation/contexts/form";
import {
  Footer,
  Input,
  LoginHeader,
  FormStatus,
} from "@/presentation/components";

type LoginStateProps = {
  isLoading: boolean;
  errorMessage: string;
};

const Login: React.FC = () => {
  const [state] = useState<LoginStateProps>({
    isLoading: false,
    errorMessage: "",
  });
  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={state}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input
            placeholder="Digite seu e-mail"
            name="email"
            type="email"
            id="email"
          />
          <Input
            placeholder="Digite sua senha"
            name="password"
            type="password"
            id="password"
          />
          <button className={styles.submit} type="submit">
            Entrar
          </button>
          <span className={styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
