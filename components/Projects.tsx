'use client'

import { motion } from 'framer-motion'
import { Project } from '@/types/portfolio'
import { highlight } from '@/lib/highlight'
import { AnimatedItem } from './AnimatedSection'

interface ProjectsProps {
  projects: Project[]
  keywords: string[]
}

export default function Projects({ projects, keywords }: ProjectsProps) {
  return (
    <section aria-label="Technical Projects" className="mb-16">
      <AnimatedItem>
        <h2 className="text-section-heading text-white mb-8 pb-4 divider">
          Projects
        </h2>
      </AnimatedItem>

      <div className="space-y-12">
        {projects.map((project, index) => (
          <AnimatedItem key={index}>
            <motion.div
              className="group"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Title & status */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                <motion.h3
                  className="text-lg font-medium text-neutral-200"
                  variants={{ hover: { color: '#ffffff', x: 4 } }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                </motion.h3>
                <span className="text-meta">{project.status}</span>
              </div>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.stack.map((tech, i) => (
                  <span key={i} className="tag">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Description bullets */}
              <ul className="space-y-2">
                {project.description.map((point, i) => (
                  <li key={i} className="flex gap-3 text-body">
                    <span className="text-neutral-700 mt-1.5 shrink-0">&mdash;</span>
                    <span>{highlight(point, keywords)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatedItem>
        ))}
      </div>
    </section>
  )
}
