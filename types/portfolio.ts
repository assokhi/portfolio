export interface PersonalInformation {
  name: string
  email: string
  location: string
  github: string
  linkedin: string
  leetcode?: string
}

export interface Education {
  institution: string
  location: string
  degree: string
  major: string
  minor?: string
  start_date: string
  end_date: string
  cgpa: string
}

export interface Experience {
  organization: string
  role: string
  type: string
  start_date: string
  end_date: string
  contributions: string[]
}

export interface Project {
  title: string
  status: string
  stack: string[]
  description: string[]
}

export interface TechnicalSkills {
  languages: string[]
  concepts: string[]
  frameworks: string[]
  tools: string[]
}

export interface PortfolioData {
  personal_information: PersonalInformation
  professional_summary: string
  academic_education: Education[]
  professional_experience: Experience[]
  technical_projects: Project[]
  technical_skills: TechnicalSkills
  key_achievements: string[]
  current_learnings: string[]
  keywords?: string[]
}
