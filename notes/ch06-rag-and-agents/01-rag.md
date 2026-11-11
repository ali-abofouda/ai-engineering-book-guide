# الفصل 6 — الجزء 1: الـ RAG (`ص 253–275`)

> **ملاحظة:** هذه الملاحظات شرح تفصيلي صفحة بصفحة بأسلوب شخصي بالعامية المصرية مع الحفاظ على المصطلحات التقنية بالإنجليزية. أرقام الصفحات مطابقة لترقيم الكتاب المطبوع.

---

## الدفعة 1: من مقدمة الفصل إلى مدخل خوارزميات الاسترجاع (`ص 253–257`)

### صفحة 253 — مقدمة الفصل: ليه الموديل محتاج Context؟ وبداية الـ RAG

أي AI Model علشان يحل أي Task مطلوب منه، محتاج حاجتين أساسيتين:
1. **Instructions (التعليمات):** يعمل إيه وإزاي (وده اللي اتشرح في Chapter 5: Prompt Engineering).
2. **Necessary Information / Context (السياق والمعلومات اللازمة):** البيانات والحقائق اللي هيشتغل عليها.

زي الإنسان بالظبط: لو سألت حد سؤال ومعندوش المعلومات الكافية، غالباً هيغلط أو يفتي. نفس الكلام بيحصل مع الـ AI Models؛ لما ينقصها الـ **Context** بتغلط وبيزيد احتمال إنها تـ **Hallucinate**.

- **الفرق الجوهري بين Instructions و Context:**
  - الـ **Instructions** في أي تطبيق بتكون عامة ومشتركة لكل الـ Queries.
  - الـ **Context** بيكون مخصّص ومختلف لكل Query لوحده (`query-specific`).
  - هدف الفصل السادس هو: **إزاي تبني الـ Relevant Context المناسب لكل Query.**

#### النمطان المسيطران لبناء السياق (`Context Construction`)
1. **RAG (Retrieval-Augmented Generation):** نمط بيسمح للموديل يسترجع المعلومات المهمة من مصادر بيانات خارجية (`External Data Sources`).
2. **Agents (Agentic Pattern):** نمط بيسمح للموديل يستخدم أدوات خارجية (`Tools`) زي `Web Search` و`News APIs` علشان يجمع معلومات.

> **الفرق في الدور:** الـ **RAG** استخدامه الأساسي هو بناء الـ Context، إنما الـ **Agentic Pattern** بيعمل أكتر من كده بكتير: الـ Tools الخارجية بتعالج نقط ضعف الموديل، بتوسّع قدراته، والأهم إنها بتديه القدرة إنه **يتفاعل مباشرة مع العالم الحقيقي** (`Interact with the world`) ويؤتمت مهام كتير في حياتنا. الاتنين في وقت قصير قدروا يطلعوا Demos ومنتجات مبهرة خلت ناس كتير شايفة إنهم المستقبل.

#### تعريف الـ RAG
الـ **RAG** هو تقنية بتحسّن جودة الـ Generation عن طريق استرجاع المعلومات المناسبة من **External Memory Sources** (مصادر ذاكرة خارجية).
أمثلة لمصادر الذاكرة الخارجية:
- قاعدة بيانات داخلية للشركة (`Internal Database`).
- محادثات سابقة لنفس المستخدم (`Previous Chat Sessions`).
- الإنترنت.

---

### صفحة 254 — الجذور البحثية لـ RAG (أوراق 2017 و2020)

#### 1) نمط Retrieve-then-Generate (Chen et al., 2017)
أول ظهور موثق للنمط ده كان في ورقة بحثية بعنوان *"Reading Wikipedia to Answer Open-Domain Questions"* (سنة 2017):
- النظام بياخد سؤال المستخدم (مثال الورقة: *"How many of Warsaw's inhabitants spoke Polish in 1933?"*).
- الخطوة الأولى: **Document Retriever** بيجيب أكتر **5 صفحات Wikipedia** ليها علاقة بالسؤال.
- الخطوة الثانية: موديل قارئ سمّوه **Document Reader** يقرأ الصفحات دي ويطلع الإجابة (`833,500`).

> **معلومة هامشية (Footnote 1):** الموديل القارئ وقتها ما كانش Transformer! كان **LSTM (Long Short-Term Memory)**، وده نوع من الـ **Recurrent Neural Networks (RNNs)** اللي كانت مسيطرة على الـ **NLP** قبل ثورة الـ **Transformer** في 2018.

```mermaid
flowchart LR
    Q["User Query"] --> R["Document Retriever"]
    KB[("External Corpus (e.g. Wikipedia)")] --> R
    R -->|"Top-k Relevant Pages"| M["Document Reader (Model)"]
    M --> A["Generated Answer"]
```

#### 2) تسمية مصطلح RAG (Lewis et al., 2020)
مصطلح **Retrieval-Augmented Generation (RAG)** اتصاغ لأول مرة في ورقة Facebook الشهيرة *"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"* (سنة 2020):
- الورقة قدمت الـ RAG كحل للمهام الكثيفة بالمعرفة (**Knowledge-Intensive Tasks**) اللي مستحيل تدخل فيها كل المعرفة المتاحة للموديل مرة واحدة.
- مع الـ RAG، الـ **Retriever** بيختار فقط المعلومات الأكثر ارتباطاً بالـ Query ويدخلها للموديل.
- النتيجة اللي وصلولها: وجود معلومات ذات صلة بيخلي الموديل يطلع إجابات **أكثر تفصيلاً** وفي نفس الوقت **بيقلل الـ Hallucinations**.

> **معلومة هامشية (Footnote 2):** في نفس التوقيت تقريباً (مايو 2020)، ورقة تانية من Facebook (**Petroni et al., 2020** — *"How Context Affects Language Models' Factual Predictions"*) أثبتت إن دمج نظام استرجاع (`Retrieval System`) مع **Pre-trained Language Model** بيرفع أداءه بشكل ضخم جداً في الأسئلة الحقائقية (**Factual Questions**).

---

### صفحة 255 — ليه الـ RAG مهمة؟ وهل الـ Long Context هيقضي عليها؟

#### مثال عملي وفائدة إدارة بيانات المستخدمين
- مثال (Chetan Tekur — Footnote 3): لو سألت الموديل *"Can Acme's fancy-printer-A300 print 100pps?"*، مستحيل يجاوب بدقة غير لو اديته مواصفات الطابعة دي في الـ Context.
- تقدر تفكر في الـ **RAG** كأداة لبناء **Context مخصّص لكل Query** بدل استخدام نفس الـ Context العام لكل الأسئلة.
- ده بيساعد جداً في **Managing User Data**: تقدر تدخل بيانات مستخدم معين في الـ Queries الخاصة بيه هو بس، وده يحفظ الخصوصية والصلاحيات.

> **تشبيه هندسي مهم:**
> **Context Construction** للـ **Foundation Models** ≡ **Feature Engineering** للـ **Classical ML Models**.
> الاتنين هدفهم واحد: تجهيز وإمداد الموديل بالمعلومات الضرورية علشان يعالج الـ Input صح.

#### سؤال مهم: هل زيادة الـ Context Length هتموّت الـ RAG؟
في بدايات الـ Foundation Models، ظهر الـ RAG أساساً لتخطي محدودية طول السياق (`Context Limitations`). ناس كتير بتعتقد إن لو الـ Context Window بقت ضخمة كفاية، مش هنحتاج RAG. **المؤلفة بتعارض الرأي ده لسببين:**

1. **البيانات دايماً هتكون أكبر من أي Context Limit:**
   - مهما كبر طول الـ Context، دايماً فيه تطبيقات بياناتها أكبر بكتير.
   - حجم البيانات المتاحة في العالم بيكبر باستمرار؛ الناس بتنتج وتضيف بيانات جديدة ونادراً ما بتحذف بيانات قديمة. الـ Context Length بيتوسع بسرعة، لكن مش بسرعة كافية لملاحقة نمو البيانات.
   - **قانون باركنسون للـ Context (Footnote 4):** زي ما **Parkinson's Law** بيقول *"الشغل بيتمدد علشان يملى الوقت المتاح ليه"*، المؤلفة بتطرح نظرية مشابهة: **الـ Context بتاع أي تطبيق بيتمدد علشان يملى أقصى Context Limit يدعمه الموديل!**

2. **القدرة على استقبال Context طويل ≠ استخدامه بكفاءة:**
   - وجود Context Window كبيرة مش معناه إن الموديل هيستفيد منها صح (وده هيتناقش بتفصيل في `ص 218` — `Context Length and Context Efficiency`).
   - كل ما الـ Context يطول، يزيد احتمال إن الموديل يتشتت ويركز على الجزء الغلط.
   - بالإضافة إن كل Token زيادة في الـ Input معناه **Cost أعلى** واحتمال **Latency أعلى**.
   - الـ RAG بيسمحلك تبعت **أهم المعلومات فقط** لكل Query ← **Input Tokens أقل + Performance أفضل**.

> **نظرة مستقبلية:** تطوير طول الـ Context ماشي بالتوازي مع تطوير كفاءة استغلال السياق، والمؤلفة تتوقع إن شركات النماذج (`Model Providers`) في المستقبل ممكن تدمج آلية شبيهة بالـ Retrieval أو الـ Attention جوه الموديل نفسه علشان يلتقط أهم أجزاء السياق تلقائياً.

---

### صفحة 256 — قاعدة Anthropic للـ 200k Tokens + معمارية الـ RAG (`RAG Architecture`)

#### إرشاد عملي من Anthropic (2024)
في تنبيه مهم بالصفحة: شركة **Anthropic** اقترحت بخصوص نماذج **Claude** إن لو الـ **Knowledge Base** بتاعتك حجمها أصغر من **200,000 tokens** (يعني حوالي **500 صفحة**)، تقدر تحطها كلها مباشرة في الـ Prompt ومش هتحتاج RAG ولا طرق مشابهة. والمؤلفة بتتمنى إن باقي مطوري النماذج يقدموا إرشادات عملية واضحة زي دي لتحديد إمتى نستخدم RAG وإمتى يكفي Long Context.

#### معمارية الـ RAG الأساسية (`RAG Architecture`)
أي نظام RAG بيتكون من عنصرين أساسيين:
1. **Retriever:** بيجيب المعلومات المناسبة من مصادر الذاكرة الخارجية (`External Memory`).
2. **Generator (Generative Model):** بيولّد الإجابة النهائية بناءً على السؤال والمعلومات المسترجعة.

```mermaid
flowchart TB
    EM[("External Memory<br/>Documents, tables, chat history, etc.")] --> RET["Retriever"]
    USER(("User")) -->|"Prompt / Query"| RET
    USER -->|"Prompt / Query"| GEN["Generative Model"]
    RET -->|"Context relevant to query"| GEN
    GEN -->|"Response"| USER
```

#### طريقة التدريب: منفصلين ولا مع بعض؟
- في ورقة **Lewis et al. (2020)** الأصلية، دربوا الـ Retriever والـ Generative Model **مع بعض** (`Trained Together`).
- في الأنظمة الحالية في الواقع العملي، المكونين غالباً بيتدربوا بشكل منفصل، وفرق كتير بتستخدم Retrievers وModels جاهزة (**Off-the-shelf**).
- مع ذلك، عمل **End-to-End Finetuning** لنظام الـ RAG بالكامل مع بعض يقدر يرفع الأداء بشكل كبير.

#### وظيفتا الـ Retriever
نجاح نظام الـ RAG كله بيعتمد على جودة الـ **Retriever**، واللي بيقوم بوظيفتين أساسيتين:
1. **Indexing (الفهرسة):** معالجة وتنظيم البيانات وتخزينها بشكل يسهّل ويسرّع استرجاعها لاحقاً. *(مهم جداً: طريقة الـ Indexing بتتحدد بناءً على الطريقة اللي ناوي تسترجع بيها البيانات بعدين).*
2. **Querying (الاستعلام):** إرسال الـ Query وقت التشغيل علشان تسترجع البيانات المرتبطة بيه.

**سيناريو تمثيلي:** تخيل إن الـ External Memory هي قاعدة بيانات مستندات شركة فيها مذكرات (`Memos`)، عقود (`Contracts`)، ومحاضر اجتماعات (`Meeting Notes`)...

---

### صفحة 257 — الحاجة للـ Chunking + مدخل خوارزميات الاسترجاع (`Retrieval Algorithms`)

#### ليه بنقسّم المستندات (`Chunking`)؟
المستند الواحد في قاعدة البيانات ممكن يكون **10 tokens** أو **1 مليون token**. لو استرجعت المستندات كاملة بدون تقسيم (`Naively`)، الـ Context هيتضخم بشكل غير محدود.
الحل: نقسّم كل مستند لأجزاء أصغر قابلة للإدارة اسمها **Chunks** (استراتيجيات الـ Chunking هتيجي بالتفصيل لاحقاً في هذا الفصل).
بعد استرجاع أهم الـ Chunks للـ Query، غالباً بنحتاج خطوة **Minor Post-processing** علشان ندمج الـ Chunks المسترجعة مع الـ User Prompt ونكوّن الـ **Final Prompt** اللي بيدخل للـ **Generative Model**.

> **تنبيه مصطلحات مهم (Terminology Note):**
> في هذا الفصل، المؤلفة بتستخدم كلمة **"Document"** لتشير لـ "المستند الكامل" أو الـ "Chunk" على حد سواء؛ لأن تقنياً أي Chunk مقتطع من مستند هو نفسه يُعتبر Document في مصطلحات **Classical NLP** وعلم **Information Retrieval (IR)**.

#### مدخل إلى `Retrieval Algorithms`
الاسترجاع مش فكرة جديدة خاصة بالـ RAG؛ علم **Information Retrieval (IR)** عمره حوالي قرن كامل!
- **معلومة تاريخية (Footnote 5):** بدايات استرجاع المعلومات اتوصفت من عشرينيات القرن الماضي (1920s) في براءات اختراع **Emanuel Goldberg** لآلة سماها **"Statistical Machine"** كانت بتبحث في مستندات متخزنة على أفلام (المرجع: Sanderson and Croft, *Proceedings of the IEEE*, 2012).
- الـ IR هو الأساس اللي قامت عليه:
  - محركات البحث (**Search Engines**).
  - أنظمة التوصية (**Recommender Systems**).
  - تحليل السجلات (**Log Analytics**).
- كتير من الخوارزميات الناضجة اللي اتطورت للأنظمة التقليدية دي تنفع وتتطبق مباشرة في الـ RAG. ولأن الـ IR مجال بحثي وصناعي ضخم صعب يتغطى في صفحات قليلة، الفصل بيعرض الخطوط العريضة وبيرشح مصادر إضافية أعمق في مستودع الكتاب على GitHub.

> **الفرق بين `Retrieval` و `Search`:**
> تقليدياً، **Retrieval** بيحصل جوه قاعدة بيانات أو نظام واحد، بينما **Search** بيشمل الاسترجاع عبر أنظمة وقواعد بيانات متعددة. لكن في الفصل ده بتستخدم المؤلفة المصطلحين بالتبادل (`Interchangeably`).

#### جوهر أي خوارزمية استرجاع
في الأساس، أي Retrieval بيشتغل عن طريق **ترتيب المستندات (`Ranking Documents`)** بناءً على درجة صلتها (`Relevance`) بالـ Query المطلوب. الخوارزميات بتختلف في طريقة حساب الـ **Relevance Scores**.
وهنا الفصل بيبدأ بالنوعين الأشهر:
1. **Term-Based Retrieval** (الاسترجاع المبني على الكلمات/المصطلحات) — يبدأ شرحه في صفحة 258.
2. **Embedding-Based Retrieval** (الاسترجاع المبني على المتجهات الدلالية) — يبدأ شرحه بعدها.

<QuickFlashcards
  title="مراجعة سريعة — الدفعة 1 (ص 253–257)"
  :cards="[
    {
      q: 'إيه الفرق الجوهري بين Instructions و Context في أي تطبيق AI؟',
      a: 'الـ Instructions بتكون عامة ومشتركة لكل الـ Queries، بينما الـ Context مخصص ومختلف لكل Query لوحده (query-specific)، وبناء الـ Context للـ Foundation Models يعادل Feature Engineering في الـ Classical ML.'
    },
    {
      q: 'ليه المؤلفة شايفة إن زيادة الـ Context Length مش هتقضي على الـ RAG؟',
      a: 'لسببين: (1) البيانات دايماً بتكبر أسرع من أي Context Window (قانون باركنسون للـ Context)، (2) طول السياق بيخلي الموديل يتشتت أحياناً، وكل Token زيادة بيزود الـ Cost والـ Latency.'
    },
    {
      q: 'إيه هي وظيفتا الـ Retriever الأساسية في معمارية الـ RAG؟',
      a: '(1) Indexing: تجهيز وتنظيم البيانات لسرعة الاسترجاع لاحقاً، (2) Querying: إرسال الـ Query وقت التشغيل لاسترجاع البيانات المرتبطة بيه.'
    },
    {
      q: 'إمتى Anthropic اقترحت الاستغناء عن الـ RAG في نماذج Claude؟',
      a: 'لو الـ Knowledge Base أصغر من 200,000 tokens (حوالي 500 صفحة) — وقتها تقدر تحطها كلها مباشرة في الـ Prompt.'
    }
  ]"
/>

<BatchCheck id="ch06-b1" label="الدفعة 1 (ص 253–257): مقدمة الفصل وRAG Architecture" />

---

## الدفعة 2: خوارزميات الاسترجاع — Term-Based مقابل Embedding-Based (`ص 258–261`) {#batch-2}

### صفحة 258 — تصنيف Sparse vs Dense ولماذا اختار الكتاب تصنيفاً أدق؟ + بداية Term-Based Retrieval

#### 1) صندوق مهم: `Sparse Versus Dense Retrieval`
في الأبحاث والمقالات، غالباً هتشوف خوارزميات الاسترجاع بتتقسم إلى: **Sparse** مقابل **Dense**. لكن الكاتبة في الكتاب ده فضّلت تقسيم مختلف وأدق: **`Term-based` مقابل `Embedding-based`**. ليه؟

- **Sparse Retrievers (المتجهات المتناثرة):**
  - بتمثّل البيانات بـ **Sparse Vectors** — يعني متجه أغلب قيمه أصفار (`0`).
  - الـ **Term-Based Retrieval** بيُعتبر Sparse لأن كل كلمة ممكن تتمثل بـ **Sparse One-Hot Vector**: متجه كله أصفار ما عدا خانة واحدة فيها `1`، وطول المتجه يساوي عدد كلمات القاموس (`Vocabulary`)، ومكان الـ `1` هو ترتيب الكلمة في القاموس.
  - **مثال:** لو القاموس فيه 3 كلمات بس `{"food": 0, "banana": 1, "slug": 2}`، هتكون متجهات الـ One-Hot هي:
    - `"food"` ← `[1, 0, 0]`
    - `"banana"` ← `[0, 1, 0]`
    - `"slug"` ← `[0, 0, 1]`

- **Dense Retrievers (المتجهات الكثيفة):**
  - بتمثّل البيانات بـ **Dense Vectors** — يعني متجه أغلب قيمه مش أصفار (`non-zero`).
  - الـ **Embedding-Based Retrieval** غالباً بيُعتبر Dense لأن الـ Embeddings في العادة Dense Vectors.
  - **لكن فيه استثناء مهم جداً: Sparse Embeddings!**
    - مثال عليه خوارزمية **SPLADE (Sparse Lexical and Expansion)** (Formal et al., 2021): دي بتستخدم Embeddings متولدة من موديل **BERT**، لكنها بتستخدم **Regularization** يزق معظم قيم المتجه ناحية الصفر علشان العمليات الحسابية تكون أسرع وأكفأ.
  - **ليه تصنيف `Sparse vs Dense` بيعمل لخبطة؟**
    - لو قسمت الدنيا `Sparse vs Dense`، هتلاقي **SPLADE** اتحط بالغلط في نفس خانة الـ Term-based، مع إن طريقة شغله ونقط قوته وضعفه شبه الـ **Dense Embedding Retrieval** بكتير! لذلك تقسيم **`Term-based vs Embedding-based`** بيمنع الخلط ده.

```mermaid
flowchart LR
    CAT["تصنيف خوارزميات الاسترجاع"] --> TB["Term-Based (Lexical)<br/>TF-IDF, BM25<br/>Always Sparse"]
    CAT --> EB["Embedding-Based (Semantic)"]
    EB --> DE["Dense Embeddings<br/>(Standard Vector Search)"]
    EB --> SE["Sparse Embeddings<br/>مثل SPLADE (BERT + Regularization)"]
```

#### 2) بداية `Term-Based Retrieval` (الاسترجاع المبني على الكلمات / `Lexical Retrieval`)
أبسط طريقة علشان تلاقي مستندات مناسبة لـ Query هي إنك تدور على الكلمات المفتاحية (**Keywords**). مثلاً لو الـ Query هو `"AI engineering"`، النظام هيجيب كل المستندات اللي فيها عبارة `"AI engineering"`.
بس الطريقة البسيطة دي فيها **مشكلتين أساسيتين**:
1. **مشكلة العدد وحدود الـ Context:** ممكن مستندات كتير جداً تحتوي الكلمة، والـ Context Window متكفيش تحطهم كلهم.
   - الحل التقديري (**Heuristic**): اختار المستندات اللي الكلمة اتكررت فيها أكتر عدد من المرات، على افتراض إن تكرار الكلمة يعني صلة أقوى. عدد مرات ظهور الكلمة في المستند اسمه **Term Frequency (TF)**.
2. **مش كل الكلمات ليها نفس الأهمية:** الـ Prompt ممكن يكون طويل وفيه كلمات مهمة وكلمات حشو.
   - **مثال الكتاب:** الـ Query `"Easy-to-follow recipes for Vietnamese food to cook at home"` فيه 9 كلمات (`easy-to-follow`, `recipes`, `for`, `vietnamese`, `food`, `to`, `cook`, `at`, `home`). الطبيعي إنك عايز تركز على كلمات غنية بالمعنى زي `vietnamese` و`recipes` مش كلمات زي `for` و`at`! إذن محتاجين طريقة تميز الكلمات المهمة.

---

### صفحة 259 — مقياس `IDF`، معادلة `TF-IDF`، الـ `Inverted Index`، وبداية `BM25`

#### 1) فكرة `IDF (Inverse Document Frequency)`
البديهة بتقول: كل ما الكلمة تظهر في مستندات أكتر، كل ما قيمتها التمييزية تقل (**Less Informative**). كلمات زي `"for"` و`"at"` غالباً موجودة في معظم المستندات، فملهاش وزن تمييزي.
إذن أهمية الكلمة تتناسب **عكسياً** مع عدد المستندات اللي ظهرت فيها، وده مقياس **IDF**:
- تعدّ المستندات اللي فيها الكلمة، وتقسم إجمالي عدد المستندات على العدد ده.
- **مثال:** لو عندنا `10` مستندات، وفيه `5` منهم فيهم الكلمة، تبقى النسبة `10 / 5 = 2`. كل ما الـ IDF يكبر، الكلمة تكون أندر وأهم.

#### 2) خوارزمية `TF-IDF` ومعادلتها الرياضية
خوارزمية **TF-IDF** بتدمج المقياسين مع بعض (`TF × IDF`). لو عندنا Query فيه الكلمات $t_1, t_2, \dots, t_q$ ومستند $D$:
- تكرار الكلمة $t$ في المستند $D$ نرمز له بـ `f(t, D)`.
- إجمالي عدد المستندات `N`، وعدد المستندات التي تحتوي الكلمة `t` هو `C(t)`.
- قيمة الـ IDF تُحسب باللوغاريتم:
  `IDF(t) = log( N / C(t) )`
- وتقدير صلة المستند `D` بالـ Query `Q` (بشكل مبسط) هو مجموع حاصل ضرب الـ IDF في الـ TF لكل كلمات الـ Query:
  `Score(D, Q) = Σ [ IDF(tᵢ) × f(tᵢ, D) ]` (لكل `i` من `1` إلى `q`)

#### 3) الحلول الشائعة والـ `Inverted Index` (مثل `Table 6-1`)
من أشهر أدوات الـ Term-based Retrieval: **Elasticsearch** و**BM25**.
- **Elasticsearch** (Shay Banon, 2010) مبني فوق **Lucene**، وبيستخدم هيكل بيانات اسمه **Inverted Index (الفهرس المعكوس)**.
- الفكرة: بدل ما تدخل جوه كل مستند تدور على الكلمات، بتعمل قاموس (`Dictionary`) يربط كل كلمة (`Term`) بقائمة المستندات اللي بتحتويها، ومعاها بيانات إضافية زي `Document Count` و`Term Frequency` علشان حساب `TF-IDF` يتم في لحظة.

**جدول توضيحي لفكرة الـ Inverted Index (مكافئ لـ Table 6-1):**

| الكلمة (`Term`) | عدد المستندات (`Document count`) | قائمة `(رقم المستند, التكرار TF)` |
| :--- | :--- | :--- |
| `banana` | `2` | `(10, 3), (5, 2)` |
| `machine` | `4` | `(1, 5), (10, 1), (38, 9), (42, 5)` |
| `learning` | `3` | `(1, 5), (38, 7), (42, 5)` |

#### 4) بداية `Okapi BM25`
**Okapi BM25** (الجيل الـ 25 من خوارزمية *Best Matching*، طورها Robertson وآخرون في التمانينات) هي تطوير مباشر لـ `TF-IDF`.
الفرق الجوهري الأول: مقارنة بـ `TF-IDF` الساذجة، **BM25** بتعمل **Normalize** لقيم تكرار الكلمات (`Term Frequency`) بناءً على **طول المستند (`Document Length`)**...

---

### صفحة 260 — تكملة `BM25`، الـ `Tokenization`، والانتقال إلى `Embedding-Based Retrieval`

#### 1) لماذا التطبيع بطول المستند في `BM25`؟ ومكانتها في الصناعة
المستندات الأطول طبيعي احتمال وجود الكلمة فيها وتكرارها يكون أعلى من المستندات القصيرة، مش لأنها أدق، لكن لمجرد إنها أطول؛ وده اللي بتعالجه **BM25** بذكاء.
- **معلومة هامشية (Footnote 6):** للّي حابب يتعمق في رياضيات BM25، الكاتبة بترشح ورقة مؤلفيها: *"The Probabilistic Relevance Framework: BM25 and Beyond"* (Robertson and Zaragoza, 2009).
- نسخ BM25 المطورة زي **`BM25+`** و**`BM25F`** لسه مستخدمة على نطاق واسع في الإنتاج، وبتعتبر **Baseline** قوي جداً لما تقارن بيه أي خوارزمية أحدث زي الـ Embedding-based Retrieval.
- **معلومة هامشية (Footnote 7):** حتى **Aravind Srinivas** (الرئيس التنفيذي لـ Perplexity) غرّد قبل كده وقال: *"تحقيق تحسن حقيقي يتفوق على BM25 أو الـ full-text search أمر صعب."*

#### 2) عملية الـ `Tokenization` والتنظيف (`Preprocessing`)
عملية تقطيع الـ Query لكلمات/مصطلحات منفصلة اسمها **Tokenization**.
- **فخ التقطيع كلمة بكلمة:** لو قطعت كل كلمة لوحدها، المصطلحات المركبة بتتكسر وتفقد معناها؛ مثلاً `"hot dog"` لو اتقطعت لـ `"hot"` و`"dog"` كل كلمة لوحدها مبقتش تعبر عن الأكلة!
- **الحل:** التعامل مع الـ **n-grams** الشائعة كـ Term واحد (مثلاً لو الـ Bigram `"hot dog"` شائع، يتفهرس كوحدة واحدة).
- خطوات إضافية شائعة (غالباً أدوات الـ Term-based بتعملها أوتوماتيك):
  1. تحويل الحروف لـ `Lowercase`.
  2. حذف علامات الترقيم (`Punctuation`).
  3. حذف الكلمات الشائعة غير المؤثرة (**Stop Words**) زي `"the"`, `"and"`, `"is"`.
  - مكتبات NLP الكلاسيكية زي **NLTK** و**spaCy** و**Stanford CoreNLP** بتوفر أدوات جاهزة للـ Tokenization ده.

#### 3) سؤال: هل ينفع الاسترجاع بـ `n-gram overlap`؟ (ربط مع Ch. 4)
Chapter 4 بيناقش قياس التشابه اللفظي بين نصين عن طريق تداخل الـ `n-grams`. ينفع نستخدمه في الاسترجاع، **لكن بشرط:**
- يشتغل كويس لما يكون **طول الـ Query قريب من طول المستند**.
- لو المستندات أطول بكتير من الـ Query، احتمال إنها تحتوي n-grams من الـ Query هيرتفع جداً، فتلاقي مستندات كتير واخدة Scores عالية متقاربة، وتفقد القدرة على التمييز بين المستند المهم فعلاً والمستند الأقل صلة!

#### 4) بداية `Embedding-Based Retrieval` (`Semantic Retrieval`)
مشكلة الـ Term-based Retrieval الجوهرية إنه بيحسب الصلة على **المستوى اللفظي (`Lexical Level`)** مش على **مستوى المعنى (`Semantic Level`)** (وزي ما اتشرح في Ch. 3، شكل النص لوحده ما بيعكسش دايماً معناه).
- **مثال صارخ:** لو بحثت عن `"transformer architecture"` في نظام لفظي، ممكن يرجعلك مقالات عن المحولات الكهربائية (`Electric Device`) أو سلسلة أفلام *Transformers*!
- على العكس، الـ **Embedding-Based Retrievers** (أو **Semantic Retrieval**) بترتب المستندات حسب **مدى تقارب المعنى** مع الـ Query.

---

### صفحة 261 — كيف يشتغل الـ `Embedding-Based Retriever` عملياً؟ (`Figure 6-3`)

في الـ **Embedding-Based Retrieval**، مرحلة الفهرسة (**Indexing**) بتاخد وظيفة إضافية: بعد تقسيم المستندات لـ Chunks (`Splitter`)، بنحوّل كل Chunk لـ **Embedding** ونخزن المتجهات الناتجة في **Vector Database (`VectorDB`)**.

أما وقت التشغيل (**Querying**)، فالعملية بتمشي في خطوتين أساسيتين للـ Retrieval، وبعدهم خطوة التوليد (كما في مخطط `Figure 6-3` بالكتاب):
1. **Embedding Model:** تحويل الـ Query بتاع المستخدم إلى Embedding **باستخدام نفس الـ Embedding Model** اللي استخدمناه وقت الـ Indexing (نقطة حاسمة علشان المتجهات تكون في نفس الفضاء الدلالي).
2. **Retriever:** يسحب أقرب **`k` data chunks** متجهاتها قريبة من الـ Query Embedding في الـ VectorDB. *(عدد الـ `k` اللي هتسحبه بيعتمد على طبيعة التطبيق، الـ Generative Model، والـ Query نفسه).*
3. **Generative Model:** يستقبل الـ Query مع الـ `k` chunks المسترجعة كـ Context ويولّد الإجابة النهائية.

```mermaid
flowchart TB
    subgraph Indexing["1. Indexing (Offline / Prep)"]
        EM[("External Memory<br/>Docs, tables, chat history")] --> SP["Splitter (Chunking)"]
        SP --> EMB1["Embedding Model"]
        EMB1 --> VDB[("VectorDB<br/>External Data Embeddings")]
    end

    subgraph Querying["2. Querying & Generation (Runtime)"]
        U(("User")) -->|"Query"| EMB2["Embedding Model<br/>(Same Model)"]
        U -->|"Query"| GEN["Generative Model"]
        EMB2 -->|"Query Embedding"| RET["Retriever (Top-k)"]
        VDB --> RET
        RET -->|"Relevant Context (k chunks)"| GEN
        GEN -->|"Response"| U
    end
```

> **ملاحظة إنتاجية ومقارنة بالـ Recommender Systems (Footnote 8):**
> التدفق اللي فوق ده مبسط؛ في أنظمة الإنتاج الحقيقية، الـ Semantic Retrieval غالباً بيزود مكونات تانية زي **Reranker** لإعادة ترتيب النتائج المرشحة بدقة أعلى، و**Caches** لتقليل الـ **Latency**. والكاتبة بتلفت الانتباه في الهامش إن خطوات الاسترجاع في الـ RAG شبه جداً خطوات أنظمة التوصية التقليدية (**Traditional Recommender Systems**).

#### تذكير حاسم عن الـ Embeddings (من Ch. 3)
الـ **Embedding** هو متجه رقمي بيهدف للحفاظ على الخصائص والمعاني المهمة للبيانات الأصلية. والقاعدة الذهبية هنا: **لو الـ Embedding Model ضعيف أو مش مناسب لمجالك، الـ Embedding-Based Retriever كله مش هيشتغل كويس** مهما حسّنت باقي المكونات.

<QuickFlashcards
  title="مراجعة سريعة — الدفعة 2 (ص 258–261)"
  :cards="[
    {
      q: 'ليه الكتاب اختار تصنيف Term-based vs Embedding-based بدل Sparse vs Dense؟',
      a: 'لأن فيه طرق زي SPLADE بتستخدم Sparse Embeddings (من BERT مع Regularization)، فالتصنيف القديم بيحطها بالغلط مع الـ Term-based رغم إن سلوكها وقوتها شبه الـ Embedding-based.'
    },
    {
      q: 'إيه الفرق الأساسي بين BM25 و TF-IDF الساذجة؟',
      a: 'BM25 بتعمل Normalize لقيم تكرار الكلمات (TF) بناءً على طول المستند، علشان المستندات الطويلة ما تاخدش Score أعلى لمجرد طولها.'
    },
    {
      q: 'إيه مشكلة تقطيع النص كلمة بكلمة في الـ Tokenization وإزاي بنعالجها؟',
      a: 'المصطلحات المركبة زي hot dog بتتفكك لكلمات تفقد معناها الأصلي؛ والحل هو معاملة الـ n-grams الشائعة كـ Term واحد مع إزالة Stop words وعلامات الترقيم وتوحيد حالة الحروف.'
    },
    {
      q: 'إيه الشرط الأساسي وقت تحويل الـ Query لـ Embedding في الـ Semantic Retrieval؟',
      a: 'لازم تستخدم نفس الـ Embedding Model اللي اتعمل بيه الـ Indexing علشان الـ Query والـ Chunks يكونوا في نفس الـ Vector Space.'
    }
  ]"
/>

<BatchCheck id="ch06-b2" label="الدفعة 2 (ص 258–261): Term-Based (TF-IDF, BM25) vs Embedding Retrieval" />
