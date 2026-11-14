<script setup lang="ts">
export interface QuickBatch {
  label: string
  anchor: string
  pages: string
}

defineProps<{
  batches: QuickBatch[]
}>()
</script>

<template>
  <nav class="aie-batch-nav" aria-label="التنقل السريع بين الدفعات" dir="rtl">
    <span class="aie-batch-nav-title">قفز سريع:</span>
    <a
      v-for="b in batches"
      :key="b.anchor"
      :href="b.anchor"
      class="aie-batch-pill"
    >
      <span>{{ b.label }}</span>
      <span class="aie-batch-pill-pages">({{ b.pages }})</span>
    </a>
  </nav>
</template>

<style scoped>
.aie-batch-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 14px 0 22px;
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.aie-batch-nav-title {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  margin-left: 4px;
}

.aie-batch-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 11px;
  border-radius: 999px;
  font-size: 0.83rem;
  font-weight: 600;
  text-decoration: none;
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-divider);
  transition: border-color 0.15s, background-color 0.15s;
}

.aie-batch-pill:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.aie-batch-pill-pages {
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
  font-weight: 500;
}
@media (max-width: 640px) {
  .aie-batch-nav {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 10px 12px;
    gap: 8px;
    scrollbar-width: none; /* Firefox */
  }

  .aie-batch-nav::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  .aie-batch-nav-title {
    flex-shrink: 0;
  }

  .aie-batch-pill {
    flex-shrink: 0;
    font-size: 0.8rem;
    padding: 4px 10px;
  }
}
</style>
