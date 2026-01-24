import PropTypes from 'prop-types'

// Components
import AccordionTechnologies from '../molecules/AccordionTechnologies'

import './technology.scss'

const Technology = ({ data }) => {
  const technologiesArray = Object.keys(data.list).map(key => ({
    name: key,
    icon: data.list[key]
  }))

  return (
    <article className='technology' id='technologyID'>
      <h3>{data.title}</h3>
      <AccordionTechnologies technologies={technologiesArray} />
    </article>
  )
}

Technology.propTypes = {
  data: PropTypes.object.isRequired
}

export default Technology
