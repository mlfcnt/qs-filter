# qs-filter

> hook to filter items from query parameters

[![NPM](https://img.shields.io/npm/v/qs-filter.svg)](https://www.npmjs.com/package/qs-filter) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save qs-filter
```

## Usage

```tsx
import React from 'react'
import { useFilterFromQueryParams } from 'qs-filter'

const App = () => {
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
  return filteredUsers.map((user) => (
    <>
      <p>Id : {user.id}</p>
      <p>isActive : {user.isActive.toString()}</p>
      <p>isFinalized : {user.isFinalized.toString()}</p>
    </>
  ))
}
```

## License

MIT © [mlfcnt](https://github.com/mlfcnt)
