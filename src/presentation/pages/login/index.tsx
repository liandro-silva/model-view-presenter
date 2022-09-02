import React, { useEffect, useState } from "react";
import styles from "./styles.scss";
import Context from "@/presentation/contexts/form";
import {
  Footer,
  Input,
  LoginHeader,
  FormStatus,
} from "@/presentation/components";
import { Validation } from "@/presentation/protocols/validation.protocol";

type Props = {
  validation: Validation;
};

const Login: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
    mainError: "",
  });

  useEffect(() => {
    validation.validate({ email: state.email });
  }, [state.email]);
  return (
    <div className={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
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
          <button
            data-testid="submit"
            disabled
            className={styles.submit}
            type="submit"
          >
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
