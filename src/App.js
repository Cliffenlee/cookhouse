import TodoList from "./TodoList"
import { useState, useRef, useEffect } from 'react'
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  const todo = useRef()
  const [todos, setTodos] = useState(["todo1", "todo2"])
  function addTodo() {
    const name = todo.current.value
    setTodos(prevTodos => {
      return [...prevTodos, name]
    })
    todo.current.value = ""
  }
  return (
    <>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      <TodoList todos={todos} />
      <button variant="contained" color="primary" onClick={addTodo}>
        Add
      </button>
      <input ref={todo} type="text"/>
    </>
  )
}

export default App;
