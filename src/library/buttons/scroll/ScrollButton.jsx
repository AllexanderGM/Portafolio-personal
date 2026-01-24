import PropTypes from 'prop-types'

import useScrollButton from './hooks/useScrollButton'

import './scrollButton.scss'

const ScrollButton = ({ href }) => {
  const { buttonRef, visibilityClass, handleClick } = useScrollButton(href)

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`scroll-button ${visibilityClass} clickable`}
      aria-label='Desplazarse hacia abajo'
    />
  )
}

ScrollButton.propTypes = {
  href: PropTypes.string.isRequired
}

export default ScrollButton
