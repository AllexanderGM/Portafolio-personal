import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './breadcrumbItem.scss'

const BreadcrumbItem = ({ label, path, isCurrent = false }) => {
  if (isCurrent) {
    return (
      <li className='breadcrumb_item current' aria-current='page'>
        <span>{label}</span>
      </li>
    )
  }

  return (
    <li className='breadcrumb_item'>
      <Link to={path}>{label}</Link>
    </li>
  )
}

BreadcrumbItem.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool
}

export default BreadcrumbItem
