import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (!user) {
    return (
      <div>
        user not found
      </div>
    )
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <b>added blogs</b>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default User