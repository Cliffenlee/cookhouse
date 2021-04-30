import TodoList from "./TodoList"
import { useState, useRef, useEffect } from 'react'
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  return (
    <>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </>
  )
}

export default App;
