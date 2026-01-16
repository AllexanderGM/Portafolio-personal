import PropTypes from 'prop-types'
import NavList from '@library/nav/components/molecules/NavList'

const Navbar = ({ navItems, activeLink, setActiveLink }) => {
  return (
    <nav className='header'>
      <article className='container'>
        <nav className='header_navbar' aria-label='Navegación principal'>
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
