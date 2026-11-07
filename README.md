# AI-powered Handoff System

This is a SWEB654 course project exploring how AI can support bilingual Arabic–English project handoffs between contributors and receivers. The repository contains a high-fidelity prototype for demonstration and evaluation, not a production system.

## Design links

- [Wireframes](https://canva.link/rut7n5si5jbrej3) — Early screen layouts and user flows for the contributor and receiver views.
- [Figma mockup](https://www.figma.com/design/wEQReZcbtgt59HAE86phk6/Untitled?node-id=0-1&t=dSrFUoKIzOBRacVZ-1) — The higher-fidelity mockup used to refine the layout and visual direction.

## Features

- **Structured project overview:** Shows completed and pending tasks, owners, blockers, next steps, and related artifact versions. Task progress is kept separate from verification status.
- **Inspectable evidence and justifications:** Connects decisions and handoff statements to source files, passages, versions, owners, and dates. Missing evidence is clearly marked.
- **Actionable uncertainty:** Distinguishes verified, unverified, disputed, and unsupported information, with explanations of the impact, conflicting views, and possible resolution steps.
- **Bilingual reading and interpretation:** Supports Arabic and English interfaces, independent content-language controls, and correct RTL/LTR presentation while preserving technical terms.
- **AI review:** Provides labeled AI project summaries, file-version insights, and handoff suggestions with visible sources. Contributors can review, edit, dismiss, or clarify AI-assisted content before sharing it.
- **Access and privacy control:** Includes privacy choices and directs users to authorized access routes without placing credentials or other secrets inside the handoff.
- **Continuous capture and clarification:** Allows contributors to edit and save handoff content as work progresses, while questions, replies, and unresolved issues can be routed to collaborators.

## Run locally

Open `index.html` in a browser. No build step or dependencies are required.

