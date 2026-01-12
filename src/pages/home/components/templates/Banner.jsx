import { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'

import { Skeleton } from '@heroui/react'

import { useGeneral } from '@hooks'
import Technology from '../organisms/Technology'
import ScrollAnimationWrapper from '../../../../library/utils/ScrollAnimationWrapper'

// Components
import BannerText from '../organisms/BannerText'
import BannerImage from '../organisms/BannerImage'
const Image = lazy(() => import('../../../../library/image/Image'))

const Banner = ({ text, image, technologies }) => {
  const { route } = useGeneral()
  const logo = new URL(`../../../../assets/icon/${image.logo}`, import.meta.url).href

  return (
    <ScrollAnimationWrapper className='banner'>
      <article className='container'>
        <Suspense fallback={<Skeleton className='banner_logo' />}>
          <a href={route.home}>
            <Image className='banner_logo' src={logo} alt='Logo' />
          </a>
        </Suspense>

        <BannerText data={text} />

        <BannerImage data={image} shape={image.shape} />
      </article>

      <Technology data={technologies} />
    </ScrollAnimationWrapper>
  )
}

Banner.propTypes = {
  text: PropTypes.object.isRequired,
  image: PropTypes.object.isRequired,
  technologies: PropTypes.object.isRequired
}

export default Banner
