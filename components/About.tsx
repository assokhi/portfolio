import { highlight } from '@/lib/highlight'
import { AnimatedItem } from './AnimatedSection'

interface AboutProps {
  summary: string
  keywords: string[]
}

export default function About({ summary, keywords }: AboutProps) {
  return (
    <section aria-label="Professional Summary" className="mb-16">
      <AnimatedItem>
        <h2 className="text-section-heading text-white mb-4 pb-4 divider">
          Summary
        </h2>
      </AnimatedItem>
      <AnimatedItem>
        <p className="text-body">{highlight(summary, keywords)}</p>
      </AnimatedItem>
    </section>
  )
}
