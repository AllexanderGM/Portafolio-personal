import { useMemo } from 'react'
import { m } from 'framer-motion'
import PropTypes from 'prop-types'
import { Building2, GraduationCap, Briefcase, ShoppingBag, MapPin } from 'lucide-react'
import { Button } from '@heroui/button'

import { Container } from '@library/container'
import { ScrollAnimationWrapper, getScrollAnimation } from '@library/animation'

import './aboutSection.scss'

// Parsea texto con *palabra* para resaltar con accent-primary
const parseHighlightedText = text => {
  if (!text) return null
  const parts = text.split(/(\*[^*]+\*)/g)
  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <span key={index} className='about-highlight'>
          {part.slice(1, -1)}
        </span>
      )
    }
    return part
  })
}

// Iconos para tipos de experiencia
const getExperienceIcon = type => {
  const icons = {
    university: Building2,
    teaching: GraduationCap,
    company: Briefcase,
    ecommerce: ShoppingBag
  }
  const Icon = icons[type] || Briefcase
  return <Icon size={18} />
}

const AboutSection = ({ aboutData, cvUrl }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])
  const { eyebrow, title, narrative, personalInfo, stats, fullTimeExperiences, freelanceExperiences } = aboutData

  return (
    <section className='about-section' id='about'>
      <Container as='article' className='about-container'>
        {/* Header */}
        <ScrollAnimationWrapper className='about-header-wrapper'>
          <m.header className='about-header' variants={scrollAnimation}>
            <span className='about-eyebrow'>{eyebrow}</span>
            <h2 className='about-title'>{title}</h2>
          </m.header>
        </ScrollAnimationWrapper>

        {/* Main content - 2 columns */}
        <div className='about-content'>
          {/* Left column - Narrative */}
          <div className='about-narrative'>
            {/* Narrative text */}
            <ScrollAnimationWrapper>
              <m.div className='narrative-text' variants={scrollAnimation}>
                {narrative.paragraphs.map((paragraph, index) => (
                  <p key={index}>{parseHighlightedText(paragraph)}</p>
                ))}
              </m.div>
            </ScrollAnimationWrapper>

            {/* Personal Info */}
            <ScrollAnimationWrapper>
              <m.div className='about-personal-info' variants={scrollAnimation}>
                <div className='info-item'>
                  <MapPin size={16} />
                  <span>{personalInfo.location}</span>
                </div>
                <div className='info-section'>
                  <span className='info-section-label'>Formación</span>
                  {personalInfo.education.map((edu, index) => (
                    <div key={index} className='info-item info-item--education'>
                      <GraduationCap size={16} />
                      <div className='info-education'>
                        <span className='edu-degree'>{edu.degree}</span>
                        <span className='edu-institution'>{edu.institution}</span>
                        <span className='edu-period'>{edu.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
            </ScrollAnimationWrapper>

            {/* Stats */}
            <ScrollAnimationWrapper>
              <m.div className='about-stats' variants={scrollAnimation}>
                {stats.map((stat, index) => (
                  <div key={index} className='stat-item'>
                    <span className='stat-value'>{stat.value}</span>
                    <span className='stat-label'>{stat.label}</span>
                  </div>
                ))}
              </m.div>
            </ScrollAnimationWrapper>

            {/* CTA */}
            <ScrollAnimationWrapper>
              <m.div variants={scrollAnimation}>
                <Button
                  as='a'
                  href={cvUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='bordered'
                  className='about-cta'>
                  Descargar CV
                </Button>
              </m.div>
            </ScrollAnimationWrapper>
          </div>

          {/* Right column - Experience */}
          <div className='about-experience'>
            {/* Tiempo completo */}
            <ScrollAnimationWrapper>
              <m.div className='experience-category' variants={scrollAnimation}>
                <span className='category-label'>Tiempo completo</span>
                <div className='experience-timeline'>
                  {fullTimeExperiences.map((exp, index) => (
                    <div key={index} className='timeline-item'>
                      <div className='timeline-icon'>{getExperienceIcon(exp.type)}</div>
                      <div className='timeline-content'>
                        <span className='timeline-period'>{exp.period}</span>
                        <h4 className='timeline-company'>{exp.company}</h4>
                        <p className='timeline-role'>{exp.role}</p>
                        {exp.technologies && (
                          <div className='timeline-tech'>
                            {exp.technologies.map((tech, techIndex) => (
                              <span key={techIndex} className='tech-badge'>
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
            </ScrollAnimationWrapper>

            {/* Freelance */}
            <ScrollAnimationWrapper>
              <m.div className='experience-category' variants={scrollAnimation}>
                <span className='category-label'>Proyectos & Freelance</span>
                <div className='experience-timeline'>
                  {freelanceExperiences.map((exp, index) => (
                    <div key={index} className='timeline-item timeline-item--freelance'>
                      <div className='timeline-icon'>{getExperienceIcon(exp.type)}</div>
                      <div className='timeline-content'>
                        <span className='timeline-period'>{exp.period}</span>
                        <h4 className='timeline-company'>{exp.company}</h4>
                        <p className='timeline-role'>{exp.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </m.div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </Container>
    </section>
  )
}

const experienceShape = PropTypes.shape({
  period: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string)
})

AboutSection.propTypes = {
  aboutData: PropTypes.shape({
    eyebrow: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    narrative: PropTypes.shape({
      paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    personalInfo: PropTypes.shape({
      location: PropTypes.string.isRequired,
      education: PropTypes.arrayOf(
        PropTypes.shape({
          degree: PropTypes.string.isRequired,
          institution: PropTypes.string.isRequired,
          period: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired,
    fullTimeExperiences: PropTypes.arrayOf(experienceShape).isRequired,
    freelanceExperiences: PropTypes.arrayOf(experienceShape).isRequired
  }).isRequired,
  cvUrl: PropTypes.string.isRequired
}

export default AboutSection
