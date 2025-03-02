import { describe, expect, it } from 'vitest'

import { render, screen } from '@testing-library/react'
import { Posts } from '.'

const postsPropsMock = {
  posts: [
    {
      id: 1,
      title: 'title-1',
      body: 'body-1',
      cover: 'img/img1.png',
    },
    {
      id: 2,
      title: 'title-2',
      body: 'body-2',
      cover: 'img/img2.png',
    },
    {
      id: 3,
      title: 'title-3',
      body: 'body-3',
      cover: 'img/img3.png',
    },
  ],
}

describe('<Posts />', () => {
  it('should render posts', () => {
    render(<Posts {...postsPropsMock} />)

    expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3)
    expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3)
    expect(screen.getAllByText(/title/i)).toHaveLength(3)
  })

  it('should not render posts', () => {
    render(<Posts />)
    expect(
      screen.queryByRole('heading', { name: /title/i })
    ).not.toBeInTheDocument()
  })

  it('should match snapshot', () => {
    const { container } = render(<Posts {...postsPropsMock} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
