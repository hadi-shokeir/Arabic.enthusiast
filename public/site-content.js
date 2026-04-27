(function () {
  window.AE = window.AE || {};

  const DEFAULT_SITE_CONTENT = {
    version: 1,
    status: "draft",
    updatedAt: "",
    lastPublishedAt: "",
    brand: "ARABIC ENTHUSIAST",
    tagline: "Learn Arabic with Passion & Precision",
    sections: {
      homeHero: true,
      features: true,
      alphabet: true,
      courses: true,
      quote: true,
      cta: true,
      pricing: true,
      about: true
    },
    homepage: {
      eyebrow: "Arabic Enthusiast",
      titleLine1: "Learn Arabic",
      titleAccent: "with Passion",
      titleLine3: "& Precision",
      description: "From your first letter to reading the Quran and conversing in dialect, structured courses that honour the depth and beauty of the Arabic language.",
      primaryCta: "Explore Courses",
      secondaryCta: "Meet your teacher",
      subjects: ["Classical Arabic", "Conversational Arabic", "Quranic Arabic"],
      featuresEyebrow: "Why Arabic Enthusiast",
      featuresHeading: "Everything you need to learn Arabic properly.",
      featuresSub: "Structured curriculum, interactive tools, and genuine teaching, with no shortcuts.",
      features: [
        { icon: "28", label: "28 Letters", title: "Master the Script", desc: "Learn all 28 Arabic letters with their four positional forms and build reading confidence from the beginning." },
        { icon: "Sound", label: "Pronunciation", title: "Authentic Sounds", desc: "Train the sounds that make Arabic beautiful, including the letters that do not exist in English." },
        { icon: "Review", label: "Spaced Repetition", title: "Vocabulary That Sticks", desc: "Use repeatable review systems so words stay available when you need to speak, read, or listen." },
        { icon: "Track", label: "Progress", title: "Track Every Step", desc: "Follow reading, writing, listening, speaking, vocabulary, grammar, and confidence over time." }
      ],
      coursesEyebrow: "Curriculum",
      coursesHeading: "Choose your path",
      quoteArabic: "",
      quoteText: "And He taught Adam the names of all things",
      quoteSource: "Quran 2:31",
      ctaArabic: "",
      ctaTitleLine1: "Begin your",
      ctaTitleAccent: "Arabic journey",
      ctaTitleLine3: "today",
      ctaDescription: "Take the first step towards understanding one of the world's most profound languages.",
      ctaPrimary: "See Pricing",
      ctaSecondary: "Browse Courses"
    },
    instructor: {
      name: "Hadi Shokeir",
      title: "Arabic Language Instructor",
      arabicTitle: "",
      bio1: "Hadi Shokeir is a linguist, translator, and Arabic language instructor with teaching experience across Classical Arabic, Levantine dialect, and Quranic studies.",
      bio2: "His lessons combine linguistic structure, patient correction, and a personal relationship with the language so students can learn with clarity and confidence.",
      specialties: ["Classical Arabic", "Conversational Arabic", "Quranic Arabic"],
      stats: [
        { value: "7+", label: "Years teaching" },
        { value: "3", label: "Specialisations" },
        { value: "1:1", label: "Private lessons" }
      ],
      philosophy: [
        { title: "Structure First", arabic: "", desc: "Arabic has an elegant, logical grammar. Learning the system gives students lasting ability." },
        { title: "Authentic Sounds", arabic: "", desc: "Students learn real Arabic pronunciation from the first lesson, before habits become difficult to change." },
        { title: "Your Pace", arabic: "", desc: "Each plan adapts to the student's goal, whether Quran, dialect, conversation, reading, or writing." }
      ],
      contactHeadingLine1: "Ready to begin?",
      contactHeadingAccent: "Let's talk",
      contactPrompt: "Whether you have questions about courses, want a free intro lesson, or are ready to enrol, send a message and Hadi will get back to you.",
      email: "hadishokeir@gmail.com",
      responseTime: "Within 24 hours",
      location: "Online - worldwide"
    },
    courses: [
      {
        id: "arabic-foundations",
        visible: true,
        featured: true,
        level: "Beginner",
        type: "Classical",
        title: "Arabic Foundations",
        arabic: "",
        subtitle: "Script, sounds & first words",
        desc: "Master all 28 letters, their positional forms, and begin reading real Arabic words.",
        color: "#ffffff",
        topics: ["The Arabic alphabet", "Letter forms", "Short & long vowels", "Sun & moon letters"]
      },
      {
        id: "levantine-dialect",
        visible: true,
        featured: true,
        level: "Beginner",
        type: "Levantine",
        title: "Levantine Arabic",
        arabic: "",
        subtitle: "Conversational Arabic",
        desc: "Speak naturally with Levantine speakers and learn conversational Arabic as it is actually used.",
        color: "#cccccc",
        topics: ["Everyday conversation", "Pronunciation", "Common expressions", "Daily life"]
      },
      {
        id: "quranic-arabic",
        visible: true,
        featured: true,
        level: "Beginner",
        type: "Quranic",
        title: "Quranic Arabic",
        arabic: "",
        subtitle: "Read & understand the Quran",
        desc: "Learn to read and understand the language of the Quran through vocabulary, grammar, and guided study.",
        color: "#aaaaaa",
        topics: ["Quranic script", "High-frequency vocabulary", "Verb patterns", "Surah-based study"]
      }
    ],
    pricing: {
      eyebrow: "Pricing",
      titleLine1: "Pricing coming",
      titleAccent: "soon",
      description: "Details are being finalised. In the meantime, reach out directly to discuss options based on your goals and availability.",
      cta: "Get in Touch"
    }
  };

  const clone = value => JSON.parse(JSON.stringify(value));
  const ensureArray = (value, fallback) => Array.isArray(value) ? value : clone(fallback || []);
  const mergeObject = (fallback, value) => ({ ...clone(fallback || {}), ...(value && typeof value === "object" ? value : {}) });

  function normalizeCourse(course, index) {
    const fallback = DEFAULT_SITE_CONTENT.courses[index] || {
      id: "course-" + Date.now() + "-" + index,
      visible: true,
      featured: false,
      level: "Beginner",
      type: "Classical",
      title: "New Course",
      arabic: "",
      subtitle: "",
      desc: "",
      color: "#ffffff",
      topics: []
    };
    const out = mergeObject(fallback, course);
    out.id = out.id || ("course-" + Date.now() + "-" + index);
    out.visible = out.visible !== false;
    out.featured = out.featured !== false;
    out.topics = ensureArray(out.topics, fallback.topics);
    return out;
  }

  function normalizeSiteContent(input) {
    const source = input && typeof input === "object" ? input : {};
    const out = mergeObject(DEFAULT_SITE_CONTENT, source);
    out.sections = mergeObject(DEFAULT_SITE_CONTENT.sections, source.sections);
    out.homepage = mergeObject(DEFAULT_SITE_CONTENT.homepage, source.homepage);
    out.homepage.subjects = ensureArray(out.homepage.subjects, DEFAULT_SITE_CONTENT.homepage.subjects);
    out.homepage.features = ensureArray(out.homepage.features, DEFAULT_SITE_CONTENT.homepage.features).map((feature, index) => mergeObject(DEFAULT_SITE_CONTENT.homepage.features[index] || {}, feature));
    out.instructor = mergeObject(DEFAULT_SITE_CONTENT.instructor, source.instructor);
    out.instructor.specialties = ensureArray(out.instructor.specialties, DEFAULT_SITE_CONTENT.instructor.specialties);
    out.instructor.stats = ensureArray(out.instructor.stats, DEFAULT_SITE_CONTENT.instructor.stats).map((stat, index) => mergeObject(DEFAULT_SITE_CONTENT.instructor.stats[index] || {}, stat));
    out.instructor.philosophy = ensureArray(out.instructor.philosophy, DEFAULT_SITE_CONTENT.instructor.philosophy).map((item, index) => mergeObject(DEFAULT_SITE_CONTENT.instructor.philosophy[index] || {}, item));
    out.courses = ensureArray(out.courses, DEFAULT_SITE_CONTENT.courses).map(normalizeCourse);
    out.pricing = mergeObject(DEFAULT_SITE_CONTENT.pricing, source.pricing);
    out.version = DEFAULT_SITE_CONTENT.version;
    return out;
  }

  function mergeSiteContent(data, content) {
    const base = data || {};
    const site = normalizeSiteContent(content);
    const baseCourses = Array.isArray(base.courses) ? base.courses : [];
    const courses = site.courses
      .filter(course => course.visible !== false)
      .map(course => ({ ...(baseCourses.find(c => c.id === course.id) || {}), ...course }));
    return {
      ...base,
      brand: site.brand || base.brand,
      tagline: site.tagline || base.tagline,
      instructor: { ...(base.instructor || {}), ...(site.instructor || {}) },
      courses,
      siteContent: site
    };
  }

  window.AE.DEFAULT_SITE_CONTENT = DEFAULT_SITE_CONTENT;
  window.AE.cloneSiteContent = () => clone(DEFAULT_SITE_CONTENT);
  window.AE.normalizeSiteContent = normalizeSiteContent;
  window.AE.mergeSiteContent = mergeSiteContent;
  window.AE.site = () => normalizeSiteContent(window.AE.DATA && window.AE.DATA.siteContent);
})();
