import React, { useContext } from 'react'


// 使用useContext只是让我们在使用的时候不需要使用Consumer
// 但仍然需要在上层组件中使用Provider来提供Context

const myContext = React.createContext()
const Provider = myContext.Provider

export default function ContextHooks () {
  const store = {
    user: {
      name: 'jerry',
      age: 18
    }
  }

  return (
    <Provider value={store}>
      <Child></Child>
    </Provider>
  )
}

const Child = props => {
  console.log(useContext(myContext));
  const { user } = useContext(myContext)
  return <div>
    <h1>user: {user.name}</h1>
  </div>
}
