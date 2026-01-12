import PropTypes from 'prop-types'

import HashLink from '@library/nav/components/atoms/HashLink'

const Navbar = ({ navItems, activeLink, setActiveLink }) => {
  const navItemsElements = navItems.map((item, index) => (
    <HashLink
      key={index}
      Icon={item.Icon}
      route={item.route}
      text={item.text}
      setActiveLink={setActiveLink}
      activeLink={activeLink}
    />
  ))

  return (
    <nav className='header_navbar'>
      <ul className='navbar_list routes'>{navItemsElements}</ul>
    </nav>
  )
}

Navbar.propTypes = {
  navItems: PropTypes.array.isRequired,
  activeLink: PropTypes.string.isRequired,
  setActiveLink: PropTypes.func.isRequired
}

export default Navbar
