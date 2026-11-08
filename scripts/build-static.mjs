import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { person, numbers, focusAreas, directions, publications, projects, experience, skillGroups, highlights } from '../src/content.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'dist');
const esc = (v) => String(v ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const glyphs = {
  arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
  right: '<path d="M4 12h16m-7-7 7 7-7 7"/>',
  down: '<path d="M12 3v18m-7-7 7 7 7-7"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  x: '<path d="M5 5l14 14M19 5 5 19"/>',
  brain: '<path d="M12 18V5a4 4 0 0 0-7.5-1.8A5 5 0 0 0 3 11.5 4.5 4.5 0 0 0 8 20a4 4 0 0 0 4-2ZM12 18V5a4 4 0 0 1 7.5-1.8A5 5 0 0 1 21 11.5 4.5 4.5 0 0 1 16 20a4 4 0 0 1-4-2Z"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  shield: '<path d="m12 2 8 4v6c0 5-3.5 8.2-8 10-4.5-1.8-8-5-8-10V6l8-4ZM8 12l2.5 2.5L16 9"/>',
  microscope: '<path d="m7 3 7 7m-4-9 5 5-4 4-5-5 4-4ZM11 10l-3 3a5 5 0 0 0 7 7m-9-2h14m-10 4h11M18 14a5 5 0 0 1-5 5"/>',
  graduation: '<path d="m2 9 10-5 10 5-10 5-10-5Zm4 3v5c3 3 9 3 12 0v-5m4-3v8"/>',
  clipboard: '<rect x="6" y="5" width="14" height="17" rx="2"/><path d="M9 5V3h8v2M10 10h6M10 14h6"/>',
  check: '<path d="M4 12l5 5L20 6"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 8L22 6"/>',
  map: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
};

const icon = (n, sz = 18) => `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${glyphs[n] || glyphs.arrow}</svg>`;
const eyebrow = (label) => `<div class="eyebrow"><span class="eyebrow-rule"></span>${esc(label)}</div>`;
const intro = (label, title, summary, light = false) => `<div class="section-intro ${light ? 'section-intro--light' : ''}">${eyebrow(label)}<div class="section-intro__row"><h2>${title}</h2><p>${esc(summary)}</p></div></div>`;
const tag = (s) => `<span class="tag">${esc(s)}</span>`;
const socialLinks = [
  ['Google Scholar', person.social.scholar],
  ['GitHub', person.social.github],
  ['LinkedIn', person.social.linkedin],
  ['ORCID', person.social.orcid],
];
const ext = 'target="_blank" rel="noopener noreferrer"';
const filterNames = ['All work', 'Neuroimaging', 'Medical imaging', 'Clinical AI', 'Computer vision'];
const projectCategories = ['All projects', 'Clinical AI', 'AI systems', 'Computer vision', 'Engineering'];

function paperCard(p, i) {
  const statusClass = p.status === 'Published' ? 'published' : p.status === 'Under review' ? 'review' : 'accepted';
  const image = p.image
    ? `<img src="${esc(p.image.replace(/^\//, ''))}" alt="Research illustration for ${esc(p.short)}" loading="lazy" />`
    : `<div class="image-placeholder">${icon('brain', 52)}<span>INTERPRETABLE MRI</span></div>`;

  const doiLink = p.url
    ? `<a class="paper-link" href="${esc(p.url)}" ${ext} aria-label="Open publication for ${esc(p.short)}">DOI / Paper ${icon('arrow', 14)}</a>`
    : '';

  return `<article class="paper-card ${p.featured && i === 0 ? 'paper-card--featured' : ''} reveal" data-paper-category="${esc(p.category)}" data-paper-id="${esc(p.id)}" data-paper-index="${i}" ${i >= 5 ? 'hidden' : ''}>
    <div class="paper-card-inner">
      <div class="paper-meta-top">
        <span class="paper-number">${esc(p.number)} / ${esc(p.category)}</span>
        <span class="paper-status paper-status--${statusClass}"><span class="status-dot"></span>${esc(p.status)}</span>
      </div>
      <div class="paper-content">
        <div class="paper-image-wrap">${image}</div>
        <div class="paper-text">
          <div class="paper-venue">${esc(p.short)} <span>· ${esc(p.venue)} · ${esc(p.year)}</span></div>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.description)}</p>
          <div class="paper-contribution"><strong>Key focus:</strong> ${esc(p.metrics)}</div>
          <div class="paper-topics">${p.topics.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        </div>
      </div>
      <div class="paper-card-footer">
        <span class="paper-role">${esc(p.role)}</span>
        <div class="paper-actions-right">
          ${doiLink}
          <button type="button" class="paper-details-btn" data-open-paper-modal="${esc(p.id)}" aria-label="Read abstract for ${esc(p.short)}">Details &amp; Abstract ${icon('right', 13)}</button>
        </div>
      </div>
    </div>
  </article>`;
}

function paperTemplate(p) {
  const statusClass = p.status === 'Published' ? 'published' : p.status === 'Under review' ? 'review' : 'accepted';
  const image = p.image
    ? `<img src="${esc(p.image.replace(/^\//, ''))}" alt="${esc(p.title)} visual" loading="lazy"/>`
    : `<div class="image-placeholder" style="height:220px">${icon('brain', 60)}<span>INTERPRETABLE MRI RESEARCH</span></div>`;

  const externalBtn = p.url
    ? `<a class="button button--primary" href="${esc(p.url)}" ${ext}>Open Paper / DOI ${icon('arrow', 16)}</a>`
    : '';

  return `<template id="paper-details-${esc(p.id)}">
    <div class="modal-visual">${image}</div>
    <div class="modal-content">
      <div class="eyebrow" style="margin-bottom:8px">
        <span class="paper-status paper-status--${statusClass}" style="margin-right:10px"><span class="status-dot"></span>${esc(p.status)}</span>
        ${esc(p.number)} / ${esc(p.venue)} · ${esc(p.year)}
      </div>
      <h2>${esc(p.title)}</h2>
      <div class="paper-modal-authors">${esc(p.authors)}</div>
      <div class="paper-modal-metrics">
        ${icon('check', 18)} <span>${esc(p.metrics)}</span>
      </div>
      <h3 style="font-size:15px; text-transform:uppercase; letter-spacing:.08em; color:#245b58; margin-top:22px; margin-bottom:10px;">Abstract &amp; Research Summary</h3>
      <p style="font-size:13.5px; line-height:1.85; color:#526b65;">${esc(p.abstract)}</p>
      <div class="paper-modal-methods">
        <h4>Methodological Highlights</h4>
        <ul>${p.methods.map(m => `<li>${esc(m)}</li>`).join('')}</ul>
      </div>
      <div class="tag-list" style="margin-top:16px">${p.topics.map(tag).join('')}</div>
      <div class="modal-actions">
        ${externalBtn}
        <button class="button button--outline" type="button" data-open-cv>${icon('eye', 16)} Preview Academic CV</button>
        <button class="button button--quiet" type="button" data-close-paper-modal>Back to publications ${icon('right', 15)}</button>
      </div>
    </div>
  </template>`;
}

function projectCard(p, i) {
  const image = p.image
    ? `<img src="${esc(p.image.replace(/^\//, ''))}" loading="lazy" alt="${esc(p.title)} project visualization"/>`
    : `<div class="project-fallback">${icon('activity', 65)}</div>`;

  return `<article class="project-card ${i === 0 ? 'project-card--main' : ''} reveal" data-project-category="${esc(p.category)}">
    <button class="project-open" type="button" data-project-id="${esc(p.id)}" aria-label="View details for ${esc(p.title)}">
      <div class="project-image">${image}<span class="project-top-right">${icon('arrow', 20)}</span></div>
      <div class="project-body">
        <div class="project-eyebrow">${esc(p.eyebrow)}<span>${esc(p.year)}</span></div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.subtitle)}</p>
        <div class="project-tags">${p.stack.slice(0, 4).map(t => `<span>${esc(t)}</span>`).join('')}</div>
        <div class="project-bottom">
          <span>${esc(p.status)}</span>
          <span>Explore case study ${icon('right', 15)}</span>
        </div>
      </div>
    </button>
  </article>`;
}

function projectTemplate(p) {
  const image = p.image
    ? `<img src="${esc(p.image.replace(/^\//, ''))}" alt="${esc(p.title)} visual" loading="lazy"/>`
    : `<div class="project-fallback" style="height:220px">${icon('activity', 70)}</div>`;

  const link = p.link ? `<a class="button button--primary" href="${esc(p.link)}" ${ext}>Visit live demo ${icon('arrow')}</a>` : '';
  const repo = p.repo ? `<a class="button button--outline" href="${esc(p.repo)}" ${ext}>View repository ${icon('arrow')}</a>` : '';

  return `<template id="details-${esc(p.id)}">
    <div class="modal-visual">${image}</div>
    <div class="modal-content">
      ${eyebrow(p.eyebrow)}
      <h2>${esc(p.title)}</h2>
      <h3>${esc(p.subtitle)}</h3>
      <p><strong>System Overview:</strong> ${esc(p.description)}</p>
      <p><strong>Architecture &amp; Engineering:</strong> ${esc(p.details)}</p>
      <div class="tag-list">${p.stack.map(tag).join('')}</div>
      <div class="modal-actions">
        ${link}
        ${repo}
        <button class="button button--quiet" type="button" data-close-modal>Back to projects ${icon('right')}</button>
      </div>
    </div>
  </template>`;
}

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="theme-color" content="#f5f5ef"/>
  <meta name="description" content="Abdullah Ibne Tayeb Tamur — Medical AI researcher and Research Assistant working on 3D brain MRI, explainable AI, clinical triage, and trustworthy medical image evaluation."/>
  <meta name="author" content="Abdullah Ibne Tayeb Tamur"/>
  <meta name="robots" content="index,follow"/>
  <meta property="og:type" content="profile"/>
  <meta property="og:title" content="Abdullah Tamur | Medical AI Research & Engineering"/>
  <meta property="og:description" content="Building trustworthy AI for medical imaging and clinical decisions. Six published or accepted papers, including CMA-Fusion, CHD-Net, and HemX."/>
  <meta property="og:image" content="https://bintamur404.github.io/Portfolio/profile/tamur.png"/>
  <meta property="og:url" content="https://bintamur404.github.io/Portfolio/"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <link rel="canonical" href="https://bintamur404.github.io/Portfolio/"/>
  <link rel="icon" type="image/svg+xml" href="favicon.svg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css"/>
  <title>Abdullah Ibne Tayeb Tamur — Medical AI Researcher</title>
  <script src="site.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <!-- Header -->
  <header class="site-header">
    <div class="container header-inner">
      <a href="#home" class="brand" aria-label="Abdullah Tamur home">
        <span class="brand-mark">a<span>.</span>t</span>
        <span class="brand-name">ABDULLAH TAMUR <small>RESEARCH PORTFOLIO</small></span>
      </a>
      <nav id="primary-nav" class="nav" aria-label="Primary navigation">
        <a href="#about">About</a>
        <a href="#focus">Focus</a>
        <a href="#research">Research</a>
        <a href="#publications">Publications</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
        <a href="#preview-cv" class="mobile-cv-link" id="mobile-preview-cv-btn">${icon('eye', 16)} Preview CV</a>
        <a href="Abdullah_Tamur_CV_2027.pdf" class="mobile-cv-link" download="Abdullah_Tamur_CV_2027.pdf" style="background:#245b58">Download CV ${icon('download', 16)}</a>
      </nav>
      <div class="header-actions">
        <button type="button" class="header-cv-preview" id="preview-cv-btn" title="Preview Academic Curriculum Vitae">
          ${icon('eye', 15)} <span>Preview CV</span>
        </button>
        <a class="header-cv" href="Abdullah_Tamur_CV_2027.pdf" download="Abdullah_Tamur_CV_2027.pdf" title="Download Academic PDF CV">
          <span>Download CV</span> ${icon('download', 14)}
        </a>
        <button type="button" class="theme-toggle" id="theme-toggle" aria-label="Switch to dark mode"></button>
        <button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu">${icon('menu', 22)}</button>
      </div>
    </div>
  </header>

  <main id="main">
    <!-- Hero Section -->
    <section class="hero" id="home">
      <div class="hero-gradient-accent hero-gradient-accent--1"></div>
      <div class="hero-gradient-accent hero-gradient-accent--2"></div>
      <div class="hero-grid" aria-hidden="true"></div>

      <div class="container hero-layout">
        <div class="hero-copy reveal">
          <div class="hero-status">
            <span class="live-dot"></span>Research Assistant · Medical AI · Elite Research Lab
          </div>
          <div class="hero-name">ABDULLAH IBNE TAYEB TAMUR</div>
          <h1>Building Trustworthy AI for <em>Medical Imaging</em> and Clinical Decisions.</h1>
          <p class="hero-description">I build interpretable, clinically validated AI systems for medical imaging, hematological triage, and multimodal neuroimaging — with a focus on evidence, uncertainty, and deployability.</p>
          <div class="hero-buttons">
            <a class="button button--primary" href="#publications">Explore my research ${icon('arrow', 18)}</a>
            <button type="button" class="button button--outline" id="hero-preview-cv-btn">${icon('eye', 17)} Preview CV</button>
            <a class="button button--quiet" href="Abdullah_Tamur_CV_2027.pdf" download="Abdullah_Tamur_CV_2027.pdf">${icon('download', 17)} Download academic CV</a>
          </div>
          <div class="hero-socials">
            ${socialLinks.map(([label, url]) => `<a href="${esc(url)}" ${ext}>${label} ${icon('arrow', 13)}</a>`).join('')}
          </div>
        </div>

        <div class="hero-visual reveal">
          <div class="hero-portrait-wrap">
            <img class="hero-portrait" src="profile/tamur.png" alt="Portrait of Abdullah Ibne Tayeb Tamur" fetchpriority="high"/>
            <div class="hero-portrait-base">
              <span>Trustworthy AI</span>
              <span>Evidence-Aware Science</span>
            </div>
          </div>
          <div class="hero-sticker">
            ${icon('microscope', 22)}
            <span>IEEE QPAIN 2026<br/><strong>Best Presenter Award 🏆</strong></span>
          </div>
        </div>
      </div>

      <div class="container hero-bottom">
        <a class="scroll-cue" href="#focus">Scroll to explore ${icon('down', 16)}</a>
        <span>CHATTOGRAM, BANGLADESH · TARGETING FALL 2027 GRADUATE RESEARCH</span>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section" aria-label="Research at a glance">
      <div class="container stats-grid stagger">
        ${numbers.map(n => `<div class="stat">
          <div class="stat-number" data-count="${n.count}">${esc(n.number)}</div>
          <div class="stat-copy">
            <strong>${esc(n.title)}</strong>
            <span>${esc(n.note)}</span>
          </div>
        </div>`).join('')}
      </div>
    </section>

    <!-- Research Focus Section -->
    <section class="research-interests-section" id="focus" aria-label="Research focus areas">
      <div class="container">
        <div class="reveal">
          ${eyebrow('Research Focus')}
          <div class="section-intro__row">
            <h2>Core Research <em>Directions.</em></h2>
            <p>Four interconnected directions that define how I formulate problems, build architectures, and evaluate clinical utility.</p>
          </div>
        </div>
        <div class="interests-grid stagger">
          ${focusAreas.map(f => `<div class="interest-card" style="--accent-color:${esc(f.accent)}">
            <div class="interest-icon">${icon(f.icon, 24)}</div>
            <h3>${esc(f.title)}</h3>
            <p>${esc(f.description)}</p>
            <div class="interest-keywords">
              ${f.keywords.map(k => `<span>${esc(k)}</span>`).join('')}
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- About Me Section -->
    <section id="about" class="section about-section">
      <div class="container about-layout">
        <div class="reveal">
          ${eyebrow('01 / About me')}
          <h2 class="about-heading">From promising models to <em>dependable</em> evidence.</h2>
        </div>
        <div class="about-main reveal">
          <p class="lead">I’m a Computer Science and Engineering graduate from International Islamic University Chittagong, now working as a Research Assistant at Elite Research Lab LLC.</p>
          <p>My research sits at the intersection of <strong>medical imaging, multimodal learning, explainable AI, and careful model evaluation.</strong> I have worked on Alzheimer’s detection from 3D MRI and clinical biomarkers, interpretable pediatric congenital heart disease from medical images, brain-tumor MRI triage, and hematological decision support.</p>
          <p>Across all these projects, the central scientific question remains: can we build diagnostic systems that do more than output uncalibrated predictions—systems whose evidence, failure modes, and uncertainty are inspectable by clinicians?</p>
          <a href="#publications" class="text-link">Explore published and accepted papers ${icon('arrow', 18)}</a>
        </div>
      </div>
    </section>

    <!-- Research Directions Section -->
    <section id="research" class="section research-section">
      <div class="container">
        <div class="reveal">
          ${intro('02 / Methodology', 'Research with clinical <em>context.</em>', 'Three interconnected methodologies shape how I construct experiments and evaluate clinical outcomes.')}
        </div>
        <div class="direction-grid stagger">
          ${directions.map(d => `<article class="direction-card">
            <div class="direction-card-top">
              <span>${esc(d.no)} / FOCUS AREA</span>
              <span class="direction-icon">${icon(d.icon, 28)}</span>
            </div>
            <h3>${esc(d.title)}</h3>
            <p>${esc(d.description)}</p>
            <div class="tag-list">${d.tags.map(tag).join('')}</div>
          </article>`).join('')}
        </div>
        <div class="research-note reveal">
          <span class="research-note__icon">${icon('microscope', 22)}</span>
          <p><strong>Evaluation principle:</strong> A medical AI model’s reported score is meaningless unless evaluation strictly enforces patient-isolated splits, zero data leakage, and clinical transparency.</p>
          <span class="research-note__decoration">EVIDENCE OVER HYPE ↗</span>
        </div>
      </div>
    </section>

    <!-- Publications Section -->
    <section id="publications" class="section publications-section">
      <div class="container">
        <div class="reveal">
          ${intro('03 / Publications', 'Peer-reviewed research <em>&amp; manuscripts.</em>', 'Six conference papers (published or accepted) and two manuscripts under review. Click any paper for full abstract, metrics, and methodology.')}
        </div>
        <div class="paper-toolbar reveal">
          <div class="filter-list" role="group" aria-label="Filter publications by research area">
            ${filterNames.map((f, i) => `<button class="filter-button ${i === 0 ? 'filter-button--active' : ''}" type="button" aria-pressed="${i === 0}" data-paper-filter="${esc(f)}">${esc(f)}</button>`).join('')}
          </div>
          <span class="result-count" id="paper-count">08 ITEMS</span>
        </div>
        <div class="publication-grid">
          ${publications.map(paperCard).join('')}
        </div>
        <div class="all-work">
          <button type="button" class="button button--outline" id="show-papers">View all 8 research works ${icon('right')}</button>
          <button type="button" class="text-link" id="hide-papers" hidden>Show fewer publications ↑</button>
        </div>
        <p class="publication-disclaimer">“Accepted” denotes papers accepted for conference publication following peer review. Manuscripts “under review” are currently undergoing journal peer review and are explicitly distinguished.</p>
      </div>
    </section>

    <!-- Projects Section (Case Studies) -->
    <section id="projects" class="section projects-section">
      <div class="container">
        <div class="reveal">
          ${intro('04 / Selected systems', 'Where research meets <em>engineering.</em>', 'Full-stack prototypes and clinical applications that translate theoretical models into deployable software with rigorous guardrails.', true)}
        </div>
        <div class="project-filters reveal" role="group" aria-label="Filter projects">
          ${projectCategories.map((c, i) => `<button class="project-filter ${i === 0 ? 'project-filter--active' : ''}" type="button" aria-pressed="${i === 0}" data-project-filter="${esc(c)}">${esc(c)}</button>`).join('')}
        </div>
        <div class="project-grid">
          ${projects.map(projectCard).join('')}
        </div>
        <p class="projects-note">Project visuals illustrate engineering prototypes and research software. They are designed for research investigation and not for unsupervised autonomous clinical diagnosis.</p>
      </div>
    </section>

    <!-- Experience Section -->
    <section id="experience" class="section experience-section">
      <div class="container">
        <div class="reveal">
          ${intro('05 / Experience', 'Learning by <em>doing the work.</em>', 'Research appointments, mentoring, and technical leadership that guide my scientific approach.')}
        </div>
        <div class="experience-grid">
          <div class="timeline reveal-left">
            ${experience.map(x => `<article class="timeline-item">
              <span class="timeline-dot"></span>
              <div class="timeline-date">${esc(x.period)}</div>
              <div class="timeline-content">
                <div class="timeline-title">
                  <h3>${esc(x.role)}</h3>
                  ${x.current ? '<span class="current-label">CURRENT</span>' : ''}
                </div>
                <div class="timeline-org">${esc(x.organization)} <span>· ${esc(x.place)}</span></div>
                <p>${esc(x.text)}</p>
              </div>
            </article>`).join('')}
          </div>
          <div class="skills-panel reveal">
            <div class="skills-panel-header">
              ${icon('microscope', 22)}
              <span>RESEARCH &amp; ENGINEERING TOOLKIT</span>
            </div>
            ${skillGroups.map(g => `<div class="skill-group">
              <h3>${esc(g.label)}</h3>
              <div class="skill-pills">
                ${g.items.map(item => `<span>${esc(item)}</span>`).join('')}
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="section education-section" id="education">
      <div class="container education-grid">
        <div class="education-col reveal">
          ${eyebrow('06 / Education')}
          <h2>Built on a solid computing foundation.</h2>
          <div class="education-block">
            <div class="edu-icon">${icon('graduation', 26)}</div>
            <div>
              <div class="edu-date">JAN 2022 — JUN 2026</div>
              <h3>B.Sc. in Computer Science and Engineering</h3>
              <p>International Islamic University Chittagong (IIUC)</p>
              <div class="education-grades">
                <span>Overall CGPA <strong>3.416 / 4.00</strong></span>
                <span>Last four semesters GPA <strong>3.71 / 4.00</strong></span>
              </div>
            </div>
          </div>
        </div>
        <div class="highlights-col reveal">
          ${eyebrow('07 / Recognition & service')}
          <h2>Beyond the research lab.</h2>
          <div class="highlights-list stagger">
            ${highlights.map((h, i) => `<div class="highlight">
              <div class="highlight-number">0${i + 1}</div>
              <div>
                <h3>${esc(h.title)}</h3>
                <span>${esc(h.meta)}</span>
                <p>${esc(h.text)}</p>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Contact & Footer -->
  <footer id="contact" class="contact-section">
    <div class="container">
      <div class="contact-head reveal">
        ${eyebrow('08 / Get in touch')}
        <span class="contact-ready"><span class="live-dot"></span>OPEN TO RESEARCH CONVERSATIONS</span>
      </div>
      <div class="contact-main">
        <div class="reveal">
          <h2>Let’s make clinical AI <em>more dependable.</em></h2>
          <p>I welcome conversations about prospective PhD supervision, medical AI research collaborations, and visiting research appointments.</p>
          <div class="contact-actions">
            <a href="mailto:${esc(person.email)}" class="button button--cream">Start a conversation ${icon('mail', 18)}</a>
            <button id="copy-email" type="button" class="button button--contact-outline">${icon('clipboard', 17)} <span>Copy email</span></button>
            <button type="button" class="button button--contact-outline" data-open-cv>${icon('eye', 17)} <span>Preview CV</span></button>
          </div>
        </div>
        <div class="contact-info reveal">
          <span>DIRECT CONTACT</span>
          <a href="mailto:${esc(person.email)}">${esc(person.email)} ${icon('arrow')}</a>
          <div class="contact-location">${icon('map', 17)} ${esc(person.location)}</div>
          <div class="contact-socials">
            ${socialLinks.map(([label, url]) => `<a href="${esc(url)}" ${ext}>${label} ${icon('arrow', 14)}</a>`).join('')}
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <a href="#home" class="footer-brand">a<span>.</span>t</a>
        <span>© ${new Date().getUTCFullYear()} Abdullah Ibne Tayeb Tamur</span>
        <span>Built for clarity, scientific honesty &amp; careful medicine.</span>
        <a href="#home" class="back-top">Back to top ↑</a>
      </div>
    </div>
  </footer>

  <!-- Modals -->
  <!-- 1. Paper Details Modal -->
  <dialog id="paper-modal" class="project-modal" aria-labelledby="paper-modal-title">
    <button class="modal-close" type="button" id="paper-modal-close" aria-label="Close paper details">${icon('x', 20)}</button>
    <div id="paper-modal-body"></div>
  </dialog>

  <!-- 2. Project Details Modal -->
  <dialog id="project-modal" class="project-modal" aria-labelledby="project-modal-title">
    <button class="modal-close" type="button" id="project-modal-close" aria-label="Close project details">${icon('x', 20)}</button>
    <div id="project-modal-body"></div>
  </dialog>

  <!-- 3. CV Preview Modal -->
  <dialog id="cv-modal" class="cv-modal" aria-labelledby="cv-modal-title">
    <div class="cv-modal-header">
      <h3 id="cv-modal-title">${icon('clipboard', 18)} Abdullah Ibne Tayeb Tamur — Curriculum Vitae</h3>
      <div class="cv-modal-controls">
        <a class="cv-modal-btn" href="Abdullah_Tamur_CV_2027.pdf" target="_blank" rel="noopener noreferrer">${icon('external', 14)} Open in new tab</a>
        <a class="cv-modal-btn" href="Abdullah_Tamur_CV_2027.pdf" download="Abdullah_Tamur_CV_2027.pdf">${icon('download', 14)} Download PDF</a>
        <button class="cv-modal-close" type="button" id="cv-modal-close" aria-label="Close CV preview">${icon('x', 22)}</button>
      </div>
    </div>
    <div class="cv-modal-body">
      <iframe src="Abdullah_Tamur_CV_2027.pdf#view=FitH" title="Curriculum Vitae Preview" class="cv-iframe"></iframe>
    </div>
  </dialog>

  <!-- Paper Templates -->
  ${publications.map(paperTemplate).join('')}

  <!-- Project Templates -->
  ${projects.map(projectTemplate).join('')}
</body>
</html>`;

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'index.html'), html, 'utf8');
fs.copyFileSync(path.join(root, 'src/index.css'), path.join(out, 'style.css'));
fs.copyFileSync(path.join(root, 'src/site.js'), path.join(out, 'site.js'));
fs.cpSync(path.join(root, 'public'), out, { recursive: true });
console.log(`Successfully built ${out} — ${publications.length} publications / ${projects.length} projects`);

