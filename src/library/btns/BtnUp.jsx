import { useEffect, useRef } from 'react'
import './btnUp.scss'

const ButtonToTop = () => {
  const buttonRef = useRef(null)

  useEffect(() => {
    const button = buttonRef.current

    const handleScroll = () => {
      if (button) {
        button.classList[document.documentElement.scrollTop > 200 ? 'add' : 'remove']('is-visible')
      }
    }

    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('scroll', handleScroll)
    if (button) {
      button.addEventListener('click', handleClick)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (button) {
        button.removeEventListener('click', handleClick)
      }
    }
  }, [])

  return (
    <button ref={buttonRef} className='toTop'>
      <svg viewBox='0 0 24 24'>
        <path d='m4 16 8-8 8 8' />
      </svg>
    </button>
  )
}

export default ButtonToTop
