// Dependences
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import './loadingPage.scss'

const LoadingPage = ({ onFinish }) => {
  const [stateID, setStateID] = useState('')
  const [stateClass, setStateClass] = useState('loading_page')
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    setStateID('page_loaded')
    setStateClass('loading_page')
  }, [pathname])

  const handlerAnimation = () => {
    onFinish()
    setStateClass('loading_page off')
  }

  return <section className={stateClass} id={stateID} onAnimationEnd={handlerAnimation}></section>
}

LoadingPage.propTypes = {
  onFinish: PropTypes.func.isRequired
}

export default LoadingPage
