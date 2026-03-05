import { Experience } from '@/types/portfolio'
import { AnimatedItem } from './AnimatedSection'

interface ExperienceProps {
  experience: Experience[]
}

export default function ExperienceSection({ experience }: ExperienceProps) {
  return (
    <section aria-label="Professional Experience" className="mb-16">
      <AnimatedItem>
        <h2 className="text-section-heading text-white mb-8 pb-4 divider">
          Experience
        </h2>
      </AnimatedItem>

      <div className="space-y-10">
        {experience.map((exp, index) => (
          <AnimatedItem key={index}>
            <div>
              {/* Role & dates */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                <h3 className="text-lg font-medium text-white">{exp.role}</h3>
                <span className="text-meta">
                  {exp.start_date} &mdash; {exp.end_date}
                </span>
              </div>

              {/* Org + type */}
              <p className="text-neutral-400 text-sm mb-4">
                {exp.organization}
                <span className="text-neutral-700"> &bull; {exp.type}</span>
              </p>

              {/* Contributions */}
              <ul className="space-y-2">
                {exp.contributions.map((point, i) => (
                  <li key={i} className="flex gap-3 text-body">
                    <span className="text-neutral-700 mt-1.5 shrink-0">&mdash;</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </section>
  )
}
