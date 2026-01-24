import PropTypes from 'prop-types'

import { Container } from '@library/container'
import { ScrollAnimationWrapper } from '@library/animation'

// Components - Molecules
import HeroText from '../molecules/HeroText'
import Buttons from '../molecules/Buttons'

// Components - Organisms
import BannerImage from '../organisms/BannerImage'

import './banner.scss'

const Banner = ({ text, image }) => {
  return (
    <ScrollAnimationWrapper className='banner'>
      <Container as='article' className='banner-container'>
        <HeroText hero={text.hero} />

        <BannerImage data={image} shape={image.shape} />

        <Buttons btns={text.btns} />
      </Container>

      {/* Divider decorativo */}
      <div className='banner-divider'>
        <span className='divider-dot' />
        <span className='divider-line' />
        <span className='divider-dot' />
      </div>
    </ScrollAnimationWrapper>
  )
}

Banner.propTypes = {
  text: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired
}

export default Banner
