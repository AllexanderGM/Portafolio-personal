import PropTypes from 'prop-types'

import BreadcrumbItem from '../atoms/BreadcrumbItem'

import './breadcrumbList.scss'

const BreadcrumbList = ({ items }) => {
  return (
    <ol className='breadcrumb_list'>
      {items.map((item, index) => (
        <BreadcrumbItem key={item.path} label={item.label} path={item.path} isCurrent={index === items.length - 1} />
      ))}
    </ol>
  )
}

BreadcrumbList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired
    })
  ).isRequired
}

export default BreadcrumbList
