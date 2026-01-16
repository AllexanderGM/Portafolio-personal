import PropTypes from 'prop-types'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Image = ({ className, alt, src }) => (
  <LazyLoadImage className={className} alt={alt} src={src} loading='lazy' visibleByDefault={true} />
)

Image.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
}

export default Image
