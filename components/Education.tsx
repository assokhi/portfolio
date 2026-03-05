import { Education } from '@/types/portfolio'
import { AnimatedItem } from './AnimatedSection'

interface EducationProps {
  education: Education[]
}

export default function EducationSection({ education }: EducationProps) {
  return (
    <section aria-label="Education" className="mb-16">
      <AnimatedItem>
        <h2 className="text-section-heading text-white mb-8 pb-4 divider">
          Education
        </h2>
      </AnimatedItem>

      <div className="space-y-8">
        {education.map((edu, index) => (
          <AnimatedItem key={index}>
            <div className="group">
              {/* Institution & dates */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <h3 className="text-lg font-medium text-white">{edu.institution}</h3>
                <span className="text-meta">
                  {edu.start_date} &mdash; {edu.end_date}
                </span>
              </div>

              {/* Degree */}
              <p className="text-neutral-300 text-sm mb-1">
                {edu.degree}, {edu.major}
                {edu.minor && (
                  <span className="text-neutral-500">
                    {' '}
                    &bull; Minor in {edu.minor}
                  </span>
                )}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                <span className="text-meta">{edu.location}</span>
                {edu.cgpa && (
                  <span className="text-meta">CGPA &nbsp;{edu.cgpa}</span>
                )}
              </div>
            </div>
          </AnimatedItem>
        ))}
      </div>
    </section>
  )
}
