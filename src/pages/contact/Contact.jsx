import { useMemo } from 'react'
import { motion } from 'framer-motion'

import './contact.scss'

import ScrollAnimationWrapper from '../../library/utils/ScrollAnimationWrapper'
import getScrollAnimation from '../../library/utils/GetScrollAnimation.jsx'
import { SEO } from '@context/SEOContext'

import ProjectsTitle from '../../library/title/Title.jsx'

import { useGeneral } from '@hooks'
import data from './data.json'
import seoData from '../../_data/seo.json'

const Contact = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])
  const { social } = useGeneral()

  const breadcrumbs = [
    { name: 'Inicio', url: 'https://alexandergm.com/' },
    { name: 'Contacto', url: 'https://alexandergm.com/contact' }
  ]

  return (
    <>
      <SEO
        title={seoData.contact.title}
        description={seoData.contact.description}
        keywords={seoData.contact.keywords}
        image={seoData.contact.ogImage}
        imageAlt={seoData.contact.ogImageAlt}
        canonical={seoData.contact.canonical}
        structuredData={seoData.contact.structuredData}
        url={seoData.contact.canonical}
        type='website'
        breadcrumbs={breadcrumbs}
      />
      <main className='main_contact'>
        <ScrollAnimationWrapper className='contact' id='contact'>
          <ProjectsTitle title={data.title} text1={data.text1} textSpan={data.textSpan} text2={data.text2} />

          <figure className='contact_links_container'>
            <ul className='contact_links_list'>
              <motion.li className='contact_links_item' variants={scrollAnimation} custom={{ duration: 4 }}>
                <a href={social.linkedin} target='_blank'>
                  <ion-icon name='logo-linkedin'></ion-icon>
                </a>
              </motion.li>
              <motion.li className='contact_links_item' variants={scrollAnimation} custom={{ duration: 4.5 }}>
                <a href={social.github} target='_blank'>
                  <ion-icon name='logo-github'></ion-icon>
                </a>
              </motion.li>
              <motion.li className='contact_links_item' variants={scrollAnimation} custom={{ duration: 5 }}>
                <a
                  href={`https://api.whatsapp.com/send/?phone=${social.whatsapp}&text=¡Hola+Jeisson+Alexander%21+Quiero+hablar+contigo%2C+dime+en+que+momento+puedes+contactarme.&type=phone_number`}
                  target='_blank'>
                  <ion-icon name='logo-whatsapp'></ion-icon>
                </a>
              </motion.li>
            </ul>
          </figure>
        </ScrollAnimationWrapper>
      </main>
    </>
  )
}

export default Contact
