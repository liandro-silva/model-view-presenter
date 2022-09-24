import React, { useEffect, useState } from 'react'
import styles from './styles.scss'
import Context from '@/presentation/contexts/form'
import {
  Footer,
  Input,
  LoginHeader,
  FormStatus
} from '@/presentation/components'

import { Validation } from '@/presentation/protocols'

import { Link } from 'react-router-dom'

type Props = {
  validation: Validation
}

const Signup: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])
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
