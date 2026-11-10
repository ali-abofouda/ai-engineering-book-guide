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
