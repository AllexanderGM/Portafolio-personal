import PropTypes from 'prop-types'
import './footer.scss'

const Footer = ({ theme }) => (
  <footer className={`footer ${theme === 'white' ? 'theme-white' : 'theme-black'}`}>
    <p className='footer_data'> © 2024 Alexander Gavilán. Todos los derechos reservados. </p>
  </footer>
)

Footer.propTypes = {
  theme: PropTypes.string
}

export default Footer
