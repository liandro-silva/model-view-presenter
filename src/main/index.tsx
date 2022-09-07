import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/presentation/router'
import '@/presentation/theme/global.scss'
import { makeLogin } from '@/main/factories/pages/login'

ReactDOM.render(
  <Router makeLogin={makeLogin} />,
  document.getElementById('root')
)
