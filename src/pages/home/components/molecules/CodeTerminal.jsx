import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'
import PropTypes from 'prop-types'

import getScrollAnimation from '../../../../library/utils/GetScrollAnimation.jsx'

const CodeTerminal = ({ profileData }) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])
  const [displayedText, setDisplayedText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  const fullText = `$ cat developer.json
{
  "name": "${profileData.name}",
  "role": "${profileData.role}",
  "experience": "${profileData.experience}",
  "current_company": "${profileData.current}",
  "education": "${profileData.education}",
  "location": "${profileData.location}",

  "technologies": {
    "backend": ${JSON.stringify(profileData.technologies.backend, null, 4).replaceAll('\n', '\n    ')},
    "frontend": ${JSON.stringify(profileData.technologies.frontend, null, 4).replaceAll('\n', '\n    ')},
    "databases": ${JSON.stringify(profileData.technologies.databases, null, 4).replaceAll('\n', '\n    ')},
    "devops": ${JSON.stringify(profileData.technologies.devops, null, 4).replaceAll('\n', '\n    ')},
    "tools": ${JSON.stringify(profileData.technologies.tools, null, 4).replaceAll('\n', '\n    ')}
  },

  "languages": ${JSON.stringify(profileData.languages, null, 2)},
  "methodologies": ${JSON.stringify(profileData.methodologies, null, 2)}
}

$ _`

  // Syntax highlighting con los colores del tema
  const highlightSyntax = text => {
    return text
      .replaceAll(/(\$ cat developer\.json)/g, '<span class="command">$1</span>')
      .replaceAll(
        /("(?:name|role|experience|current_company|education|location|technologies|backend|frontend|databases|devops|tools|languages|methodologies)")/g,
        '<span class="key">$1</span>'
      )
      .replaceAll(/: (".*?")/g, ': <span class="string">$1</span>')
      .replaceAll(/([{}[\],])/g, '<span class="punctuation">$1</span>')
      .replaceAll(/(\$ _)/g, '<span class="prompt">$1</span>')
  }

  useEffect(() => {
    let charIndex = 0
    const typingSpeed = 15

    const typingInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex))
        charIndex++
      } else {
        setIsTypingComplete(true)
        clearInterval(typingInterval)
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [fullText])

  return (
    <motion.div className='code-terminal' variants={scrollAnimation} custom={{ duration: 1 }}>
      <div className='terminal-header'>
        <div className='terminal-buttons'>
          <span className='btn-close'></span>
          <span className='btn-minimize'></span>
          <span className='btn-maximize'></span>
        </div>
        <div className='terminal-title'>
          <Terminal size={16} />
          <span>~/developer</span>
        </div>
      </div>
      <div className='terminal-body'>
        <pre dangerouslySetInnerHTML={{ __html: highlightSyntax(displayedText) }} />
        {!isTypingComplete && <span className='cursor'>█</span>}
      </div>
    </motion.div>
  )
}

CodeTerminal.propTypes = {
  profileData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    current: PropTypes.string.isRequired,
    education: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    technologies: PropTypes.object.isRequired,
    languages: PropTypes.array.isRequired,
    methodologies: PropTypes.array.isRequired
  }).isRequired
}

export default CodeTerminal
