import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import StudyDashboard from './components/StudyDashboard.vue'
import BatchCheck from './components/BatchCheck.vue'
import QuickFlashcards from './components/QuickFlashcards.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('StudyDashboard', StudyDashboard)
    app.component('BatchCheck', BatchCheck)
    app.component('QuickFlashcards', QuickFlashcards)
  },
} satisfies Theme
