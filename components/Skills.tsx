import { TechnicalSkills } from '@/types/portfolio'
import { AnimatedItem } from './AnimatedSection'

interface SkillsProps {
  skills: TechnicalSkills
}

const CATEGORY_LABELS: Record<keyof TechnicalSkills, string> = {
  languages: 'Languages',
  concepts: 'Concepts',
  frameworks: 'Frameworks & Libraries',
  tools: 'Tools & Platforms',
}

export default function Skills({ skills }: SkillsProps) {
  const categories = Object.keys(skills) as (keyof TechnicalSkills)[]

  return (
    <section aria-label="Technical Skills" className="mb-16">
      <AnimatedItem>
        <h2 className="text-section-heading text-white mb-8 pb-4 divider">
          Skills
        </h2>
      </AnimatedItem>

      <div className="space-y-6">
        {categories.map((category) => (
          <AnimatedItem key={category}>
            <div>
              <p className="text-meta mb-3">{CATEGORY_LABELS[category]}</p>
              <div className="flex flex-wrap gap-2">
                {skills[category].map((skill, i) => (
                  <span key={i} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </section>
  )
}
