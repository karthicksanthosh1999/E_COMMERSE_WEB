import Header from '@/components/common-navbar'
import Footer from '@/components/common-footer'
import { ReactNode } from 'react'
import Breadcrumbs from '@/components/common-breadcrumbs'
import ScrollBar from '@/components/ScrollBar';

const Layout = ({children} : {children : ReactNode}) => {
  return (
    <>
     <Header /> 
      <Breadcrumbs />
      {children}
      <ScrollBar/>
     <Footer />
    </>
  )
}

export default Layout
