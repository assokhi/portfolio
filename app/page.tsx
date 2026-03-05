import fs from 'fs'
import path from 'path'
import { PortfolioData } from '@/types/portfolio'
import { AnimatedContainer, AnimatedItem } from '@/components/AnimatedSection'
import Header from '@/components/Header'
import About from '@/components/About'
import EducationSection from '@/components/Education'
import ExperienceSection from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Achievements from '@/components/Achievements'
import CurrentLearnings from '@/components/CurrentLearnings'
import Footer from '@/components/Footer'

// ─── Read and parse the JSON content layer at build time ──────
// This is the ONLY place the file system is touched.
// Update data.json and run `git push` — the CI pipeline rebuilds
// and deploys the site automatically. No CMS. No database.
function getPortfolioData(): PortfolioData {
  const filePath = path.join(process.cwd(), 'data.json')
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw) as PortfolioData
}

// ─── Page ─────────────────────────────────────────────────────
export default function Home() {
  const data = getPortfolioData()

  return (
    <main className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      {/* Staggered entrance animation orchestrator wraps the whole page */}
      <AnimatedContainer>
        {/* Identity */}
        <AnimatedItem>
          <Header data={data.personal_information} />
        </AnimatedItem>

        {/* Professional Summary */}
        <AnimatedItem>
          <About summary={data.professional_summary} keywords={data.keywords ?? []} />
        </AnimatedItem>

        {/* Education */}
        <AnimatedItem>
          <EducationSection education={data.academic_education} />
        </AnimatedItem>

        {/* Experience */}
        <AnimatedItem>
          <ExperienceSection experience={data.professional_experience} keywords={data.keywords ?? []} />
        </AnimatedItem>

        {/* Projects */}
        <AnimatedItem>
          <Projects projects={data.technical_projects} keywords={data.keywords ?? []} />
        </AnimatedItem>

        {/* Skills */}
        <AnimatedItem>
          <Skills skills={data.technical_skills} />
        </AnimatedItem>

        {/* Achievements */}
        <AnimatedItem>
          <Achievements achievements={data.key_achievements} keywords={data.keywords ?? []} />
        </AnimatedItem>

        {/* Current Learnings */}
        <AnimatedItem>
          <CurrentLearnings learnings={data.current_learnings} keywords={data.keywords ?? []} />
        </AnimatedItem>

        {/* Footer */}
        <AnimatedItem>
          <Footer data={data.personal_information} />
        </AnimatedItem>
      </AnimatedContainer>
    </main>
  )
}
