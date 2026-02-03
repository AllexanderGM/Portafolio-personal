import { useMemo } from 'react'
import { m } from 'framer-motion'
import PropTypes from 'prop-types'

import { getScrollAnimation } from '@library/animation'
import { PrimaryButton } from '@library/buttons'

import './buttons.scss'

const Buttons = ({ btns }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  const listButtons = btns.map((item, index) => {
    const isFirst = index === 0

    const buttonConfig = isFirst ? { variant: 'solid', color: 'primary' } : { variant: 'bordered' }

    return <PrimaryButton key={index} text={item.text} route={item.url} Icon={item.Icon} size='md' {...buttonConfig} />
  })

  return (
    <m.article variants={scrollAnimation} custom={{ duration: 3 }} className='buttons'>
      {listButtons}
    </m.article>
  )
}

Buttons.propTypes = {
  btns: PropTypes.array.isRequired
}

export default Buttons
