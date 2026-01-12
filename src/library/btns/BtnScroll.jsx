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
    const onAnimationEnd = () => {
      setIsAnimationEnd(true)
    }

    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsVisible(false)
        if (btnRef.current) {
          btnRef.current.addEventListener('animationend', onAnimationEnd)
        }
      } else {
        setIsVisible(true)
        setIsAnimationEnd(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

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
      window.removeEventListener('scroll', handleScroll)
      if (currentBtnRef) {
        currentBtnRef.removeEventListener('animationend', onAnimationEnd)
      }
    }
  }, [isVisible, isAnimationEnd])

  return <button ref={btnRef} onClick={scrollMove} className={`mouse ${elementClass} clickable`} />
}

BtnScroll.propTypes = {
  href: PropTypes.string.isRequired
}

export default BtnScroll
