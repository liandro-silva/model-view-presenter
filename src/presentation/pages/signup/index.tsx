import React, { useState } from 'react'
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
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: ''
  })
  return (
    <div className={styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          className={styles.form}
        >
          <h2>Criar Conta</h2>
          <Input
            placeholder="Digite seu nome"
            data-testid="name"
            name="name"
            type="text"
            id="name"
          />
          <Input
            placeholder="Digite seu e-mail"
            data-testid="email"
            name="email"
            type="email"
            id="email"
          />
          <Input
            placeholder="Digite sua senha"
            data-testid="password"
            name="password"
            type="password"
            id="password"
          />
          <Input
            placeholder="Digite sua senha novamente"
            data-testid="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            id="passwordConfirmation"
          />
          <button
            className={styles.submit}
            data-testid="submit"
            disabled
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
