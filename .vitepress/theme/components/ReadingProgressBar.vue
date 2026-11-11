<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } = useData()
const route = useRoute()
const progress = ref(0)

function updateProgress() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  const docEl = document.documentElement
  const scrollTop = window.scrollY || docEl.scrollTop
  const scrollHeight = docEl.scrollHeight - window.innerHeight
  if (scrollHeight <= 0) {
    progress.value = 0
    return
  }
  progress.value = Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100)))
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress, { passive: true })
})

onUnmounted(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})

watch(
  () => route.path,
  () => {
    setTimeout(updateProgress, 100)
  }
)
</script>

<template>
  <div
    v-if="frontmatter.layout !== 'home'"
    class="aie-reading-bar-wrap"
    role="progressbar"
    :aria-valuenow="progress"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="aie-reading-bar-fill" :style="{ width: progress + '%' }" />
  </div>
</template>

<style scoped>
.aie-reading-bar-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: transparent;
  z-index: 100;
  pointer-events: none;
}

.aie-reading-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  transition: width 0.12s ease-out;
}
</style>
