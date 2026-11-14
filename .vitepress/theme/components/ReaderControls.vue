<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()

const fontScale = ref(1)
const focusMode = ref(false)
const showBackToTop = ref(false)
const readingTimeMinutes = ref(0)
const totalWords = ref(0)

const STORAGE_FONT = 'aie-font-scale-v1'
const STORAGE_FOCUS = 'aie-focus-mode-v1'

function applyFontScale(val: number) {
  if (typeof document === 'undefined') return
  document.documentElement.style.setProperty('--aie-doc-font-scale', String(val))
}

function applyFocusMode(enabled: boolean) {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle('aie-focus-mode', enabled)
}

function changeFont(delta: number) {
  const next = Math.min(1.3, Math.max(0.85, +(fontScale.value + delta).toFixed(2)))
  fontScale.value = next
  applyFontScale(next)
  try {
    window.localStorage.setItem(STORAGE_FONT, String(next))
  } catch {
    // ignore
  }
}

function resetFont() {
  fontScale.value = 1
  applyFontScale(1)
  try {
    window.localStorage.setItem(STORAGE_FONT, '1')
  } catch {
    // ignore
  }
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

function onScroll() {
  if (typeof window === 'undefined') return
  showBackToTop.value = window.scrollY > 360
}

function calculateReadingStats() {
  if (typeof document === 'undefined') return
  const docEl = document.querySelector('.vp-doc')
  if (!docEl) {
    readingTimeMinutes.value = 0
    totalWords.value = 0
    return
  }
  const text = docEl.textContent || ''
  const words = text.trim().split(/\s+/).filter(Boolean).length
  totalWords.value = words
  // Average reading speed ~ 160 words/min for bilingual technical text
  readingTimeMinutes.value = Math.max(1, Math.ceil(words / 160))
}

watch(
  () => route.path,
  () => {
    nextTick(() => {
      setTimeout(calculateReadingStats, 100)
    })
  }
)

onMounted(() => {
  try {
    const savedFont = window.localStorage.getItem(STORAGE_FONT)
    if (savedFont) {
      const parsed = parseFloat(savedFont)
      if (!Number.isNaN(parsed) && parsed >= 0.85 && parsed <= 1.3) {
        fontScale.value = parsed
        applyFontScale(parsed)
      }
    }
    const savedFocus = window.localStorage.getItem(STORAGE_FOCUS)
    if (savedFocus === '1') {
      focusMode.value = true
      applyFocusMode(true)
    }
  } catch {
    // ignore
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  nextTick(() => {
    setTimeout(calculateReadingStats, 150)
  })
})

onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div v-if="frontmatter.layout !== 'home'" class="aie-reader-toolbar" dir="rtl">
    <!-- Reading Stats Badge -->
    <div v-if="totalWords > 0" class="aie-reading-stats">
      <span class="aie-stat-item">
        <span class="aie-stat-icon">⏱️</span>
        <span>~{{ readingTimeMinutes }} دقيقة قراءة</span>
      </span>
      <span class="aie-stat-divider">•</span>
      <span class="aie-stat-item">
        <span class="aie-stat-icon">📝</span>
        <span>{{ totalWords.toLocaleString('ar-EG') }} كلمة</span>
      </span>
    </div>

    <!-- Actions & Controls -->
    <div class="aie-controls-group">
      <!-- Font Scale Controls -->
      <div class="aie-font-box">
        <span class="aie-box-label">الخط</span>
        <button type="button" class="aie-tool-btn" @click="changeFont(-0.08)" title="تصغير الخط">A-</button>
        <button type="button" class="aie-tool-btn aie-font-val" @click="resetFont" title="إعادة ضبط حجم الخط">
          {{ Math.round(fontScale * 100) }}%
        </button>
        <button type="button" class="aie-tool-btn" @click="changeFont(0.08)" title="تكبير الخط">A+</button>
      </div>

      <!-- Focus Mode Toggle -->
      <button
        type="button"
        class="aie-tool-btn aie-focus-btn"
        :class="{ active: focusMode }"
        @click="toggleFocus"
        title="إخفاء القوائم الجانبية لتوفير مساحة قراءة واسعة وهادئة"
      >
        <span class="aie-focus-icon">{{ focusMode ? '✓' : '🎯' }}</span>
        <span>{{ focusMode ? 'وضع التركيز مفعّل' : 'وضع التركيز' }}</span>
      </button>
    </div>
  </div>

  <Teleport to="body">
    <button
      v-if="showBackToTop && frontmatter.layout !== 'home'"
      type="button"
      class="aie-back-top"
      @click="scrollToTop"
      title="العودة للأعلى"
    >
      ↑ للأعلى
    </button>
  </Teleport>
</template>

<style scoped>
.aie-reader-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px;
  margin-bottom: 22px;
  border-radius: 14px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  box-shadow: var(--aie-card-shadow);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.aie-reading-stats {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.aie-stat-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.aie-stat-icon {
  font-size: 0.95rem;
}

.aie-stat-divider {
  color: var(--vp-c-divider);
  font-weight: 700;
}

.aie-controls-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.aie-font-box {
  display: flex;
  align-items: center;
  gap: 3px;
  background: var(--vp-c-bg-soft);
  padding: 3px 6px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
}

.aie-box-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-left: 4px;
  margin-right: 2px;
}

.aie-tool-btn {
  padding: 4px 9px;
  border-radius: 7px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.16s ease;
  line-height: 1.4;
}

.aie-font-val {
  min-width: 44px;
  text-align: center;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
}

.aie-tool-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.aie-focus-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 9px;
  font-size: 0.84rem;
}

.aie-focus-btn.active {
  background: var(--vp-c-brand-3);
  border-color: var(--vp-c-brand-3);
  color: #ffffff;
  box-shadow: 0 2px 10px rgba(15, 118, 110, 0.3);
}

.aie-back-top {
  position: fixed;
  bottom: 26px;
  left: 26px;
  z-index: 90;
  padding: 9px 16px;
  border-radius: 999px;
  background: var(--vp-c-brand-3);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
  transition: transform 0.18s ease, background-color 0.18s ease;
  backdrop-filter: blur(8px);
}

.aie-back-top:hover {
  transform: translateY(-3px);
  background: var(--vp-c-brand-2);
}

@media (max-width: 768px) {
  .aie-reader-toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
  .aie-controls-group {
    justify-content: space-between;
  }
  .aie-back-top {
    bottom: 74px; /* above mobile bottom nav */
    left: 16px;
  }
}
</style>
