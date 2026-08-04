/**
 * ============================================================================
 * ALL SITE CONTENT LIVES HERE.
 * ============================================================================
 *
 * Every string below is placeholder copy. Replace it and the site updates —
 * no component file needs to be opened. Types come from `@/types/content`,
 * so `npm run type-check` will catch a missing or misnamed field.
 *
 * Arrays are rendered in order. Add or remove entries freely; the layouts
 * adapt. Recommended: 3–5 projects, 2–4 experience entries.
 */

import type { SiteContent } from '@/types/content'

// TODO: Replace with your real name. Used in the hero, footer, and <title>.
const NAME = 'Your Name'

// TODO: Replace every URL below with your real profiles.
const GITHUB_URL = 'https://github.com/your-handle'
const LINKEDIN_URL = 'https://linkedin.com/in/your-handle'
const EMAIL = 'you@example.com'

// TODO: Drop your CV at /public/resume.pdf, or point this at a hosted copy.
const RESUME_URL = '/resume.pdf'

export const content: SiteContent = {
  /* ------------------------------------------------------------------ nav */
  // Order here drives both the header links and the scroll-spy order.
  nav: [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ],

  /* --------------------------------------------------------------- social */
  social: [
    { label: 'GitHub', href: GITHUB_URL, icon: 'github', external: true },
    { label: 'LinkedIn', href: LINKEDIN_URL, icon: 'linkedin', external: true },
    { label: 'Email', href: `mailto:${EMAIL}`, icon: 'email' },
    { label: 'Résumé', href: RESUME_URL, icon: 'resume' },
  ],

  /* ----------------------------------------------------------------- hero */
  hero: {
    eyebrow: 'Available for new work',
    name: NAME,
    // TODO: One line. Say what you build and who it is for — avoid "passionate".
    tagline: 'Backend engineer building fast, reliable systems.',
    // TODO: 1–2 sentences of supporting detail. Concrete beats aspirational.
    intro:
      'I design and ship the services behind products people use every day — APIs that stay up, data pipelines that stay correct, and infrastructure that stays boring. Currently focused on distributed systems and developer tooling.',
  },

  /* ---------------------------------------------------------------- about */
  about: {
    heading: 'About',
    // TODO: 2–4 short paragraphs. Write like you would explain your work to a
    // smart colleague on a different team.
    paragraphs: [
      'I am a software engineer with a bias toward systems that are simple enough to reason about at 3am. Most of my work sits behind the interface: API design, data modelling, and the unglamorous reliability work that keeps everything else standing up.',
      'I started out debugging someone else’s production incident and never really stopped enjoying it. That shaped how I build — clear boundaries, obvious failure modes, and instrumentation added before it is urgently needed rather than after.',
      'Outside of work I maintain a couple of small open-source tools, read more postmortems than is strictly healthy, and mentor engineers making the jump from junior to mid-level.',
    ],
    photo: {
      // TODO: Add a professional photo at /public/portrait.jpg and set src to
      // '/portrait.jpg'. Leaving it null renders a labelled placeholder frame.
      src: null,
      alt: `${NAME}, software engineer`,
    },
  },

  /* ------------------------------------------------------------- projects */
  // TODO: Replace all four. Keep 3–5 — a short list of strong work reads far
  // better than a long list of tutorials. The Problem/Solution/Result block is
  // what separates a portfolio from a link dump: keep each to 1–3 sentences.
  projects: [
    {
      id: 'ledger-service',
      title: 'Distributed Ledger Service',
      tagline: 'Double-entry accounting engine handling financial transactions at scale.',
      tech: ['Go', 'PostgreSQL', 'Kafka', 'gRPC', 'Kubernetes'],
      caseStudy: {
        problem:
          'The existing billing system recorded balances as a single mutable column. Concurrent writes produced silent drift, and reconciling a disputed account meant reconstructing history by hand from application logs.',
        solution:
          'Rebuilt it as an append-only double-entry ledger with idempotency keys on every write and serialisable isolation on the posting path. Balances became a projection over immutable entries rather than a value anyone could overwrite.',
        result:
          'Drift went to zero and stayed there. Reconciliation dropped from a multi-hour manual process to a single query, and the audit trail satisfied an external review with no additional engineering work.',
      },
      outcomes: [
        { value: '0', label: 'Balance discrepancies post-launch' },
        { value: '4h → 30s', label: 'Account reconciliation time' },
        { value: '12k/s', label: 'Sustained write throughput' },
      ],
      demoUrl: 'https://example.com',
      repoUrl: GITHUB_URL,
      image: {
        // TODO: Add a screenshot at /public/projects/ledger.png
        src: null,
        alt: 'Ledger service dashboard showing account balances and entry history',
      },
    },
    {
      id: 'ingest-pipeline',
      title: 'Real-Time Ingest Pipeline',
      tagline: 'Streaming ETL moving millions of events a day into an analytics warehouse.',
      tech: ['Python', 'Apache Flink', 'ClickHouse', 'Terraform', 'AWS'],
      caseStudy: {
        problem:
          'Analytics ran on a nightly batch job. Product decisions were made against data up to 26 hours stale, and a single malformed record could fail the whole run with no partial recovery.',
        solution:
          'Replaced the batch job with a streaming pipeline using windowed aggregation and a dead-letter queue for poison records. Added schema validation at the boundary so bad data is quarantined rather than propagated downstream.',
        result:
          'Dashboards now trail live events by under a minute. Failed records are isolated and replayable, so a bad payload no longer costs the team a day of visibility.',
      },
      outcomes: [
        { value: '26h → 45s', label: 'Data freshness' },
        { value: '3.2M', label: 'Events processed daily' },
        { value: '99.95%', label: 'Pipeline uptime' },
      ],
      demoUrl: null,
      repoUrl: GITHUB_URL,
      image: {
        // TODO: Add a screenshot at /public/projects/pipeline.png
        src: null,
        alt: 'Pipeline topology diagram with per-stage throughput metrics',
      },
    },
    {
      id: 'api-gateway',
      title: 'Internal API Gateway',
      tagline: 'Auth, rate limiting, and observability as a shared platform layer.',
      tech: ['TypeScript', 'Node.js', 'Redis', 'OpenTelemetry', 'Docker'],
      caseStudy: {
        problem:
          'Fourteen services each implemented their own authentication and rate limiting. Rules drifted apart, a token-handling bug had to be patched in nine repositories, and no one could trace a request across service boundaries.',
        solution:
          'Built a gateway owning authentication, quota enforcement, and distributed tracing, with per-route policy declared in version-controlled config. Teams opted in one service at a time, so nothing needed a coordinated cutover.',
        result:
          'Cross-cutting logic now lives in one reviewed place. Onboarding a new service went from roughly two days of boilerplate to a fifteen-line config change, and end-to-end traces made latency debugging a matter of minutes.',
      },
      outcomes: [
        { value: '14 → 1', label: 'Auth implementations to maintain' },
        { value: '2d → 15min', label: 'New service onboarding' },
        { value: '~40%', label: 'p99 latency reduction' },
      ],
      demoUrl: 'https://example.com',
      repoUrl: GITHUB_URL,
      image: {
        // TODO: Add a screenshot at /public/projects/gateway.png
        src: null,
        alt: 'Gateway request trace waterfall across multiple downstream services',
      },
    },
    {
      id: 'schema-cli',
      title: 'Schema Migration CLI',
      tagline: 'Open-source tool for safe, reversible database migrations.',
      tech: ['Rust', 'PostgreSQL', 'GitHub Actions'],
      caseStudy: {
        problem:
          'Migrations were applied by hand during deploy windows. A missing index on a large table locked writes for eleven minutes in production, and there was no dry-run to catch it beforehand.',
        solution:
          'Wrote a CLI that plans migrations against a shadow database, flags lock-acquiring operations before they run, and generates a verified rollback for every change. Wired it into CI so risky migrations fail the pull request instead of the deploy.',
        result:
          'No lock-related incident has reached production since adoption. The tool was open-sourced and is now used by several teams outside the one it was written for.',
      },
      outcomes: [
        { value: '0', label: 'Lock incidents since launch' },
        { value: '340+', label: 'GitHub stars' },
        { value: '100%', label: 'Migrations with tested rollbacks' },
      ],
      demoUrl: null,
      repoUrl: GITHUB_URL,
      image: {
        // TODO: Add a screenshot at /public/projects/cli.png
        src: null,
        alt: 'Terminal output showing a migration plan with lock warnings highlighted',
      },
    },
  ],

  /* ----------------------------------------------------------- experience */
  // TODO: Replace with real roles. `relatedProjectId` must match a Project id
  // above — it renders a link from the timeline entry to that project card.
  experience: [
    {
      id: 'exp-senior',
      company: 'Company Name',
      role: 'Senior Software Engineer',
      period: 'Mar 2023 — Present',
      location: 'Remote',
      current: true,
      relatedProjectId: 'ledger-service',
      highlights: [
        'Led the rebuild of the core billing ledger, eliminating a class of balance-drift bugs that had produced recurring customer disputes.',
        'Set the service-level objectives and on-call runbooks now used across four backend teams.',
        'Mentored three engineers through promotion, running weekly design reviews and pairing sessions.',
      ],
    },
    {
      id: 'exp-mid',
      company: 'Previous Company',
      role: 'Software Engineer',
      period: 'Jun 2021 — Feb 2023',
      location: 'Nairobi, Kenya',
      relatedProjectId: 'ingest-pipeline',
      highlights: [
        'Migrated the analytics stack from nightly batch to streaming ingest, cutting data latency from over a day to under a minute.',
        'Cut cloud spend roughly 30% by right-sizing workloads and introducing autoscaling policies tied to real usage.',
        'Introduced integration testing to a codebase that had none, taking meaningful coverage from 0% to 68% over two quarters.',
      ],
    },
    {
      id: 'exp-junior',
      company: 'First Company',
      role: 'Junior Developer',
      period: 'Jan 2020 — May 2021',
      location: 'Nairobi, Kenya',
      highlights: [
        'Shipped customer-facing features across a Django and vanilla JavaScript stack serving around 50,000 monthly users.',
        'Automated a manual weekly reporting process, returning roughly six engineer-hours per week to the team.',
      ],
    },
  ],

  /* --------------------------------------------------------------- skills */
  // TODO: Be honest here. List what you would be comfortable being interviewed
  // on. "Currently learning" is a strength, not a hedge — it signals direction.
  skills: [
    {
      id: 'languages',
      title: 'Languages',
      description: 'What I reach for day to day.',
      items: ['Go', 'TypeScript', 'Python', 'Rust', 'SQL', 'Bash'],
    },
    {
      id: 'frameworks',
      title: 'Frameworks & Libraries',
      description: 'Where most of the code gets written.',
      items: ['Vue 3', 'Node.js', 'FastAPI', 'gRPC', 'Apache Flink', 'Vitest'],
    },
    {
      id: 'platforms',
      title: 'Tools & Platforms',
      description: 'How it ships and stays up.',
      items: [
        'PostgreSQL',
        'Redis',
        'Kafka',
        'Docker',
        'Kubernetes',
        'Terraform',
        'AWS',
        'GitHub Actions',
        'OpenTelemetry',
      ],
    },
    {
      id: 'learning',
      title: 'Currently Learning',
      description: 'Deliberate practice, in progress.',
      items: ['WebAssembly', 'eBPF', 'Formal methods (TLA+)'],
    },
  ],

  /* -------------------------------------------------------------- contact */
  contact: {
    heading: 'Let’s build something',
    // TODO: Say what you actually want. Vague invitations get vague replies.
    message:
      'I am open to backend and platform engineering roles, and always happy to talk through an interesting systems problem. The fastest way to reach me is email — I reply to everything.',
    email: EMAIL,
    availability: 'Currently open to new opportunities · Remote or Nairobi',
  },

  /* --------------------------------------------------------------- footer */
  footer: {
    name: NAME,
    note: 'Built with Vue 3, TypeScript, and Tailwind CSS.',
  },
}

export default content
