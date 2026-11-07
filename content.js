/* Bilingual labels and authored sample data for a software engineering group project.
   All AI text and term meanings are static prototype fixtures; no model is called. */

window.UI = {
  en: {
    project: "Campus Task Manager",
    course: "Software Engineering · Group project",
    meaningHint: "Underlined Arabic terms may have more than one meaning. Click a term to explore.",
    meaningWarning: "These recommendations are AI generated.",
    meaningTitle: "Possible meanings", meaningIntro: "The intended meaning depends on the context.",
    meaningFooter: "Confirm the intended meaning with your teammate.",
    closeMeanings: "Close meanings", meaningAction: "Explore possible meanings of",

    draft: "Draft", shared: "Shared", readOnly: "Read-only",
    contributor: "Contributor", receiver: "Receiver",
    langLabel: "Language", roleLabel: "Role",
    nav: { overview: "Project Overview", handover: "Handover", decisions: "Decisions & Evidence", files: "Files & Versions", questions: "Questions & Clarifications", review: "Review & Share" },
    // Project Overview
    projectSummary: "Project summary", aiProjectSummary: "AI project summary", taskProgress: "Task progress", projectTeam: "Project team", complete: "Complete", verified: "Verified",
    taskTable: "Task table", colTask: "Task", colOwner: "Owner", colProgress: "Progress", colVerification: "Verification", colFile: "File / v.",
    needsAttention: "Needs attention", unverifiedTask: "Unverified task", blocker: "Blocker",
    nextSteps: "Next steps", checkEvidence: "Check evidence", resumePending: "Resume pending work",
    // statuses
    st: { complete: "Complete", pending: "Pending", blocked: "Blocked", verified: "Verified", needsReview: "Needs review", unverified: "Unverified", disputed: "Disputed", noEvidence: "No evidence", current: "Current", earlier: "Earlier" },
    // Decisions
    decisions: "Decisions", rationale: "Rationale", verificationStatus: "Verification status", evidence: "Evidence", sourceVersion: "Source / version", sourceOwner: "Source owner", sourceDate: "Source date", sourceExcerpt: "Source excerpt",
    uncertaintyDetails: "Uncertainty details", informationType: "Information type", reason: "Why this is uncertain", impact: "Potential impact", resolution: "How to resolve", verificationRecord: "Verification record", conflictingViews: "Conflicting views",
    // Files
    fileList: "File list", fileDetails: "File details", currentVersion: "Current version", versionHistory: "Version history", comparison: "Comparison",
    aiChangeSummary: "AI change summary", addToHandoff: "Add to handoff", addedToHandoff: "Added to handoff", changeSummaryAdded: "AI change summary added to the handoff",
    // Questions
    questionList: "Question list", discussionThread: "Discussion thread", reply: "Reply", writeReply: "Write a reply", send: "Send",
    restrictedAccess: "Restricted access", credentialsExcluded: "Login credentials are not included in the handover.", requestAccess: "Request authorized access", accessRequestSent: "Access request sent",
    // Handover
    editorTitle: "Handover Editor", readerTitle: "Handover Reader",
    sections: "Sections", editableContent: "Editable content", references: "References", fileVersion: "File / version", evidenceLink: "Evidence link",
    aiSuggestion: "AI suggestion", aiGenerated: "AI-generated", insert: "Insert", dismiss: "Dismiss", clarify: "Clarify", basedOn: "Based on",
    save: "Save", reviewBtn: "Review", saved: "Handover saved",
    supportingPassage: "Supporting passage", supportingEvidence: "Supporting evidence", notAttached: "Not attached", inspectSource: "Inspect source", askQuestion: "Ask a question",
    contentLanguage: "Handover content language", originalLanguage: "Original", viewingLanguage: "Viewing", englishLanguage: "English + Arabic", originalEnglish: "Original mixed text", arabicTranslation: "Arabic translation",
    sec: { summary: "Summary", completed: "Completed work", remaining: "Remaining work", issues: "Open issues" },
    readerHeading: { summary: "Project summary", completed: "Completed work", remaining: "Remaining work", issues: "Open issues" },
    // Review
    reviewTitle: "Review & Share", readiness: "Handover readiness", itemsNeedReview: (n) => `${n} ${n === 1 ? "item needs" : "items need"} review`,
    aiReview: "AI review", suggestionToReview: "Suggestion to review", verificationOverview: "Verification overview",
    privacy: "Privacy settings", hidePrivate: "Hide private notes", allowAI: "Allow AI to use restricted files",
    preview: "Preview", share: "Share", sharedToast: "Handover shared with Yumna Salaas",
    tasks1: "1 task", bold: "Bold", italic: "Italic", bullets: "Bulleted list", attach: "Attach reference"
  },
  ar: {
    project: "نظام إدارة مهام الطلاب",
    course: "هندسة البرمجيات · مشروع جماعي",
    meaningHint: "قد تحمل الكلمات العربية المميزة بخط سفلي أكثر من معنى. اضغط على الكلمة لاستكشاف المعاني.",
    meaningWarning: "هذه التوصيات مولّدة بالذكاء الاصطناعي.",
    meaningTitle: "المعاني المحتملة", meaningIntro: "يعتمد المعنى المقصود على السياق.",
    meaningFooter: "تأكد من المعنى المقصود مع زميلتك.",
    closeMeanings: "إغلاق المعاني", meaningAction: "استكشاف المعاني المحتملة لكلمة",

    draft: "مسودة", shared: "تمت المشاركة", readOnly: "للقراءة فقط",
    contributor: "المساهم", receiver: "المستلم",
    langLabel: "اللغة", roleLabel: "الدور",
    nav: { overview: "نظرة عامة على المشروع", handover: "التسليم", decisions: "القرارات والأدلة", files: "الملفات والإصدارات", questions: "الأسئلة والتوضيحات", review: "المراجعة والمشاركة" },
    projectSummary: "ملخص المشروع", aiProjectSummary: "ملخص المشروع بالذكاء الاصطناعي", taskProgress: "تقدّم المهام", projectTeam: "فريق المشروع", complete: "مكتملة", verified: "تم التحقق",
    taskTable: "جدول المهام", colTask: "المهمة", colOwner: "المسؤول", colProgress: "التقدّم", colVerification: "التحقق", colFile: "الملف / الإصدار",
    needsAttention: "يحتاج إلى انتباه", unverifiedTask: "مهمة لم يُتحقق منها", blocker: "عائق",
    nextSteps: "الخطوات التالية", checkEvidence: "مراجعة الأدلة", resumePending: "استئناف العمل المعلّق",
    st: { complete: "مكتملة", pending: "قيد الانتظار", blocked: "متوقفة", verified: "تم التحقق", needsReview: "تحتاج مراجعة", unverified: "لم يُتحقق منها", disputed: "موضع خلاف", noEvidence: "لا يوجد دليل", current: "الحالي", earlier: "سابق" },
    decisions: "القرارات", rationale: "المبررات", verificationStatus: "حالة التحقق", evidence: "الأدلة", sourceVersion: "المصدر / الإصدار", sourceOwner: "مالك المصدر", sourceDate: "تاريخ المصدر", sourceExcerpt: "مقتطف من المصدر",
    uncertaintyDetails: "تفاصيل عدم اليقين", informationType: "نوع المعلومة", reason: "سبب عدم اليقين", impact: "التأثير المحتمل", resolution: "كيفية الحل", verificationRecord: "سجل التحقق", conflictingViews: "الآراء المتعارضة",
    fileList: "قائمة الملفات", fileDetails: "تفاصيل الملف", currentVersion: "الإصدار الحالي", versionHistory: "سجل الإصدارات", comparison: "المقارنة",
    aiChangeSummary: "ملخص التغييرات بالذكاء الاصطناعي", addToHandoff: "إضافة إلى التسليم", addedToHandoff: "أُضيف إلى التسليم", changeSummaryAdded: "تمت إضافة ملخص التغييرات إلى التسليم",
    questionList: "قائمة الأسئلة", discussionThread: "سلسلة النقاش", reply: "رد", writeReply: "اكتب ردًا", send: "إرسال",
    restrictedAccess: "وصول مقيّد", credentialsExcluded: "بيانات تسجيل الدخول غير مضمنة في التسليم.", requestAccess: "طلب وصول مصرح به", accessRequestSent: "تم إرسال طلب الوصول",
    editorTitle: "محرر التسليم", readerTitle: "عارض التسليم",
    sections: "الأقسام", editableContent: "المحتوى القابل للتحرير", references: "المراجع", fileVersion: "الملف / الإصدار", evidenceLink: "رابط الدليل",
    aiSuggestion: "اقتراح الذكاء الاصطناعي", aiGenerated: "مُنشأ بالذكاء الاصطناعي", insert: "إدراج", dismiss: "تجاهل", clarify: "طلب توضيح", basedOn: "استنادًا إلى",
    save: "حفظ", reviewBtn: "مراجعة", saved: "تم حفظ التسليم",
    supportingPassage: "المقطع الداعم", supportingEvidence: "الدليل الداعم", notAttached: "غير مرفق", inspectSource: "فحص المصدر", askQuestion: "اطرح سؤالًا",
    contentLanguage: "لغة محتوى التسليم", originalLanguage: "الأصل", viewingLanguage: "العرض", englishLanguage: "الإنجليزية والعربية", originalEnglish: "النص المختلط الأصلي", arabicTranslation: "ترجمة عربية",
    sec: { summary: "الملخص", completed: "العمل المنجز", remaining: "العمل المتبقي", issues: "المشكلات المفتوحة" },
    readerHeading: { summary: "ملخص المشروع", completed: "العمل المنجز", remaining: "العمل المتبقي", issues: "المشكلات المفتوحة" },
    reviewTitle: "المراجعة والمشاركة", readiness: "جاهزية التسليم", itemsNeedReview: (n) => n === 1 ? "عنصر واحد يحتاج إلى مراجعة" : n === 2 ? "عنصران يحتاجان إلى مراجعة" : `${n} عناصر تحتاج إلى مراجعة`,
    aiReview: "مراجعة الذكاء الاصطناعي", suggestionToReview: "اقتراح للمراجعة", verificationOverview: "نظرة عامة على التحقق",
    privacy: "إعدادات الخصوصية", hidePrivate: "إخفاء الملاحظات الخاصة", allowAI: "السماح للذكاء الاصطناعي باستخدام الملفات المقيّدة",
    preview: "معاينة", share: "مشاركة", sharedToast: "تمت مشاركة التسليم مع يمنى سلاس",
    tasks1: "مهمة واحدة", bold: "غامق", italic: "مائل", bullets: "قائمة نقطية", attach: "إرفاق مرجع"
  }
};

/* Only explicitly marked occurrences ([[model]], [[interface]], [[approval]])
   become clickable. Ordinary Arabic text is never automatically flagged. */
window.DATA = {
  people: {
    sima: { en: "Sima Sabouni", ar: "سيما صابوني", initials: "SS", cls: "av-sima" },
    yumna: { en: "Yumna Salaas", ar: "يمنى سلاس", initials: "YS", cls: "av-yumna" }
  },
  meanings: {
    model: {
      word: "نموذج",
      options: [
        { title: { en: "Prototype", ar: "نموذج أولي" }, description: { en: "An early version used to demonstrate the task manager before implementation.", ar: "نسخة أولية لتوضيح نظام إدارة المهام قبل تنفيذه." } },
        { title: { en: "Data model", ar: "نموذج بيانات" }, description: { en: "A representation of tasks, students, and the relationships between them.", ar: "تمثيل للمهام والطلاب والعلاقات بينهم." } },
        { title: { en: "Form or template", ar: "استمارة أو قالب" }, description: { en: "A structured form to fill in, such as the task creation form.", ar: "استمارة منظمة لتعبئة المعلومات، مثل استمارة إنشاء مهمة." } }
      ]
    },
    interface: {
      word: "واجهة",
      options: [
        { title: { en: "User interface", ar: "واجهة مستخدم" }, description: { en: "The screens and controls students interact with in the task manager.", ar: "الشاشات وعناصر التحكم التي يتفاعل معها الطلاب في نظام إدارة المهام." } },
        { title: { en: "API / software interface", ar: "واجهة برمجية" }, description: { en: "The contract that lets the frontend request or update task data.", ar: "العقد الذي يتيح للواجهة الأمامية طلب بيانات المهام أو تحديثها." } },
        { title: { en: "Frontend", ar: "الجزء الأمامي من التطبيق" }, description: { en: "The client-side implementation, including screen logic and interactions.", ar: "تنفيذ جانب العميل، بما فيه منطق الشاشات والتفاعلات." } }
      ]
    },
    approval: {
      word: "اعتماد",
      options: [
        { title: { en: "Approval / sign-off", ar: "موافقة أو إقرار" }, description: { en: "Formal acceptance of the project scope or a deliverable.", ar: "الموافقة الرسمية على نطاق المشروع أو أحد مخرجاته." } },
        { title: { en: "Dependency / reliance", ar: "اعتماد على شيء آخر" }, description: { en: "Work that relies on another task, component, or resource being ready.", ar: "عمل يتوقف على جاهزية مهمة أو مكوّن أو مورد آخر." } },
        { title: { en: "Adoption", ar: "تبنّي أو اختيار" }, description: { en: "Choosing a design or approach for the group project.", ar: "اختيار تصميم أو نهج للعمل به في المشروع الجماعي." } }
      ]
    }
  },
  summary: {
    en: "Sima Sabouni and Yumna Salaas are building Campus Task Manager for their Software Engineering course group project. Requirements are verified and the [[model]] is ready for review; integration testing and final submission are still open.",
    ar: "تعمل سيما صابوني ويمنى سلاس على نظام إدارة مهام الطلاب ضمن مشروع جماعي لمقرر هندسة البرمجيات. تم التحقق من المتطلبات والنموذج الأولي جاهز للمراجعة، بينما لا يزال اختبار التكامل والتسليم النهائي قيد الانتظار."
  },
  tasks: [
    { name: { en: "Requirements specification", ar: "توصيف المتطلبات" }, owner: "sima", progress: "complete", verification: "verified", file: "requirements.xlsx / v2" },
    { name: { en: "Task board prototype", ar: "النموذج الأولي للوحة المهام" }, owner: "yumna", progress: "complete", verification: "needsReview", file: "prototype-notes.docx / v1" },
    { name: { en: "Integration testing", ar: "اختبار التكامل" }, owner: "yumna", progress: "pending", verification: "unverified", file: "-" },
    { name: { en: "Final course submission", ar: "التسليم النهائي للمقرر" }, owner: "sima", progress: "blocked", verification: "unverified", file: "-" }
  ],
  decisions: [
    { title: { en: "Use a shared task board", ar: "استخدام لوحة مهام مشتركة" },
      rationale: { en: "A shared board lets students assign tasks, track progress, and see upcoming deadlines. Review the [[interface]] before integration testing begins.", ar: "تتيح اللوحة المشتركة للطلاب إسناد المهام ومتابعة التقدم ومواعيد التسليم. يجب مراجعة واجهة المستخدم قبل بدء اختبار التكامل." },
      status: "needsReview", source: "prototype-notes.docx / v1", sourceOwner: "yumna", sourceDate: { en: "30 Oct", ar: "30 أكتوبر" },
      uncertainty: {
        type: { en: "Design proposal", ar: "اقتراح تصميم" },
        reason: { en: "Sima has not yet reviewed the task creation and assignment flows against the requirements.", ar: "لم تراجع سيما بعد مساري إنشاء المهام وإسنادها وفقًا للمتطلبات." },
        impact: { en: "Missing interactions could cause integration failures or an incomplete course demo.", ar: "قد تؤدي التفاعلات الناقصة إلى فشل التكامل أو عرض غير مكتمل للمشروع." },
        resolution: { en: "Sima and Yumna should walk through the prototype together and record the review in the prototype notes.", ar: "ينبغي لسيما ويمنى تجربة النموذج الأولي معًا وتوثيق المراجعة في ملاحظاته." },
        verification: { en: "Review assigned to Sima Sabouni; method: walkthrough against the requirements checklist.", ar: "أُسندت المراجعة إلى سيما صابوني؛ الأسلوب: تجربة المسارات وفق قائمة المتطلبات." }
      },
      excerpt: { en: "Create task → assign teammate → update status.\nPrototype review: pending.", ar: "إنشاء مهمة ← إسنادها لزميلة ← تحديث الحالة.\nمراجعة النموذج الأولي: قيد الانتظار." } },
    { title: { en: "Keep the first version focused", ar: "تحديد نطاق الإصدار الأول" },
      rationale: { en: "The course project covers 12 requirements for task creation, assignment, and progress tracking. Notifications are reserved for a later version.", ar: "يغطي مشروع المقرر 12 متطلبًا لإنشاء المهام وإسنادها ومتابعة تقدمها. أُجّلت الإشعارات إلى إصدار لاحق." },
      status: "verified", source: "requirements.xlsx / v2", sourceOwner: "sima", sourceDate: { en: "3 Nov", ar: "3 نوفمبر" },
      uncertainty: {
        type: { en: "Verified requirements", ar: "متطلبات تم التحقق منها" },
        reason: { en: "Yumna reviewed all 12 requirements against the course brief.", ar: "راجعت يمنى المتطلبات الـ12 وفق وصف مشروع المقرر." },
        impact: { en: "The agreed scope guides implementation and the integration test checklist.", ar: "يوجّه النطاق المتفق عليه التنفيذ وقائمة اختبارات التكامل." },
        resolution: { en: "Revisit only if the course requirements change.", ar: "تُعاد المراجعة فقط إذا تغيرت متطلبات المقرر." },
        verification: { en: "Verified by Yumna Salaas in a checklist review on 3 Nov.", ar: "تحققت يمنى سلاس من المتطلبات باستخدام قائمة مراجعة في 3 نوفمبر." }
      },
      excerpt: { en: "In-scope requirements: 12\nReviewer: Yumna Salaas\nNotifications: future version", ar: "المتطلبات ضمن النطاق: 12\nالمراجعة: يمنى سلاس\nالإشعارات: إصدار لاحق" } },
    { title: { en: "Freeze features before the demo", ar: "إيقاف إضافة الميزات قبل العرض" },
      rationale: { en: "A feature freeze leaves time to test the group project and prepare the course demo. The freeze period still needs agreement.", ar: "يتيح إيقاف إضافة الميزات وقتًا لاختبار المشروع الجماعي والتحضير لعرض المقرر. لم يُتفق على مدة الإيقاف بعد." },
      status: "disputed", source: "submission-plan.docx / v1", sourceOwner: "sima", sourceDate: { en: "4 Nov", ar: "4 نوفمبر" },
      uncertainty: {
        type: { en: "Planning assumption", ar: "افتراض تخطيطي" },
        reason: { en: "Sima proposes three days for testing; Yumna proposes two days to allow more implementation time.", ar: "تقترح سيما ثلاثة أيام للاختبار؛ وتقترح يمنى يومين لإتاحة وقت أطول للتنفيذ." },
        impact: { en: "An unresolved freeze date may leave too little time for testing and the final report.", ar: "قد يؤدي عدم حسم موعد الإيقاف إلى نقص الوقت المتاح للاختبار والتقرير النهائي." },
        resolution: { en: "Agree on the freeze period during the next group meeting and update the submission plan.", ar: "الاتفاق على مدة الإيقاف في اجتماع المجموعة القادم وتحديث خطة التسليم." },
        verification: { en: "Not verified; Sima and Yumna have not recorded a shared decision.", ar: "لم يتم التحقق؛ لم تسجل سيما ويمنى قرارًا مشتركًا بعد." },
        conflicts: [
          { en: "Sima Sabouni: freeze features three days before the demo.", ar: "سيما صابوني: إيقاف إضافة الميزات قبل العرض بثلاثة أيام." },
          { en: "Yumna Salaas: two days should be enough for testing.", ar: "يمنى سلاس: يومان يكفيان للاختبار." }
        ]
      },
      excerpt: { en: "Proposed feature freeze: 3 days before the demo.\nFinal submission: blocked pending test evidence and the agreed freeze period.", ar: "المدة المقترحة لإيقاف إضافة الميزات: 3 أيام قبل العرض.\nالتسليم النهائي: متوقف حتى إرفاق أدلة الاختبار والاتفاق على مدة الإيقاف." } }
  ],
  files: [
    { name: "requirements.xlsx", icon: "document_table_20_regular", current: "v2",
      meta: { en: "Updated 3 Nov by Sima Sabouni", ar: "حُدّث في 3 نوفمبر بواسطة سيما صابوني" },
      versions: [ { v: "v2", st: "current" }, { v: "v1", st: "earlier" } ],
      compare: {
        v1: [ { en: "Requirements documented: 9", ar: "المتطلبات الموثقة: 9" }, { en: "Acceptance criteria: 6", ar: "معايير القبول: 6" }, { en: "Reviewer: none", ar: "المراجعة: لا توجد" } ],
        v2: [ { en: "Requirements documented: 12", ar: "المتطلبات الموثقة: 12", changed: true }, { en: "Acceptance criteria: 12", ar: "معايير القبول: 12", changed: true }, { en: "Reviewer: Yumna Salaas", ar: "المراجعة: يمنى سلاس", changed: true } ] },
      aiComparison: {
        bullets: [
          { en: "Documented requirements increased from 9 to 12 (+3).", ar: "ارتفع عدد المتطلبات الموثقة من 9 إلى 12 (+3)." },
          { en: "Acceptance criteria increased from 6 to 12 (+6).", ar: "ارتفع عدد معايير القبول من 6 إلى 12 (+6)." },
          { en: "Yumna Salaas was added as the reviewer.", ar: "أُضيفت يمنى سلاس بصفتها المراجعة." }
        ],
        insertText: { en: "Since requirements.xlsx v1, three requirements and six acceptance criteria were added, and Yumna Salaas reviewed the specification. Recheck the [[model]] against this updated scope.", ar: "منذ الإصدار v1 من requirements.xlsx، أُضيفت ثلاثة متطلبات وستة معايير قبول، وراجعت يمنى سلاس التوصيف. يجب إعادة فحص النموذج الأولي وفق هذا النطاق المحدّث." },
        clarificationQuestion: { en: "Which three requirements were added in v2?", ar: "ما المتطلبات الثلاثة التي أُضيفت في الإصدار v2؟" },
        clarificationContext: { en: "The comparison of requirements.xlsx v1 and v2 shows three additional requirements. Please confirm their impact on the prototype and tests.", ar: "تُظهر مقارنة الإصدارين v1 وv2 من requirements.xlsx إضافة ثلاثة متطلبات. يرجى تأكيد أثرها على النموذج الأولي والاختبارات." }
      } },
    { name: "prototype-notes.docx", icon: "document_text_20_regular", current: "v1",
      meta: { en: "Created 30 Oct by Yumna Salaas", ar: "أُنشئ في 30 أكتوبر بواسطة يمنى سلاس" },
      versions: [ { v: "v1", st: "current" } ], compare: null },
    { name: "submission-plan.docx", icon: "document_20_regular", current: "v1",
      meta: { en: "Updated 4 Nov by Sima Sabouni", ar: "حُدّث في 4 نوفمبر بواسطة سيما صابوني" },
      versions: [ { v: "v1", st: "current" } ], compare: null }
  ],
  questions: [
    { q: { en: "What is blocking the final submission?", ar: "ما الذي يعوق التسليم النهائي؟" }, from: "yumna",
      body: { en: "The handover says we still need [[approval]] before submission. Does that mean a sign-off, or a dependency on unfinished work?", ar: "تذكر ملاحظات التسليم أننا نحتاج إلى اعتماد قبل التسليم النهائي. هل المقصود الموافقة أم الاعتماد على عمل لم يكتمل؟" },
      replies: [ { from: "sima", text: { en: "I mean our joint sign-off after integration tests pass. We also need to agree on the feature freeze period.", ar: "أقصد موافقتنا المشتركة بعد اجتياز اختبارات التكامل. نحتاج أيضًا إلى الاتفاق على مدة إيقاف إضافة الميزات." } } ] },
    { q: { en: "Are notifications part of this version?", ar: "هل الإشعارات ضمن هذا الإصدار؟" }, from: "yumna",
      body: { en: "I will keep notifications out of this version, as requirements.xlsx v2 specifies. Should we mention them as future work in the report?", ar: "سأستبعد الإشعارات من هذا الإصدار وفق requirements.xlsx v2. هل نذكرها كعمل مستقبلي في التقرير؟" }, replies: [] },
    { q: { en: "How do I access the test environment?", ar: "كيف أصل إلى بيئة الاختبار؟" }, from: "yumna", restrictedAccess: true,
      body: { en: "I need access to our shared test environment to continue integration testing.", ar: "أحتاج إلى الوصول إلى بيئة الاختبار المشتركة لمتابعة اختبار التكامل." }, replies: [] }
  ],
  sections: {
    summary: {
      en: ["Sima Sabouni and Yumna Salaas are developing Campus Task Manager as a group project for their Software Engineering course.", "The requirements specification is verified and the [[model]] is ready for review. Sima is handing over the project context to Yumna for integration testing and demo preparation.", "Final submission is blocked until test evidence is attached and we agree on the feature freeze period."],
      ar: ["تطوّر سيما صابوني ويمنى سلاس نظام إدارة مهام الطلاب كمشروع جماعي لمقرر هندسة البرمجيات.", "تم التحقق من توصيف المتطلبات والنموذج الأولي جاهز للمراجعة. تسلّم سيما سياق المشروع إلى يمنى لمتابعة اختبار التكامل والتحضير للعرض.", "التسليم النهائي متوقف حتى إرفاق أدلة الاختبار والاتفاق على مدة إيقاف إضافة الميزات."] },
    completed: {
      en: ["Sima Sabouni documented all 12 requirements and acceptance criteria; Yumna Salaas verified them against the course brief.", "Yumna completed the task board [[interface]]. Sima still needs to review the creation and assignment flows."],
      ar: ["وثقت سيما صابوني المتطلبات الـ12 ومعايير القبول؛ وتحققت يمنى سلاس منها وفق وصف مشروع المقرر.", "أكملت يمنى واجهة لوحة المهام. لا تزال سيما بحاجة إلى مراجعة مساري الإنشاء والإسناد."] },
    remaining: {
      en: ["Review the [[interface]] together before Yumna starts integration testing.", "Attach the test results, then agree on the feature freeze period and prepare the final report and course demo."],
      ar: ["مراجعة واجهة المستخدم معًا قبل أن تبدأ يمنى اختبار التكامل.", "إرفاق نتائج الاختبارات، ثم الاتفاق على مدة إيقاف إضافة الميزات وإعداد التقرير النهائي وعرض المقرر."] },
    issues: {
      en: ["The final submission still needs [[approval]] after testing. Confirm the intended meaning and record who is responsible.", "Sima proposes a three-day feature freeze; Yumna proposes two days. The group has not agreed yet."],
      ar: ["لا يزال التسليم النهائي بحاجة إلى الموافقة بعد الاختبار. يجب تأكيد المعنى المقصود وتوثيق المسؤولية.", "تقترح سيما إيقاف إضافة الميزات لثلاثة أيام؛ وتقترح يمنى يومين. لم تتفق المجموعة بعد."] }
  },
  refs: {
    summary: { file: "requirements.xlsx / v2", evidence: { en: "Requirements review", ar: "مراجعة المتطلبات" }, passage: { en: "“12 requirements and 12 acceptance criteria documented; reviewer: Yumna Salaas.”", ar: "«توثيق 12 متطلبًا و12 معيار قبول؛ المراجعة: يمنى سلاس.»" } },
    completed: { file: "prototype-notes.docx / v1", evidence: { en: "Task board walkthrough", ar: "تجربة لوحة المهام" }, passage: { en: "“Create task → assign teammate → update status. Prototype review: pending.”", ar: "«إنشاء مهمة ← إسنادها لزميلة ← تحديث الحالة. مراجعة النموذج الأولي: قيد الانتظار.»" } },
    remaining: { file: "prototype-notes.docx / v1", evidence: { en: "Integration test preparation", ar: "التحضير لاختبار التكامل" }, passage: { en: "“Review the task creation and assignment flows before integration testing.”", ar: "«مراجعة مساري إنشاء المهام وإسنادها قبل اختبار التكامل.»" }, unsupported: true },
    issues: { file: "submission-plan.docx / v1", evidence: { en: "Feature freeze discussion", ar: "نقاش إيقاف إضافة الميزات" }, passage: { en: "“Proposed feature freeze: 3 days before the demo. Shared decision: pending.”", ar: "«المدة المقترحة لإيقاف إضافة الميزات: 3 أيام قبل العرض. القرار المشترك: قيد الانتظار.»" } }
  },
  ai: {
    projectInsights: [
      { label: { en: "Recent change", ar: "تغيير حديث" }, text: { en: "requirements.xlsx v2 adds three requirements. Check the [[model]] against the updated scope.", ar: "يضيف الإصدار v2 من requirements.xlsx ثلاثة متطلبات. يجب فحص النموذج الأولي وفق النطاق المحدّث." } },
      { label: { en: "Next handover", ar: "التسليم التالي" }, text: { en: "Sima should review the [[interface]] with Yumna before integration testing begins.", ar: "ينبغي لسيما مراجعة واجهة المستخدم مع يمنى قبل بدء اختبار التكامل." } },
      { label: { en: "Blockers", ar: "العوائق" }, text: { en: "Test evidence and an agreed feature freeze period are still missing. Clarify the [[approval]] needed before submission.", ar: "لا تزال أدلة الاختبار والاتفاق على مدة إيقاف إضافة الميزات غير مكتملين. يجب توضيح الموافقة المطلوبة قبل التسليم." } }
    ],
    projectSummarySources: ["requirements.xlsx / v2", "prototype-notes.docx / v1", "submission-plan.docx / v1"],
    suggestion: { en: "Clarify whether the [[interface]] to review is the task board screen or the API contract before Yumna starts integration testing.", ar: "وضّح ما إذا كانت الواجهة المطلوب مراجعتها هي شاشة لوحة المهام أم عقد الواجهة البرمجية قبل أن تبدأ يمنى اختبار التكامل." },
    insertText: { en: "Before integration testing, Sima and Yumna should confirm which [[interface]] needs review and attach the agreed test checklist.", ar: "قبل اختبار التكامل، ينبغي لسيما ويمنى تأكيد الواجهة المطلوب مراجعتها وإرفاق قائمة الاختبارات المتفق عليها." },
    source: "prototype-notes.docx / v1",
    clarificationQuestion: { en: "Which interface should we review before integration testing?", ar: "ما الواجهة التي يجب مراجعتها قبل اختبار التكامل؟" },
    clarificationContext: { en: "The suggestion refers to the [[interface]]. Please confirm whether this means the task board UI or the API contract, and what evidence should be attached.", ar: "يشير الاقتراح إلى الواجهة. يرجى تأكيد ما إذا كان المقصود واجهة لوحة المهام أم عقد الواجهة البرمجية، وما الأدلة التي ينبغي إرفاقها." },
    review: { en: "Confirm what [[approval]] means in the open issues and agree on the feature freeze period before the final course submission.", ar: "تأكد من معنى الاعتماد في المشكلات المفتوحة واتفقا على مدة إيقاف إضافة الميزات قبل التسليم النهائي للمقرر." }
  }
};
