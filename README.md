# Handoff | High-fidelity prototype

Open `index.html` in a browser. Keep the five website files in the same folder. No build step, server, account, API key, or internet connection is required.

The separate `handoff-preview.html` deliverable contains the same prototype in one file.

## Existing prototype walkthrough

- Sima Sabouni is the contributor; Yumna Salaas is the receiver. Switch between their views using the named controls in the header.
- The sample project is Campus Task Manager, a group project for a Software Engineering course. Tasks, files, decisions, source excerpts, questions, AI suggestions, and handover sections all use this scenario.
- English summaries and handover text include selected Arabic terms with an amber highlight and underline. Click a term to open a list of possible meanings. A small notice at the top reads: “These recommendations are AI generated.”
- The three sample terms are نموذج (prototype / data model / form), واجهة (user interface / API interface / frontend), and اعتماد (approval / dependency / adoption).
- Click outside the list, click its close control, or press Escape to dismiss it. Keyboard focus returns to the term on Escape or close. Tab resumes the page's tab order.
- The receiver can view the original mixed text or the authored Arabic translation independently of the interface language. Arabic words are directionally isolated within English sentences.
- Highlighted terms remain interactive when a canned AI suggestion is inserted and viewed by the receiver.
- Asset paths work with the supplied flat folder, and layouts adapt to smaller viewports.

## Color and visual design rationale

Jonauskaite and Mohr [1] reviewed 132 studies on color–emotion associations. Their Table 5 summarizes affective dimensions, and Tables 6–10 group associations by hue or color attribute. Blue, green, blue-green, and white were generally associated with positive, lower-arousal emotions. Red was associated with higher-arousal emotions across positive and negative meanings. Yellow and orange were commonly associated with positive, higher-arousal emotions. Purple had associations with power and a range of emotions. The review primarily examined associations. Handoff adapts these broad patterns into a lighter workspace with more saturated accents on existing cues.

| Color | Purpose in Handoff | Rationale |
| --- | --- | --- |
| Navy, slate, and white `#192B48`, `#4C607A`, `#FFFFFF` | Navy text and white reading cards, with slate for secondary text and neutral states | The light surfaces align with the review’s findings for white and lighter colors. Contrast, rather than hue alone, supports Arabic and English legibility. [1, 2] |
| Blue `#254FB8` | Pale navigation and headings, deeper blue for primary actions, links, and selections | The review generally links blue with lower-arousal associations. The prototype uses light and saturated shades to separate navigation from reading surfaces and selected controls from inactive ones. [1, 2] |
| Blue-green `#096456` | Completed or verified work, progress and confirmations | The review generally links blue-green with positive, lower-arousal associations. The completed and verified meanings follow the success convention, with existing text and check icons carrying the state. [1–3] |
| Golden amber `#7C4B00` on `#FFF2CC` or `#FFE395` | Review, uncertainty, missing evidence, and underlined Arabic terms | The warm yellow–orange family supplies emphasis. The warning convention and existing labels, icons, and underlines explain what the user can do with each cue. [1–3] |
| Red `#A52725` | Blocked or disputed items | The review associates red with higher arousal. The prototype reserves red for blockers and disputes, following the error convention. [1–3] |
| Violet `#6034A4` | Mocked AI summaries, suggestions, inserted passages, and notices | Violet distinguishes AI provenance from blue actions and green verification. The hue assignment is specific to Handoff. The existing AI label or icon identifies the source. [2] |

The review informs broad color choices. The exact shades and interface meanings are design decisions. The status-color conventions come from USWDS, and contrast and redundant cues follow WCAG 2.2. [1–3]

### References

1. D. Jonauskaite and C. Mohr, “Do we feel colours? A systematic review of 128 years of psychological research linking colours and emotions,” *Psychonomic Bulletin & Review*, vol. 32, pp. 1457–1486, 2025. [doi:10.3758/s13423-024-02615-z](https://doi.org/10.3758/s13423-024-02615-z)
2. World Wide Web Consortium, *Web Content Accessibility Guidelines (WCAG) 2.2*, criteria 1.4.1 and 1.4.3. [Use of Color](https://www.w3.org/TR/WCAG22/#use-of-color) · [Contrast (Minimum)](https://www.w3.org/TR/WCAG22/#contrast-minimum)
3. U.S. Web Design System, *State color tokens*. [USWDS color documentation](https://designsystem.digital.gov/design-tokens/color/state-tokens/)

## Prototype scope

All AI suggestions, meanings, translations, files, and evidence are authored sample data. There is no AI service, translation service, automatic ambiguity detection, backend, real sharing, access request, or file upload. Existing editing and feedback interactions run locally in the page. Drafts and replies reset on reload; language and role preferences may persist in browser storage.

## Editing the examples

- `content.js`: bilingual labels, project fixtures, and `DATA.meanings`.
- `app.js`: rendering, local prototype interactions, and the meaning popover.
- `fluent.css`: palette, visual hierarchy, term styling, and responsive layouts.
- `icons.js`: supplied icons, unchanged.
- `index.html`: entry point.

Use `[[model]]`, `[[interface]]`, or `[[approval]]` in a supported sample paragraph to mark an intentionally ambiguous occurrence. `richText()` escapes the text and replaces these markers with accessible Arabic buttons. Plain Arabic words are not automatically highlighted. These are authoring markers, not a live text-analysis feature.

## Verification

The HTML entry point and all three JavaScript files match the reattached source files byte for byte. Simulated DOM checks compared 62 screen states and exercised role switching, right-to-left mode, the meaning popover and Escape, mocked AI insertion, and the translation toggle. The checked text pairs meet WCAG 2.2’s 4.5:1 contrast threshold for normal text. Selected focus indicators and graphical cues were checked against 3:1. Live-browser layout verification was unavailable in this environment.
