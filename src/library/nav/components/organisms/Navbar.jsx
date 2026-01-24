import PropTypes from 'prop-types'
import NavList from '@library/nav/components/molecules/NavList'

import './navbar.scss'

const Navbar = ({ navItems, activeLink, setActiveLink }) => {
  return (
    <nav className='nav-shell__header'>
      <article className='nav-shell__container'>
        <nav className='nav-shell__bar' aria-label='Navegación principal'>
          <NavList navItems={navItems} activeLink={activeLink} setActiveLink={setActiveLink} />
        </nav>
      </article>
    </nav>
  )
}

Navbar.propTypes = {
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

export default Navbar
