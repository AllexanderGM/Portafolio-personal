import PropTypes from 'prop-types'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Image = ({
  className,
  alt,
  src,
  loading = 'lazy',
  effect,
  placeholderSrc,
  wrapperClassName,
  wrapperProps,
  visibleByDefault = true,
  useIntersectionObserver = true,
  threshold,
  height,
  width,
  delayMethod,
  delayTime,
  beforeLoad,
  afterLoad,
  onLoad,
  ...rest
}) => (
  <LazyLoadImage
    className={className}
    alt={alt}
    src={src}
    loading={loading}
    effect={effect}
    placeholderSrc={placeholderSrc}
    wrapperClassName={wrapperClassName}
    wrapperProps={wrapperProps}
    visibleByDefault={visibleByDefault}
    useIntersectionObserver={useIntersectionObserver}
    threshold={threshold}
    height={height}
    width={width}
    delayMethod={delayMethod}
    delayTime={delayTime}
    beforeLoad={beforeLoad}
    afterLoad={afterLoad}
    onLoad={onLoad}
    {...rest}
  />
)

Image.propTypes = {
  className: PropTypes.string,
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  loading: PropTypes.oneOf(['lazy', 'eager', 'auto']),
  effect: PropTypes.string,
  placeholderSrc: PropTypes.string,
  wrapperClassName: PropTypes.string,
  wrapperProps: PropTypes.object,
  visibleByDefault: PropTypes.bool,
  useIntersectionObserver: PropTypes.bool,
  threshold: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  delayMethod: PropTypes.string,
  delayTime: PropTypes.number,
  beforeLoad: PropTypes.func,
  afterLoad: PropTypes.func,
  onLoad: PropTypes.func
}

export default Image
