import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { Home } from '.'

import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import userEvent from '@testing-library/user-event'

const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts', () => {
    return HttpResponse.json([
      {
        userId: 1,
        id: 1,
        title: 'title1',
        body: 'body1',
        url: 'img1.jpg',
      },
      {
        userId: 2,
        id: 2,
        title: 'title2',
        body: 'body2',
        url: 'img1.jpg',
      },
      {
        userId: 3,
        id: 3,
        title: 'title3',
        body: 'body3',
        url: 'img3.jpg',
      },
    ])
  }),
  http.get('https://jsonplaceholder.typicode.com/photos', () => {
    return HttpResponse.json([
      {
        url: 'https://via.placeholder.com/600/92c952',
      },
      {
        url: 'https://via.placeholder.com/600/771796',
      },
      {
        url: 'https://via.placeholder.com/600/24f355',
      },
    ])
  }),
]

const server = setupServer(...handlers)

describe('<Home />', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  it('should render search, posts and load more', async () => {
    render(<Home />)

    const noMorePosts = screen.getByText('Não existem posts !!!')

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/Type your text/i)

    expect.assertions(3)

    expect(search).toBeInTheDocument()

    const images = screen.getAllByRole('img')

    expect(images).toHaveLength(2)

    const button = screen.getByRole('button', { name: /Load more posts/i })

    expect(button).toBeInTheDocument()
  })

  it('should search for posts', async () => {
    render(<Home />)

    const noMorePosts = screen.getByText('Não existem posts !!!')

    expect.assertions(9)

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/Type your text/i)

    expect(
      screen.getByRole('heading', { name: 'title1 1' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'title2 2' })
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('heading', { name: 'title3 3' })
    ).not.toBeInTheDocument()

    await userEvent.type(search, 'title1')

    expect(
      screen.queryByRole('heading', { name: 'title2 2' })
    ).not.toBeInTheDocument()

    expect(
      screen.queryByRole('heading', { name: 'title3 3' })
    ).not.toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /Search Value: title1/ })
    ).toBeInTheDocument()

    await userEvent.clear(search)

    expect(
      screen.getByRole('heading', { name: 'title1 1' })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'title2 2' })
    ).toBeInTheDocument()

    await userEvent.type(search, 'post do not exist')

    expect(screen.getByText('Não existem posts !!!')).toBeInTheDocument()
  })

  it('should load more posts', async () => {
    render(<Home />)

    const noMorePosts = screen.getByText('Não existem posts !!!')

    await waitForElementToBeRemoved(noMorePosts)

    const button = screen.getByRole('button', { name: /Load more posts/i })

    expect(
      screen.queryByRole('heading', { name: 'title3 3' })
    ).not.toBeInTheDocument()

    await userEvent.click(button)

    expect(
      screen.getByRole('heading', { name: 'title3 3' })
    ).toBeInTheDocument()

    expect(button).toBeDisabled()
  })
})
