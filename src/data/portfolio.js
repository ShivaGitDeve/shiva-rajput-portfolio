// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────
import { FaReact, FaNodeJs, FaPython, FaGitAlt, FaGithub, FaLinkedinIn, FaHtml5, FaCss3Alt, FaDatabase } from 'react-icons/fa6'
import {
  SiJavascript, SiRedux, SiTailwindcss, SiBootstrap, SiExpress, SiJsonwebtokens,
  SiMysql, SiMongodb, SiPostgresql, SiStreamlit,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import {
  HiOutlineEnvelope, HiOutlineArrowsRightLeft, HiOutlineChatBubbleLeftRight,
  HiOutlineMicrophone, HiOutlineCpuChip, HiOutlineCodeBracket, HiOutlineServerStack,
  HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineCircleStack, HiOutlineCommandLine,
} from 'react-icons/hi2'

export const profile = {
  name: 'Shiva Rajput',
  firstName: 'Shiva',
  initials: 'SR',
  headline: 'Full Stack Developer | React.js | Node.js | AI-Powered Applications',
  roles: ['Full Stack Developer', 'React.js Developer', 'Backend Developer', 'AI Application Developer'],
  location: 'Gurugram, Haryana, India',
  email: 'shivarajputdpr@gmail.com',
  phone: '+91 8859995900',
  resume: '/resume.pdf', // place your resume at public/resume.pdf
  logo: '/logo.jpg', // navbar & footer logo — 128px copy of public/Me.jpeg
  available: true,
}

// Profile URLs are built from the usernames — correct them here if they differ.
export const socials = {
  github: { name: 'GitHub', handle: 'ShivaGitDeve', url: 'https://github.com/ShivaGitDeve', icon: FaGithub },
  linkedin: {
    name: 'LinkedIn',
    handle: 'shiva-rajput-652b76236',
    url: 'https://www.linkedin.com/in/shiva-rajput-652b76236',
    icon: FaLinkedinIn,
  },
  email: { name: 'Email', handle: profile.email, url: `mailto:${profile.email}`, icon: HiOutlineEnvelope },
}
export const socialList = Object.values(socials)

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  paragraphs: [
    'I am a Full Stack Developer with experience building responsive frontend applications, enterprise ERP screens, REST APIs, authentication systems, and AI-powered applications.',
    'I work with React.js, JavaScript, Redux, Node.js, Express.js, databases, and modern frontend technologies. I focus on clean, maintainable code, responsive interfaces, API integration, application security, and user experience.',
  ],
  highlights: [
    {
      icon: HiOutlineCodeBracket,
      title: 'Frontend Engineering',
      text: 'Responsive React.js interfaces and enterprise ERP screens with Redux state management.',
    },
    {
      icon: HiOutlineServerStack,
      title: 'Backend & APIs',
      text: 'REST APIs with Node.js and Express.js, integrated end-to-end with the frontend.',
    },
    {
      icon: HiOutlineShieldCheck,
      title: 'Authentication & Security',
      text: 'JWT auth, refresh token rotation, role-based access control and session management.',
    },
    {
      icon: HiOutlineSparkles,
      title: 'AI-Powered Applications',
      text: 'Conversational AI with speech recognition and fine-tuned transformer models.',
    },
  ],
}

export const experience = [
  {
    role: 'Software Developer',
    company: 'Eazy ERP Pvt Ltd',
    period: 'Sep 2025 – Present',
    location: 'Gurgaon',
    current: true,
    points: [
      'Developed and maintained ERP application screens using React.js.',
      'Built responsive and user-friendly interfaces for enterprise modules.',
      'Implemented Redux for efficient state management.',
      'Handled form validations, user interactions, and business logic.',
    ],
    tech: ['React.js', 'Redux', 'JavaScript'],
  },
  {
    role: 'AI/ML Intern',
    company: 'Revel Labs Pvt Ltd',
    period: 'Mar 2025 – Sep 2025',
    location: 'Noida',
    points: [
      'Designed and developed a conversational AI chatbot using Python, Streamlit, and SQL.',
      'Worked on speech recognition and conversation context handling.',
      'Implemented real-time chat response flows using fine-tuned transformer models.',
    ],
    tech: ['Python', 'Streamlit', 'SQL', 'Transformers'],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Maruti Suzuki Pvt Ltd',
    period: 'May 2024 – Aug 2024',
    location: 'Gurgaon',
    points: [
      'Developed and maintained an internal dashboard for operational data.',
      'Built responsive React.js UI components.',
      'Improved reporting efficiency by streamlining manual processes.',
    ],
    tech: ['React.js', 'JavaScript', 'CSS'],
  },
]

export const skillGroups = [
  {
    title: 'Frontend Development',
    icon: HiOutlineCodeBracket,
    skills: [
      { name: 'HTML5', icon: FaHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'React.js', icon: FaReact, color: '#61DAFB' },
      { name: 'Redux', icon: SiRedux, color: '#9F7AEA' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#A78BFA' },
    ],
  },
  {
    title: 'Backend Development',
    icon: HiOutlineServerStack,
    skills: [
      { name: 'Node.js', icon: FaNodeJs, color: '#5FA04E' },
      { name: 'Express.js', icon: SiExpress, color: '#E2E8F0' },
      { name: 'REST APIs', icon: HiOutlineArrowsRightLeft, color: '#22D3EE' },
      { name: 'JWT Authentication', icon: SiJsonwebtokens, color: '#F472B6' },
    ],
  },
  {
    title: 'Databases',
    icon: HiOutlineCircleStack,
    skills: [
      { name: 'MySQL', icon: SiMysql, color: '#5B9BD5' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#6B8FE8' },
    ],
  },
  {
    title: 'AI/ML',
    icon: HiOutlineSparkles,
    skills: [
      { name: 'Python', icon: FaPython, color: '#FFD43B' },
      { name: 'Streamlit', icon: SiStreamlit, color: '#FF4B4B' },
      { name: 'SQL', icon: FaDatabase, color: '#94A3B8' },
      { name: 'Conversational AI', icon: HiOutlineChatBubbleLeftRight, color: '#A78BFA' },
      { name: 'Speech Recognition', icon: HiOutlineMicrophone, color: '#22D3EE' },
      { name: 'Transformer Models', icon: HiOutlineCpuChip, color: '#C084FC' },
    ],
  },
  {
    title: 'Tools & Workflow',
    icon: HiOutlineCommandLine,
    skills: [
      { name: 'Git', icon: FaGitAlt, color: '#F05032' },
      { name: 'GitHub', icon: FaGithub, color: '#E2E8F0' },
      { name: 'VS Code', icon: VscVscode, color: '#3B9EEA' },
    ],
  },
]

// Add real URLs to `links.github` / `links.live` — empty links are hidden automatically.
export const projects = [
  {
    id: 'secureauth',
    title: 'SecureAuth',
    subtitle: 'Full Stack Authentication System',
    year: '2026',
    featured: true,
    visual: 'auth',
    description:
      'A full-stack authentication system with registration and login, JWT-based authentication with refresh token rotation, protected routes and role-based access control.',
    points: [
      'JWT authentication with refresh token rotation',
      'Refresh-token reuse detection & session management',
      'Protected routes and role-based access control',
      'Password management and account security features',
      'Integrated frontend and backend APIs',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'Sequelize', 'JWT', 'SQL'],
    links: { github: '', live: '' },
  },
  {
    id: 'chatbot',
    title: 'Conversational AI Chatbot',
    subtitle: 'Speech-enabled, context-aware assistant',
    visual: 'chat',
    description:
      'A conversational AI chatbot with speech recognition, context-aware conversations and a real-time response flow powered by fine-tuned transformer models.',
    tech: ['Python', 'Streamlit', 'SQL', 'Transformers'],
    links: { github: '', live: '' },
  },
  {
    id: 'business',
    title: 'Business Website',
    subtitle: 'MERN Stack',
    year: '2024',
    visual: 'web',
    description:
      'A business website with user registration and service listings, integrated REST APIs, and a responsive interface with smooth navigation and form handling.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    links: { github: '', live: '' },
  },
]

export const education = {
  degree: 'Bachelor of Technology',
  field: 'Computer Science Engineering',
  school: 'Dronacharya College of Engineering, Farukhnagar',
  period: 'Aug 2021 – May 2025',
  cgpa: '7.5',
}
