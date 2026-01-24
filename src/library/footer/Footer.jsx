import { Link } from 'react-router-dom'
import { Linkedin, Github, Mail } from 'lucide-react'

import { Container } from '@library/container'
import { useGeneral } from '@hooks'

import './footer.scss'

const Footer = () => {
  const { route, social } = useGeneral()
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { label: 'Inicio', path: route.home },
    { label: 'Proyectos', path: route.projects },
    { label: 'Contacto', path: route.contact }
  ]

  const socialLinks = [
    { icon: Linkedin, url: social.linkedin, label: 'LinkedIn' },
    { icon: Github, url: social.github, label: 'GitHub' },
    { icon: Mail, url: `mailto:${social.email}`, label: 'Email' }
  ]

  return (
    <footer className='footer'>
      <Container noPaddingY className='footer-container'>
        {/* Navigation */}
        <nav className='footer-nav' aria-label='Footer navigation'>
          {navLinks.map((link, index) => (
            <Link key={index} to={link.path} className='footer-link'>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className='footer-divider' />

        {/* Social Links */}
        <div className='footer-social'>
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target='_blank'
              rel='noopener noreferrer'
              className='footer-social-link'
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className='footer-divider' />

        {/* Copyright */}
        <p className='footer-copyright'>
          © {currentYear} Alexander Gavilán
        </p>
      </Container>
    </footer>
  )
}

export default Footer
