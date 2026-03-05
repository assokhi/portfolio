import { AnimatedItem } from './AnimatedSection'

interface CurrentLearningsProps {
  learnings: string[]
}

export default function CurrentLearnings({ learnings }: CurrentLearningsProps) {
  return (
    <section aria-label="Current Learnings" className="mb-16">
      <AnimatedItem>
        <h2 className="text-section-heading text-white mb-2 pb-4 divider">
          Currently Exploring
        </h2>
      </AnimatedItem>

      <AnimatedItem>
        <p className="text-meta mb-6">Active areas of research &amp; deep study</p>
      </AnimatedItem>

      <ul className="space-y-3">
        {learnings.map((item, index) => (
          <AnimatedItem key={index}>
            <li className="flex gap-3 text-body">
              <span className="text-neutral-700 mt-1.5 shrink-0">&rarr;</span>
              <span>{item}</span>
            </li>
          </AnimatedItem>
        ))}
      </ul>
    </section>
  )
}
