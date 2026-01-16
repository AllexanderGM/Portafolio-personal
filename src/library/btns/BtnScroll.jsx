import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

import './btnScroll.scss'

const BtnScroll = ({ href }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isAnimationEnd, setIsAnimationEnd] = useState(false)
  const [elementClass, setElementClass] = useState('mouse')

  const btnRef = useRef(null)

  const scrollMove = () => {
    const element = document.querySelector(href)

    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    let ticking = false

    const onAnimationEnd = () => {
      setIsAnimationEnd(true)
    }

    const handleScroll = () => {
      if (!ticking) {
        globalThis.requestAnimationFrame(() => {
          if (globalThis.scrollY > 60) {
            setIsVisible(false)
            if (btnRef.current) {
              btnRef.current.addEventListener('animationend', onAnimationEnd)
            }
          } else {
            setIsVisible(true)
            setIsAnimationEnd(false)
          }
          ticking = false
        })
        ticking = true
      }
    }

    globalThis.addEventListener('scroll', handleScroll, { passive: true })

    let currentBtnRef = btnRef.current

    const updateElementState = () => {
      if (isVisible) {
        setElementClass('')
      } else if (isAnimationEnd) {
        setElementClass('hidden')
      } else {
        setElementClass('fade-out')
      }
    }

    updateElementState()

    return () => {
      globalThis.removeEventListener('scroll', handleScroll)
      if (currentBtnRef) {
        currentBtnRef.removeEventListener('animationend', onAnimationEnd)
      }
    }
  }, [isVisible, isAnimationEnd])

  return <button ref={btnRef} onClick={scrollMove} className={`mouse ${elementClass} clickable`} aria-label='Desplazarse hacia abajo' />
}

BtnScroll.propTypes = {
  href: PropTypes.string.isRequired
}

export default BtnScroll
