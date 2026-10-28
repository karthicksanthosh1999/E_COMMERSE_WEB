import Header from '@/components/common-navbar'
import Footer from '@/components/common-footer'
import { ReactNode } from 'react'

const Layout = ({children} : {children : ReactNode}) => {
  return (
    <>
     <Header /> 
      {children}
     <Footer />
    </>
  )
}

export default Layout
