import Navbar from '@library/nav/components/organisms/Navbar'
import Accessibility from '@library/nav/components/organisms/Accessibility'
import useNavState from '@library/nav/hooks/useNavState'

import './nav.scss'

const Nav = () => {
  const { navItems, activeLink, setActiveLink } = useNavState()

  return (
    <div className='nav-shell'>
      <Navbar navItems={navItems} activeLink={activeLink} setActiveLink={setActiveLink} />
      <Accessibility />
    </div>
  )
}

export default Nav
