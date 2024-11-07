import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Card } from '.'
import { Button } from '../Button'
import { cardPropsMock } from './mock'

describe('<Card />', () => {
  it('should render Card correctly', async () => {
    render(<Card {...cardPropsMock} />)

    expect(screen.getByRole('img', { name: 'title-1' })).toHaveAttribute(
      'src',
      'img/img.png'
    )

    expect(
      screen.getByRole('heading', { name: /title-1/i })
    ).toBeInTheDocument()

    expect(screen.getByText('body-1')).toBeInTheDocument()
  })

  it('should match snapshot', async () => {
    const fn = vi.fn()

    const { container } = render(
      <Button text="Load more" disabled={false} onClick={fn} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
