// Renders the portfolio pages from data.js. Routes: #/ (home), #/case-studies, #/case/<slug> and #/about.
// Case studies with an entry in CASE_PAGES get an on-site page; the rest open as PDFs.
(() => {
  // Testimonials and Writing hold placeholder copy; switch on once real content is in data.js.
  const SHOW_PLACEHOLDERS = false;
  const STORE_KEY = 'ua-portfolio-v4';
  const PAGE_SIZE = 12;
  const VIBE_SIZE = 8;

  const app = document.getElementById('app');
  const themeBtn = document.getElementById('theme-toggle');
  const state = { gFilter: 'All', gLimit: PAGE_SIZE, vFilter: 'All', vLimit: VIBE_SIZE };
  let pendingAnchor = null;

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const map = (list, fn) => list.map(fn).join('');

  // ---------- Theme ----------
  function readStore() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch (e) { return {}; }
  }
  // Light by default; only a click on the toggle is remembered (as themeChoice).
  function setTheme(theme, remember) {
    document.documentElement.dataset.theme = theme;
    themeBtn.textContent = theme === 'dark' ? '☀ Light' : '☾ Dark';
    if (remember) try { localStorage.setItem(STORE_KEY, JSON.stringify({ ...readStore(), themeChoice: theme })); } catch (e) {}
  }
  setTheme(readStore().themeChoice || 'light');
  themeBtn.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true));

  // ---------- Routing ----------
  function parseRoute() {
    const c = location.hash.match(/^#\/case\/([\w-]+)\/?$/);
    if (c && CASE_PAGES[c[1]]) return { page: 'case', slug: c[1] };
    const m = location.hash.match(/^#\/(about|case-studies)\/?$/);
    return { page: m ? m[1] : 'home' };
  }

  function scrollToAnchor(anchor, smooth) {
    const el = anchor && document.getElementById(anchor);
    window.scrollTo({ top: el ? el.getBoundingClientRect().top + window.scrollY - document.querySelector('.site-header').offsetHeight : 0, behavior: el && smooth ? 'smooth' : 'instant' });
  }

  // Navigate to a hash route, optionally scrolling to a section once it is rendered.
  function go(hash, anchor) {
    const samePage = location.hash === hash || (hash === '#/' && parseRoute().page === 'home');
    if (samePage) { scrollToAnchor(anchor, true); return; }
    pendingAnchor = anchor || null;
    location.hash = hash;
  }

  const NAV_TARGETS = {
    work: () => go('#/', 'work'),
    cases: () => go('#/case-studies'),
    process: () => go('#/', 'process'),
    services: () => go('#/', 'services'),
    about: () => go('#/about'),
    contact: () => scrollToAnchor('contact', true)
  };
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-go]');
    if (btn) NAV_TARGETS[btn.dataset.go]();
  });

  // ---------- Shared pieces ----------
  const sectionHead = (eyebrow, title, extra = '', mod = '') => `
    <div class="section-head ${mod}">
      <div>
        <div class="eyebrow">${eyebrow}</div>
        <h2 class="section-title">${title}</h2>
      </div>
      ${extra}
    </div>`;
  const tags = (list, cls = 'tag') => list.length ? `<div class="tags">${map(list, t => `<span class="${cls}">${esc(t)}</span>`)}</div>` : '';

  // Company icon from the site's favicon; falls back to the initial when there is no domain or it fails to load.
  const logo = (name, domain, cls = 'logo') => {
    const initial = `<span class="${cls} logo-initial">${esc(name[0])}</span>`;
    return domain
      ? `<img class="${cls}" src="https://www.google.com/s2/favicons?domain=${domain}&amp;sz=64" alt="" onerror="this.outerHTML=this.dataset.fallback" data-fallback="${esc(initial)}">`
      : initial;
  };

  // A case card opens its on-site page when there is one, otherwise the PDF in a new tab.
  const caseHref = c => c.slug ? `href="#/case/${c.slug}"` : `href="${c.pdf}" target="_blank" rel="noopener"`;
  const caseCta = c => c.slug ? 'Read case study →' : 'View case study (PDF) ↗';

  // ---------- Home ----------
  function marquee() {
    const item = c => `<span class="marquee-item">${logo(c, LOGO_DOMAINS[c], 'logo logo--sm')}${esc(c)}</span>`;
    return `<div class="marquee-track">${map([...CLIENTS, ...CLIENTS], item)}</div>`;
  }

  function gallery() {
    const list = ORDER.filter(g => state.gFilter === 'All' || g.type === state.gFilter);
    const shown = list.slice(0, state.gLimit);
    const remaining = list.length - shown.length;
    return `
      <div class="gallery">${map(shown, g => `
        <a class="shot" href="${g.src}" target="_blank" rel="noopener">
          <div class="media shot-media">
            <img src="${g.src}" alt="${esc(g.title)}" loading="lazy">
            <div class="shot-cta">View project ↗</div>
          </div>
          <div class="shot-caption">
            <span class="shot-title">${esc(g.title)}</span>
            <span class="shot-type">${esc(g.type)}</span>
          </div>
        </a>`)}
      </div>
      ${remaining > 0 ? `<div class="more-wrap"><button class="more-btn" data-more>Show more (${remaining})</button></div>` : ''}`;
  }
  function filterChips() {
    return map(GTYPES, t => {
      const count = t === 'All' ? ORDER.length : ORDER.filter(g => g.type === t).length;
      return `<button class="chip${state.gFilter === t ? ' is-active' : ''}" data-filter="${esc(t)}">${GLABEL[t]} <small>${count}</small></button>`;
    });
  }
  function vibeChips() {
    return map(VTYPES, t => {
      const count = t === 'All' ? VIBE.length : VIBE.filter(v => v.type === t).length;
      return `<button class="chip${state.vFilter === t ? ' is-active' : ''}" data-vfilter="${esc(t)}">${VLABEL[t]} <small>${count}</small></button>`;
    });
  }
  function vibeCards() {
    const list = VIBE.filter(v => state.vFilter === 'All' || v.type === state.vFilter);
    return map(list.slice(0, state.vLimit), v => `
        <article class="vibe">
          <span class="label">${esc(v.type)}</span>
          <h3>${esc(v.title)}</h3>
          <p>${esc(v.desc)}</p>
          <a class="vibe-link" href="${esc(v.href)}" target="_blank" rel="noopener">Open prototype ↗</a>
        </article>`);
  }
  function refreshVibe() {
    document.getElementById('vibe-filters').innerHTML = vibeChips();
    document.getElementById('vibe-slot').innerHTML = vibeCards();
    const remaining = VIBE.filter(v => state.vFilter === 'All' || v.type === state.vFilter).length - state.vLimit;
    document.getElementById('vibe-more').innerHTML = remaining > 0 ? `<button class="more-btn" data-vmore>Show more (${remaining})</button>` : '';
  }
  function refreshGallery() {
    document.getElementById('gallery-filters').innerHTML = filterChips();
    document.getElementById('gallery-slot').innerHTML = gallery();
  }

  function homePage() {
    return `
    <section class="section">
      <div class="hero">
        <div class="hero-copy">
          <div>
            <div class="status-pill">Available for new projects</div>
            <h1 class="hero-title">I design commerce journeys that make buying feel <em>effortless.</em></h1>
            <p class="hero-text">Hi, I'm Umesh, a hands-on Lead UX/UI Designer with 13+ years across digital commerce, enterprise, healthcare and SaaS. I design customer journeys end to end, from search, PLP and PDP to cart, checkout and campaign pages, with a focus on conversion, accessibility and measurable outcomes.</p>
          </div>
          <div class="hero-actions">
            <button class="pill-btn" data-go="work">See my work</button>
            <a class="pill-btn pill-btn--outline" href="Umesh-Anghan-CV.pdf" download="Umesh-Anghan-CV.pdf">Download CV</a>
          </div>
        </div>
        <div class="portrait">
          <img src="img/umesh.jpg" alt="Umesh D. Anghan">
          <div class="portrait-tags"><span>Ecommerce UX</span><span>CRO &amp; A/B testing</span><span>Design Systems</span><span>WCAG</span></div>
        </div>
      </div>
      <div class="cells cells--row stats">
        ${map([['13+', 'Years of experience'], ['60+', 'Projects delivered'], ['20+', 'Companies served'], ['25+', 'Industries']],
          ([v, l]) => `<div class="stat"><div class="stat-value">${v}</div><div class="stat-label">${l}</div></div>`)}
      </div>
    </section>

    <section id="featured" class="section">
      ${sectionHead('Featured case studies', 'Deep dives into problems worth solving',
        '<button class="pill-btn pill-btn--outline" data-go="cases">See all case studies →</button>', 'section-head--split section-head--tight')}
      <div class="cells featured">${map(CASES, c => `
        <a class="feature" ${caseHref(c)}>
          <span class="label"><b>${c.num}</b> · ${esc(c.client)}</span>
          <h3>${esc(c.title)}</h3>
          <div class="feature-metric"><span>${esc(c.metrics[0].v)}</span>${esc(c.metrics[0].l)}</div>
          <span class="feature-cta">${caseCta(c)}</span>
        </a>`)}
      </div>
    </section>

    <section id="work" class="section">
      ${sectionHead('01 · Selected work', 'Websites, apps &amp; visual design',
        '<div class="filters" id="gallery-filters"></div>', 'section-head--split section-head--tight')}
      <div id="gallery-slot"></div>
      <div class="figma-list">
        <div><div class="eyebrow eyebrow--subtle">More in Figma</div><div class="figma-list-sub">18 product files and 4 live sites</div></div>
        <div class="tags">${map(WORK, w => `
          <a class="figma-link" href="${esc(w.href || '#')}" target="_blank" rel="noopener">${esc(w.title)} <span>${esc(w.category)}</span></a>`)}
        </div>
      </div>
    </section>

    <section id="process" class="section">
      ${sectionHead('02 · Process', 'Hands-on design, measured against business outcomes')}
      <div class="cells steps">${map(PROCESS, s => `
        <div class="step">
          <span class="step-num">${s.n}</span>
          <div class="step-title">${esc(s.title)}</div>
          <p>${esc(s.body)}</p>
          <div class="step-tools">${esc(s.tools)}</div>
        </div>`)}
      </div>
    </section>

    <section id="services" class="section">
      ${sectionHead('03 · What I bring', 'Ecommerce UX, conversion and design systems')}
      <div class="cells services">${map(SERVICES, s => `
        <div class="service">
          <span class="service-num">${s.n}</span>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.body)}</p>
          ${tags(s.tags)}
        </div>`)}
      </div>
    </section>

    ${SHOW_PLACEHOLDERS ? `
    <section id="testimonials" class="section">
      ${sectionHead('05 · Kind words', 'What collaborators say')}
      <div class="cells quotes">${map(TESTIMONIALS, t => `
        <figure class="quote">
          <span class="quote-mark">“</span>
          <blockquote>${esc(t.quote)}</blockquote>
          <figcaption><b>${esc(t.name)}</b><span>${esc(t.role)}</span></figcaption>
        </figure>`)}
      </div>
    </section>
    <section id="writing" class="section">
      ${sectionHead('06 · Writing &amp; talks', 'Notes on AI-augmented design',
        '<a href="https://medium.com/@anghanumeshd8" target="_blank" rel="noopener" style="font:700 14px var(--sans)">All articles on Medium ↗</a>', 'section-head--split section-head--tight')}
      ${map(WRITING, w => `
        <a class="writing-row" href="https://medium.com/@anghanumeshd8" target="_blank" rel="noopener">
          <span class="label">${esc(w.type)}</span>
          <span class="writing-title">${esc(w.title)}</span>
          <span class="writing-arrow">↗</span>
        </a>`)}
    </section>` : ''}`;
  }

  // ---------- Case studies ----------
  function caseStudiesPage() {
    return `
    <section id="cases" class="section">
      ${sectionHead('Case studies', 'Deep dives into problems worth solving',
        '<p class="section-note">Workers&#39; comp claims, enterprise data, AI hiring and hospitality.</p>', 'section-head--split')}
      ${map(CASES, c => `
        <a class="case-card" ${caseHref(c)}>
          <div class="case-card-body">
            <div class="case-card-meta label"><span><b>${c.num}</b> · ${esc(c.client)} · ${esc(c.category)}</span><span>${esc(c.role)}</span></div>
            <h3 class="case-card-title">${esc(c.title)}</h3>
            <p class="case-card-text">${esc(c.summary)}</p>
            <div class="case-card-cta">${caseCta(c)}</div>
          </div>
          <div class="case-card-metrics">${map(c.metrics, m => `
            <div class="metric-soft"><div class="metric-soft-value">${esc(m.v)}</div><div class="metric-soft-label">${esc(m.l)}</div></div>`)}
          </div>
        </a>`)}
    </section>`;
  }

  // ---------- Case study page ----------
  function casePage(slug) {
    const p = CASE_PAGES[slug];
    const i = CASES.findIndex(c => c.slug === slug);
    const next = CASES.slice(i + 1).concat(CASES.slice(0, i)).find(c => c.slug) || CASES[(i + 1) % CASES.length];
    const shot = (im, cls = '') => `<figure class="cs-shot ${cls}"><a href="${im.src}" target="_blank" rel="noopener"><img src="${im.src}" alt="${esc(im.alt)}" loading="lazy"></a>${im.caption ? `<figcaption>${esc(im.caption)}</figcaption>` : ''}</figure>`;
    const section = s => `
      <section class="cs-section">
        <div class="cs-side"><div class="eyebrow">${esc(s.eyebrow)}</div><h2>${esc(s.title)}</h2></div>
        <div class="cs-main">
          ${map(s.body || [], b => `<p>${esc(b)}</p>`)}
          ${s.stats ? `<div class="cs-stats">${map(s.stats, ([v, l]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`)}</div>` : ''}
          ${s.list ? `<dl class="cs-list">${map(s.list, ([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`)}</dl>` : ''}
          ${s.quotes ? map(s.quotes, q => `<blockquote class="cs-quote">${esc(q)}</blockquote>`) : ''}
          ${s.note ? `<p class="cs-note">${esc(s.note)}</p>` : ''}
          ${s.table ? `<div class="cs-table"><table><thead><tr>${map(s.table.head, h => `<th>${esc(h)}</th>`)}</tr></thead><tbody>${map(s.table.rows, r => `<tr>${map(r, (d, k) => `<td${k === 3 ? ' class="cs-result"' : ''}>${esc(d)}</td>`)}</tr>`)}</tbody></table></div>` : ''}
          ${map(s.images || [], im => shot(im, 'cs-shot--' + im.kind))}
        </div>
        ${s.decisions ? `<div class="cs-decisions">${map(s.decisions, d => `
          <article class="cs-decision">${shot({ src: d.src, alt: d.title })}<div><h3>${esc(d.title)}</h3><p>${esc(d.text)}</p></div></article>`)}</div>` : ''}
        ${s.phones ? `<div class="cs-phones">${map(s.phones, src => `<img src="${src}" alt="nTouch mobile screen" loading="lazy">`)}</div>` : ''}
      </section>`;
    return `
    <div class="cs-back"><button class="text-btn" data-go="cases">← All case studies</button></div>
    <header class="cs-head">
      <div class="eyebrow">${esc(p.client)} · ${esc(p.category)}</div>
      <h1>${esc(p.title)}</h1>
      <p class="cs-summary">${esc(p.summary)}</p>
    </header>
    <div class="cells cells--row facts">${map(p.facts, ([l, v]) => `<div class="fact"><div class="label">${esc(l)}</div><div class="fact-value">${esc(v)}</div></div>`)}</div>
    <section class="cs-outcomes">
      <div class="eyebrow">Outcome</div>
      <div class="cs-outcome-grid">${map(p.outcomes, o => `<div><b>${esc(o.v)}</b><span>${esc(o.l)}</span></div>`)}</div>
      ${p.outcomeNote ? `<p class="cs-fine">${esc(p.outcomeNote)}</p>` : ''}
    </section>
    ${map(p.sections, section)}
    <section class="cs-section cs-learned">
      <div class="cs-side"><div class="eyebrow">What I learned</div></div>
      <div class="cs-main"><p class="cs-lead">${esc(p.learned)}</p>
        <a class="pill-btn pill-btn--outline" href="${p.pdf}" target="_blank" rel="noopener">Full case study (PDF) ↗</a></div>
    </section>
    <a class="cs-next" ${caseHref(next)}><span class="eyebrow">Next case study</span><span class="cs-next-title">${esc(next.title)} →</span></a>`;
  }

  // ---------- About ----------
  function aboutPage() {
    return `
    <section class="hero" style="border-bottom:1px solid var(--line)">
      <div class="about-copy">
        <div class="eyebrow">About me</div>
        <h1 class="about-title">Customer journeys that <em>convert</em>, built on design craft.</h1>
        <p>I'm Umeshkumar D. Anghan, a hands-on Lead UX/UI Designer with 13+ years of experience leading UX strategy and delivering web and mobile products across digital commerce, enterprise, healthcare, life sciences and SaaS.</p>
        <p>I design customer journeys end to end, from search, product listing and product detail pages to cart, checkout, account and campaign landing pages, with a focus on conversion, accessibility and measurable outcomes. My foundation is manual design craft: user research, user flows, wireframes, pixel-precise responsive UI and scalable design systems built in Figma.</p>
        <p>Currently at GSPANN, I work with US-based product, marketing and engineering stakeholders on global brand programmes, and use an AI-first workflow (Claude, Claude Design, Figma Make, Lovable) to move faster from insight to validated prototype.</p>
        <div class="about-facts">
          ${map([['Based in', 'Surat, India'], ['Languages', 'English, Hindi, Gujarati'], ['Degree', 'B.Tech, Computer Eng.']],
            ([l, v]) => `<div><div class="label">${l}</div><div class="about-fact-value">${v}</div></div>`)}
        </div>
      </div>
      <div class="portrait"><img src="img/umesh.jpg" alt="Umesh D. Anghan"></div>
    </section>

    <section class="section">
      ${sectionHead('Experience', 'Where I\'ve made an impact', '', 'section-head--tight')}
      ${map(EXPERIENCE, e => `
      <article class="job">
        <div class="job-side">
          <div class="job-head">${logo(e.company, e.domain, 'logo logo--lg')}<span class="job-dates">${esc(e.dates)}</span>${e.current ? '<span class="badge">CURRENT</span>' : ''}</div>
          <h3 class="job-company">${esc(e.company)}</h3>
          <div class="job-role">${esc(e.role)}</div>
          ${e.domain ? `<a class="job-link" href="https://www.${e.domain}/" target="_blank" rel="noopener">View details ↗ <span>${esc(e.domain)}</span></a>` : ''}
        </div>
        <div class="job-body span-2">
          <ul>${map(e.points, p => `<li>${esc(p)}</li>`)}</ul>
          ${e.projects ? `<dl class="job-projects">${map(e.projects, ([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`)}</dl>` : ''}
          ${tags(e.tags)}
        </div>
      </article>`)}
    </section>

    <section class="two-col">
      <div>
        <div class="col-head eyebrow">Toolkit</div>
        <div class="cells tools">${map(TOOLS, t => `<div class="tool"><b>${esc(t.name)}</b><span>${esc(t.use)}</span></div>`)}</div>
      </div>
      <div class="edu-col">
        <div class="col-head eyebrow">Education</div>
        ${map(EDUCATION, ed => `
        <div class="edu">
          <div><div class="edu-degree">${esc(ed.degree)}</div><div class="edu-school">${esc(ed.school)}</div></div>
          <div class="edu-meta"><div>${esc(ed.years)}</div><b>${esc(ed.score)}</b></div>
        </div>`)}
        <div class="cv-wrap"><a class="pill-btn pill-btn--outline" href="Umesh-Anghan-CV.pdf" download="Umesh-Anghan-CV.pdf">Download CV</a></div>
      </div>
    </section>`;
  }

  // ---------- Render ----------
  const NAV_ACTIVE = { home: 'work', 'case-studies': 'cases', case: 'cases', about: 'about' };

  function render() {
    const route = parseRoute();
    if (route.page === 'case') {
      app.innerHTML = casePage(route.slug);
      document.title = CASE_PAGES[route.slug].client + ' case study · Umesh Anghan';
    } else if (route.page === 'case-studies') {
      app.innerHTML = caseStudiesPage();
      document.title = 'Case studies · Umesh Anghan';
    } else if (route.page === 'about') {
      app.innerHTML = aboutPage();
      document.title = 'About · Umesh Anghan';
    } else {
      app.innerHTML = homePage();
      refreshGallery();
      document.title = 'Umesh Anghan · Lead UX/UI Designer';
    }

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('is-active', b.dataset.go === NAV_ACTIVE[route.page]));

    const anchor = pendingAnchor;
    pendingAnchor = null;
    requestAnimationFrame(() => scrollToAnchor(anchor, true));
  }

  app.addEventListener('click', e => {
    const chip = e.target.closest('[data-filter]');
    if (chip) { state.gFilter = chip.dataset.filter; state.gLimit = PAGE_SIZE; refreshGallery(); return; }
    const vchip = e.target.closest('[data-vfilter]');
    if (vchip) { state.vFilter = vchip.dataset.vfilter; state.vLimit = VIBE_SIZE; refreshVibe(); return; }
    if (e.target.closest('[data-vmore]')) { state.vLimit = VIBE.length; refreshVibe(); return; }
    if (e.target.closest('[data-more]')) { state.gLimit += PAGE_SIZE; refreshGallery(); }
  });

  window.addEventListener('hashchange', render);
  render();
})();
