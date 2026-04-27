import { notFound }       from 'next/navigation'
import type { Metadata }  from 'next'
import BlogLayout         from '@/components/blog/BlogLayout'
import { getAllPosts, getPostBySlug } from '@/lib/blog'

/* ─────────────────────────────────────────────────────────────────────────────
   Dynamic blog post — /blog/[slug]
   MDX files are pure content (no imports/exports) — the layout is applied here.
───────────────────────────────────────────────────────────────────────────── */

export function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title:       `${post.title} — Arabic Enthusiast`,
    description: post.excerpt,
  }
}

// Static import map — required because Next.js can't dynamic-import MDX at runtime
async function loadContent(slug: string): Promise<React.ComponentType | null> {
  switch (slug) {
    case 'sun-and-moon-letters':
      return (await import('@/content/blog/sun-and-moon-letters.mdx')).default
    case 'why-levantine-arabic':
      return (await import('@/content/blog/why-levantine-arabic.mdx')).default
    case 'al-fatiha-word-by-word':
      return (await import('@/content/blog/al-fatiha-word-by-word.mdx')).default
    default:
      return null
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const meta    = getPostBySlug(params.slug)
  if (!meta) notFound()

  const Content = await loadContent(params.slug)
  if (!Content) notFound()

  return (
    <BlogLayout meta={meta}>
      <Content />
    </BlogLayout>
  )
}
