import { AnimatedItem } from './AnimatedSection'

interface AchievementsProps {
  achievements: string[]
}

export default function Achievements({ achievements }: AchievementsProps) {
  return (
    <section aria-label="Key Achievements" className="mb-16">
      <AnimatedItem>
        <h2 className="text-section-heading text-white mb-8 pb-4 divider">
          Achievements
        </h2>
      </AnimatedItem>

      <ul className="space-y-4">
        {achievements.map((item, index) => (
          <AnimatedItem key={index}>
            <li className="flex gap-4">
              {/* Decorative counter */}
              <span className="font-mono text-xs text-neutral-700 pt-1.5 w-5 shrink-0 tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-body">{item}</p>
            </li>
          </AnimatedItem>
        ))}
      </ul>
    </section>
  )
}
