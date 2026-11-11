<script setup lang="ts">
import { ref } from 'vue'

export interface Flashcard {
  q: string
  a: string
}

const props = defineProps<{
  title?: string
  cards: Flashcard[]
}>()

const revealed = ref<Record<number, boolean>>({})

function toggle(idx: number) {
  revealed.value[idx] = !revealed.value[idx]
}
</script>

<template>
  <div class="aie-flashcards">
    <h4>{{ props.title || 'مراجعة سريعة — اختبر فهمك' }}</h4>
    <div class="aie-cards-list">
      <div
        v-for="(card, idx) in props.cards"
        :key="idx"
        class="aie-card"
        @click="toggle(idx)"
      >
        <div class="aie-card-q">
          <span>{{ idx + 1 }}. {{ card.q }}</span>
          <span class="aie-card-toggle">{{ revealed[idx] ? 'إخفاء' : 'إظهار الإجابة' }}</span>
        </div>
        <div v-if="revealed[idx]" class="aie-card-a">
          {{ card.a }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aie-flashcards {
  margin: 24px 0;
  padding: 18px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.aie-flashcards h4 {
  margin: 0 0 12px;
  font-size: 1.05rem;
  color: var(--vp-c-brand-1);
}

.aie-cards-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.aie-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 12px 14px;
  cursor: pointer;
  transition: border-color 0.15s;
}

.aie-card:hover {
  border-color: var(--vp-c-brand-1);
}

.aie-card-q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-weight: 600;
  font-size: 0.94rem;
}

.aie-card-toggle {
  font-size: 0.78rem;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.aie-card-a {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
  line-height: 1.8;
}
</style>
