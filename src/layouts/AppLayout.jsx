import { Outlet } from 'react-router-dom'

import Nav from '@library/nav/Nav.jsx'
import Breadcrumb from '@library/breadcrumb/Breadcrumb.jsx'
import Footer from '@library/footer/Footer.jsx'

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
