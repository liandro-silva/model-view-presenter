import React from 'react'
import styles from './styles.scss'
import Context from '@/presentation/contexts/form'
import {
  Footer,
  Input,
  LoginHeader,
  FormStatus
} from '@/presentation/components'

import { Link } from 'react-router-dom'

const Signup: React.FC = () => {
  return (
    <div className={styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
        <form
          className={styles.form}
        >
          <h2>Criar Conta</h2>
          <Input
            placeholder="Digite seu nome"
            name="name"
            type="text"
            id="name"
          />
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
          <Input
            placeholder="Digite sua senha novamente"
            name="passwordConfirmation"
            type="password"
            id="passwordConfirmation"
          />
          <button
            className={styles.submit}
            type="submit"
          >
            Cadastrar
          </button>
          <Link to={'/login'} className={styles.link}>
            Voltar ao login
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
