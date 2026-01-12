import PropTypes from 'prop-types'
import Image from '@library/image/Image'

const SocialLink = ({ icon, link }) => (
  <li>
    <a className='clickable' href={link} target='_blank' aria-label='icon social'>
      <Image src={icon} alt='icon social' />
    </a>
  </li>
)

SocialLink.propTypes = {
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}

export default SocialLink
