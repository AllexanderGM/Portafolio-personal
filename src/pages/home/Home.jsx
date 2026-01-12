import { Code, Phone } from 'lucide-react'

import './home.scss'

import Nav from '../../library/nav/Nav.jsx'
import Footer from '../../library/footer/Footer.jsx'
import Banner from './components/templates/Banner'
import Skills from '../about/components/templates/Skills.jsx'
import { SEO as Seo } from '@context/SEOContext'

import { useGeneral } from '@hooks'

// Resources
import imgProfile from '../../assets/pages/home/me.png'
import imgArrow from '../../assets/icon/arrow-right.svg'
import data from './data.json'
import seoData from '../../_data/seo.json'
import { ABOUT_ABILITIES, ABOUT_EXPERIENCES, ABOUT_PROFILE } from '../about/aboutSectionData.js'

const Home = () => {
  const { route, social } = useGeneral()

  return (
    <>
      <Seo
        title={seoData.home.title}
        description={seoData.home.description}
        keywords={seoData.home.keywords}
        image={seoData.home.ogImage}
        imageAlt={seoData.home.ogImageAlt}
        canonical={seoData.home.canonical}
        structuredData={seoData.home.structuredData}
        url={seoData.home.canonical}
        type='website'
      />
      <Nav classPage={'header_home'} />
      <main className='main_home'>
        <Banner
          text={{
            title: ['Jeisson Alexander Gavilán Murcia', 'Software Developer'],
            greeting: {
              timer: 100,
              greeting: '¡Hola a todos!',
              profession: ['Les doy la bienvenida a mi portafolio web']
            },
            btns: [
              { text: 'Proyectos', url: route.projects, Icon: Code },
              { text: 'Contacto', url: route.contact, Icon: Phone }
            ]
          }}
          image={{
            logo: data.banner.logo,
            profile: imgProfile,
            shape: 'portrait',
            social: [
              { icon: data.banner.linkedin, url: social.linkedin },
              { icon: data.banner.github, url: social.github }
            ]
          }}
          technologies={{
            title: 'Algunas de las tecnologías y herramientas que he usado',
            list: data.technologies
          }}
        />
        <Skills
          ability={ABOUT_ABILITIES}
          arrow={imgArrow}
          profileData={ABOUT_PROFILE}
          experiences={ABOUT_EXPERIENCES}
          btnlink={{
            cvUrl: social.cv,
            text: 'Hoja de vida'
          }}
        />
      </main>
      <Footer />
    </>
  )
}

export default Home
