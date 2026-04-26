import type { Course } from '@/types'

/* ─────────────────────────────────────────────────────────────────────────────
   Arabic Enthusiast — Full Course & Lesson Data
   3 courses × 6 lessons = 18 lessons.
   Each lesson has: intro, keyPoints (4-6), and a quiz with explanation.

   *** REVIEW CHECKPOINT ***
   Hadi: please check all Arabic text, quiz questions, answers, and
   explanations before this goes live. Grammar framings and Arabic accuracy
   are your call to approve or revise.
───────────────────────────────────────────────────────────────────────────── */

export const courses: Course[] = [

  /* ══════════════════════════════════════════════════════════════════════════
     COURSE 1 — Arabic Foundations (Classical Arabic, Beginner)
     Accent: --course-foundations (#C9922A / gold)
  ══════════════════════════════════════════════════════════════════════════ */
  {
    id:       'arabic-foundations',
    level:    'Beginner',
    type:     'Classical',
    title:    'Arabic Foundations',
    arabic:   'أساسيات العربية',
    subtitle: 'Script, sounds & first words',
    desc:     'Master all 28 letters, their positional forms, and begin reading real Arabic words. The essential first step for every learner.',
    color:    '#C9922A',
    topics:   [
      'The Arabic alphabet',
      'Letter forms (isolated, initial, medial, final)',
      'Short & long vowels',
      'Sun & moon letters',
    ],
    featured: true,

    lessons: [
      {
        id:       'af-l1',
        title:    'The Arabic Alphabet',
        arabic:   'حروف الهجاء',
        duration: 40,
        type:     'video+exercise',
        free:     true,
        intro:
          'Arabic has 28 letters — all consonants. Unlike the Roman alphabet, Arabic is written and read from right to left, and letters are connected in a flowing, cursive script. In this first lesson you will meet all 28 letters in their basic isolated form, learn how to pronounce each one, and understand the three categories that govern how they behave: connectors, non-connectors, and letters with unique sounds that have no equivalent in English.',
        keyPoints: [
          'Arabic is written right to left — the rightmost letter is always the first.',
          'All 28 letters are consonants; vowel sounds are added separately using small marks called harakat.',
          'Letters fall into two groups: most connect to both neighbours; six non-connectors (ا د ذ ر ز و) only connect to the letter before them.',
          'Some Arabic sounds — ع (ʿayn), ح (ḥa), خ (kha), غ (ghain), ق (qaf) — do not exist in English and require deliberate practice.',
          'Letters that share a base shape are distinguished only by dots: ب ت ث all share one shape; ج ح خ share another.',
        ],
        quiz: {
          question:    'Which of the following letters does NOT connect to the letter that follows it?',
          options:     ['ب (Ba)', 'ك (Kaf)', 'ر (Ra)', 'م (Mim)'],
          answer:      'ر (Ra)',
          explanation:
            'Ra (ر) is one of the six non-connector letters — along with Alif, Dal, Dhal, Zay, and Waw. These letters connect to the letter before them (on their right) but do not connect forward to the letter after them. This is a fixed property of these letters, not a rule that changes by position. You will learn to recognise them quickly because they always cause a break in the flow of a written word.',
        },
      },

      {
        id:       'af-l2',
        title:    'Letter Groups & Shapes',
        arabic:   'أشكال الحروف',
        duration: 35,
        type:     'video+exercise',
        free:     true,
        intro:
          'One of the first things Arabic learners notice is that many letters look similar. This is not accidental — Arabic script groups letters by a shared base shape, using dots to differentiate them. Once you see these families clearly, the script becomes far less overwhelming. In this lesson you will group all 28 letters by their skeleton shape, understand how dots change identity, and begin to read simple letter combinations with confidence.',
        keyPoints: [
          'Arabic letters are organised into shape families: ب ت ث share a bowl shape; ج ح خ share a hook; س ش share a serrated base.',
          'Within each family, dots are the only distinguishing feature — one dot below (ب), two dots above (ت), three dots above (ث).',
          'The emphatic letters — ص ض ط ظ — have heavier, rounder shapes and are pronounced further back in the mouth than their plain counterparts.',
          'ع (ʿayn) and غ (ghain) are a family unique to Arabic; their shape resembles a loop that changes dramatically across positions.',
          'Recognising shape families allows you to learn letters in clusters of two or three, rather than 28 isolated symbols.',
        ],
        quiz: {
          question:    'Which letter shares its base shape with ج (Jim)?',
          options:     ['ب (Ba)', 'ح (Ḥa)', 'ر (Ra)', 'ك (Kaf)'],
          answer:      'ح (Ḥa)',
          explanation:
            'Jim (ج), Ḥa (ح), and Kha (خ) all share the same hook-shaped skeleton. What distinguishes them is the dot: Jim has one dot below, Ḥa has no dot at all, and Kha has one dot above. This three-way family is one of the most important shape groups to master early, because ح and ع are both throat sounds with no English equivalent, and confusing their written forms is a very common early mistake.',
        },
      },

      {
        id:       'af-l3',
        title:    'Connecting Letters',
        arabic:   'وصل الحروف',
        duration: 45,
        type:     'video+quiz',
        free:     false,
        intro:
          'Reading printed Arabic requires understanding that each letter changes shape depending on where it sits inside a word. A letter at the start of a word looks different from the same letter in the middle, and different again at the end. There are four positional forms for most letters: isolated, initial, medial, and final. In this lesson you will practise all four forms and start reading your first real connected words.',
        keyPoints: [
          'Every connecting letter has four forms: isolated (alone), initial (word-start), medial (middle), and final (word-end).',
          'The core shape stays recognisable across all four forms — only the "connecting tails" change to join adjacent letters.',
          'Non-connectors (ا د ذ ر ز و) have only two forms: isolated and final — they never take an initial or medial form.',
          'Ligatures are special combinations where two letters merge visually — the most important is لا (lam-alif), which is mandatory and looks nothing like its component letters.',
          'Begin reading words by locating the skeleton of each letter, then checking for dots and diacritics.',
        ],
        quiz: {
          question:    'The word كِتَاب (book) is written with four letters. Which of these is the correct connected form?',
          options:     ['ك ت ا ب', 'كِتَاب', 'كـتـاب', 'ك-ت-ا-ب'],
          answer:      'كِتَاب',
          explanation:
            'In كِتَاب, the letters connect as follows: Kaf (ك) takes its initial form (كـ), Ta (ت) takes its medial form (ـتـ), Alif (ا) is a non-connector so it takes its final-ish isolated form, and Ba (ب) takes its final form (ـب). The result is كِتَاب. The dots and harakat (short vowel marks) sit above and below the skeleton, which you read right to left: k-i-t-ā-b.',
        },
      },

      {
        id:       'af-l4',
        title:    'Short Vowels (Harakat)',
        arabic:   'الحركات القصيرة',
        duration: 40,
        type:     'video+exercise',
        free:     false,
        intro:
          'Arabic consonants carry the meaning; vowels carry the grammar. Short vowels — called harakat (حَرَكَات) — are small diacritical marks written above or below a letter to show exactly how it is pronounced. In unvowelled text (which most adult Arabic is), these marks are omitted and the reader supplies them from context. In this lesson you will master the three short vowels, the sukun (silence mark), and the tanwin endings that create indefinite nouns.',
        keyPoints: [
          'Fatha (َ) sits above a letter and produces a short "a" sound, as in "bat": كَ = ka.',
          'Kasra (ِ) sits below a letter and produces a short "i" sound, as in "bit": كِ = ki.',
          'Damma (ُ) sits above a letter as a small raised loop and produces a short "u" sound: كُ = ku.',
          'Sukun (ْ) marks a consonant with no following vowel — it creates closed syllables: كْ = k (silent, no vowel).',
          'Tanwin doubles a haraka and adds a nun-sound to mark indefinite nouns: كِتَابٌ (a book) vs. كِتَابُ (the book\'s...).',
        ],
        quiz: {
          question:    'The mark (ِ) placed beneath a letter in Arabic is called:',
          options:     ['Fatha', 'Kasra', 'Damma', 'Sukun'],
          answer:      'Kasra',
          explanation:
            'The kasra (الكسرة) is the short vowel mark placed below a consonant, producing a short "i" sound. Its name comes from the Arabic verb كَسَرَ (to break) — it "breaks" the letter downward. The three short vowels follow a logical spatial pattern: fatha (short a) is above, kasra (short i) is below, and damma (short u) is above as a raised hook. Learning their positions relative to the letter is as important as learning the sounds they produce.',
        },
      },

      {
        id:       'af-l5',
        title:    'Long Vowels & Diphthongs',
        arabic:   'المدود والحروف اللينة',
        duration: 38,
        type:     'video+exercise',
        free:     false,
        intro:
          'Where short vowels are marked with small diacritics, long vowels are represented by the letters Alif (ا), Waw (و), and Ya (ي) when they follow a matching short vowel. This is one of the most elegant features of the Arabic script — the long vowel letters are visible even in unvowelled text, making them anchor points for reading. Diphthongs — the sounds "aw" and "ay" — are closely related and appear constantly in Quranic and Classical Arabic.',
        keyPoints: [
          'A fatha followed by Alif (ا) produces a long ā: بَاب (bāb, door).',
          'A damma followed by Waw (و) produces a long ū: نُور (nūr, light).',
          'A kasra followed by Ya (ي) produces a long ī: كِتَابِي (kitābī, my book).',
          'The diphthong "aw" (as in "now") is a fatha followed by a consonant Waw: يَوْم (yawm, day).',
          'The diphthong "ay" (as in "day") is a fatha followed by a consonant Ya: بَيْت (bayt, house).',
          'Long vowels are approximately twice the duration of short vowels — this length distinction is grammatically significant in Classical Arabic.',
        ],
        quiz: {
          question:    'In the word نُور (nūr, meaning "light"), how is the long ū vowel formed?',
          options:     [
            'A fatha followed by Alif',
            'A damma followed by Waw',
            'A kasra followed by Ya',
            'Two fathas in a row',
          ],
          answer:      'A damma followed by Waw',
          explanation:
            'In نُور, the Nun carries a damma (ُ), which is the short "u" sound. This is immediately followed by Waw (و) acting as a long vowel letter — not as the consonant "w". Together they form the long ū sound. This is the rule: when Waw follows a damma on the previous letter, it lengthens that vowel rather than acting as a consonant. The same logic applies to Alif (lengthens fatha → ā) and Ya (lengthens kasra → ī).',
        },
      },

      {
        id:       'af-l6',
        title:    'Sun & Moon Letters',
        arabic:   'الشمسية والقمرية',
        duration: 42,
        type:     'video+quiz',
        free:     false,
        intro:
          'The Arabic definite article ال (al-) is pronounced differently depending on what letter follows it. When it precedes one of the 14 "sun letters" (الحروف الشمسية), the lam (ل) of al- is not pronounced — instead, the first letter of the word is doubled. When it precedes one of the 14 "moon letters" (الحروف القمرية), the lam is pronounced normally. This assimilation rule is one of the most important pronunciation rules in Arabic and affects every sentence you will ever speak.',
        keyPoints: [
          'The definite article ال is always spelled the same — the assimilation happens in pronunciation only, not in writing.',
          'Sun letters are articulated in the front of the mouth, in roughly the same place as ل (lam) — so the lam assimilates to them: الشَّمْس is pronounced "ash-shams", not "al-shams".',
          'Moon letters are articulated further back in the mouth or throat, away from ل — so they do not trigger assimilation: القَمَر is pronounced "al-qamar".',
          'The 14 sun letters are: ت ث د ذ ر ز س ش ص ض ط ظ ل ن — notice they cluster in the front of the mouth.',
          'When assimilation occurs, a shadda (ّ) is written on the first letter of the noun in fully vowelled text, indicating the letter is doubled.',
        ],
        quiz: {
          question:    'How is الشَّمْس ("the sun") correctly pronounced?',
          options:     ['al-shams', 'ash-shams', 'as-shams', 'al-shams (no change)'],
          answer:      'ash-shams',
          explanation:
            'Shin (ش) is a sun letter — it is articulated in the front of the mouth near the lam. When ال precedes a sun letter, the lam of al- assimilates completely into that letter: instead of saying "al-shams", you say "ash-shams". In the written form الشَّمْس, the shadda (ّ) on the Shin signals this doubling. This is not an exception — it is a regular, predictable rule. Once you know which 14 letters are sun letters, you can apply the rule automatically to any Arabic word.',
        },
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════════════════════
     COURSE 2 — Levantine Arabic (Conversational, Beginner)
     Accent: --course-levantine (#6B9E8F / teal)
  ══════════════════════════════════════════════════════════════════════════ */
  {
    id:       'levantine-dialect',
    level:    'Beginner',
    type:     'Levantine',
    title:    'Levantine Arabic',
    arabic:   'العامية الشامية',
    subtitle: 'Conversational Arabic',
    desc:     'Speak naturally with Levantine speakers. Learn conversational Arabic as it\'s truly spoken — not just in textbooks.',
    color:    '#6B9E8F',
    topics:   [
      'Everyday conversation',
      'Levantine pronunciation',
      'Common expressions',
      'Family & daily life',
    ],
    featured: true,

    lessons: [
      {
        id:       'lev-l1',
        title:    'Greetings & Introductions',
        arabic:   'التحية والتعريف',
        duration: 35,
        type:     'video+exercise',
        free:     true,
        intro:
          'Levantine Arabic is the dialect spoken across Lebanon, Syria, Palestine, and Jordan. It differs from Modern Standard Arabic (MSA) in pronunciation, vocabulary, and grammar — but it is the Arabic you will actually hear when you visit, watch Lebanese TV, or speak to a Levantine family. This first lesson covers the essential social rituals: how to greet someone properly, introduce yourself, ask someone\'s name, and respond to common openers. These phrases will be the most used words in your Arabic life.',
        keyPoints: [
          'مرحبا (marhaba) is the standard Levantine greeting — response: مرحبتين (marhabtayn, "two hellos") or أهلا (ahla).',
          'كيفك؟ (kifak? / kifik?) means "How are you?" — مـ (m) ending for male, ـك (ik) for female.',
          'شو اسمك؟ (shu ismak? / ismik?) means "What\'s your name?" — اسمي... (ismi...) means "My name is...".',
          'منيح (mnee7) means "good/fine" — one of the most common Levantine words you will hear daily.',
          'يعطيك العافية (ya\'tik il-\'afye) is a versatile expression of thanks — literally "may God give you health", used constantly in Levantine culture.',
          'Levantine drops the ق (qaf) to a glottal stop in most words — القلب becomes il-alb. This is the single most distinctive feature of Lebanese pronunciation.',
        ],
        quiz: {
          question:    'How do you ask "How are you?" to a female speaker in Levantine Arabic?',
          options:     ['كيفك (kifak)', 'كيفيك (kifik)', 'كيف حالك (kayfa ḥālak)', 'منيح (mnee7)'],
          answer:      'كيفيك (kifik)',
          explanation:
            'In Levantine Arabic, pronouns and verb endings change depending on the gender of the person you\'re addressing. For a male, you say كيفك (kifak — the ـك suffix is the masculine "you"). For a female, you say كيفيك (kifik — the ـيك suffix is the feminine "you"). This gender distinction in the second person is a feature Levantine shares with MSA but drops in many other dialects. Remembering to adjust the ending is a small but meaningful sign of care when speaking to someone.',
        },
      },

      {
        id:       'lev-l2',
        title:    'Numbers & Time',
        arabic:   'الأرقام والوقت',
        duration: 40,
        type:     'video+exercise',
        free:     true,
        intro:
          'Numbers and time are among the first things you will need in any real conversation — from asking the price of something at a market to arranging where to meet. Levantine Arabic numbers differ from MSA numbers in pronunciation, and the grammar of counting is more relaxed in speech than in formal Arabic. This lesson covers 1–20 and higher round numbers, how to tell the time, and the days of the week.',
        keyPoints: [
          'Numbers 1–10 in Levantine: واحد، تنين، تلاتة، أربعة، خمسة، ستة، سبعة، تمانية، تسعة، عشرة.',
          'Levantine uses تنين (tneen) for "two" instead of MSA اثنان — and collapses three-syllable MSA numbers into shorter forms.',
          'Numbers 11–19 end in ـعشر (-ʿashar): اثنعشر (12), تلتعشر (13).',
          'Round tens: عشرين (20), تلاتين (30), أربعين (40), خمسين (50), ستين (60), سبعين (70), تمانين (80), تسعين (90).',
          'Time: قديش الساعة؟ (adeesh il-sa\'a?) = "What time is it?" — الساعة تلاتة (il-sa\'a tlate) = "It\'s 3 o\'clock".',
          'Days of the week: الأحد، الاثنين، الثلاثاء، الأربعاء، الخميس، الجمعة، السبت — familiar from MSA but pronounced with Levantine phonology.',
        ],
        quiz: {
          question:    'How do you say "three" in Levantine Arabic?',
          options:     ['ثلاثة (thalātha)', 'تلاتة (tlate)', 'ثلاث (thalāth)', 'تلت (talt)'],
          answer:      'تلاتة (tlate)',
          explanation:
            'In Levantine Arabic, the MSA ثلاثة (thalātha) becomes تلاتة (tlate). Two changes happen: first, the classical Tha (ث) sound shifts to Ta (ت) in Lebanese pronunciation — so "th" becomes "t". Second, the three-syllable MSA word compresses in natural speech. This is a pattern you will see repeatedly: Levantine tends to drop unaccented syllables and soften difficult sounds. It is not laziness — it is natural phonological reduction, the same process that turned "I am going to" into "gonna" in English.',
        },
      },

      {
        id:       'lev-l3',
        title:    'Family & Relationships',
        arabic:   'العيلة والعلاقات',
        duration: 45,
        type:     'video+quiz',
        free:     false,
        intro:
          'Family is central to Levantine culture, and family vocabulary will come up in almost every conversation. Knowing how to ask about someone\'s family, introduce your own relatives, and understand kinship terms is both practically useful and culturally important. Levantine family terms often differ from their MSA equivalents — and some terms have no MSA equivalent at all.',
        keyPoints: [
          'يمّا (yamma) = mother (informal, affectionate) — more commonly used than أمّ (umm) in everyday speech.',
          'يبا / يابا (yaba) = father (informal) — أبو (abu) + first child\'s name is used as an honorific: أبو محمد.',
          'أخ (akh) = brother, أخت (ukht) = sister — same as MSA but pronounced with Levantine vowels.',
          'عمّ (ʿamm) = paternal uncle, خال (khāl) = maternal uncle — Levantine Arabic preserves this distinction that English lacks.',
          'بن عمّ / بنت عمّ = cousin (paternal), بن خال / بنت خال = cousin (maternal) — relatives are described by their parent\'s relationship to you.',
          'عيلة (ʿayle) is the Levantine word for "family" — used instead of MSA عائلة (ʿāʾila).',
        ],
        quiz: {
          question:    'What is the Levantine Arabic word for "mother" in everyday informal speech?',
          options:     ['أمّ (umm)', 'والدة (wālida)', 'يمّا (yamma)', 'ماما (māma)'],
          answer:      'يمّا (yamma)',
          explanation:
            'While أمّ is the Classical/MSA word for mother, Levantine speakers overwhelmingly use يمّا (yamma) in everyday speech — it is warm, intimate, and immediately marks you as speaking dialect rather than formal Arabic. You will also hear ماما in urban Lebanese contexts, especially among younger speakers influenced by French and English. The formal والدة is reserved for written Arabic and formal speech. Using يمّا with a Lebanese speaker signals familiarity with the culture, not just the language.',
        },
      },

      {
        id:       'lev-l4',
        title:    'Daily Life & Home',
        arabic:   'الحياة اليومية والبيت',
        duration: 42,
        type:     'video+exercise',
        free:     false,
        intro:
          'Being able to describe your home, daily routine, and everyday activities gives you the scaffolding for real conversations. In this lesson you will learn the vocabulary for rooms and furniture, verbs for daily actions, and how to describe what you do each day in Levantine Arabic. The key grammar focus here is the present tense with the Levantine prefix ع (ʿa-) — one of the most distinctive grammatical features of the dialect.',
        keyPoints: [
          'The Levantine present tense adds ع (ʿa-) or بـ (b-) before the verb: بحكي (b-ḥki) = "I speak", عم بحكي (ʿam b-ḥki) = "I am speaking (right now)".',
          'Common rooms: غرفة (ghurfe) = room, مطبخ (maṭbakh) = kitchen, حمّام (ḥammām) = bathroom, صالة (ṣāle) = living room.',
          'Key daily verbs: صحّي (ṣaḥḥi) = wake up, كل (kol) = eat, شرب (shrib) = drink, روح (rūḥ) = go, رجع (rjaʿ) = come back.',
          'Levantine negation wraps the verb: ما بحكي (mā b-ḥki) = "I don\'t speak"; or مش (mish) before adjectives and nouns.',
          'بدّي (biddi) = "I want" — one of the most useful Levantine expressions, used constantly for expressing desire and intention.',
        ],
        quiz: {
          question:    'How do you say "I want to eat" in Levantine Arabic?',
          options:     ['أريد أن آكل (urīd an ākul)', 'بدّي آكل (biddi ākul)', 'عايز آكل (ʿāyiz ākul)', 'بحبّ آكل (b-ḥebb ākul)'],
          answer:      'بدّي آكل (biddi ākul)',
          explanation:
            'بدّي (biddi) is the Levantine equivalent of "I want / I would like." It comes from the word إرادة (will/intent) and is constructed differently from MSA أريد. In Levantine, بدّي is followed directly by the base verb with no conjunction: بدّي آكل (I want to eat), بدّي روح (I want to go). It changes with person: بدّك (you want), بدّو (he wants), بدّا (she wants). عايز is Egyptian Arabic — perfectly understood but not native to Lebanese/Levantine speech.',
        },
      },

      {
        id:       'lev-l5',
        title:    'Food & Markets',
        arabic:   'الأكل والأسواق',
        duration: 38,
        type:     'video+exercise',
        free:     false,
        intro:
          'Lebanese food culture is rich and central to social life. Whether you are shopping in a souk, ordering at a restaurant, or visiting someone\'s home, food vocabulary is essential. This lesson covers the key items you will encounter at a Lebanese table and market, how to ask for prices, and the essential phrases for navigating a shopping interaction — including the crucial question أديش؟ (how much?).',
        keyPoints: [
          'أديش؟ / قديش؟ (adesh / qdesh) = "How much?" — the single most useful market phrase.',
          'Common foods: خبز (khubez) = bread, زيت (zeyt) = oil, جبنة (jibneh) = cheese, لبنة (labneh) = strained yogurt, فلافل (falāfel), كبّة (kibbe).',
          'بكم هاد؟ (b-kam hād?) = "How much is this?" — a more specific alternative to أديش.',
          'غالي كتير (ghāli ktīr) = "very expensive", رخيص (rkhīṣ) = cheap, مقبول (ma\'bul) = acceptable/reasonable price.',
          'Numbers in market contexts: بعشرة (b-ʿashara) = for ten, بخمسة (b-khamse) = for five — prices in Lebanese dialect use ب (for) before the number.',
          'Fruit names: تفاح (tuffāḥ) = apple, بندورة (bandora) = tomato (Levantine word, not طماطم), خيار (khyār) = cucumber.',
        ],
        quiz: {
          question:    'What does أديش؟ (adesh) mean in Lebanese Arabic?',
          options:     ['Where is it?', 'What is it?', 'How much?', 'When is it?'],
          answer:      'How much?',
          explanation:
            'أديش (adesh) — also heard as قديش (qdesh) — is the Levantine contraction of "how much?", used when asking prices in markets, taxis, and shops. It comes from أيّ قدر (ayy qadar = what amount). This is one of those words where knowing it immediately marks you as speaking real Levantine rather than textbook Arabic. In MSA you would say كم؟ (kam?) — grammatically correct but rarely heard in daily Levantine speech. Using أديش in a Lebanese market will get a smile.',
        },
      },

      {
        id:       'lev-l6',
        title:    'Directions & Getting Around',
        arabic:   'الطريق والتنقّل',
        duration: 40,
        type:     'video+quiz',
        free:     false,
        intro:
          'Whether navigating a Beirut neighbourhood, asking for directions to a friend\'s house, or understanding a taxi driver\'s instructions, directional vocabulary is essential. Lebanese cities are often not well-signed and locals expect visitors to ask for directions conversationally. This lesson teaches you how to ask where something is, understand the answer, and navigate using the most common Levantine directional expressions.',
        keyPoints: [
          'وين؟ (ween?) = "Where?" — وين بيت حسن؟ (ween bayt Hassan?) = "Where is Hassan\'s house?".',
          'دغري (dughri) = straight ahead — one of the most Levantine words; in MSA you say على طول.',
          'يمين (yameen) = right, شمال (shmāl) = left — same roots as MSA but pronounced with Levantine vowels.',
          'قريب (ʾrīb) = near, بعيد (baʿīd) = far, على البال (ʿal-yabāl) = very far (colloquial expression).',
          'رح تشوف (raḥ tshūf) = "you will see" — رح + verb is the Levantine future tense construction.',
          'Landmark directions are common: رح تشوف البنك (you\'ll see the bank), بعد الجامع (after the mosque), قبل الإشارة (before the traffic light).',
        ],
        quiz: {
          question:    'What does دغري (dughri) mean in Levantine Arabic?',
          options:     ['Turn right', 'Go back', 'Straight ahead', 'To the left'],
          answer:      'Straight ahead',
          explanation:
            'دغري (dughri) is one of the most distinctively Levantine words — immediately recognised by any Arabic speaker as coming from the Syrian-Lebanese dialect group. It means "straight ahead" and comes from the Turkish doğru (straight, correct), reflecting the Ottoman influence on Levantine vocabulary. It is used far more commonly than its MSA equivalent على طول or مستقيم. Knowing دغري is a reliable signal to a Levantine speaker that you have learned their dialect specifically, not generic Arabic.',
        },
      },
    ],
  },


  /* ══════════════════════════════════════════════════════════════════════════
     COURSE 3 — Quranic Arabic (Beginner)
     Accent: --course-quranic (#4A7A6A / green)
  ══════════════════════════════════════════════════════════════════════════ */
  {
    id:       'quranic-arabic',
    level:    'Beginner',
    type:     'Quranic',
    title:    'Quranic Arabic',
    arabic:   'العربية القرآنية',
    subtitle: 'Read & understand the Quran',
    desc:     'Learn to read and understand the language of the Quran directly. Structured around the most frequent Quranic vocabulary and grammar.',
    color:    '#4A7A6A',
    topics:   [
      'Quranic script & tajweed basics',
      'High-frequency vocabulary',
      'Verb patterns',
      'Surah-based study',
    ],
    featured: true,

    lessons: [
      {
        id:       'qur-l1',
        title:    'The Quranic Script & Tajweed',
        arabic:   'رسم القرآن وأساسيات التجويد',
        duration: 45,
        type:     'video+exercise',
        free:     true,
        intro:
          'The Quran is not written in the same way as modern Arabic text. The Mushaf (the written Quran) uses a specific orthographic system — Rasm al-Uthmani — that dates to the early Islamic period, and includes additional symbols beyond the 28-letter alphabet. On top of this, the Quran is governed by Tajweed (تجويد) — a set of rules for recitation that preserve the sounds and rhythms revealed to the Prophet. Understanding these two layers is the foundation for reading Quranic text accurately.',
        keyPoints: [
          'The Quran is always fully vowelled (fully diacriticised) — unlike everyday Arabic text, every haraka is written, removing ambiguity.',
          'Tajweed rules govern duration, nasalisation (ghunna), assimilation, and stopping points — they describe the phonology of Quranic recitation as transmitted orally across 1,400 years.',
          'Madd (مدّ) means "lengthening" — Quranic reading extends certain long vowels for 2, 4, or 6 beats depending on what follows them.',
          'Ghunna (غنّة) is a nasal sound that applies to Nun and Mim in specific positions — it lasts approximately 2 beats.',
          'Waqf (وقف) — stopping points — are marked in the Mushaf with letters like م (must stop), لا (do not stop), ج (permissible to stop), قلى (stopping preferred).',
          'Special Uthmani spellings: some words are written with Alif but without a vertical stroke above — these are historical spellings preserved exactly as the Companions wrote them.',
        ],
        quiz: {
          question:    'What does the term "Tajweed" (تجويد) refer to?',
          options:     [
            'The grammar rules of Classical Arabic',
            'The rules governing correct Quranic recitation',
            'The system of Arabic calligraphy',
            'The vocabulary of the Quran',
          ],
          answer:      'The rules governing correct Quranic recitation',
          explanation:
            'Tajweed (from جوّد = to do something well, to perfect) refers to the complete set of rules that govern how the Quran is recited — covering pronunciation of individual sounds, the duration of vowels, nasalisation, assimilation of letters, and correct stopping. These rules were not invented by scholars; they describe the recitation transmitted orally from the Prophet (peace be upon him) through an unbroken chain of teachers. Learning Tajweed means learning to recite as the Prophet recited — it is an act of preservation as much as practice.',
        },
      },

      {
        id:       'qur-l2',
        title:    'The Most Frequent Quranic Words',
        arabic:   'أكثر الكلمات القرآنية تكراراً',
        duration: 50,
        type:     'video+exercise',
        free:     true,
        intro:
          'The Quran contains approximately 77,430 words, but much of this is repetition. Linguists have shown that the 100 most frequent unique words in the Quran account for nearly half of all word occurrences. This means that learning just 100 words — the right 100 words — will give you the ability to recognise and follow vast portions of the text. This lesson focuses on the first tier: the grammatical particles, pronouns, prepositions, and common nouns that appear on nearly every page.',
        keyPoints: [
          'الله (Allāh) appears over 2,700 times — learn to recognise it in every grammatical context.',
          'Key particles: في (fī = in), من (min = from/of), على (ʿalā = on/upon), إلى (ilā = to), عن (ʿan = about/from), مع (maʿa = with).',
          'Key pronouns: هو (huwa = he), هي (hiya = she), هم (hum = they), أنت (anta = you masc.), أنتم (antum = you plural), نحن (naḥnu = we).',
          'High-frequency nouns: رَبّ (rabb = Lord), يَوْم (yawm = day), كِتَاب (kitāb = book), نَبِيّ (nabī = prophet), أَرْض (arḍ = earth), سَمَاء (samāʾ = sky/heaven).',
          'Key verbs in perfect form: قَالَ (qāla = he said), خَلَقَ (khalaqa = he created), آمَنَ (āmana = he believed), جَعَلَ (jaʿala = he made).',
          'The conjunction و (wa = and) is the single most common element in the Quran — it binds almost every sentence.',
        ],
        quiz: {
          question:    'What does the Quranic preposition "مِنْ" (min) primarily mean?',
          options:     ['In / within', 'On / upon', 'From / of', 'To / toward'],
          answer:      'From / of',
          explanation:
            'مِنْ (min) is one of the most common prepositions in the Quran, appearing over 2,000 times. Its core meaning is "from" (indicating source or origin) and "of" (indicating partitive meaning). Examples: مِنَ السَّمَاء (from the sky), مِنْ عِبَادِنَا (from among Our servants), مِنَ الظُّلُمَاتِ إِلَى النُّور (from darkness to light). Learning to recognise مِن quickly — and distinguish it from its cousin في (in) — is foundational for Quranic comprehension, since both prepositions express where something originates or exists.',
        },
      },

      {
        id:       'qur-l3',
        title:    'Nouns, Gender & Definiteness',
        arabic:   'الأسماء والتعريف والتذكير والتأنيث',
        duration: 48,
        type:     'video+quiz',
        free:     false,
        intro:
          'Every Arabic noun has a grammatical gender — masculine or feminine — even words for inanimate objects. And every noun is either definite (the book) or indefinite (a book). These two properties — gender and definiteness — affect every other word in the sentence, including adjectives, verbs, and pronouns. Mastering them is not optional: they are baked into the fabric of Arabic grammar, and Quranic Arabic is especially precise in this regard.',
        keyPoints: [
          'Feminine nouns usually end in تاء مربوطة (ة = -a/-at) — رَحْمَة (mercy), سُورَة (chapter), آيَة (verse). But many feminines are by convention: أَرْض (earth) is feminine despite having no ة.',
          'Masculine nouns have no special ending: كِتَاب (book), رَبّ (Lord), نُور (light) — masculine is the default.',
          'The definite article ال (al-) makes any noun definite: كِتَاب = a book → الكِتَاب = the book.',
          'Indefinite nouns in Classical Arabic add tanwin (doubled haraka + nun sound): كِتَابٌ (a book), رَجُلٌ (a man). In the Quran, tanwin marks an important grammatical distinction.',
          'Iḍāfa (إضافة) — the construct state — creates "of" relationships by removing the article from the first noun: كِتَابُ اللَّهِ = "the book of Allah / Allah\'s book".',
          'Adjectives agree with their noun in gender, definiteness, number, and case — a four-way agreement system that governs every description in the Quran.',
        ],
        quiz: {
          question:    'In Arabic grammar, how is a noun made definite?',
          options:     [
            'By adding the suffix ـة (-a) to the end',
            'By adding the prefix ال (al-) to the beginning',
            'By adding tanwin (doubled ending)',
            'By capitalising the first letter',
          ],
          answer:      'By adding the prefix ال (al-) to the beginning',
          explanation:
            'In Arabic, definiteness is marked by the prefix ال (al-), attached directly to the beginning of the noun: كِتَاب (a book) → الكِتَاب (the book). This same article applies to all nouns regardless of gender or number. Crucially, the tanwin endings (ـٌ / ـً / ـٍ) that mark indefinite nouns disappear when ال is added — a noun cannot be both definite and have tanwin. The suffix ة is not a definiteness marker; it marks feminine gender. Understanding this distinction is essential because Quranic text switches constantly between definite and indefinite, and the difference carries meaning.',
        },
      },

      {
        id:       'qur-l4',
        title:    'Verb Patterns in the Quran',
        arabic:   'الأفعال في القرآن الكريم',
        duration: 55,
        type:     'video+quiz',
        free:     false,
        intro:
          'Arabic verbs are built on trilateral roots — three-consonant skeletons from which dozens of related words are derived. Once you know the root, you can often understand a new word without looking it up. The Quran draws constantly on this root-and-pattern system: the verb خَلَقَ (he created), the noun خَلِيفَة (vicegerent), and خَلْق (creation) all share the root خ-ل-ق. In this lesson you will learn to identify roots, understand the perfect and imperfect tense distinction, and recognise the most common verb patterns in Quranic Arabic.',
        keyPoints: [
          'The trilateral root (الجذر الثلاثي) is a three-consonant sequence that carries core meaning: ع-ل-م = knowledge, ك-ت-ب = writing, ق-ر-أ = reading.',
          'Form I perfect (فَعَلَ pattern): the base verb form — كَتَبَ (he wrote), عَلِمَ (he knew), قَرَأَ (he read).',
          'Form I imperfect (يَفْعَلُ pattern): ongoing or habitual action — يَكْتُبُ (he writes), يَعْلَمُ (he knows), يَقْرَأُ (he reads).',
          'Form II (فَعَّلَ — with a shadda on the middle consonant) intensifies or makes causative: عَلَّمَ (he taught, caused to know), from the root ع-ل-م.',
          'The passive voice in the perfect is formed on the pattern فُعِلَ: خُلِقَ (he/it was created), كُتِبَ (it was written).',
          'Verb agreement: verbs in Arabic agree with their subject in gender and number — يَعْلَمُ (he knows), تَعْلَمُ (she knows), يَعْلَمُونَ (they-masc. know).',
        ],
        quiz: {
          question:    'What is the trilateral root of the verb يَعْلَمُ (ya\'lamu — "he knows")?',
          options:     ['ي-ع-ل (Ya-ʿAyn-Lam)', 'ع-ل-م (ʿAyn-Lam-Mim)', 'ع-م-ل (ʿAyn-Mim-Lam)', 'ل-م-ع (Lam-Mim-ʿAyn)'],
          answer:      'ع-ل-م (ʿAyn-Lam-Mim)',
          explanation:
            'To find the root of يَعْلَمُ, you remove the added elements. The prefix يـ marks the imperfect tense (third person masculine singular) — it is not part of the root. The ـُ ending (damma) is the nominative mood marker. What remains is the skeleton ع-ل-م (ʿAyn-Lam-Mim), the root meaning "knowledge." From this same root: عِلْم (knowledge), عَالِم (scholar/knower), مَعْلُومَات (information), تَعْلِيم (education), أَعْلَمُ (I know). The Quran uses this root in some of its most powerful verses — وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ (And Allah has full knowledge of everything).',
        },
      },

      {
        id:       'qur-l5',
        title:    'Surah Al-Fatiha — Word by Word',
        arabic:   'سورة الفاتحة — كلمةً بكلمة',
        duration: 60,
        type:     'video+exercise',
        free:     false,
        intro:
          'Al-Fatiha (the Opening) is the most recited text in human history — a Muslim who prays five times a day recites it at least 17 times. It is seven verses, 29 words, and contains in miniature the entire theology of Islam. For a Quranic Arabic student, Al-Fatiha is the perfect first complete text: short enough to analyse exhaustively, rich enough to teach the most important grammatical structures. In this lesson you will go through every word, its grammatical role, its meaning, and its significance.',
        keyPoints: [
          'بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ: the basmala. بِسْمِ = "in the name of" (bi + ism with the alif dropped in connected speech). الرَّحْمٰنِ and الرَّحِيمِ are both adjective patterns from the root ر-ح-م (mercy) — Rahman = The Intensely Merciful, Raheem = The Persistently Merciful.',
          'اَلْحَمْدُ لِلَّهِ: "All praise is for Allah." الحمد is definite (with ال), making it totalising — not "some praise" but "all praise." لِلَّهِ = the lam of possession + الله.',
          'رَبِّ الْعَالَمِينَ: "Lord of all the worlds." رَبِّ is in the genitive case as a second noun in iḍāfa (construct). العالمين is the masculine sound plural of عالَم (world) — the ـين ending marks genitive plural.',
          'مَالِكِ يَوْمِ الدِّينِ: "Master of the Day of Judgement." يَوْمِ الدِّينِ is another iḍāfa — yawm (day) + al-Dīn (the Religion/Recompense).',
          'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ: "You alone we worship and You alone we seek help from." إيّاك is an emphatic pronoun indicating exclusivity — placing the object before the verb (against normal Arabic word order) creates the emphasis "only You."',
          'اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ: "Guide us to the straight path." اهدِنا is an imperative (command) from the root ه-د-ي (guidance) — نا is the object suffix "us."',
        ],
        quiz: {
          question:    'In بِسْمِ اللَّهِ, what does the prefix بِـ (bi-) mean?',
          options:     ['To / towards', 'From / away', 'In / with', 'For / because of'],
          answer:      'In / with',
          explanation:
            'The prefix بِـ (bi-) is a preposition meaning "in," "with," or "by" — it indicates accompaniment, instrumentality, or manner. In بِسْمِ اللَّهِ, it means "in the name of Allah" — we begin our action in/with His name, invoking divine authority and blessing. The full form would be بِاسْمِ اللَّهِ, but the alif of اسم is dropped when it follows بـ in connected speech (a rule called wasl). The phrase is actually an abbreviated sentence: "I begin [this action] in the name of Allah." Understanding بـ is essential because it appears thousands of times throughout the Quran.',
        },
      },

      {
        id:       'qur-l6',
        title:    'Recurring Quranic Phrases',
        arabic:   'العبارات القرآنية المتكررة',
        duration: 45,
        type:     'video+quiz',
        free:     false,
        intro:
          'The Quran uses certain phrases so frequently that recognising them allows you to follow the rhythm and meaning of recitation even before you have studied full grammar. These recurring phrases — called formulaic expressions — appear across dozens of surahs and carry powerful theological weight. Many of them are also the phrases Muslims use in daily life: the basmala, the tasliya, the Quranic du\'a. In this final Foundations lesson, you will master the 15 most important recurring Quranic phrases and understand their grammatical structure.',
        keyPoints: [
          'إِنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ = "Indeed Allah has power over all things." إنّ is an emphatic particle that puts its subject into the accusative case.',
          'وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ = "And Allah has full knowledge of everything" — a closing formula appearing in dozens of verses.',
          'إِنَّ اللَّهَ غَفُورٌ رَّحِيمٌ = "Indeed Allah is Forgiving, Merciful" — the most common closing pair of divine names in the Quran.',
          'الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ = "Those who believed and did righteous deeds" — a recurring description of believers; آمنوا is perfect tense 3rd person plural.',
          'أَفَلَا يَعْقِلُونَ / أَفَلَا يَتَفَكَّرُونَ = "Will they not then reason? / reflect?" — rhetorical questions challenging the listener. أفلا = أ (question) + فـ (then) + لا (not).',
          'سُبْحَانَ اللَّهِ = "Glory be to Allah" — the verb سبّح means to declare free from imperfection; سبحان is a verbal noun in the accusative used as an exclamation.',
        ],
        quiz: {
          question:    'The Quranic particle إِنَّ (inna), when it begins a sentence, signals:',
          options:     [
            'A question is being asked',
            'The subject that follows is negated',
            'Emphasis — and it puts the following noun into the accusative case',
            'A conditional clause ("if...")',
          ],
          answer:      'Emphasis — and it puts the following noun into the accusative case',
          explanation:
            'إِنَّ (inna) is one of the "sisters of kāna" (أخوات كان) — a group of particles in Arabic that, when they begin a sentence, shift the subject (called their "name" / اسم إنّ) into the accusative case and introduce a predicate (خبر إنّ). In إِنَّ اللَّهَ عَلَيمٌ, اللَّهَ carries a fatha (accusative) because إنّ acts on it. The effect is emphatic: where "Allah is knowing" is a statement, "Indeed, Allah is knowing" or "Verily, Allah is knowing" carries weight and certainty. إنّ appears over 330 times in the Quran — recognising it and knowing its grammatical effect is a significant milestone in Quranic comprehension.',
        },
      },
    ],
  },
]
