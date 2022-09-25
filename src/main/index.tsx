import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/presentation/router'
import '@/presentation/theme/global.scss'
import { makeLogin } from '@/main/factories/pages/login'
import { makeSignup } from '@/main/factories/pages/signup'

ReactDOM.render(
  <Router makeLogin={makeLogin} makeSignup={makeSignup} />,
  document.getElementById('root')
)
