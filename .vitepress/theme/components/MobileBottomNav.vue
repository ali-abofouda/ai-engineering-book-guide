<script setup lang="ts">
import { computed } from 'vue'
import { withBase, useRoute } from 'vitepress'

const route = useRoute()

const isHome = computed(() => {
  const p = route.path
  return p === '/' || p === withBase('/') || p.endsWith('/index.html') || p === withBase('')
})

const isPlan = computed(() => {
  return route.path.toUpperCase().includes('READING_PLAN')
})

const isNotes = computed(() => {
  return route.path.includes('/notes/')
})

function toggleMobileMenu() {
  if (typeof document === 'undefined') return
  // If inside documentation with sidebar, trigger the sidebar menu button
  const localNavBtn = document.querySelector('.VPLocalNav .menu') as HTMLElement | null
  if (localNavBtn && window.getComputedStyle(localNavBtn).display !== 'none') {
    localNavBtn.click()
    return
  }
  // Otherwise trigger top navbar hamburger screen
  const hamburger = document.querySelector('.VPNavBarHamburger') as HTMLElement | null
  if (hamburger) {
    hamburger.click()
  }
}

function scrollToTop() {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <nav class="aie-mobile-bottom-nav" dir="rtl" aria-label="شريط التنقل السريع للهاتف">
    <!-- Home -->
    <a
      :href="withBase('/')"
      class="aie-nav-tab"
      :class="{ 'is-active': isHome }"
    >
      <span class="aie-tab-icon">🏠</span>
      <span class="aie-tab-label">الرئيسية</span>
    </a>

    <!-- Reading Plan -->
    <a
      :href="withBase('/READING_PLAN')"
      class="aie-nav-tab"
      :class="{ 'is-active': isPlan }"
    >
      <span class="aie-tab-icon">📋</span>
      <span class="aie-tab-label">الخطة</span>
    </a>

    <!-- Notes (Current Chapter) -->
    <a
      :href="withBase('/notes/ch06-rag-and-agents/01-rag')"
      class="aie-nav-tab"
      :class="{ 'is-active': isNotes }"
    >
      <span class="aie-tab-icon">📖</span>
      <span class="aie-tab-label">الملاحظات</span>
    </a>

    <!-- Chapters & Sections Sidebar / Menu Toggle -->
    <button
      type="button"
      class="aie-nav-tab"
      @click="toggleMobileMenu"
      title="فتح فهرس الفصول ومحتويات الصفحة"
    >
      <span class="aie-tab-icon">📑</span>
      <span class="aie-tab-label">الفهرس</span>
    </button>

    <!-- Scroll to Top -->
    <button
      type="button"
      class="aie-nav-tab"
      @click="scrollToTop"
      title="الرجوع لأعلى الصفحة"
    >
      <span class="aie-tab-icon">🔝</span>
      <span class="aie-tab-label">للأعلى</span>
    </button>
  </nav>
</template>

<style scoped>
.aie-mobile-bottom-nav {
  display: none;
}

@media (max-width: 768px) {
  .aie-mobile-bottom-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(58px + env(safe-area-inset-bottom, 0px));
    padding: 0 8px env(safe-area-inset-bottom, 0px);
    background: rgba(250, 249, 245, 0.94);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid var(--vp-c-divider);
    z-index: 55;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.06);
  }

  :root.dark .aie-mobile-bottom-nav,
  .dark .aie-mobile-bottom-nav {
    background: rgba(9, 13, 22, 0.94);
    border-top-color: var(--vp-c-divider);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.35);
  }

  .aie-nav-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    color: var(--vp-c-text-2);
    text-decoration: none;
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    transition: color 0.15s ease, transform 0.12s ease;
    padding: 4px 0;
  }

  .aie-nav-tab:active {
    transform: scale(0.92);
  }

  .aie-tab-icon {
    font-size: 1.18rem;
    line-height: 1.2;
  }

  .aie-tab-label {
    font-size: 0.7rem;
    font-weight: 600;
    margin-top: 2px;
  }

  .aie-nav-tab.is-active {
    color: var(--vp-c-brand-1);
  }

  .aie-nav-tab.is-active .aie-tab-label {
    font-weight: 700;
  }
}
</style>
