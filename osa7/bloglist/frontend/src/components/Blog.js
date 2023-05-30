import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { TableBody, TableRow, TableCell } from '@mui/material'

const Blog = ({ blog, like, canRemove, remove }) => {

  return (
    <TableBody>
      <TableRow key={blog.id}>
        <TableCell>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </TableCell>
        <TableCell>
          {blog.user.username}
        </TableCell>
      </TableRow>
    </TableBody>
  )
}

Blog.propTypes = {
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  canRemove: PropTypes.bool,
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
}

export default Blog
