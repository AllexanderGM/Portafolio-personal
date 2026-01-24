import { useMemo } from 'react'
import { m } from 'framer-motion'
import { MapPin, Clock, Mail, Linkedin, Github, MessageCircle, Send } from 'lucide-react'
import { Button } from '@heroui/button'

import './contact.scss'

import { ScrollAnimationWrapper, getScrollAnimation } from '@library/animation'
import { Container } from '@library/container'
import { SEO } from '@context/SEOContext'

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

  const socialLinks = [
    { icon: Linkedin, label: 'LinkedIn', url: social.linkedin },
    { icon: Github, label: 'GitHub', url: social.github },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      url: `https://api.whatsapp.com/send/?phone=${social.whatsapp}&text=¡Hola+Jeisson!+Quiero+hablar+contigo+sobre+un+proyecto.&type=phone_number`
    }
  ]

  const mailtoUrl = `mailto:${social.email}?subject=${encodeURIComponent(data.cta.subject)}`

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
      <main className='contact-page'>
        <ScrollAnimationWrapper className='contact-section'>
          <Container as='article' className='contact-container'>
            {/* Header - igual que About/Projects */}
            <m.header className='contact-header' variants={scrollAnimation}>
              <span className='contact-eyebrow'>{data.eyebrow}</span>
              <h1 className='contact-title'>{data.title}</h1>
              <p className='contact-description'>
                {data.description.split('proyecto')[0]}
                <span className='contact-highlight'>proyecto</span>
                {data.description.split('proyecto')[1]}
              </p>
            </m.header>

            {/* Content - 2 columnas como About */}
            <div className='contact-content'>
              {/* Columna izquierda - Info */}
              <div className='contact-info'>
                {/* Info card - estilo About */}
                <m.div className='contact-info-card' variants={scrollAnimation} custom={{ duration: 1 }}>
                  <div className='info-item'>
                    <MapPin size={16} />
                    <span>{data.info.location}</span>
                  </div>
                  <div className='info-item'>
                    <Clock size={16} />
                    <span>{data.info.availability}</span>
                  </div>
                  <div className='info-item'>
                    <Mail size={16} />
                    <a href={mailtoUrl}>{social.email}</a>
                  </div>
                </m.div>

                {/* CTA - estilo About */}
                <m.div variants={scrollAnimation} custom={{ duration: 1.2 }}>
                  <Button
                    as='a'
                    href={mailtoUrl}
                    variant='solid'
                    color='primary'
                    size='md'
                    startContent={<Send size={20} strokeWidth={2} />}
                    className='contact-cta'>
                    {data.cta.text}
                  </Button>
                </m.div>
              </div>

              {/* Columna derecha - Social */}
              <m.div className='contact-social' variants={scrollAnimation} custom={{ duration: 1.4 }}>
                <span className='social-label'>{data.socialLabel}</span>
                <div className='social-list'>
                  {socialLinks.map((item, index) => (
                    <a key={index} href={item.url} target='_blank' rel='noopener noreferrer' className='social-item'>
                      <div className='social-icon'>
                        <item.icon size={18} />
                      </div>
                      <span className='social-name'>{item.label}</span>
                    </a>
                  ))}
                </div>
              </m.div>
            </div>
          </Container>
        </ScrollAnimationWrapper>

        {/* Divider decorativo - igual que Banner */}
        <div className='contact-divider'>
          <span className='divider-dot' />
          <span className='divider-line' />
          <span className='divider-dot' />
        </div>
      </main>
    </>
  )
}

export default Contact
