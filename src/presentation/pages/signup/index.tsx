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

import { Link, useHistory } from 'react-router-dom'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const Signup: React.FC<Props> = ({ validation, addAccount, saveAccessToken }) => {
  const history = useHistory()

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
      passwordConfirmationError: validation.validate('password', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.nameError || state.emailError || state.passwordError || state.passwordConfirmationError) return
      setState({
        ...state,
        isLoading: true
      })
      const account = await addAccount.execute({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })
      saveAccessToken.execute(account.accessToken)
      history.replace('/login')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message
      })
    } finally {
      setState({
        ...state,
        isLoading: false
      })
    }
  }
  return (
    <div className={styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Criar Conta</h2>
          <Input
            placeholder="Digite seu nome"
            name="name"
            type="text"
            id="name"
            disabled={state.isLoading}
          />
          <Input
            placeholder="Digite seu e-mail"
            name="email"
            type="email"
            id="email"
            disabled={state.isLoading}

          />
          <Input
            placeholder="Digite sua senha"
            name="password"
            type="password"
            id="password"
            disabled={state.isLoading}

          />
          <Input
            placeholder="Digite sua senha novamente"
            name="passwordConfirmation"
            type="password"
            id="passwordConfirmation"
            disabled={state.isLoading}

          />
          <button
            data-testid="submit"
            disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError || state.isLoading}
            className={styles.submit}
            type="submit"
          >
            Cadastrar
          </button>
          <Link replace to={'/login'} className={styles.link}>
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
