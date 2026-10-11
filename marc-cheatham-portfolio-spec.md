# Marc Cheatham — Portfolio Website Spec

> **Status:** Structural TBDs collapsed into §14 (defaults + questionnaire); §12 tracks **only** items that still require Marc-supplied URLs, files, or numbers. Site draft lives in **`web/`**.  
> **Last updated:** 2026-05-14 *(TBD sweep)*  
> **Owner:** Marc Cheatham — **Chart Room AI LLC** (Founder & Principal)  
> **Brand source of truth:** `c:\Users\emche\OneDrive\Chart Room AI\Marketing\branding.md` (v1.0, May 2026)  
> **Source code repo:** [`https://github.com/cheezd/website`](https://github.com/cheezd/website)

---

## 1. Goals

| Goal | Notes |
|------|-------|
| **Brand home for Chart Room AI** | Conversion-focused site consistent with brand guidelines (clean, professional, high white space). |
| **Primary funnel** | **[Confirmed]** **Fractional AI transformation / advisory engagements** via Chart Room AI *(full-time CTO interest can still arrive via LinkedIn — not hero focus)* |
| Audience | **Financial services & technology executives** navigating AI adoption; secondary: PE operating partners / boards — see **§14.2 industries** |
| Credibility | Communicate CTO-level depth in fintech, regulated industries, practical AI adoption and transformation leadership |
| Lead / contact path | **[Confirmed]** **Email-first** hero CTA via **`info@chartroomai.com`**; LinkedIn (+ optional booking) secondary |

---


## 2. Tech stack, hosting & ops *(confirmed for v1)*

| Decision | Choice |
|---------|--------|
| **Framework** | **Next.js** + **Tailwind CSS** |
| **DNS & edge** | **Cloudflare** — public DNS for **`chartroomai.com`** *(and **`chartroom.ai`** when owned)* is **edited in Cloudflare** (records, optional proxying, redirects). |
| **App deployment** | **Pick when wiring CI:** **`Cloudflare Pages`** *(stay on CF)* vs **`Vercel`** *(Next.js deploy target)* — DNS at Cloudflare still points **`@` / `www`** at whatever those providers require *(CNAME, A, or Pages custom-domain flow)*. |
| **Content model** | **No CMS v1** — copy and structure live in the repo *(Markdown or TS/constants); revisit if non-dev editors need CMS* |
| **Canonical domain** | **https://chartroomai.com** — **`chartroom.ai`** → redirect to `.com` *(e.g. **Bulk Redirect / Redirect Rules** in Cloudflare once that zone or hostname exists)* |
| **Analytics** | **None** at launch |
| **Static export requirement** | **None for v1** — standard **Next.js** Node build; reassess only if a host forces static export. |
| **Source repo** | **[`cheezd/website`](https://github.com/cheezd/website)** on GitHub *(this monorepo-style root; **`web/`** holds the Next.js app)* |

**Domain confirmed:** **`chartroomai.com`**. Registrar may live at Cloudflare or elsewhere; **`chartroomai.com`** ultimately uses **Cloudflare nameservers** so **records you change at launch live in Cloudflare → DNS.**

**Launch — DNS checklist (high level):** *(1)* In **Cloudflare Pages**, **Vercel**, etc., add **`chartroomai.com`** (+ **`www`**) as a custom domain and note the **CNAME/A targets** they show. *(2)* In **Cloudflare → DNS** for **`chartroomai.com`**, create matching records; leave **Proxied** vs **DNS only** (**grey cloud**) per your host’s Cloudflare docs *(SSL / certificate quirks vary)*. *(3)* Enforce **one** canonical hostname *(apex vs **`www`**)* with a **Bulk Redirect / Single Redirect** Rule. *(4)* **`chartroom.ai`** → **`chartroomai.com`** via Cloudflare redirects when active.

---

## 3. Site Map *(draft)*

| Page / section | Purpose |
|----------------|---------|
| Home / Hero | **Chart Room AI** wordmark-feel headline, primary tagline, value prop, primary CTA |
| About | **We**-voiced firm story + **Founder / Principal** block for **Marc Cheatham** (name + credentials; third person *or* *I* — not mixed in one paragraph) |
| Experience | Roles, companies *(with permission)*, timelines, impact |
| Expertise | Skills grouped (leadership, engineering, AI, security, domain) |
| Why hire / Value | Differentiators vs other CTOs or AI consultants |
| Selected work *(optional)* | Case studies or anonymized engagements |
| Contact | **Email-first**; LinkedIn + optional booking link *(secondary)*. Lightweight contact form optional backlog. |

**Information architecture (v1):** **Single-page** (`/`) **with anchor sections** (About, Expertise, Experience, Contact, etc.). Add **`/privacy`** before turning on analytics; **not required** for analytics-off v1 unless other widgets dictate.

---

## 4. Voice & Messaging

### 4.1 Chart Room AI — positioning *(from brand guidelines; use verbatim on hero / SEO where appropriate)*

> Chart Room AI delivers fractional AI Transformation Leadership from a former Fintech CTO and CEO with 31 years of experience. We provide strategic AI roadmaps, seamless business-IT bridging, and executive guidance that helps financial services and technology companies navigate complexity and capture sustainable AI-driven growth.

### 4.2 Tagline *(confirmed for hero / parity with LinkedIn & proposals)*

- **Primary tagline:** Helping you navigate your AI Transformation  

- **Alternates** *(from Chart Room AI brand guidelines v1.0 — use for decks, footer, or A/B copy if desired):* “Navigating AI Transformation from the Chart Room” · “Strategic AI Leadership. Clear Roadmaps. Executive Command.” · “Charting the Course for Enterprise AI Success” · “Where Fintech Expertise Meets AI Vision”

### 4.3 Elevator pitch *(locked for v1 web; tweak anytime)*

> Seasoned technology executive (31 years) and long-time CTO (18 years), recently CTO and acting CEO of **Caravel Concepts** (B2B fintech software) — now advising financial services and regulated firms on **practical AI adoption** from strategy through delivery.

### 4.4 Professional summary *(Marc — source copy for web; adapt per §4.7)*

Marc is a seasoned technology executive with **31 years** of professional experience, including **18 years as Chief Technology Officer** across multiple firms. Most recently, for **4 years**, he served as **CTO and acting CEO** of **Caravel Concepts** (B2B fintech software).

In those roles he:

- Led development teams building sophisticated fintech platforms: trading systems; Capital Market Assumption engines (Monte Carlo); next-gen financial planning tools; Asset Liability Management (ALM) models.
- Built full security master databases (stocks, bonds, mutual funds, ETFs, commodities, annuities) with deep SQL expertise.
- Designed and implemented **production multi-agent AI systems** for client productivity (e.g., cash flow analysis, tax planning, financial forecasting); built an agentic evaluation framework with quality gates and human-verified baselines.
- Improved developer productivity via AI in DevOps; strong practices in **TDD** and **CI/CD**.
- Built business models, led **VC** pitches; primary presenter for complex capital market and ALM capabilities.
- Acted as **CISO**, creating full information security policy and compliance framework.

### 4.5 Consulting focus *(provided)*

Helps financial services and regulated companies **adopt AI successfully** by bridging business stakeholders and IT delivery:

- AI vision and strategy  
- Actionable roadmaps  
- Unblocking stalled initiatives  
- Hands-on support across business, engineering, infrastructure, security, compliance  

Differentiator framing: **30+ years regulated-industry experience** + **proven AI implementation** → rare blend for strategic + execution leadership.

### 4.6 Voice & tone *(from brand guidelines)*

| | |
|--|--|
| **Voice** | Authoritative yet approachable |
| **Tone** | Strategic, insightful, decisive, collaborative |
| **Do say** | “We chart a clear course…”, “From the Chart Room, we navigate…”, “Proven fintech leadership applied to AI transformation” |
| **Avoid** | Hype (“revolutionary”, “game-changing”), unexplained jargon, casual or salesy copy |

### 4.7 Narrative perspective: “we” vs “Marc” vs “I” *(confirmed)*

**Default site voice:** Use **first-person plural — we** for Chart Room AI everywhere it reads as the firm addressing the visitor (*services, value prop, positioning, CTAs*). That matches the brand guidelines and stays valid as you occasionally bring in collaborators on limited aspects — **“we” = Chart Room AI LLC**, not an implied large firm.

**Founder credibility:** Surface **Marc Cheatham** by name where proof of *who delivers the work* matters (*photo caption, footer sign-off, bio heading, LinkedIn parity*). Credential-heavy blocks may stay **third person** (“Marc is / has…”) **or** shift to **I** inside a clearly labeled subsection (e.g. **Founder / Principal**) if you want a warmer touch — but **do not** mix *I* and *we* in the same paragraph without a section break.

**Resume-style bio (§4.4):** Treat as **source content** for the site. For published pages, plan to **rewrite into “we”** for firm-led sections, and keep a **dedicated founder / background** area for the third-person (or *I*) arc.

### 4.8 Logo & visual identity *(from brand guidelines — implement when assets exist)*

- **Wordmark:** “Chart Room AI”  
- **Icon concept:** Minimal ship’s helm / compass + neural node or upward trajectory; geometric, professional (no cartoon).  
- **Variations:** Full color, monochrome, reversed (light background).

---

## 5. Experience Timeline *(mixed public attribution: Caravel Concepts + Riverfront CTO named)*

| Dates | Role | Company | Public site posture | Highlights *(themes — attribution split on live site)* |
|-------|------|---------|---------------------|------------------------------------------------------------|
| **~4 yrs** *(calendar years: Marc may add)* | CTO, Acting CEO | **Caravel Concepts** *(B2B fintech software)* | **Named** publicly · substantive detail still **NDA / conversation** where applicable | Venture-scale product & engineering; VC / diligence narration; interim **acting chief executive stretches**; multi-agent workflows & evaluation scaffolding; hardened security-policy posture |
| *[Years TBD]* | Chief Technology Officer | **Riverfront** *(wealth / investment-management technology context)* | **Named** publicly · deeper timelines on request | Platform depth across trading-esque workflows, stochastic / capital-market tooling, holistic planning interoperability, expansive securities-master hygiene, modernization discipline |
| *[Further CTO-span across other firms]* | Chief Technology Officer | **Additional employers — unnamed on site** | **Private absent agreement** | Cloud / modernization, portfolio consolidation, integrations, vendor & audit rhythm—see **`#experience`** “Additional CTO depth…” card |
| *[Future]* | Advisory / director-style roles | *[When applicable]* | **Publish after clearance** | *[Add rows when relevant]* |

**Companies you’re willing to name publicly:** **Caravel Concepts** *(~4 yrs CTO / acting CEO)* · **Riverfront** *(CTO tenure)* · **other CTO employers unnamed on site unless agreed.**  

**NDA / omission policy:** Employer-specific metrics, timelines, or attributions publish only after **written approval**.

---

## 6. Skills & Expertise Buckets *(v1 — aligned to site “Expertise” section)*

### Leadership & business

- Cross-functional executive leadership across **product + engineering + operational risk** sponsors  
- **Roadmaps, portfolio sequencing, vendor strategy**, board- and investor-ready technical narrative  
- **Fundraising support, strategic partnerships**, commercial model stress-tests *(details under NDA)*  
- **Team scale / budget metrics:** *not published on v1* — available in **resume** and **conversation**

### Engineering & platforms

- Fintech platforms, trading, Monte Carlo/CMA engines, planning tools, ALM  
- Security masters, SQL-heavy data modeling  
- TDD, CI/CD, developer productivity  

### AI & automation

- Multi-agent production systems  
- Evaluation / quality frameworks, human baseline verification  
- AI in DevOps  

### Security & compliance

- CISO-style ownership; security policy & compliance frameworks  
- **Regulatory context (narrative, not a certification claim):** multi-decade delivery in **financial services** environments where **SOC 2–style controls**, **audit trail expectations**, and **third-party diligence** are baseline; **specific frameworks (e.g. FFIEC, HIPAA, SOX-adjacent workflows) named only if you explicitly add them later**

### Soft skills / working style

- Executive **facilitation** across business, risk, and engineering  
- **Crisis de-risking** when delivery and regulatory expectations collide  
- **Mentorship** of senior ICs and engineering leaders  
- **Vendor and architecture governance** without gridlock  

---

## 7. “Why Hire Marc / Chart Room AI?” *(v1 narrative + slots for metrics)*

1. Bridges **regulated-domain depth** with **hands-on AI delivery** — not decks alone.  
2. Comfortable from **architecture** through **fundraising pitches** and **client-facing demos** on complex domains.  
3. Brings **engineering discipline** (**TDD**/ **CI/CD**) and **governance** (security, evaluations, human baselines) so AI programs don’t rot after pilot.  

**Proof points — add when you’re ready (anonymized OK):**

- [ ] **Operational:** e.g. availability, incident reduction, release cadence, cost takeout  
- [ ] **AI / product:** e.g. latency, task-time saved, evaluation pass rates, rollout coverage  
- [ ] **Commercial / trust:** e.g. diligence outcomes, funding milestones, strategic partnership closes *(only if disclosable)*  

**Differentiation paragraph (draft for “Why” section / proposals):**  
Many AI consultants optimize for **slides and vendor bake-offs**. Chart Room AI optimizes for **governed throughput** — aligning sponsors, engineering, security, and compliance so initiatives move from pilot to **repeatable production**. We keep humans in the loop where regulation and fiduciary context demand it, and we design **evaluation and rollback** so productivity gains survive audit and turnover.

**Risk / hype posture (short line for site or FAQ):**  
We **prioritize compliance-aware, auditable patterns** over trendy agent demos; we **do not** promise “full autonomy” where your regulators, clients, or risk team would not tolerate it.

---

## 8. Proof & Assets *(v1 plan)*

| Asset | Plan |
|-------|------|
| Professional headshot | **Pending** — business attire · add to **`web/public/`** or URL when ready |
| Logo / vector | **Pending** — palette already in CSS; drop SVG/PNG when designed |
| PDF resume / CV | **Confirmed** — `web/public/Marc-Cheatham-Resume.pdf` served at `/Marc-Cheatham-Resume.pdf` |
| LinkedIn URL | **Confirmed** · [`https://www.linkedin.com/in/marc-cheatham-83b35b22/`](https://www.linkedin.com/in/marc-cheatham-83b35b22/) |
| Booking URL | Optional · `NEXT_PUBLIC_BOOKING_URL` |
| Speaking / podcasts / publications | **Actively welcome inbound** for advisory / board / speaking — add **published URLs** here as they exist |
| Recommendations / quotes | **Later** — only with **written permission** |

---

## 9. Legal & Disclosure *(draft — counsel review before launch)*

- **Official entity:** Chart Room AI LLC (Virginia)  
- **Trademark:** Brand doc recommends intent-to-use filing once the site is live — track as a launch task.  
- **Disclaimer (draft website copy):**
  - Information on this site is for **general informational purposes only**. It is **not legal, tax, accounting, or investment advice**, and **not** a substitute for a signed consulting or advisory engagement.
  - **Chart Room AI is not** a broker-dealer or registered investment adviser. Nothing herein is investment advice or a solicitation to buy or sell securities or other financial instruments.
  - **Governing law (draft — counsel review):** Interpretation of this informational content is intended to follow the laws of the **Commonwealth of Virginia**, consistent with **Chart Room AI LLC**’s formation there.
- **Cookies / banners:** With **analytics off for v1**, no cookie-consent UX is implied for measurement alone. **Re-evaluate** if you embed scripted widgets *(booking SaaS, chat, CRM, video)* that set cookies or process personal data.

---

## 10. Design Direction *(from Chart Room AI brand guidelines + open items)*

**Overall aesthetic keywords:** Clean, professional, conversion-focused, **high white space**, confident executive advisor, subtle nautical + tech (abstract charts, horizon lines, connected nodes).

**Color palette — implemented CSS token names in Tailwind `@theme` (`web/src/app/globals.css`):** **`chart-navy`** `#0A2540`, **`chart-teal`** `#00B4A8`, **`chart-gold`** `#D4AF37`, **`chart-ink`** `#1E2937`, **`chart-surface`** `#F4F7FA`

| Token role | Hex | Usage |
|------------|-----|--------|
| **Primary (navy)** | `#0A2540` | Main headings, navigation |
| **Accent (teal)** | `#00B4A8` | Buttons, links, highlights |
| **Secondary (gold)** | `#D4AF37` | Sparingly: premium accents, trust signals, select CTAs |
| **Neutral dark** | `#1E2937` | Body text, dark UI surfaces |
| **Neutral light** | `#F4F7FA` | Page background, cards |

**Color rules:** Navy + teal = core identity; gold sparingly; **target WCAG AA** contrast.

**Typography (v1 implementation):** **Inter** via `next/font` for headings + body (matches brand fallback). **Satoshi** remains optional enhancement if licensing is cleared — not required for v1.

**Type scale (brand doc):** H1 42–56px · H2 28–36px · body 18–20px (credibility-forward).

**Imagery:** Professional headshots (business attire); abstract data/AI visualizations — **avoid generic “AI robot” stock**.

**Logo:** Implement full-color / mono / reversed per §4.8 when assets are supplied.

**Reference sites (“I like how X feels”):** *[Optional — add URLs anytime; useful for spacing/motion benchmarks]*  

**Theme (v1):** **Light** default (`#F4F7FA` surfaces, `#0A2540` / `#1E2937` type). Optional **full-width navy band** for sticky nav or footer; **no dark-mode toggle** in v1 unless you request it.

**Motion (v1):** **Subtle** only (short fades, restrained hover states) — aligns with credible executive advisory positioning.

---

## 11. Content Checklist *(v1 `web/` snapshot)*

- [x] Primary tagline *(§4.2)*  
- [x] Hero structure + positioning trim  
- [x] Narrative voice §4.7  
- [x] About + founder block *(draft — refine anytime in `web/src/app/page.tsx`)*  
- [x] Experience *(mixed attribution: **Caravel Concepts** + **Riverfront** named · other CTO employers unnamed — §5 / `#experience`)*  
- [x] Expertise / skills clustering *(§6 ↔ page)*  
- [x] “Why hire” narrative + metrics checklist *(§7)*  
- [x] **Primary CTA:** email · confirmed **`info@chartroomai.com`** (**§12**)  
- [x] **`mailto:`** plain v1 *(form backlog)*  
- [x] **Résumé PDF** wired *(`/Marc-Cheatham-Resume.pdf` — §12)*  
- [x] **LinkedIn** URL supplied *(default in `siteConfig`; env override optional — §12)*  
- [ ] Optional testimonials  
- [x] **SEO sketch** in `layout.tsx` — tweak keywords anytime  

---

## 12. Still open *(needs Marc-supplied facts or files)*

| Item | Action |
|------|--------|
| **Public inbox** | Confirmed: **`info@chartroomai.com`** |
| **LinkedIn URL** | Confirmed: [`https://www.linkedin.com/in/marc-cheatham-83b35b22/`](https://www.linkedin.com/in/marc-cheatham-83b35b22/) · optional override via `NEXT_PUBLIC_LINKEDIN_URL` |
| **Résumé PDF** | Confirmed: `web/public/Marc-Cheatham-Resume.pdf` · optional override via `NEXT_PUBLIC_RESUME_URL` |
| **Experience years** | Optional: specific **start–end** for ~4 yr chapter + prior CTO ranges *(§5)* |
| **Named employers** | **Caravel Concepts** + **Riverfront** on site · others only after **opt-in** |
| **Quantified wins** | Complete §7 proof checkboxes *(anonymized OK)* |
| **Headshot + logo** | Add under **`web/public/`** |
| **Visual references** | Optional URLs for future polish |
| **Deploy target** | **Cloudflare Pages** vs **Vercel** at go-live |

---

## 13. Answer Log *(paste consolidated answers here as we go)*

- **2026-05-14:** Imported **Chart Room AI** brand guidelines from `c:\Users\emche\OneDrive\Chart Room AI\Marketing\branding.md` — positioning statement, taglines, color system, typography, voice/tone, logo concept, entity name, domain priorities, and WCAG AA intent reflected across this spec.
- **2026-05-14:** **Narrative perspective:** Default site copy in **we** (Chart Room AI); solo principal today with expectation of occasional collaborators — **“we”** denotes the LLC, not a big team; founder sections use **Marc Cheatham** by name; §4.7 for rules (*I* vs third person only in labeled founder blocks, not mixed with *we* in the same paragraph).
- **2026-05-14:** **Primary tagline locked:** Helping you navigate your AI Transformation (§4.2).
- **2026-05-14 *(spec review, interactive)* — business & ops defaults:** Primary funnel = **Chart Room AI fractional / advisory engagements** *(not full-time CTO hero)*; **chartroomai.com** canonical · **chartroom.ai** redirects; hero **Email** CTA; **no analytics v1**.
- **2026-05-14 *(spec review)* — technical defaults:** **Next.js + Tailwind**, **no CMS** for v1 (repo-hosted copy). **Hosting:** **`chartroomai.com`** DNS managed in **Cloudflare**; app target **`Cloudflare Pages` vs `Vercel`** **TBD at deploy**.
- **User confirmation:** **Domain:** **`chartroomai.com`** — registered; intended production canonical host for this site (see §2).
- **Repo:** Site code lives at **`https://github.com/cheezd/website`** — local workspace aligned as Git `origin` for pushes & CI/deploy.
- **2026-05-14 *(TBD sweep — questionnaire)*:** **US remote-first** · **résumé v1** · **speaking/board inbound open** · **conversational offering** → summarized in **§14**.
- **2026-05-14 *(TBD sweep — spec prose)*:** Filled §5–§10 gaps; §12 minimized; **§14** appendix for draft positioning lines.
- **2026-05-14:** **`#experience`** and **§5** updated: **Caravel Concepts** disclosed as **~4 yr CTO / acting CEO** fintech (**B2B software**) chapter (**Riverfront** + additional unnamed CTO employers unchanged).

---

## 14. Appendix — resolved defaults & draft copy *(2026-05-14 TBD sweep)*

### 14.1 Questionnaire *(locked)*

| Decision | Choice |
|----------|--------|
| **Geography** | **United States — remote-first**; **travel / on-site by arrangement** |
| **Résumé on site** | **Yes v1** — wired at `/Marc-Cheatham-Resume.pdf` |
| **Speaking / board / advisory** | **Open** — welcome inbound *(triage in email)* |
| **Offering copy** | **Conversational** public page — **no** heavy SOW language on v1 |

### 14.2 Industries *(draft)*

**Banks, broker-dealers, wealth & asset management, insurance carriers & distributors, fintech vendors serving regulated institutions**, and **enterprise SaaS** where **auditability, data residency, and model risk** matter.

### 14.3 Ideal engagement *(one sentence)*

A **sponsor-owned** AI or modernization agenda **stalled between strategy and shipped software**, where leadership needs a **regulated-industry CTO** to **align sponsors, architecture, security, and delivery** — leaving **evaluation and rollout discipline**, not vapor.

### 14.4 Personality & peer gap

**Adjectives:** *Authoritative, pragmatic, calm under pressure, direct, stewardship-minded.*  

**Peers often miss:** *Treating AI as a **vendor bake-off** instead of **operational change** spanning **data lineage, approvals, rollback, evaluations, incidents**, and **procurement reality**.*

### 14.5 “How we work” *(conversational v1)*

Start with **focused discovery** *(goals, constraints, stakeholders)* → **phased priorities** we **co-drive** with your team. **SOWs and fees** stay **offline** with counsel as needed.

---

*End — remaining: §12 file/URL/metrics rows.*
