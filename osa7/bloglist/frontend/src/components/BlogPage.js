import { useParams } from 'react-router-dom'

const BlogPage = ({ blogs, like, addComment }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return (
      <div>
        blog not found
      </div>
    )
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <h3>{blog.url}</h3>
      <div>{blog.likes} likes <button onClick={() => like(blog)}>like</button></div>
      <div>added by {blog.user.username}</div>
      <h2>comments</h2>
      <input name="comment" />
      <button onClick={() => addComment(
        blog.id, document.getElementsByName('comment')[0].value)}>Add Comment</button>
      <ul>
        {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default BlogPage