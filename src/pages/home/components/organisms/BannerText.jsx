import PropTypes from 'prop-types'

// Components
import Greeting from '../molecules/Greeting'
import Title from '../molecules/Title'
import Buttons from '../molecules/Buttons'

// Principal component
const BannerText = ({ data }) => (
  <article className='text'>
    <Title title={data.title} />
    <Greeting greeting={data.greeting} />
    <Buttons btns={data.btns} />
  </article>
)

BannerText.propTypes = {
  data: PropTypes.object.isRequired
}

export default BannerText
