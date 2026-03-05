'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

// ─── Shared variant definitions ─────────────────────────────────
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
}

// ─── AnimatedContainer ──────────────────────────────────────────
interface AnimatedContainerProps {
  children: ReactNode
  className?: string
}

export function AnimatedContainer({
  children,
  className = '',
}: AnimatedContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── AnimatedItem ───────────────────────────────────────────────
interface AnimatedItemProps {
  children: ReactNode
  className?: string
}

export function AnimatedItem({ children, className = '' }: AnimatedItemProps) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

// ─── AnimatedLink — subtle x-translate on hover ─────────────────
interface AnimatedLinkProps {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}

export function AnimatedLink({
  href,
  children,
  className = '',
  external = false,
}: AnimatedLinkProps) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={className}
      whileHover={{ x: 4, color: '#ffffff' }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  )
}

// ─── FocusGroup — dims siblings on hover ─────────────────────────
interface FocusGroupProps {
  children: ReactNode
  className?: string
}

export function FocusGroup({ children, className = '' }: FocusGroupProps) {
  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover="hover"
    >
      {children}
    </motion.div>
  )
}
