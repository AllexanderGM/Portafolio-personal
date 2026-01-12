import React from 'react'

import { Skeleton } from '@heroui/react'

const BannerSkeleton = () => {
  return (
    <section className='banner'>
      <article className='container'>
        <a href='/'>
          <Skeleton className='banner_logo' />
        </a>
        <article className='text'>
          <article className='title'>
            <h1>Jeisson Alexander Gavilán Murcia</h1>
            <span>
              Software Developer
              <div className='separator'></div>
            </span>
          </article>
          <h2 className='w-full pr-20'>
            ¡Hola a todos!
            <br />
            <span className='txt-rotate w-full' data-rotate='Les doy la bienvenida a mi portafolio web'>
              <Skeleton className='h-20 w-full rounded-lg' />
            </span>
          </h2>
          <article className='buttons'>
            <a className='btn_generic btn_projetcs  clickable' href='/project'>
              <button className='custom-btn  clickable'>
                <ion-icon name='code-slash' role='img' className='md hydrated'></ion-icon>
                <span>Proyectos</span>
              </button>
            </a>
            <a className='btn_generic btn_projetcs  clickable' href='/services'>
              <button className='custom-btn  clickable'>
                <ion-icon name='cube' role='img' className='md hydrated'></ion-icon>
                <span>Servicios</span>
              </button>
            </a>
          </article>
        </article>
        <figure className='banner_image'>
          <ul className='decoration'>
            <div></div>
            <div></div>
            <div></div>
          </ul>
          <span className=' lazy-load-image-background blur lazy-load-image-loaded'>
            <img className='picture' src='/src/assets/pages/home/me.png' alt='Fotografia de Jeisson Alexander' loading='lazy' />
          </span>
          <img className='picture' src='/src/assets/pages/home/me.png' alt='Fotografia de Jeisson Alexander' loading='lazy' />
          <ul className='banner_social'>
            <li>
              <a className='clickable' href='https://www.linkedin.com/in/jeisson-alexander' target='_blank' aria-label='icon social'>
                <img src='/src/assets/icon/linkedin.svg' alt='icon social' />
              </a>
            </li>
            <li>
              <a className='clickable' href='https://github.com/AllexanderGM' target='_blank' aria-label='icon social'>
                <img src='/src/assets/icon/github.svg' alt='icon social' />
              </a>
            </li>
          </ul>
        </figure>
      </article>
    </section>
  )
}

BannerSkeleton.propTypes = {}

export default BannerSkeleton
