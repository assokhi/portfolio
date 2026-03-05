import { AnimatedItem } from './AnimatedSection'

interface AboutProps {
  summary: string
}

export default function About({ summary }: AboutProps) {
  return (
    <section aria-label="Professional Summary" className="mb-16">
      <AnimatedItem>
        <h2 className="text-section-heading text-white mb-4 pb-4 divider">
          Summary
        </h2>
      </AnimatedItem>
      <AnimatedItem>
        <p className="text-body">{summary}</p>
      </AnimatedItem>
    </section>
  )
}
