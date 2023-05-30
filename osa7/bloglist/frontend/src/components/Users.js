import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell, TableHead } from '@mui/material'

const Content = styled.div`
  padding: 0.25em;
  font-size: 1.10em;
`

const Users = ({ users }) => {

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Usernames
              </TableCell>
              <TableCell>
                Blogs created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell>
                  {user.blogs.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users