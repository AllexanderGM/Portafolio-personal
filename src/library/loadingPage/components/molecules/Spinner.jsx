import SpinnerRing from '../atoms/SpinnerRing'

import './spinner.scss'

const Spinner = () => {
  return (
    <div className='loading-page_spinner' aria-hidden='true'>
      <SpinnerRing />
      <SpinnerRing />
      <SpinnerRing />
    </div>
  )
}

export default Spinner
