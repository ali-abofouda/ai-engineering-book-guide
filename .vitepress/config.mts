import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    lang: 'ar',
    dir: 'rtl',
    title: 'AI Engineering — دليل الدراسة',
    description: 'شرح تفصيلي صفحة بصفحة وملاحظات دراسية لكتاب AI Engineering (Chip Huyen)',
    base: process.env.BASE_PATH || '/',
    srcExclude: ['books/**', 'node_modules/**'],
    lastUpdated: true,

    themeConfig: {
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
            { text: 'الصفحة الرئيسية', link: '/' },
            { text: 'خطة القراءة الكاملة (5 أسابيع)', link: '/READING_PLAN' },
            { text: 'عن المستودع وحقوق الملكية', link: '/README' },
          ],
        },
        {
          text: 'Chapter 6: RAG and Agents',
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
