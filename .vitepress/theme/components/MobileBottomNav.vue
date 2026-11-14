<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const focusMode = ref(false)

const STORAGE_FOCUS = 'aie-focus-mode-v1'

function applyFocusMode(enabled: boolean) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('aie-focus-mode', enabled)
}

function toggleFocus() {
  focusMode.value = !focusMode.value
  applyFocusMode(focusMode.value)
  try {
    window.localStorage.setItem(STORAGE_FOCUS, focusMode.value ? '1' : '0')
  } catch {
    // ignore
  }
}

function scrollToTop() {
  if (typeof window === 'undefined') return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  try {
    const savedFocus = window.localStorage.getItem(STORAGE_FOCUS)
    if (savedFocus === '1') {
      focusMode.value = true
      applyFocusMode(true)
    }
  } catch {
    // ignore
  }
})
</script>

<template>
  <nav class="aie-mobile-bottom-nav" dir="rtl" aria-label="شريط التنقل السريع للهاتف">
    <a
      href="/ai-engineering-book-guide/"
      class="aie-nav-tab"
      :class="{ 'is-active': route.path === '/' || route.path === '/ai-engineering-book-guide/' }"
    >
      <span class="aie-tab-icon">🏠</span>
      <span class="aie-tab-label">الرئيسية</span>
    </a>

    <a
      href="/ai-engineering-book-guide/reading-plan"
      class="aie-nav-tab"
      :class="{ 'is-active': route.path.includes('reading-plan') }"
    >
      <span class="aie-tab-icon">📋</span>
      <span class="aie-tab-label">الخطة</span>
    </a>

    <a
      href="/ai-engineering-book-guide/notes/ch06-rag-and-agents/01-rag"
      class="aie-nav-tab"
      :class="{ 'is-active': route.path.includes('notes') }"
    >
      <span class="aie-tab-icon">📖</span>
      <span class="aie-tab-label">الملاحظات</span>
    </a>

    <button
      type="button"
      class="aie-nav-tab"
      :class="{ 'is-active': focusMode }"
      @click="toggleFocus"
      title="وضع التركيز"
    >
      <span class="aie-tab-icon">{{ focusMode ? '👁️' : '🎯' }}</span>
      <span class="aie-tab-label">{{ focusMode ? 'عادي' : 'تركيز' }}</span>
    </button>

    <button
      type="button"
      class="aie-nav-tab"
      @click="scrollToTop"
      title="الرجوع للأعلى"
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
    background: rgba(250, 249, 245, 0.92);
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
    background: rgba(9, 13, 22, 0.9);
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
    font-size: 1.15rem;
    line-height: 1.2;
  }

  .aie-tab-label {
    font-size: 0.68rem;
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
