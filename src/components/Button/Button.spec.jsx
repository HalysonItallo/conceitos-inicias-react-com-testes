import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '.'

describe('<Button />', () => {
  it('should render the button with the text "Load more"', async () => {
    render(<Button text={'Load more'} />)

    expect.assertions(1)

    const button = screen.getByRole('button', { name: /Load more/i })
    expect(button).toBeInTheDocument()
  })

  it('should call function on button click', async () => {
    const fn = vi.fn()

    render(<Button text={'Load more'} onClick={fn} />)
    const button = screen.getByRole('button', { name: /Load more/i })

    await userEvent.click(button)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should be disable when disable is true', async () => {
    render(<Button text={'Load more'} disabled={true} />)
    const button = screen.getByRole('button', { name: /Load more/i })

    expect(button).toBeDisabled()
  })

  it('should be disable when disable is false', async () => {
    render(<Button text={'Load more'} disabled={false} />)
    const button = screen.getByRole('button', { name: /Load more/i })

    expect(button).toBeEnabled()
  })
})
