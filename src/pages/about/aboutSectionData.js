import { Users, Heart, Layers, User } from 'lucide-react'

export const ABOUT_ABILITIES = [
  { Icon: Users, text: 'COMUNICACIÓN' },
  { Icon: Heart, text: 'AUTONOMÍA' },
  { Icon: Layers, text: 'ORGANIZACIÓN' },
  { Icon: User, text: 'ADAPTABILIDAD' }
]

export const ABOUT_PROFILE = {
  name: 'Jeisson Alexander Gavilán Murcia',
  role: 'Full Stack Developer',
  experience: '3+ años',
  current: 'Pontificia Universidad Javeriana',
  education: 'Lic. Diseño Tecnológico - UPN',
  location: 'Bogotá, Colombia',
  technologies: {
    backend: ['Spring Boot', 'Nest.js', 'Express.js', 'Node.js'],
    frontend: ['React', 'Next.js', 'Redux', 'Tailwind CSS'],
    databases: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB'],
    devops: ['Docker', 'AWS', 'Terraform', 'CI/CD', 'GitHub Actions'],
    tools: ['Git', 'Postman', 'Figma', 'Jira', 'Liferay', 'Moodle']
  },
  languages: ['JavaScript', 'TypeScript', 'Java', 'Python', 'PHP'],
  methodologies: ['Scrum', 'Kanban', 'TDD', 'SOLID']
}

export const ABOUT_EXPERIENCES = [
  {
    period: 'Abr 2024 - Actualidad',
    company: 'Pontificia Universidad Javeriana',
    role: 'Desarrollador Frontend',
    technologies: ['Spring Boot', 'Nest.js', 'React', 'Docker', 'Liferay'],
    type: 'university'
  },
  {
    period: 'Ago 2024 - Nov 2024',
    company: 'Organización Key',
    role: 'Docente Desarrollo Web',
    technologies: ['Nest.js', 'React', 'Redux', 'Next.js'],
    type: 'teaching'
  },
  {
    period: 'Nov 2022 - Dic 2023',
    company: 'Universidad Pedagógica Nacional',
    role: 'Desarrollador FullStack',
    technologies: ['Express.js', 'React', 'Moodle'],
    type: 'university'
  },
  {
    period: 'Sep 2022 - Mar 2023',
    company: 'Calzado Romeliny',
    role: 'Desarrollador Web',
    technologies: ['React', 'Express.js', 'API Mercado Libre'],
    type: 'ecommerce'
  }
]
