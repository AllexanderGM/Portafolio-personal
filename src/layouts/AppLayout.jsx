import { Outlet } from 'react-router-dom'

import Nav from '@library/nav'
import Breadcrumb from '@library/breadcrumb'
import Footer from '@library/footer'

const AppLayout = () => {
  return (
    <>
      <Nav />
      <Breadcrumb />
      <Outlet />
      <Footer />
    </>
  )
}

export default AppLayout
