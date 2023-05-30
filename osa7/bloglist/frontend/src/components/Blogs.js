import Blog from './Blog'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import { TableContainer, Paper, Table } from '@mui/material'

const Blogs = ({ sortedBlogs, like, remove, user, createNewBlog, blogFormRef }) => {
  return (
    <div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createNewBlog} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              like={() => like(blog)}
              canRemove={user && blog.user.username === user.username}
              remove={() => remove(blog)}
            />
          ))}
        </Table>
      </TableContainer>
    </div>
  )
}

export default Blogs