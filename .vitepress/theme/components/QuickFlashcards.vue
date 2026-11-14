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
  <div class="aie-flashcards" dir="rtl">
    <div class="aie-flashcards-header">
      <span class="aie-header-icon">💡</span>
      <h4 class="aie-header-title">{{ props.title || 'مراجعة سريعة — اختبر فهمك للمفاهيم' }}</h4>
    </div>
    <div class="aie-cards-list">
      <div
        v-for="(card, idx) in props.cards"
        :key="idx"
        class="aie-card"
        :class="{ 'is-open': revealed[idx] }"
        @click="toggle(idx)"
      >
        <div class="aie-card-q">
          <span class="aie-card-q-text">
            <span class="aie-q-num">{{ idx + 1 }}</span>
            <span>{{ card.q }}</span>
          </span>
          <span class="aie-card-toggle">
            {{ revealed[idx] ? 'إخفاء الإجابة ▲' : 'إظهار الإجابة ▼' }}
          </span>
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
  margin: 28px 0;
  padding: 20px 22px;
  border-radius: 16px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  box-shadow: var(--aie-card-shadow);
}

.aie-flashcards-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.aie-header-icon {
  font-size: 1.25rem;
}

.aie-header-title {
  margin: 0 !important;
  font-size: 1.08rem !important;
  font-weight: 700 !important;
  color: var(--vp-c-brand-1) !important;
  letter-spacing: -0.01em;
}

.aie-cards-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.aie-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 14px 16px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.aie-card:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.aie-card.is-open {
  border-color: var(--vp-c-brand-2);
  background: var(--vp-c-bg-elv);
}

.aie-card-q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
}

.aie-card-q-text {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 0.96rem;
  color: var(--vp-c-text-1);
}

.aie-q-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.82rem;
  font-weight: 700;
  flex-shrink: 0;
}

.aie-card-toggle {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
  padding: 3px 9px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  border: 1px solid rgba(45, 212, 191, 0.2);
}

.aie-card-a {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 0.94rem;
  color: var(--vp-c-text-2);
  line-height: 1.85;
}
</style>
