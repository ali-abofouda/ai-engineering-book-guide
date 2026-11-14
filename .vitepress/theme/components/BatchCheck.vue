<script setup lang="ts">
import { ref } from 'vue'
import { useStudyProgress } from '../composables/useStudyProgress'

const props = defineProps<{
  id: string
  label: string
}>()

const { isCompleted, toggleItem } = useStudyProgress()
const showCelebration = ref(false)

function onToggle() {
  const willBeDone = !isCompleted(props.id)
  toggleItem(props.id)

  if (willBeDone) {
    showCelebration.value = true
    setTimeout(() => {
      showCelebration.value = false
    }, 1200)
  }
}
</script>

<template>
  <div class="aie-batch-check" :class="{ 'is-done': isCompleted(props.id) }">
    <label class="aie-batch-check-label">
      <input
        type="checkbox"
        :checked="isCompleted(props.id)"
        @change="onToggle"
      />
      <span class="aie-check-text">
        <strong v-if="isCompleted(props.id)" class="aie-badge done">✓ مكتمل بنجاح</strong>
        <strong v-else class="aie-badge todo">○ غير مقروء</strong>
        <span class="aie-batch-title">{{ props.label }}</span>
      </span>
    </label>

    <!-- Celebration Particles -->
    <div v-if="showCelebration" class="aie-celebration-burst">
      <span class="aie-spark s1">🎉</span>
      <span class="aie-spark s2">⭐</span>
      <span class="aie-spark s3">✨</span>
      <span class="aie-spark s4">🚀</span>
      <span class="aie-spark s5">👏</span>
    </div>
  </div>
</template>

<style scoped>
.aie-batch-check {
  position: relative;
  margin: 28px 0;
  padding: 16px 20px;
  border-radius: 14px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-elv);
  box-shadow: var(--aie-card-shadow);
  transition: all 0.22s ease;
  overflow: hidden;
}

.aie-batch-check.is-done {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 4px 20px rgba(15, 118, 110, 0.12);
}

.aie-batch-check-label {
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  user-select: none;
}

.aie-batch-check-label input[type='checkbox'] {
  width: 20px;
  height: 20px;
  accent-color: var(--vp-c-brand-1);
  cursor: pointer;
  border-radius: 6px;
  transition: transform 0.15s ease;
}

.aie-batch-check-label input[type='checkbox']:hover {
  transform: scale(1.15);
}

.aie-check-text {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.aie-badge {
  font-size: 0.76rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  letter-spacing: -0.01em;
}

.aie-badge.done {
  background: var(--vp-c-brand-1);
  color: #ffffff;
}

.aie-badge.todo {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.aie-batch-title {
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* Celebration particles animation */
.aie-celebration-burst {
  position: absolute;
  top: 50%;
  left: 30px;
  pointer-events: none;
  transform: translateY(-50%);
}

.aie-spark {
  position: absolute;
  font-size: 1.3rem;
  animation: sparkFloat 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.aie-spark.s1 { animation-delay: 0ms;   transform: translate(0, 0); }
.aie-spark.s2 { animation-delay: 80ms;  transform: translate(25px, -30px); }
.aie-spark.s3 { animation-delay: 140ms; transform: translate(-25px, -35px); }
.aie-spark.s4 { animation-delay: 200ms; transform: translate(45px, 20px); }
.aie-spark.s5 { animation-delay: 260ms; transform: translate(-40px, 20px); }

@keyframes sparkFloat {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.3);
  }
  40% {
    opacity: 1;
    transform: translate(var(--tx, 15px), var(--ty, -25px)) scale(1.3);
  }
  100% {
    opacity: 0;
    transform: translate(var(--tx, 30px), var(--ty, -60px)) scale(0.8);
  }
}
</style>
