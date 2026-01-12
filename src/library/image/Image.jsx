import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Image = ({ className, alt, src }) => (
  <LazyLoadImage className={className} alt={alt} src={src} loading='lazy' visibleByDefault={true} />
)

export default Image
