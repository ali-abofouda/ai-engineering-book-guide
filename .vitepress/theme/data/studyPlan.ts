export interface BatchItem {
  id: string
  title: string
  pagesRange: string
  pageCount: number
  link?: string
  available: boolean
}

export interface ChapterItem {
  id: string
  number: string
  title: string
  arabicTitle: string
  week: number
  pagesRange: string
  pageCount: number
  link?: string
  available: boolean
  batches?: BatchItem[]
}

export const TOTAL_BOOK_PAGES = 493

export const CHAPTERS_PLAN: ChapterItem[] = [
  {
    id: 'ch06',
    number: '06',
    title: 'RAG and Agents',
    arabicTitle: 'الـ RAG وبناء الـ Agents (نقطة البداية)',
    week: 1,
    pagesRange: '253–306',
    pageCount: 54,
    link: '/notes/ch06-rag-and-agents/01-rag',
    available: true,
    batches: [
      {
        id: 'ch06-b1',
        title: 'الدفعة 1: مقدمة الفصل + RAG Architecture + مدخل Retrieval',
        pagesRange: '253–257',
        pageCount: 5,
        link: '/notes/ch06-rag-and-agents/01-rag',
        available: true,
      },
      {
        id: 'ch06-b2',
        title: 'الدفعة 2: Term-Based (TF-IDF, BM25) vs Embedding Retrieval',
        pagesRange: '257–261',
        pageCount: 5,
        available: false,
      },
      {
        id: 'ch06-b3',
        title: 'الدفعة 3: Vector DBs وANN والمقارنة ومقاييس الترتيب',
        pagesRange: '262–266',
        pageCount: 5,
        available: false,
      },
      {
        id: 'ch06-b4',
        title: 'الدفعة 4: Retrieval Optimization (Chunking, Query Rewriting, Contextual)',
        pagesRange: '267–272',
        pageCount: 6,
        available: false,
      },
      {
        id: 'ch06-b5',
        title: 'الدفعة 5: RAG Beyond Texts (Multimodal & Tabular/SQL)',
        pagesRange: '273–275',
        pageCount: 3,
        available: false,
      },
      {
        id: 'ch06-b6',
        title: 'الدفعة 6: Agent Overview & Tools',
        pagesRange: '275–281',
        pageCount: 7,
        available: false,
      },
      {
        id: 'ch06-b7',
        title: 'الدفعة 7: Planning (الجزء 1: Intent, FM vs RL)',
        pagesRange: '282–288',
        pageCount: 7,
        available: false,
      },
      {
        id: 'ch06-b8',
        title: 'الدفعة 8: Planning (الجزء 2: Control Flow, ReAct, Reflexion)',
        pagesRange: '289–294',
        pageCount: 6,
        available: false,
      },
      {
        id: 'ch06-b9',
        title: 'الدفعة 9: Tool Selection & Agent Failure Modes',
        pagesRange: '295–300',
        pageCount: 5,
        available: false,
      },
      {
        id: 'ch06-b10',
        title: 'الدفعة 10: Memory & Summary',
        pagesRange: '300–306',
        pageCount: 5,
        available: false,
      },
    ],
  },
  {
    id: 'ch05',
    number: '05',
    title: 'Prompt Engineering',
    arabicTitle: 'هندسة الأوامر والحماية من الهجمات',
    week: 1,
    pagesRange: '211–252',
    pageCount: 42,
    available: false,
  },
  {
    id: 'ch10',
    number: '10',
    title: 'AI Engineering Architecture and User Feedback',
    arabicTitle: 'المعمارية الإنتاجية وتغذية المستخدمين',
    week: 2,
    pagesRange: '449–493',
    pageCount: 45,
    available: false,
  },
  {
    id: 'ch01',
    number: '01',
    title: 'Introduction to Building AI Applications',
    arabicTitle: 'مقدمة تطبيقات نماذج الأساس والتخطيط',
    week: 2,
    pagesRange: '1–48',
    pageCount: 48,
    available: false,
  },
  {
    id: 'ch02',
    number: '02',
    title: 'Understanding Foundation Models',
    arabicTitle: 'فهم النماذج من الداخل (التدريب والـ Sampling)',
    week: 3,
    pagesRange: '49–112',
    pageCount: 64,
    available: false,
  },
  {
    id: 'ch03',
    number: '03',
    title: 'Evaluation Methodology',
    arabicTitle: 'منهجية التقييم ومقاييس اللغة وAI as a Judge',
    week: 3,
    pagesRange: '113–158',
    pageCount: 46,
    available: false,
  },
  {
    id: 'ch04',
    number: '04',
    title: 'Evaluate AI Systems',
    arabicTitle: 'تقييم الأنظمة واختيار النموذج المناسب',
    week: 4,
    pagesRange: '159–210',
    pageCount: 52,
    available: false,
  },
  {
    id: 'ch07',
    number: '07',
    title: 'Finetuning',
    arabicTitle: 'تخصيص النماذج وحسابات الذاكرة والـ PEFT',
    week: 4,
    pagesRange: '307–362',
    pageCount: 56,
    available: false,
  },
  {
    id: 'ch08',
    number: '08',
    title: 'Dataset Engineering',
    arabicTitle: 'هندسة البيانات والتوليد الاصطناعي',
    week: 5,
    pagesRange: '363–404',
    pageCount: 42,
    available: false,
  },
  {
    id: 'ch09',
    number: '09',
    title: 'Inference Optimization',
    arabicTitle: 'تسريع التشغيل وتقليل الـ Latency والتكلفة',
    week: 5,
    pagesRange: '405–448',
    pageCount: 44,
    available: false,
  },
]

export const WEEKS_META = [
  { week: 1, title: 'الأسبوع 1', subtitle: 'بناء السياق والـ Agents والـ Prompts' },
  { week: 2, title: 'الأسبوع 2', subtitle: 'المعمارية الإنتاجية والتخطيط الاستراتيجي' },
  { week: 3, title: 'الأسبوع 3', subtitle: 'النماذج من الداخل ومنهجية التقييم' },
  { week: 4, title: 'الأسبوع 4', subtitle: 'تقييم الأنظمة والـ Finetuning' },
  { week: 5, title: 'الأسبوع 5', subtitle: 'هندسة البيانات وتحسين الأداء' },
]
