import { useEffect } from 'react'

import './styles.css'

import { useState } from 'react'
import { Button } from '../../components/Button'
import { Posts } from '../../components/Posts'
import { TextInput } from '../../components/TextInput'
import { getPosts } from '../../utils/get-posts'

export function Home() {
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [page, setPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')

  const POST_PER_PAGE = 2

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    const postsAndPhotos = await getPosts()

    setAllPosts(postsAndPhotos)
    setPosts(postsAndPhotos.slice(page, POST_PER_PAGE))
  }

  function loadMorePosts() {
    const nextPage = page + POST_PER_PAGE
    const nextPosts = allPosts.slice(nextPage, nextPage + POST_PER_PAGE)

    posts.push(...nextPosts)

    setPosts(posts)
    setPage(nextPage)
  }

  function handleChange(event) {
    const { value } = event.target

    setSearchValue(value)
  }

  const noMorePosts = page + POST_PER_PAGE >= allPosts.length

  const filteredPosts = searchValue
    ? allPosts.filter(post =>
        post.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    : posts

  return (
    <section className="container">
      {!!searchValue && (
        <>
          <h1>Search Value: {searchValue}</h1>
          <br />
          <br />
        </>
      )}

      <div className="search-container">
        <TextInput
          onChange={handleChange}
          value={searchValue}
          placeholder={'Type your text'}
        />
      </div>

      {filteredPosts.length > 0 ? (
        <Posts posts={filteredPosts} />
      ) : (
        <h2>Não existem posts !!!</h2>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  )
}
