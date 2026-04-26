import type { Resource } from '@/types'

/* ─────────────────────────────────────────────────────────────────────────────
   Downloadable resources & lead magnets.
   The first three are the homepage lead magnets (is_lead_magnet: true).
   The remaining two are placeholders for future PDFs.
───────────────────────────────────────────────────────────────────────────── */

export const resources: Resource[] = [
  {
    id:             'quranic-taster',
    title:          'Quranic Arabic Taster',
    arabic:         'مقدمة في العربية القرآنية',
    description:    'The 50 most frequent words in the Quran — covering over 40% of all occurrences — plus 5 essential grammar rules you need to start understanding your recitation immediately.',
    category:       'Quranic',
    file_size:      '1.8 MB',
    is_lead_magnet: true,
    preview_url:    null,
  },
  {
    id:             'lebanese-sheet',
    title:          'Lebanese Phrase Sheet',
    arabic:         'ورقة العبارات اللبنانية',
    description:    '30 everyday Lebanese expressions with Arabic script, phonetic transcription, and usage notes — the phrases you will actually hear and use from day one.',
    category:       'Lebanese',
    file_size:      '1.2 MB',
    is_lead_magnet: true,
    preview_url:    null,
  },
  {
    id:             'alphabet-workbook',
    title:          'Arabic Alphabet Workbook',
    arabic:         'كراسة حروف الهجاء',
    description:    'Tracing pages for all 28 Arabic letters in all four positional forms (isolated, initial, medial, final), with stroke-order guides and writing practice grids.',
    category:       'Beginner',
    file_size:      '3.4 MB',
    is_lead_magnet: true,
    preview_url:    null,
  },
  {
    id:             'hawza-glossary',
    title:          'Hawza Student\'s Glossary',
    arabic:         'معجم طالب الحوزة',
    description:    'Coming soon — a curated glossary of Classical Arabic and Islamic terminology used in hawza (seminary) texts, with grammatical analysis and contextual examples.',
    category:       'Advanced',
    file_size:      '—',
    is_lead_magnet: false,
    preview_url:    null,
  },
  {
    id:             'msa-levantine-comparison',
    title:          'Lebanese vs. MSA Comparison Chart',
    arabic:         'جدول مقارنة العامية واللغة الفصحى',
    description:    'Coming soon — a side-by-side comparison of Lebanese dialect and Modern Standard Arabic across vocabulary, pronunciation, and common structures. Essential for heritage speakers.',
    category:       'Intermediate',
    file_size:      '—',
    is_lead_magnet: false,
    preview_url:    null,
  },
]
