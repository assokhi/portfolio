import React from 'react'

/**
 * highlight()
 *
 * Splits `text` around any matched `keyword` (case-insensitive) and wraps
 * the matched portion in an amber-coloured span.
 *
 * Returns a ReactNode — safe to use in both Server and Client components.
 */
export function highlight(text: string, keywords: string[]): React.ReactNode {
  if (!keywords || keywords.length === 0) return text

  // Escape regex special chars in each keyword
  const escaped = keywords.map((k) =>
    k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  )

  // Capturing group keeps the matched part in the split result array
  const pattern = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(pattern)

  // If nothing matched, avoid allocating a Fragment
  if (parts.length === 1) return text

  const lowerKeywords = new Set(keywords.map((k) => k.toLowerCase()))

  return (
    <>
      {parts.map((part, i) =>
        lowerKeywords.has(part.toLowerCase()) ? (
          <span key={i} className="text-amber-400 font-medium">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  )
}
