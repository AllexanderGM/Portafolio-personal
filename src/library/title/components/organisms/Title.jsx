import { useMemo } from 'react'
import { m } from 'framer-motion'
import PropTypes from 'prop-types'

import { getScrollAnimation } from '@library/animation'

const Title = ({ title, text1, textSpan, text2 }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  return (
    <section className='section-title'>
      <m.h1 className='section-title__heading' variants={scrollAnimation} custom={{ duration: 1 }}>
        {title}
      </m.h1>

      <m.div className='section-title__divider' variants={scrollAnimation} custom={{ duration: 2 }} />

      <m.p className='section-title__text' variants={scrollAnimation} custom={{ duration: 3 }}>
        {text1} <span className='section-title__highlight'>{textSpan}</span> {text2}
      </m.p>
    </section>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  textSpan: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired
}

export default Title
