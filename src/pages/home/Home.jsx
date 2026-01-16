import { Code, Phone } from 'lucide-react'

import './home.scss'

import Banner from './components/templates/Banner'
import AboutSection from './components/templates/AboutSection.jsx'
import { SEO as Seo } from '@context/SEOContext'

import { useGeneral } from '@hooks'

// Resources
import imgProfile from '../../assets/pages/home/me.png'
import imgArrow from '../../assets/icon/arrow-right.svg'
import data from './data.json'
import seoData from '../../_data/seo.json'

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
      <main className='main_home'>
        <Banner
          text={{
            hero: data.banner.hero,
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
        <AboutSection
          abilities={data.about.abilities}
          arrow={imgArrow}
          profileData={data.about.profile}
          experiences={data.about.experiences}
          btnlink={{
            cvUrl: social.cv,
            text: 'Hoja de vida'
          }}
        />
      </main>
    </>
  )
}

export default Home
