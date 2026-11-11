<script setup lang="ts">
import { useStudyProgress } from '../composables/useStudyProgress'

const props = defineProps<{
  id: string
  label: string
}>()

const { isCompleted, toggleItem } = useStudyProgress()
</script>

<template>
  <div class="aie-batch-check" :class="{ 'is-done': isCompleted(props.id) }">
    <label class="aie-batch-check-label">
      <input
        type="checkbox"
        :checked="isCompleted(props.id)"
        @change="toggleItem(props.id)"
      />
      <span>
        <strong v-if="isCompleted(props.id)">مكتمل:</strong>
        <strong v-else>علّم كمقروء:</strong>
        {{ props.label }}
      </span>
    </label>
  </div>
</template>

<style scoped>
.aie-batch-check {
  margin: 24px 0;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  transition: border-color 0.15s, background-color 0.15s;
}

.aie-batch-check.is-done {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.aie-batch-check-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 0.95rem;
}

.aie-batch-check-label input[type='checkbox'] {
  width: 18px;
  height: 18px;
  accent-color: var(--vp-c-brand-1);
  cursor: pointer;
}
</style>
