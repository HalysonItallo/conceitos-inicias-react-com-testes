import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { it, vi } from 'vitest'
import { TextInput } from '.'

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = vi.fn()

    render(
      <TextInput
        onChange={fn}
        value={'test'}
        placeholder={'type your search'}
      />
    )

    const input = screen.getByPlaceholderText(/type your search/i)

    expect(input.value).toBe('test')
  })

  it('should call handleChange function on each key pressed', async () => {
    const fn = vi.fn()

    render(<TextInput onChange={fn} placeholder={'type your search'} />)

    const input = screen.getByPlaceholderText(/type your search/i)

    const value = 'o valor'

    await userEvent.type(input, value)

    expect(input).toHaveValue(value)
    expect(fn).toHaveBeenCalledTimes(value.length)
  })

  it('should match snapshot', () => {
    const fn = vi.fn()
    const { container } = render(
      <TextInput onChange={fn} placeholder={'type your search'} />
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
