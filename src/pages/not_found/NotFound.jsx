import './notFound.scss'

import { PrimaryButton } from '@library/buttons'

import illustration from '../../assets/pages/notFound/illustration.svg'

const NotFound = () => {
  return (
    <main className='main_notfound'>
      <h4>Oops! Parece que te has perdido...</h4>

      <figure>
        <img src={illustration} alt='Ilustración de página no encontrada' />
      </figure>

      <p>Lo sentimos, pero la página que estás buscando no existe o ha sido movida.</p>
      <p>No te preocupes, ¡te ayudaremos a encontrar el camino de regreso!</p>

      <PrimaryButton text='Volver al inicio' route='/' className='btn_projetcs' />
    </main>
  )
}

export default NotFound
