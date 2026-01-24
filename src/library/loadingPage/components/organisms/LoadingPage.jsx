import PropTypes from 'prop-types'

import Spinner from '../molecules/Spinner'
import useLoadingPage from '../../hooks/useLoadingPage'

import './loadingPage.scss'

const LoadingPage = ({ onFinish }) => {
  const { isVisible, isExiting } = useLoadingPage(onFinish)

  if (!isVisible) return null

  return (
    <section className={`loading-page ${isExiting ? 'exiting' : ''}`}>
      <div className='loading-page_content'>
        <Spinner />
      </div>
    </section>
  )
}

LoadingPage.propTypes = {
  onFinish: PropTypes.func.isRequired
}

export default LoadingPage
