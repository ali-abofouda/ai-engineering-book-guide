<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { CHAPTERS_PLAN, WEEKS_META } from '../data/studyPlan'
import { useStudyProgress } from '../composables/useStudyProgress'

const {
  isCompleted,
  toggleItem,
  resetProgress,
  completedPagesCount,
  totalPercent,
  ch06CompletedPages,
  ch06Percent,
  totalBookPages,
} = useStudyProgress()

const weeksWithChapters = computed(() =>
  WEEKS_META.map((w) => ({
    ...w,
    chapters: CHAPTERS_PLAN.filter((c) => c.week === w.week),
  }))
)

const ch06 = computed(() => CHAPTERS_PLAN.find((c) => c.id === 'ch06'))
</script>

<template>
  <section class="aie-dashboard" dir="rtl">
    <!-- Continue Reading Banner -->
    <div class="aie-continue-card">
      <div class="aie-continue-info">
        <span class="aie-badge-live">متاح الآن • آخر دفعة</span>
        <h3>كمل قراءة: Chapter 6 — الدفعة 4 (ص 267–272)</h3>
        <p>
          الدمج المتسلسل والمتوازي (<code>RRF</code>)، استراتيجيات <code>Chunking</code>،
          <code>Reranking</code>، <code>Query Rewriting</code>، و<code>Contextual Retrieval</code>.
        </p>
      </div>
      <div class="aie-continue-actions">
        <a :href="withBase('/notes/ch06-rag-and-agents/01-rag#batch-4')" class="aie-btn-primary">
          افتح الدفعة 4 ←
        </a>
        <a :href="withBase('/READING_PLAN')" class="aie-btn-secondary">
          خطة الـ 5 أسابيع
        </a>
      </div>
    </div>

    <!-- Progress Stats -->
    <div class="aie-stats-grid">
      <div class="aie-stat-card">
        <div class="aie-stat-head">
          <span>تقدمك في الكتاب بالكامل</span>
          <strong>{{ completedPagesCount }} / {{ totalBookPages }} صفحة ({{ totalPercent }}%)</strong>
        </div>
        <div class="aie-progress-track">
          <div class="aie-progress-fill" :style="{ width: totalPercent + '%' }" />
        </div>
      </div>

      <div class="aie-stat-card">
        <div class="aie-stat-head">
          <span>تقدمك في Chapter 6 (الحالي)</span>
          <strong>{{ ch06CompletedPages }} / {{ ch06?.pageCount }} صفحة ({{ ch06Percent }}%)</strong>
        </div>
        <div class="aie-progress-track">
          <div class="aie-progress-fill aie-fill-accent" :style="{ width: ch06Percent + '%' }" />
        </div>
      </div>
    </div>

    <!-- Chapter 6 Batch Tracker -->
    <div v-if="ch06?.batches" class="aie-panel">
      <div class="aie-panel-head">
        <div>
          <h4>خريطة شابتر 6: RAG and Agents (10 دفعات)</h4>
          <p class="aie-muted">علّم على كل دفعة تخلصها — بيتحفظ تقدمك تلقائياً في المتصفح.</p>
        </div>
        <button
          v-if="completedPagesCount > 0"
          type="button"
          class="aie-reset-btn"
          @click="resetProgress"
        >
          تصفير التقدم
        </button>
      </div>

      <div class="aie-batch-list">
        <div
          v-for="batch in ch06.batches"
          :key="batch.id"
          class="aie-batch-row"
          :class="{ 'is-done': isCompleted(batch.id) }"
        >
          <label class="aie-check-label">
            <input
              type="checkbox"
              :checked="isCompleted(batch.id)"
              @change="toggleItem(batch.id)"
            />
            <span class="aie-batch-title">{{ batch.title }}</span>
          </label>
          <div class="aie-batch-meta">
            <span class="aie-pages-pill">ص {{ batch.pagesRange }}</span>
            <a
              v-if="batch.available && batch.link"
              :href="withBase(batch.link)"
              class="aie-status-link"
            >
              اقرأ الآن
            </a>
            <span v-else class="aie-status-soon">قريباً</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 5-Week Roadmap Grid -->
    <div class="aie-panel">
      <h4>خريطة الفصول حسب خطة الـ 5 أسابيع</h4>
      <div class="aie-weeks-grid">
        <div v-for="w in weeksWithChapters" :key="w.week" class="aie-week-card">
          <div class="aie-week-header">
            <span class="aie-week-num">{{ w.title }}</span>
            <span class="aie-week-sub">{{ w.subtitle }}</span>
          </div>
          <div class="aie-week-chapters">
            <div v-for="ch in w.chapters" :key="ch.id" class="aie-ch-item">
              <label class="aie-check-label">
                <input
                  v-if="!ch.batches"
                  type="checkbox"
                  :checked="isCompleted(ch.id)"
                  @change="toggleItem(ch.id)"
                />
                <div>
                  <div class="aie-ch-name">
                    <span class="aie-ch-num">Ch. {{ ch.number }}</span>
                    <a v-if="ch.available && ch.link" :href="withBase(ch.link)">{{ ch.title }}</a>
                    <span v-else>{{ ch.title }}</span>
                  </div>
                  <div class="aie-ch-ar">{{ ch.arabicTitle }} · ص {{ ch.pagesRange }}</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.aie-dashboard {
  max-width: 1152px;
  margin: 24px auto 40px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.aie-continue-card {
  background: linear-gradient(135deg, var(--vp-c-brand-soft), var(--vp-c-bg-soft));
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 14px;
  padding: 20px 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.aie-continue-info h3 {
  margin: 8px 0 6px;
  font-size: 1.25rem;
  font-weight: 700;
}

.aie-continue-info p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.aie-badge-live {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--vp-c-brand-1);
  color: #fff;
}

.aie-continue-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.aie-btn-primary,
.aie-btn-secondary {
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
  transition: opacity 0.15s;
}

.aie-btn-primary {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.aie-btn-secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.aie-btn-primary:hover,
.aie-btn-secondary:hover {
  opacity: 0.9;
}

.aie-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}

.aie-stat-card,
.aie-panel {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 18px 20px;
}

.aie-stat-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.92rem;
  gap: 8px;
  flex-wrap: wrap;
}

.aie-progress-track {
  height: 10px;
  background: var(--vp-c-bg);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.aie-progress-fill {
  height: 100%;
  background: var(--vp-c-brand-1);
  transition: width 0.25s ease;
}

.aie-fill-accent {
  background: var(--vp-c-brand-2);
}

.aie-panel-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
}

.aie-panel h4 {
  margin: 0 0 4px;
  font-size: 1.1rem;
  font-weight: 700;
}

.aie-muted {
  margin: 0;
  font-size: 0.86rem;
  color: var(--vp-c-text-2);
}

.aie-reset-btn {
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  border-radius: 8px;
  padding: 5px 12px;
  font-size: 0.82rem;
  cursor: pointer;
}

.aie-reset-btn:hover {
  border-color: var(--vp-c-danger-1);
  color: var(--vp-c-danger-1);
}

.aie-batch-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.aie-batch-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  flex-wrap: wrap;
}

.aie-batch-row.is-done .aie-batch-title {
  text-decoration: line-through;
  opacity: 0.7;
}

.aie-check-label {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 0.92rem;
}

.aie-check-label input[type='checkbox'] {
  margin-top: 4px;
  accent-color: var(--vp-c-brand-1);
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.aie-batch-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.aie-pages-pill {
  font-size: 0.78rem;
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.aie-status-link {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.aie-status-soon {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.aie-weeks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.aie-week-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 14px 16px;
}

.aie-week-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.aie-week-num {
  font-weight: 700;
  color: var(--vp-c-brand-1);
  font-size: 0.95rem;
}

.aie-week-sub {
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
}

.aie-week-chapters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.aie-ch-name {
  font-weight: 600;
  font-size: 0.9rem;
}

.aie-ch-name a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.aie-ch-num {
  display: inline-block;
  font-size: 0.74rem;
  padding: 1px 6px;
  border-radius: 5px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  margin-left: 6px;
}

.aie-ch-ar {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}
</style>
