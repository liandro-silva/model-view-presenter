import React, { useCallback, useContext } from 'react'
import Context from '@/presentation/contexts/form'
import styles from './styles.scss'

type InputProps = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { state, setState } = useContext(Context)
  const error = state[props.name + 'Error']
  const enableInput = useCallback(
    (event: React.FocusEvent<HTMLInputElement, Element>) => {
      event.target.readOnly = false
    },
    []
  )

  const handleChange = (event: React.FocusEvent<HTMLInputElement, Element>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const getStatus = (): string => {
    return error ? '🔴' : '🟢'
  }

  const getTitle = (): string => {
    return error || ''
  }
  return (
    <div className={styles.inputWrap}>
      <input
        data-testid={props.name}
        {...props}
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={styles.status}
      >
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
