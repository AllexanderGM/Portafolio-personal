import PropTypes from 'prop-types'
import Image from '@library/image'

import './socialLink.scss'

const SocialLink = ({ icon, link }) => (
  <li className='social-link'>
    <a className='social-link__anchor clickable' href={link} target='_blank' aria-label='icon social'>
      <Image className='social-link__icon' src={icon} alt='icon social' />
    </a>
  </li>
)

SocialLink.propTypes = {
  icon: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
}

export default SocialLink
