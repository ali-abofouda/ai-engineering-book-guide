import { ref, computed, onMounted } from 'vue'
import { CHAPTERS_PLAN, TOTAL_BOOK_PAGES } from '../data/studyPlan'

const STORAGE_KEY = 'aie-study-progress-v1'

const completedIds = ref<string[]>([])
const loaded = ref(false)

function loadFromStorage() {
  if (typeof window === 'undefined' || loaded.value) return
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        completedIds.value = parsed.filter((x) => typeof x === 'string')
      }
    }
  } catch {
    completedIds.value = []
  }
  loaded.value = true
}

function saveToStorage() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds.value))
  } catch {
    // Ignore storage quota or private mode errors
  }
}

export function useStudyProgress() {
  onMounted(loadFromStorage)

  function isCompleted(id: string): boolean {
    return completedIds.value.includes(id)
  }

  function toggleItem(id: string) {
    loadFromStorage()
    if (completedIds.value.includes(id)) {
      completedIds.value = completedIds.value.filter((x) => x !== id)
    } else {
      completedIds.value = [...completedIds.value, id]
    }
    saveToStorage()
  }

  function resetProgress() {
    completedIds.value = []
    saveToStorage()
  }

  const completedPagesCount = computed(() => {
    let pages = 0
    for (const ch of CHAPTERS_PLAN) {
      if (ch.batches && ch.batches.length > 0) {
        if (completedIds.value.includes(ch.id)) {
          pages += ch.pageCount
        } else {
          for (const b of ch.batches) {
            if (completedIds.value.includes(b.id)) {
              pages += b.pageCount
            }
          }
        }
      } else if (completedIds.value.includes(ch.id)) {
        pages += ch.pageCount
      }
    }
    return Math.min(pages, TOTAL_BOOK_PAGES)
  })

  const totalPercent = computed(() =>
    Math.round((completedPagesCount.value / TOTAL_BOOK_PAGES) * 100)
  )

  const ch06CompletedPages = computed(() => {
    const ch06 = CHAPTERS_PLAN.find((c) => c.id === 'ch06')
    if (!ch06) return 0
    if (completedIds.value.includes('ch06')) return ch06.pageCount
    return (ch06.batches || []).reduce(
      (sum, b) => (completedIds.value.includes(b.id) ? sum + b.pageCount : sum),
      0
    )
  })

  const ch06Percent = computed(() => {
    const ch06 = CHAPTERS_PLAN.find((c) => c.id === 'ch06')
    if (!ch06) return 0
    return Math.round((ch06CompletedPages.value / ch06.pageCount) * 100)
  })

  return {
    completedIds,
    isCompleted,
    toggleItem,
    resetProgress,
    completedPagesCount,
    totalPercent,
    ch06CompletedPages,
    ch06Percent,
    totalBookPages: TOTAL_BOOK_PAGES,
  }
}
