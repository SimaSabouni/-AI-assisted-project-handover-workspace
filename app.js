/* Handoff prototype: tiny hash router + render functions. No build step. */
(() => {
  const I = window.ICONS, D = window.DATA;
  // Preferences are optional so downloaded file:// previews also work in private mode.
  const readPreference = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
  const writePreference = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Preview only. */ } };
  let meaningTrigger = null;

  const state = {
    lang: readPreference("hf-lang") || "en",
    contentLang: readPreference("hf-content-lang") || readPreference("hf-lang") || "en",
    role: readPreference("hf-role") || "contributor",
    decision: 0, file: 0, question: 0, section: "summary",
    aiDismissed: false, aiInserted: false,
    fileAiDismissed: {}, fileAiAdded: {},
    privacy: { hidePrivate: true, allowAI: false },
    next: [false, false],
    drafts: {}, replies: {}, questionDraft: null, questionTemplate: null, questionContext: null
  };
  const app = document.getElementById("app");
  const ui = () => window.UI[state.lang];
  const L = (o) => (o && typeof o === "object" && !Array.isArray(o) ? o[state.lang] : o);
  const icon = (n, cls = "") => (I[n] || "").replace('class="i"', `class="i ${cls}"`);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Only authored markers become interactive. Escape surrounding text before rendering.
  const plainText = (text) => String(text).replace(/\[\[([a-z]+)\]\]/g,
    (match, key) => D.meanings[key]?.word || match);
  const richText = (text) => esc(text).replace(/\[\[([a-z]+)\]\]/g, (match, key) => {
    const term = D.meanings[key];
    if (!term) return match;
    return `<button type="button" class="ambiguous-term" data-term="${key}" contenteditable="false" lang="ar" dir="rtl" aria-haspopup="dialog" aria-expanded="false" aria-controls="term-meanings" aria-label="${esc(ui().meaningAction)} ${esc(term.word)}">${esc(term.word)}</button>`;
  });
  const meaningHint = () => `<p class="meaning-hint">${icon("local_language_20_regular")}<span>${ui().meaningHint}</span></p>`;

  // Status → Fluent icon. Each state has a different shape, not only a different colour.
  const STATUS = {
    complete:    ["checkmark_circle_16_filled", "st-success"],
    verified:    ["checkmark_starburst_16_filled", "st-success"],
    needsReview: ["warning_16_filled", "st-warning"],
    pending:     ["clock_16_regular", "st-pending"],
    blocked:     ["subtract_circle_16_filled", "st-danger"],
    unverified:  ["circle_hint_16_regular", "st-none"],
    disputed:    ["error_circle_16_filled", "st-danger"],
    noEvidence:  ["warning_16_filled", "st-warning"]
  };
  const status = (k) => `<span class="status ${STATUS[k][1]}">${icon(STATUS[k][0])}${ui().st[k]}</span>`;
  const person = (id) => { const p = D.people[id]; return `<span class="persona"><span class="avatar ${p.cls}" aria-hidden="true">${p.initials}</span>${L(p)}</span>`; };

  /* ---------- Routing ---------- */
  const ROUTES = ["overview", "handover", "decisions", "files", "questions", "review"];
  const route = () => {
    let r = (location.hash.replace("#/", "") || "overview");
    if (!ROUTES.includes(r)) r = "overview";
    if (r === "review" && state.role === "receiver") r = "overview";
    return r;
  };

  /* ---------- Shell ---------- */
  function shell(content, current) {
    const u = ui();
    const navItems = [
      ["overview", "grid_20"], ["handover", "people_swap_20"], ["decisions", "shield_checkmark_20"],
      ["files", "document_copy_20"], ["questions", "chat_help_20"]
    ];
    if (state.role === "contributor") navItems.push(["review", "share_20"]);
    const badge = state.role === "contributor" ? u.draft : u.shared;
    return `
    <header class="hdr">
      <div class="brand">
        <svg class="logo" viewBox="0 0 20 20" aria-hidden="true"><rect x="1" y="1" width="18" height="18" rx="4" fill="#0f6cbd"/><path d="M5.5 10h7m-2.6-3 3 3-3 3" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" ${state.lang === "ar" ? 'transform="matrix(-1 0 0 1 20 0)"' : ""}/></svg>
        Handoff
      </div>
      <span class="divider" aria-hidden="true"></span>
      <span class="project">${u.project}</span>
      <span class="badge">${badge}</span>
      <span class="spacer"></span>
      <div class="toggle" role="group" aria-label="${u.langLabel}">
        <button data-lang="en" aria-pressed="${state.lang === "en"}" lang="en">EN</button>
        <button data-lang="ar" aria-pressed="${state.lang === "ar"}" lang="ar">عربي</button>
      </div>
      <div class="toggle role-toggle" role="group" aria-label="${u.roleLabel}">
        <button data-role="contributor" aria-pressed="${state.role === "contributor"}">${L(D.people.sima)} · ${u.contributor}</button>
        <button data-role="receiver" aria-pressed="${state.role === "receiver"}">${L(D.people.yumna)} · ${u.receiver}</button>
      </div>
    </header>
    <nav class="nav" aria-label="Main">
      ${navItems.map(([r, ic]) => {
        const on = r === current;
        return `<a href="#/${r}" ${on ? 'aria-current="page"' : ""}>${icon(ic + (on ? "_filled" : "_regular"))}${u.nav[r]}</a>`;
      }).join("")}
    </nav>
    <main class="page" id="page">${content}</main>
    <aside class="meaning-popover" id="term-meanings" role="dialog" aria-modal="false" aria-labelledby="meaning-title" aria-describedby="meaning-warning" hidden></aside>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  }

  /* ---------- Screens ---------- */
  const screens = {};

  screens.overview = () => {
    const u = ui(), t = D.tasks;
    const done = t.filter((x) => x.progress === "complete").length;
    const ver = t.filter((x) => x.verification === "verified").length;
    const unv = t.find((x) => x.verification === "needsReview");
    const blk = t.find((x) => x.progress === "blocked");
    const pend = t.find((x) => x.progress === "pending");
    return `
    <div class="page-head"><div><h1>${u.nav.overview}</h1><p class="course-label">${u.course}</p></div></div>
    <div class="g-overview">
      <section class="card span">
        <h2>${u.projectSummary}</h2>
        <p class="body-text">${richText(L(D.summary))}</p>${meaningHint()}
      </section>
      <section class="card span ai-card overview-ai-card">
        <div class="card-title">${u.aiProjectSummary}<span class="badge ai end">${icon("bot_20_regular")}${u.aiGenerated}</span></div>
        <div class="ai-insights">${D.ai.projectInsights.map((insight) => `<div><span>${L(insight.label)}</span><p>${richText(L(insight.text))}</p></div>`).join("")}</div>
        <p class="caption src">${u.basedOn} ${D.ai.projectSummarySources.map((source) => `<button class="link mono" data-openfile="${source.split(" /")[0]}" dir="ltr">${source}</button>`).join(", ")}</p>
      </section>
      <div class="overview-columns span">
        <div class="stack">
          <section class="card overview-progress">
            <h2>${u.taskProgress}</h2>
            <div class="progress-row">
              <div class="progress">
                <div class="lbl"><span>${u.complete}</span><b dir="ltr">${done} / ${t.length}</b></div>
                <div class="bar" role="progressbar" aria-label="${u.complete}" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="${t.length}"><i style="width:${(done / t.length) * 100}%"></i></div>
              </div>
              <div class="progress">
                <div class="lbl"><span>${u.verified}</span><b dir="ltr">${ver} / ${t.length}</b></div>
                <div class="bar success" role="progressbar" aria-label="${u.verified}" aria-valuenow="${ver}" aria-valuemin="0" aria-valuemax="${t.length}"><i style="width:${(ver / t.length) * 100}%"></i></div>
              </div>
            </div>
          </section>
          <section class="card">
            <h2>${u.taskTable}</h2>
            <div class="table-scroll"><table class="table">
              <thead><tr><th>${u.colTask}</th><th>${u.colOwner}</th><th>${u.colProgress}</th><th>${u.colVerification}</th><th>${u.colFile}</th></tr></thead>
              <tbody>
              ${t.map((x) => `<tr>
                <td class="name">${L(x.name)}</td><td>${person(x.owner)}</td>
                <td>${status(x.progress)}</td><td>${status(x.verification)}</td>
                <td>${x.file === "-" ? status("noEvidence") : `<span class="mono muted" dir="ltr">${x.file}</span>`}</td></tr>`).join("")}
              </tbody>
            </table></div>
          </section>
        </div>
        <div class="stack">
          <section class="card overview-team">
            <h2>${u.projectTeam}</h2>
            <ul class="team-list">
              <li>${person("sima")}<span class="badge">${u.contributor}</span></li>
              <li>${person("yumna")}<span class="badge">${u.receiver}</span></li>
            </ul>
          </section>
          <section class="card">
            <h2>${u.needsAttention}</h2>
            <div class="msgbar warning">${icon("warning_16_filled")}<div><b>${u.unverifiedTask}</b>${L(unv.name)}</div></div>
            <div class="msgbar danger">${icon("subtract_circle_16_filled")}<div><b>${u.blocker}</b>${L(blk.name)}</div></div>
          </section>
          <section class="card">
            <h2>${u.nextSteps}</h2>
            ${[[u.checkEvidence, unv, "decisions"], [u.resumePending, pend, "handover"]].map(([label, task, to], i) => `
              <label class="check">
                <input type="checkbox" data-next="${i}" ${state.next[i] ? "checked" : ""}>
                <span class="box">${icon("checkmark_12_filled")}</span>
                <span><a class="link" href="#/${to}">${label}</a><span class="caption" style="display:block">${L(task.name)}</span></span>
              </label>`).join("")}
          </section>
        </div>
      </div>
    </div>`;
  };

  const sectionKeys = ["summary", "completed", "remaining", "issues"];
  const sectionList = () => `
    <div class="vlist" role="tablist" aria-orientation="vertical">
      ${sectionKeys.map((k) => `<button role="tab" data-section="${k}" aria-selected="${state.section === k}">${ui().sec[k]}</button>`).join("")}
    </div>`;

  screens.handover = () => (state.role === "contributor" ? screens.editor() : screens.reader());

  screens.editor = () => {
    const u = ui(), k = state.section, ref = D.refs[k];
    const draftKey = k + ":" + state.lang;
    const paras = state.drafts[draftKey] ?? D.sections[k][state.lang].map((p) => `<p>${richText(p)}</p>`).join("");
    const showAI = k === "summary" && !state.aiDismissed && !state.aiInserted;
    return `
    <div class="page-head"><h1>${u.editorTitle}</h1></div>
    <div class="g-three">
      <section class="card min-h"><h2>${u.sections}</h2>${sectionList()}</section>
      <section class="card col-card">
        <h2>${u.editableContent}</h2>${meaningHint()}
        <div class="toolbar" role="toolbar">
          <button class="btn subtle small" aria-label="${u.bold}" data-cmd="bold"><b style="width:16px">B</b></button>
          <button class="btn subtle small" aria-label="${u.italic}" data-cmd="italic"><i style="width:16px;font-family:Georgia,serif">I</i></button>
          <button class="btn subtle small" aria-label="${u.bullets}" data-cmd="insertUnorderedList">${icon("text_bullet_list_ltr_20_regular", "flip")}</button>
          <button class="btn subtle small" aria-label="${u.attach}">${icon("attach_16_regular")}</button>
        </div>
        <div class="editor" contenteditable="true" id="editor" aria-label="${u.editableContent}">${paras}</div>
      </section>
      <div class="stack">
        <section class="card">
          <h2>${u.references}</h2>
          <ul class="plist">
            <li>${icon("document_20_regular")}<div><div class="k">${u.fileVersion}</div><a class="link mono" href="#/files" dir="ltr">${ref.file}</a></div></li>
            <li>${icon("link_20_regular")}<div><div class="k">${u.evidenceLink}</div><a class="link" href="#/decisions">${L(ref.evidence)}</a></div></li>
            ${ref.unsupported ? `<li>${icon("warning_16_filled")}<div><div class="k">${u.supportingEvidence}</div>${status("noEvidence")} · ${u.notAttached}</div></li>` : ""}
          </ul>
        </section>
        ${showAI ? `
        <section class="card ai-card" aria-label="${u.aiSuggestion}">
          <div class="card-title">${u.aiSuggestion}<span class="badge ai end">${icon("bot_20_regular")}${u.aiGenerated}</span></div>
          <p class="ai-text">${richText(L(D.ai.suggestion))}</p>
          <p class="caption src">${u.basedOn} <a class="link mono" href="#/files" data-openfile="${D.ai.source.split(" /")[0]}" dir="ltr">${D.ai.source}</a></p>
          <div class="acts">
            <button class="btn" data-ai="insert">${icon("checkmark_20_regular")}${u.insert}</button>
            <button class="btn subtle" data-ai="dismiss">${u.dismiss}</button>
            <button class="btn subtle" data-act="clarify-ai">${icon("chat_help_20_regular")}${u.clarify}</button>
          </div>
        </section>` : ""}
      </div>
    </div>
    <div class="page-foot">
      <button class="btn" data-act="save">${icon("save_20_regular")}${u.save}</button>
      <button class="btn primary" data-act="review">${u.reviewBtn}</button>
    </div>`;
  };

  /* Decisions & Evidence */
  screens.decisions = () => {
    const u = ui(), d = D.decisions[state.decision];
    const uncertainty = d.uncertainty;
    return `
    <div class="page-head"><h1>${u.nav.decisions}</h1></div>
    <div class="g-three">
      <section class="card min-h"><h2>${u.decisions}</h2>
        <div class="vlist" role="tablist" aria-orientation="vertical">
          ${D.decisions.map((x, i) => `<button role="tab" data-decision="${i}" aria-selected="${i === state.decision}">${L(x.title)}</button>`).join("")}
        </div>
      </section>
      <section class="card" role="tabpanel">
        <h2>${L(d.title)}</h2>
        <div class="section-label">${u.rationale}</div>
        <p class="body-text">${richText(L(d.rationale))}</p>
        <hr class="sep">
        <div class="section-label">${u.verificationStatus}</div>
        ${status(d.status)}
        ${uncertainty ? `
        <div class="uncertainty-panel">
          <div class="card-title">${icon("info_16_regular")}${u.uncertaintyDetails}</div>
          <dl class="detail-list">
            <div><dt>${u.informationType}</dt><dd>${L(uncertainty.type)}</dd></div>
            <div><dt>${u.reason}</dt><dd>${L(uncertainty.reason)}</dd></div>
            <div><dt>${u.impact}</dt><dd>${L(uncertainty.impact)}</dd></div>
            <div><dt>${u.resolution}</dt><dd>${L(uncertainty.resolution)}</dd></div>
            <div><dt>${u.verificationRecord}</dt><dd>${L(uncertainty.verification)}</dd></div>
          </dl>
          ${uncertainty.conflicts ? `
          <div class="conflict-box">
            <div class="section-label">${u.conflictingViews}</div>
            <ul>${uncertainty.conflicts.map((view) => `<li>${L(view)}</li>`).join("")}</ul>
          </div>` : ""}
        </div>` : ""}
      </section>
      <section class="card"><h2>${u.evidence}</h2>
        <ul class="plist">
          <li>${icon("document_20_regular")}<div><div class="k">${u.sourceVersion}</div><a class="link mono" href="#/files" data-openfile="${d.source.split(" /")[0]}" dir="ltr">${d.source}</a></div></li>
          <li>${icon("person_20_regular")}<div><div class="k">${u.sourceOwner}</div>${person(d.sourceOwner)}</div></li>
          <li>${icon("calendar_16_regular")}<div><div class="k">${u.sourceDate}</div>${L(d.sourceDate)}</div></li>
          <li>${icon("text_quote_20_regular", "flip")}<div style="min-width:0;flex:1"><div class="k">${u.sourceExcerpt}</div><blockquote class="excerpt" dir="ltr">${esc(L(d.excerpt)).replace(/\n/g, "<br>")}</blockquote></div></li>
        </ul>
      </section>
    </div>`;
  };

  /* Files & Versions */
  screens.files = () => {
    const u = ui(), f = D.files[state.file];
    const cmp = f.compare;
    const aiKey = `${state.file}:${state.lang}`;
    const showAiComparison = state.role === "contributor" && cmp && f.aiComparison && !state.fileAiDismissed[aiKey];
    const aiComparisonAdded = state.fileAiAdded[aiKey];
    const pane = (v, rows) => `<div class="cmp-pane"><div class="cmp-head"><span class="mono">${v}</span>${v === f.current ? `<span class="badge brand">${u.st.current}</span>` : `<span class="badge">${u.st.earlier}</span>`}</div>
      <ul>${rows.map((r) => `<li class="${r.changed ? "chg" : ""}">${L(r)}</li>`).join("")}</ul></div>`;
    return `
    <div class="page-head"><h1>${u.nav.files}</h1></div>
    <div class="g-files">
      <section class="card min-h"><h2>${u.fileList}</h2>
        <div class="vlist" role="tablist" aria-orientation="vertical">
          ${D.files.map((x, i) => `<button role="tab" data-file="${i}" aria-selected="${i === state.file}"><span class="row-ic">${icon(x.icon)}<span class="mono" dir="ltr">${x.name}</span></span></button>`).join("")}
        </div>
      </section>
      <div class="stack">
        <section class="card split">
          <div>
            <h2>${u.fileDetails}</h2>
            <div class="row-ic big">${icon(f.icon)}<span class="mono" dir="ltr">${f.name}</span></div>
            <dl class="kv"><dt>${u.currentVersion}</dt><dd class="mono">${f.current}</dd></dl>
            <p class="caption">${L(f.meta)}</p>
          </div>
          <div class="vdiv"></div>
          <div>
            <h2>${u.versionHistory}</h2>
            <ol class="timeline">
              ${f.versions.map((v) => `<li class="${v.st}"><span class="dot"></span><span class="mono">${v.v}</span><span class="badge ${v.st === "current" ? "brand" : ""}">${u.st[v.st]}</span></li>`).join("")}
            </ol>
          </div>
        </section>
        <section class="card"><h2>${u.comparison}</h2>
          ${showAiComparison ? `<div class="file-ai-summary">
            <div class="card-title">${u.aiChangeSummary}<span class="badge ai end">${icon("bot_20_regular")}${u.aiGenerated}</span></div>
            <ul class="change-list">${f.aiComparison.bullets.map((item) => `<li>${L(item)}</li>`).join("")}</ul>
            <p class="caption src">${u.basedOn} <button class="link mono" data-file="${state.file}" dir="ltr">${f.name} / v1 → ${f.current}</button></p>
            <div class="acts">
              <button class="btn" data-file-ai="add" ${aiComparisonAdded ? "disabled" : ""}>${icon("checkmark_20_regular")}${aiComparisonAdded ? u.addedToHandoff : u.addToHandoff}</button>
              <button class="btn subtle" data-file-ai="dismiss">${u.dismiss}</button>
              <button class="btn subtle" data-file-ai="clarify">${icon("chat_help_20_regular")}${u.clarify}</button>
            </div>
          </div>` : ""}
          ${cmp ? `<div class="cmp">${pane("v1", cmp.v1)}${pane("v2", cmp.v2)}</div>`
                : `<p class="muted">${state.lang === "ar" ? "يوجد إصدار واحد فقط من هذا الملف." : "This file has only one version."}</p>`}
        </section>
      </div>
    </div>`;
  };

  /* Questions & Clarifications */
  const msg = (from, text, isReply) => {
    const p = D.people[from];
    return `<div class="msg ${isReply ? "reply" : ""}">
      <span class="avatar lg ${p.cls}" aria-hidden="true">${p.initials}</span>
      <div class="bubble"><div class="who">${L(p)}</div><p>${richText(text)}</p></div></div>`;
  };
  screens.questions = () => {
    const u = ui(), composing = state.questionDraft !== null;
    const q = composing ? null : D.questions[state.question];
    const extra = composing ? [] : (state.replies[state.question] || []);
    const replies = composing ? [] : [...q.replies.map((r) => ({ from: r.from, text: L(r.text) })), ...extra];
    return `
    <div class="page-head"><h1>${u.nav.questions}</h1></div>
    <div class="g-qa">
      <section class="card min-h"><h2>${u.questionList}</h2>
        <div class="vlist" role="tablist" aria-orientation="vertical">
          ${D.questions.map((x, i) => {
            const n = x.replies.length + (state.replies[i] || []).length;
            return `<button role="tab" data-question="${i}" aria-selected="${!composing && i === state.question}">${esc(plainText(L(x.q)))}<span class="caption">${n ? `${n} ${state.lang === "ar" ? "رد" : n === 1 ? "reply" : "replies"}` : (state.lang === "ar" ? "بلا رد" : "No reply yet")}</span></button>`;
          }).join("")}
        </div>
      </section>
      <section class="card thread" role="tabpanel"><h2>${u.discussionThread}</h2>
        ${composing ? "" : `
        <div class="section-label">${esc(plainText(L(q.q)))}</div>
        ${msg(q.from, L(q.body))}
        ${replies.length ? `<div class="reply-label caption">${u.reply}</div>` : ""}
        ${replies.map((r) => msg(r.from, r.text, true)).join("")}
        ${q.restrictedAccess ? `
        <div class="access-block">
          <div class="msgbar warning">${icon("lock_closed_16_regular")}<div><b>${u.restrictedAccess}</b>${u.credentialsExcluded}</div></div>
          <button class="btn" data-act="request-access">${icon("lock_closed_16_regular")}${u.requestAccess}</button>
        </div>` : ""}`}
        <div class="composer">
          <label for="replyBox" class="sima">${u.writeReply}</label>
          <textarea id="replyBox" rows="2" placeholder="${u.writeReply}">${composing ? esc(plainText(state.questionDraft)) : ""}</textarea>
          <button class="btn primary" data-act="send">${icon("send_20_filled", "flip")}${u.send}</button>
        </div>
      </section>
    </div>`;
  };

  /* Handover Reader (Receiver) */
  screens.reader = () => {
    const u = ui(), k = state.section, ref = D.refs[k];
    const draftKey = k + ":" + state.contentLang;
    const content = state.drafts[draftKey] ?? D.sections[k][state.contentLang].map((p) => `<p>${richText(p)}</p>`).join("");
    return `
    <div class="page-head"><h1>${u.readerTitle}</h1><span class="badge">${icon("lock_closed_16_regular")}${u.readOnly}</span></div>
    <div class="g-three">
      <section class="card min-h"><h2>${u.sections}</h2>${sectionList()}</section>
      <section class="card" role="tabpanel"><h2>${u.readerHeading[k]}</h2>
        <div class="reader-language">
          <div class="language-meta">
            <span class="badge">${u.originalLanguage}: ${u.englishLanguage}</span>
            ${state.contentLang === "ar" ? `<span class="badge brand">${u.viewingLanguage}: ${u.arabicTranslation}</span>` : ""}
          </div>
          <div class="toggle" role="group" aria-label="${u.contentLanguage}">
            <button data-content-lang="en" aria-pressed="${state.contentLang === "en"}">${u.originalEnglish}</button>
            <button data-content-lang="ar" aria-pressed="${state.contentLang === "ar"}">${u.arabicTranslation}</button>
          </div>
        </div>
        ${state.contentLang === "en" ? meaningHint() : ""}<div class="body-text reading" lang="${state.contentLang}" dir="${state.contentLang === "ar" ? "rtl" : "ltr"}">${content}</div>
      </section>
      <section class="card"><h2>${u.references}</h2>
        <ul class="plist">
          <li>${icon("document_20_regular")}<div><div class="k">${u.fileVersion}</div><a class="link mono" href="#/files" data-openfile="${ref.file.split(" /")[0]}" dir="ltr">${ref.file}</a></div></li>
          <li>${icon("text_quote_20_regular", "flip")}<div><div class="k">${u.supportingPassage}</div><blockquote class="excerpt prose">${L(ref.passage)}</blockquote></div></li>
          ${ref.unsupported ? `<li>${icon("warning_16_filled")}<div><div class="k">${u.supportingEvidence}</div>${status("noEvidence")} · ${u.notAttached}</div></li>` : ""}
        </ul>
        <button class="btn" style="margin-top:12px" data-openfile="${ref.file.split(" /")[0]}">${icon("document_search_20_regular")}${u.inspectSource}</button>
      </section>
    </div>
    <div class="page-foot"><button class="btn primary" data-act="ask">${icon("chat_help_20_regular")}${u.askQuestion}</button></div>`;
  };

  /* Review & Share (Contributor) */
  screens.review = () => {
    const u = ui(), t = D.tasks;
    const ver = t.filter((x) => x.verification === "verified");
    const nr = t.filter((x) => x.verification === "needsReview");
    const unv = t.filter((x) => x.verification === "unverified");
    const unresolved = t.filter((x) => x.verification !== "verified");
    const box = (key, label) => `<label class="check"><input type="checkbox" data-privacy="${key}" ${state.privacy[key] ? "checked" : ""}><span class="box">${icon("checkmark_12_filled")}</span><span>${label}</span></label>`;
    return `
    <div class="page-head"><h1>${u.reviewTitle}</h1></div>
    <div class="g-review">
      <section class="card span"><h2>${u.readiness}</h2>
        <div class="msgbar warning">${icon("warning_16_filled")}<div><b>${u.itemsNeedReview(unresolved.length)}</b></div></div>
      </section>
      <section class="card ai-card"><div class="card-title">${u.aiReview}<span class="badge ai end">${icon("bot_20_regular")}${u.aiGenerated}</span></div>
        <ul class="plist">
          <li>${icon("info_16_regular")}<div><div class="k">${u.suggestionToReview}</div>${richText(L(D.ai.review))}</div></li>
        </ul>
      </section>
      <section class="card"><h2>${u.verificationOverview}</h2>
        <ul class="plist">
          <li><div>${status("verified")}<div class="caption" style="margin-top:2px">${ver.map((x) => L(x.name)).join(", ")}</div></div></li>
          <li><div>${status("needsReview")}<div class="caption" style="margin-top:2px">${nr.map((x) => L(x.name)).join(", ")}</div></div></li>
          <li><div>${status("unverified")}<div class="caption" style="margin-top:2px">${unv.map((x) => L(x.name)).join(", ")}</div></div></li>
        </ul>
      </section>
      <section class="card span"><h2>${u.privacy}</h2>
        ${box("hidePrivate", u.hidePrivate)}
        ${box("allowAI", u.allowAI)}
      </section>
    </div>
    <div class="page-foot">
      <button class="btn" data-act="preview">${icon("eye_20_regular")}${u.preview}</button>
      <button class="btn primary" data-act="share">${icon("share_20_regular")}${u.share}</button>
    </div>`;
  };

  /* ---------- Static frame export (used by figma.html) ---------- */
  window.HandoffFrame = (opts) => {
    const saved = { ...state };
    Object.assign(state, opts);
    const r = opts.route;
    const html = shell(screens[r](), r).replace(/<div class="toast"[^>]*><\/div>/, "");
    Object.assign(state, saved);
    return html;
  };
  if (!app) return;

  /* ---------- Render + events ---------- */
  function render() {
    closeMeanings();
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
    const r = route();
    document.title = `${ui().nav[r]} · Handoff`;
    app.innerHTML = shell(screens[r](), r);
    // Draft HTML may have been written in another interface language.
    app.querySelectorAll("[data-term]").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", `${ui().meaningAction} ${D.meanings[button.dataset.term].word}`);
    });
  }

  function toast(msg) {
    const t = document.getElementById("toast");
    t.innerHTML = icon("checkmark_circle_16_filled") + msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("show"), 2400);
  }

  function saveDraft() {
    const ed = document.getElementById("editor");
    if (ed) {
      const copy = ed.cloneNode(true);
      copy.querySelectorAll("[data-term]").forEach((button) => button.setAttribute("aria-expanded", "false"));
      state.drafts[state.section + ":" + state.lang] = copy.innerHTML;
    }
  }

  /* Static, contextual meaning suggestions. Nothing is sent to a server. */
  function closeMeanings(restoreFocus = false) {
    const trigger = meaningTrigger;
    meaningTrigger = null;
    document.getElementById("term-meanings")?.setAttribute("hidden", "");
    trigger?.setAttribute("aria-expanded", "false");
    if (restoreFocus && trigger?.isConnected) trigger.focus({ preventScroll: true });
  }

  function positionMeanings() {
    if (!meaningTrigger?.isConnected) { closeMeanings(); return; }
    const panel = document.getElementById("term-meanings");
    if (!panel || panel.hidden) return;
    const rect = meaningTrigger.getBoundingClientRect();
    const pageRect = document.getElementById("page").getBoundingClientRect();
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    if (rect.bottom < Math.max(0, pageRect.top) || rect.top > Math.min(height, pageRect.bottom) || rect.right < 0 || rect.left > width) {
      closeMeanings(); return;
    }
    const size = panel.getBoundingClientRect(), gap = 10, edge = 12;
    const start = state.lang === "ar" ? rect.right - size.width : rect.left;
    const left = Math.max(edge, Math.min(start, width - size.width - edge));
    let top = rect.bottom + gap;
    if (top + size.height > height - edge) top = rect.top - size.height - gap;
    top = Math.max(edge, Math.min(top, height - size.height - edge));
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }

  function openMeanings(trigger) {
    if (meaningTrigger === trigger) { closeMeanings(true); return; }
    closeMeanings();
    const term = D.meanings[trigger.dataset.term];
    if (!term) return;
    const u = ui(), panel = document.getElementById("term-meanings");
    panel.innerHTML = `
      <div class="meaning-notice"><p id="meaning-warning">${icon("sparkle_16_regular")}${u.meaningWarning}</p>
        <button type="button" class="meaning-close" data-act="close-meanings" aria-label="${u.closeMeanings}"><span aria-hidden="true">×</span></button>
      </div>
      <div class="meaning-content">
        <h2 id="meaning-title">${u.meaningTitle} <bdi class="meaning-word" lang="ar" dir="rtl">${term.word}</bdi></h2>
        <p class="meaning-intro">${u.meaningIntro}</p>
        <ol class="meaning-options">${term.options.map((option, i) => `
          <li><span class="meaning-number" aria-hidden="true">${i + 1}</span><div><h3>${esc(L(option.title))}</h3><p>${esc(L(option.description))}</p></div></li>
        `).join("")}</ol>
      </div>
      <p class="meaning-footer">${u.meaningFooter}</p>`;
    meaningTrigger = trigger;
    trigger.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    positionMeanings();
    panel.querySelector("button").focus({ preventScroll: true });
  }

  document.addEventListener("pointerdown", (e) => {
    if (meaningTrigger && !e.target.closest("#term-meanings, [data-term]")) closeMeanings();
  });
  document.addEventListener("focusin", (e) => {
    if (meaningTrigger && !e.target.closest("#term-meanings, [data-term]")) closeMeanings();
  });
  document.addEventListener("keydown", (e) => {
    if (!meaningTrigger) return;
    if (e.key === "Escape") { e.preventDefault(); closeMeanings(true); }
    // Resume the page's natural tab order from the word that opened the dialog.
    else if (e.key === "Tab") closeMeanings(true);
  });
  window.addEventListener("resize", positionMeanings);
  document.addEventListener("scroll", positionMeanings, true);

  app.addEventListener("click", (e) => {
    const b = e.target.closest("button, a");
    if (!b) return;
    if (b.dataset.term) { e.preventDefault(); openMeanings(b); return; }
    if (b.dataset.act === "close-meanings") { closeMeanings(true); return; }
    if (b.dataset.lang) { saveDraft(); state.lang = b.dataset.lang; writePreference("hf-lang", state.lang); render(); }
    else if (b.dataset.contentLang) { state.contentLang = b.dataset.contentLang; writePreference("hf-content-lang", state.contentLang); render(); }
    else if (b.dataset.role) {
      saveDraft(); state.role = b.dataset.role; writePreference("hf-role", state.role);
      if (route() !== (location.hash.replace("#/", "") || "overview")) location.hash = "#/overview";
      render();
    }
    else if (b.dataset.openfile) {
      const i = D.files.findIndex((f) => f.name === b.dataset.openfile);
      if (i >= 0) state.file = i;
      saveDraft(); if (location.hash === "#/files") render(); else location.hash = "#/files";
      e.preventDefault();
    }
    else if (b.dataset.decision) { state.decision = +b.dataset.decision; render(); }
    else if (b.dataset.file) { state.file = +b.dataset.file; render(); }
    else if (b.dataset.question) { state.questionDraft = null; state.question = +b.dataset.question; render(); }
    else if (b.dataset.act === "send") {
      const box = document.getElementById("replyBox"), text = box.value.trim();
      if (!text) { box.focus(); return; }
      if (state.questionDraft !== null) {
        const template = state.questionTemplate || D.ai.clarificationQuestion;
        const context = state.questionContext || D.ai.clarificationContext;
        const question = { ...template, [state.lang]: text };
        D.questions.push({ q: question, from: state.role === "contributor" ? "sima" : "yumna", body: context, replies: [] });
        state.question = D.questions.length - 1;
        state.questionDraft = null;
        state.questionTemplate = null;
        state.questionContext = null;
      } else {
        (state.replies[state.question] ||= []).push({ from: state.role === "contributor" ? "sima" : "yumna", text });
      }
      render(); document.getElementById("replyBox").focus();
    }
    else if (b.dataset.act === "ask") { state.question = 0; location.hash = "#/questions"; setTimeout(() => document.getElementById("replyBox")?.focus(), 0); }
    else if (b.dataset.act === "clarify-ai") {
      state.questionDraft = L(D.ai.clarificationQuestion);
      state.questionTemplate = D.ai.clarificationQuestion;
      state.questionContext = D.ai.clarificationContext;
      location.hash = "#/questions";
      setTimeout(() => document.getElementById("replyBox")?.focus(), 0);
    }
    else if (b.dataset.fileAi === "dismiss") {
      state.fileAiDismissed[`${state.file}:${state.lang}`] = true;
      render();
    }
    else if (b.dataset.fileAi === "add") {
      const f = D.files[state.file];
      const aiKey = `${state.file}:${state.lang}`;
      if (!f.aiComparison || state.fileAiAdded[aiKey]) return;
      saveDraft();
      const key = `summary:${state.lang}`;
      const base = state.drafts[key] ?? D.sections.summary[state.lang].map((p) => `<p>${richText(p)}</p>`).join("");
      state.drafts[key] = base + `<p class="ai-added"><span class="badge ai ai-origin" contenteditable="false">${icon("bot_20_regular")}${ui().aiGenerated}</span><span>${richText(L(f.aiComparison.insertText))}</span></p>`;
      state.fileAiAdded[aiKey] = true;
      render();
      toast(ui().changeSummaryAdded);
    }
    else if (b.dataset.fileAi === "clarify") {
      const f = D.files[state.file];
      if (!f.aiComparison) return;
      state.questionDraft = L(f.aiComparison.clarificationQuestion);
      state.questionTemplate = f.aiComparison.clarificationQuestion;
      state.questionContext = f.aiComparison.clarificationContext;
      location.hash = "#/questions";
      setTimeout(() => document.getElementById("replyBox")?.focus(), 0);
    }
    else if (b.dataset.act === "request-access") { toast(ui().accessRequestSent); }
    else if (b.dataset.act === "preview") { state.role = "receiver"; writePreference("hf-role", state.role); location.hash = "#/handover"; render(); }
    else if (b.dataset.act === "share") { toast(ui().sharedToast); }
    else if (b.dataset.section) { saveDraft(); state.section = b.dataset.section; render(); }
    else if (b.dataset.cmd) { e.preventDefault(); document.execCommand(b.dataset.cmd); }
    else if (b.dataset.ai === "dismiss") { state.aiDismissed = true; render(); }
    else if (b.dataset.ai === "insert") {
      saveDraft();
      const key = "summary:" + state.lang;
      const base = state.drafts[key] ?? D.sections.summary[state.lang].map((p) => `<p>${richText(p)}</p>`).join("");
      state.drafts[key] = base + `<p class="ai-added"><span class="badge ai ai-origin" contenteditable="false">${icon("bot_20_regular")}${ui().aiGenerated}</span><span>${richText(L(D.ai.insertText))}</span></p>`;
      state.aiInserted = true; render();
    }
    else if (b.dataset.act === "save") { saveDraft(); toast(ui().saved); }
    else if (b.dataset.act === "review") { saveDraft(); location.hash = "#/review"; }
  });
  app.addEventListener("change", (e) => {
    if (e.target.dataset.next !== undefined) state.next[+e.target.dataset.next] = e.target.checked;
    if (e.target.dataset.privacy) state.privacy[e.target.dataset.privacy] = e.target.checked;
  });
  app.addEventListener("mousedown", (e) => { if (e.target.closest("[data-cmd], .editor [data-term]")) e.preventDefault(); });
  app.addEventListener("keydown", (e) => {
    if (e.target.id === "replyBox" && e.key === "Enter" && (e.ctrlKey || e.metaKey)) document.querySelector('[data-act="send"]').click();
  });
  window.addEventListener("hashchange", () => { saveDraft(); render(); });

  // Allow ?lang=ar&role=receiver deep links (used for exports)
  const qs = new URLSearchParams(location.search);
  if (qs.get("lang")) state.lang = qs.get("lang");
  if (qs.get("contentLang")) state.contentLang = qs.get("contentLang");
  if (qs.get("role")) state.role = qs.get("role");
  ["decision", "file", "question"].forEach((k) => { if (qs.get(k)) state[k] = +qs.get(k); });
  if (qs.get("section")) state.section = qs.get("section");
  if (!["en", "ar"].includes(state.lang)) state.lang = "en";
  if (!["en", "ar"].includes(state.contentLang)) state.contentLang = state.lang;
  if (!["contributor", "receiver"].includes(state.role)) state.role = "contributor";
  if (!sectionKeys.includes(state.section)) state.section = "summary";
  [["decision", D.decisions], ["file", D.files], ["question", D.questions]].forEach(([key, values]) => {
    if (!Number.isInteger(state[key]) || !values[state[key]]) state[key] = 0;
  });
  render();
})();
