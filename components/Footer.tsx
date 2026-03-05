import { AnimatedItem } from './AnimatedSection'
import { PersonalInformation } from '@/types/portfolio'

interface FooterProps {
  data: PersonalInformation
}

export default function Footer({ data }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 pt-8 divider">
      <AnimatedItem>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-meta">&copy; {year} {data.name}</p>
          <p className="text-meta">
            Built with Next.js &bull; Deployed via GitHub Pages
          </p>
        </div>
      </AnimatedItem>
    </footer>
  )
}
