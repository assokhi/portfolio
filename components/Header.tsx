import { PersonalInformation } from '@/types/portfolio'
import { AnimatedItem, AnimatedLink } from './AnimatedSection'

interface HeaderProps {
  data: PersonalInformation
}

export default function Header({ data }: HeaderProps) {
  return (
    <header className="mb-20">
      <AnimatedItem>
        <h1 className="text-display text-white mb-3">{data.name}</h1>
      </AnimatedItem>

      <AnimatedItem>
        <p className="text-meta mb-6">
          Software Engineer &mdash; Backend &bull; Distributed Systems &bull; AI
        </p>
      </AnimatedItem>

      <AnimatedItem>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <AnimatedLink
            href={`mailto:${data.email}`}
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            {data.email}
          </AnimatedLink>

          <span className="text-neutral-700">|</span>

          <AnimatedLink
            href={data.github}
            external
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            GitHub
          </AnimatedLink>

          <AnimatedLink
            href={data.linkedin}
            external
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            LinkedIn
          </AnimatedLink>

          {data.leetcode && (
            <AnimatedLink
              href={data.leetcode}
              external
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              LeetCode
            </AnimatedLink>
          )}

          <span className="text-neutral-700">|</span>

          <span className="text-sm text-neutral-600">{data.location}</span>
        </div>
      </AnimatedItem>
    </header>
  )
}
