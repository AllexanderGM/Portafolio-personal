import './footer.scss'

const Footer = ({ theme }) => (
  <footer className={`footer ${theme === 'white' ? 'theme-white' : 'theme-black'}`}>
    <p className='footer_data'> © 2024 Alexander Gavilán. Todos los derechos reservados. </p>
  </footer>
)

export default Footer
