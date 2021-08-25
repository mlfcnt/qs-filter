import React from 'react'
import { useFilterFromQueryParams } from 'qs-filter'

const App = () => {
  type User = {
    id: number
    isActive: boolean
    isFinalized: boolean
  }
  const users: User[] = [
    {
      id: 1,
      isActive: true,
      isFinalized: false
    },
    {
      id: 2,
      isActive: false,
      isFinalized: true
    }
  ]
  const filteredUsers = useFilterFromQueryParams(users)
  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <h1>Examples</h1>
        <a href='/qs-filter/?isActive=true'>/?isActive=true</a>
        <br />
        <a href='/qs-filter/?isActive=true'>/?isFinalized=true</a>
      </div>
      {filteredUsers.map((user) => (
        <>
          <p>Id : {user.id}</p>
          <p>isActive : {user.isActive.toString()}</p>
          <p>isFinalized : {user.isFinalized.toString()}</p>
        </>
      ))}
    </div>
  )
}

export default App
