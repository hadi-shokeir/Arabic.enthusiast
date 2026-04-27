import type { MDXComponents } from 'mdx/types'

/* ─────────────────────────────────────────────────────────────────────────────
   MDX component overrides — used by @next/mdx in App Router.
   All elements use CSS variables so they respect the dark/light theme.
───────────────────────────────────────────────────────────────────────────── */

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // All styling is handled by the .prose CSS class applied in BlogLayout
  }
}
