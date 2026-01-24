import PropTypes from 'prop-types'
import HashLink from '@library/nav/components/atoms/HashLink'

import './navList.scss'

const NavList = ({ navItems, activeLink, setActiveLink }) => {
  return (
    <ul className='nav-shell__list'>
      {navItems.map(item => (
        <HashLink
          key={item.route}
          Icon={item.Icon}
          route={item.route}
          text={item.text}
          setActiveLink={setActiveLink}
          activeLink={activeLink}
        />
      ))}
    </ul>
  )
}

NavList.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      Icon: PropTypes.elementType.isRequired,
      route: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  activeLink: PropTypes.string.isRequired,
  setActiveLink: PropTypes.func.isRequired
}

export default NavList
