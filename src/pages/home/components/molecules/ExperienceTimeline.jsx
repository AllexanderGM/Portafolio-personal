import { useMemo } from 'react'
import { m } from 'framer-motion'
import { Building2, GraduationCap, Briefcase, ShoppingBag } from 'lucide-react'
import PropTypes from 'prop-types'

import { getScrollAnimation } from '@library/animation'

import './experienceTimeline.scss'

const ExperienceTimeline = ({ experiences }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  const getIcon = type => {
    const icons = {
      university: Building2,
      teaching: GraduationCap,
      company: Briefcase,
      ecommerce: ShoppingBag
    }
    const Icon = icons[type] || Briefcase
    return <Icon size={20} />
  }

  return (
    <m.div className='experience-timeline' variants={scrollAnimation} custom={{ duration: 1.5 }}>
      {experiences.map((exp, index) => (
        <m.div
          key={`${exp.company}-${exp.role}-${exp.period}`}
          className='timeline-item'
          variants={scrollAnimation}
          custom={{ duration: 1.5 + index * 0.2 }}>
          <div className='timeline-icon'>{getIcon(exp.type)}</div>
          <div className='timeline-content'>
            <span className='timeline-period'>{exp.period}</span>
            <h3 className='timeline-company'>{exp.company}</h3>
            <h4 className='timeline-role'>{exp.role}</h4>
            <div className='timeline-tech'>
              {exp.technologies.map(tech => (
                <span key={`${exp.company}-${exp.role}-${tech}`} className='tech-badge'>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </m.div>
      ))}
    </m.div>
  )
}

ExperienceTimeline.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      period: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
      type: PropTypes.string.isRequired
    })
  ).isRequired
}

export default ExperienceTimeline
