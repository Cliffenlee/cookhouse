import '../styles/globals.css'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import NavBarLanding from '../components/NavBar/NavBarLanding'
import NavBar from '../components/NavBar/NavBar'


function MyApp({ Component, pageProps }) {
  const nav = Component.name == "landing" ? <NavBarLanding/>  : <NavBar/>
  return (
    <ChakraProvider>
      <Head>
        <title>Cookhouse</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {nav}
      <Component {...pageProps} />
    </ChakraProvider>
  )

}

export default MyApp
