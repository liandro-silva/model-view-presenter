import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form'
import Spinner from '../spinner'
import styles from './styles.scss'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={styles.errorWrap}>
      {state.isLoading && <Spinner className={styles.spinner} />}
      {state.mainError && (
        <span data-testid="main-error" className={styles.error}>
          {state.mainError}
        </span>
      )}
    </div>
  )
}

export default FormStatus
