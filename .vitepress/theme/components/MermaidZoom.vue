<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const svgHtml = ref('')
const scale = ref(1.2)

function handleDocClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null
  if (!target) return
  const mermaidEl = target.closest('.vp-doc .mermaid') as HTMLElement | null
  if (!mermaidEl) return
  const svg = mermaidEl.querySelector('svg')
  if (!svg) return

  const cloned = svg.cloneNode(true) as SVGElement
  cloned.removeAttribute('style')
  cloned.setAttribute('width', '100%')
  cloned.removeAttribute('height')
  svgHtml.value = cloned.outerHTML
  scale.value = 1.25
  isOpen.value = true
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

function zoomIn() {
  scale.value = Math.min(3, +(scale.value + 0.25).toFixed(2))
}

function zoomOut() {
  scale.value = Math.max(0.6, +(scale.value - 0.25).toFixed(2))
}

function resetZoom() {
  scale.value = 1.25
}

onMounted(() => {
  document.addEventListener('click', handleDocClick)
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  if (typeof document === 'undefined') return
  document.removeEventListener('click', handleDocClick)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="aie-zoom-overlay" @click.self="isOpen = false">
      <div class="aie-zoom-toolbar">
        <button type="button" class="aie-zoom-btn" @click="zoomIn" title="تكبير">+</button>
        <button type="button" class="aie-zoom-btn" @click="zoomOut" title="تصغير">-</button>
        <button type="button" class="aie-zoom-btn" @click="resetZoom" title="إعادة ضبط">100%</button>
        <button type="button" class="aie-zoom-btn aie-zoom-close" @click="isOpen = false" title="إغلاق (Esc)">✕ إغلاق</button>
      </div>
      <div class="aie-zoom-stage" @click.self="isOpen = false">
        <div
          class="aie-zoom-canvas"
          :style="{ transform: `scale(${scale})` }"
          v-html="svgHtml"
        />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.aie-zoom-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(15, 20, 25, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.aie-zoom-toolbar {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
  direction: rtl;
}

.aie-zoom-btn {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.aie-zoom-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.aie-zoom-close {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.aie-zoom-close:hover {
  color: #fff;
  opacity: 0.9;
}

.aie-zoom-stage {
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.aie-zoom-canvas {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  max-width: 900px;
  width: 90%;
  transform-origin: center center;
  transition: transform 0.15s ease;
  direction: ltr;
}
</style>
