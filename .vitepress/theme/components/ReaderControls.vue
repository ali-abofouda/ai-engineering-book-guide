<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const fontScale = ref(1)
const focusMode = ref(false)
const showBackToTop = ref(false)

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
})

onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div v-if="frontmatter.layout !== 'home'" class="aie-reader-toolbar" dir="rtl">
    <div class="aie-reader-group">
      <span class="aie-reader-label">حجم الخط:</span>
      <button type="button" class="aie-tool-btn" @click="changeFont(-0.08)" title="تصغير الخط">A-</button>
      <button type="button" class="aie-tool-btn" @click="resetFont" title="الحجم الافتراضي">
        {{ Math.round(fontScale * 100) }}%
      </button>
      <button type="button" class="aie-tool-btn" @click="changeFont(0.08)" title="تكبير الخط">A+</button>
    </div>

    <button
      type="button"
      class="aie-tool-btn aie-focus-btn"
      :class="{ active: focusMode }"
      @click="toggleFocus"
      title="إخفاء القوائم الجانبية لقراءة أهدأ"
    >
      {{ focusMode ? '✓ وضع التركيز مفعّل' : 'وضع التركيز' }}
    </button>
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
  gap: 10px;
  padding: 8px 14px;
  margin-bottom: 18px;
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.aie-reader-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.aie-reader-label {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-left: 4px;
}

.aie-tool-btn {
  padding: 4px 10px;
  border-radius: 7px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s, background-color 0.15s;
}

.aie-tool-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.aie-focus-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #ffffff;
}

.aie-back-top {
  position: fixed;
  bottom: 22px;
  left: 22px;
  z-index: 90;
  padding: 8px 14px;
  border-radius: 999px;
  background: var(--vp-c-brand-1);
  color: #ffffff;
  border: none;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);
  transition: transform 0.15s, opacity 0.15s;
}

.aie-back-top:hover {
  transform: translateY(-2px);
}
</style>
