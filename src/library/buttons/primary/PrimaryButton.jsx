import { useMemo } from 'react'
import { m } from 'framer-motion'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button } from '@heroui/button'

import { getScrollAnimation } from '@library/animation'

const PrimaryButton = ({ route, url, className, variant = 'solid', Icon, text, color = 'default', size = 'md' }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  // Configuración del botón de HeroUI
  const buttonProps = {
    color: color,
    variant: variant,
    size: size,
    startContent: Icon && <Icon size={20} strokeWidth={2} />,
    className: `${className || ''} clickable`,
    disableRipple: false
  }

  if (route) {
    return (
      <Button {...buttonProps} as={Link} to={route}>
        {text}
      </Button>
    )
  } else if (url) {
    return (
      <m.div variants={scrollAnimation} custom={{ duration: 2 }} className='inline-block'>
        <Button {...buttonProps} as='a' href={url} target='_blank' rel='noopener noreferrer'>
          {text}
        </Button>
      </m.div>
    )
  } else {
    return <span>Boton no disponible</span>
  }
}

PrimaryButton.propTypes = {
  route: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost']),
  Icon: PropTypes.elementType,
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
}

export default PrimaryButton
