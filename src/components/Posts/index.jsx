import './styles.css'

import { Card } from '../Card'

export const Posts = ({ posts = [] }) => (
  <div className="posts">
    {posts.map(post => (
      <Card
        key={post.id}
        title={post.title}
        body={post.body}
        id={post.id}
        cover={post.cover}
      />
    ))}
  </div>
)
