import PropTypes from 'prop-types'
import { Card, CardBody } from '@heroui/card'

import './accessibilityOption.scss'

const AccessibilityOption = ({ icon: Icon, label, color, children }) => (
  <Card className='accessibility_option' shadow='none'>
    <CardBody className='accessibility_option_body'>
      <div className='accessibility_option_label'>
        <div className={`accessibility_option_icon accessibility_option_icon--${color}`}>
          <Icon size={16} strokeWidth={2.2} />
        </div>
        <span className='accessibility_option_text'>{label}</span>
      </div>
      <div className='accessibility_option_control'>{children}</div>
    </CardBody>
  </Card>
)

AccessibilityOption.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default AccessibilityOption
