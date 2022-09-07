import React from 'react'
import { render, screen } from '@testing-library/react'
import Spinner from '.'

describe('\n Components - Spinner\n', () => {
  it('should render with negativeClass', () => {
    render(<Spinner isNegative={true} />)
    const loading = screen.getByTestId('loading')
    expect(loading.classList).toContain('negative')
  })

  it('should render without negativeClass', () => {
    render(<Spinner isNegative={false} />)
    const loading = screen.getByTestId('loading')
    expect(loading.classList).not.toContain('negative')
  })
})
