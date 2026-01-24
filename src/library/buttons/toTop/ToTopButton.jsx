import useToTopButton from './hooks/useToTopButton'

import './toTopButton.scss'

const ToTopButton = () => {
  const { isVisible, handleClick } = useToTopButton()

  return (
    <button
      onClick={handleClick}
      className={`to-top-button ${isVisible ? 'is-visible' : ''}`}
      aria-label='Volver arriba'
    >
      <svg viewBox='0 0 24 24'>
        <path d='m4 16 8-8 8 8' />
      </svg>
    </button>
  )
}

export default ToTopButton
