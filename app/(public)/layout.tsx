import Header from '@/components/common-navbar'
import Footer from '@/components/common-footer'
import { ReactNode } from 'react'
import Breadcrumbs from '@/components/common-breadcrumbs'

const Layout = ({children} : {children : ReactNode}) => {
  return (
    <>
     <Header /> 
      <Breadcrumbs />
      {children}
     <Footer />
    </>
  )
}

export default Layout
