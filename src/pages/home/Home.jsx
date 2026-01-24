import { FolderKanban, Mail } from 'lucide-react'

import './home.scss'

import Banner from './components/templates/Banner'
import AboutSection from './components/templates/AboutSection.jsx'
import { SEO as Seo } from '@context/SEOContext'

import { useGeneral } from '@hooks'

// Resources
import imgProfile from '../../assets/pages/home/me.png'
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
              { text: 'Proyectos', url: route.projects, Icon: FolderKanban },
              { text: 'Contacto', url: route.contact, Icon: Mail }
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
        />
        <AboutSection
          aboutData={data.about}
          cvUrl={social.cv}
        />
      </main>
    </>
  )
}

export default Home
