import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    lang: 'ar',
    dir: 'rtl',
    title: 'AI Engineering',
    titleTemplate: ':title — دليل الدراسة',
    description: 'شرح تفصيلي صفحة بصفحة وملاحظات دراسية لكتاب AI Engineering (Chip Huyen)',
    base: process.env.BASE_PATH || '/',
    srcExclude: ['books/**', 'node_modules/**'],
    lastUpdated: true,

    head: [
      [
        'link',
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230f766e'/%3E%3Cpath d='M16 19c0-2.2 1.8-4 4-4h10c2.2 0 4 1.8 4 4v27c-1.8-1.5-4.1-2.2-6.5-2.2H20c-2.2 0-4 1.8-4 4V19z' fill='%23f0fdfa'/%3E%3Cpath d='M48 19c0-2.2-1.8-4-4-4H34c-2.2 0-4 1.8-4 4v27c1.8-1.5 4.1-2.2 6.5-2.2H44c2.2 0 4 1.8 4 4V19z' fill='%23ccfbf1'/%3E%3C/svg%3E",
        },
      ],
      ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
      [
        'link',
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
    ],

    themeConfig: {
      logo: '/logo.svg',
      siteTitle: 'AI Engineering',

      nav: [
        { text: 'الرئيسية', link: '/' },
        { text: 'خطة القراءة', link: '/READING_PLAN' },
        { text: 'شابتر 6: RAG & Agents', link: '/notes/ch06-rag-and-agents/01-rag' },
        { text: 'عن المشروع', link: '/README' },
      ],

      sidebar: [
        {
          text: 'البدء والخطة',
          items: [
            { text: 'لوحة المتابعة الرئيسية', link: '/' },
            { text: 'خطة القراءة الكاملة (5 أسابيع)', link: '/READING_PLAN' },
            { text: 'عن المستودع وحقوق الملكية', link: '/README' },
          ],
        },
        {
          text: 'الأسبوع 1: Ch. 6 — RAG & Agents',
          items: [
            { text: 'الجزء 1: الـ RAG (ص 253–275)', link: '/notes/ch06-rag-and-agents/01-rag' },
          ],
        },
      ],

      search: {
        provider: 'local',
      },

      outline: {
        level: [2, 3],
        label: 'محتويات الصفحة',
      },

      docFooter: {
        prev: 'السابق',
        next: 'التالي',
      },

      darkModeSwitchLabel: 'المظهر',
      lightModeSwitchTitle: 'التبديل للوضع النهاري',
      darkModeSwitchTitle: 'التبديل للوضع الليلي',
      sidebarMenuLabel: 'القائمة',
      returnToTopLabel: 'العودة للأعلى',
    },

    mermaid: {
      theme: 'neutral',
    },
  })
)
