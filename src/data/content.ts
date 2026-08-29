/**
 * ============================================================================
 * ALL SITE CONTENT LIVES HERE.
 * ============================================================================
 *
 * Every string below is real content. Edit it and the site updates — no
 * component file needs to be opened. Types come from `@/types/content`, so
 * `npm run type-check` will catch a missing or misnamed field.
 *
 * Arrays are rendered in order. Add or remove entries freely; the layouts
 * adapt. Recommended: 3–5 projects, 2–4 experience entries.
 *
 * Project figures below are counted from the repositories themselves (test
 * runs, route tables, model files) rather than estimated — keep them that way
 * if you edit, since every one of them is checkable by a reader.
 */

import type { SiteContent } from '@/types/content'

const NAME = 'Mbithi Evans'

const GITHUB_URL = 'https://github.com/34Mbithi'
// TODO: paste your LinkedIn profile URL here, then change this from null.
const LINKEDIN_URL = null
const EMAIL = 'mbithienzioka2019@gmail.com'

// TODO: export your CV to /public/resume.pdf, then change this from null.
const RESUME_URL = null

export const content: SiteContent = {
  /* ------------------------------------------------------------------ nav */
  // Order here drives both the header links and the scroll-spy order.
  nav: [
    { id: 'projects', label: 'Work' },
    { id: 'experience', label: 'Experience' },
    { id: 'about', label: 'About' },
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
    tagline: 'Full-stack developer building REST APIs and the interfaces on top of them.',
    intro:
      'I work across the stack — Laravel and Flask on the server, Vue and React in the browser — with most of my attention on the seam between them: request validation, auth, and the response shapes a frontend actually has to consume. Based in Nairobi, open to remote.',
    // Fills the hero's right-hand column on desktop; stacks below the intro on
    // mobile. Keep the values short — they are set on one line each.
    highlights: [
      { label: 'Based in', value: 'Nairobi, Kenya · Remote-friendly' },
      { label: 'Server', value: 'Laravel · Flask · REST APIs' },
      { label: 'Client', value: 'Vue 3 · React · Tailwind' },
      { label: 'Looking for', value: 'Full-stack & backend roles' },
    ],
  },

  /* ---------------------------------------------------------------- about */
  about: {
    heading: 'About',
    paragraphs: [
      'I am a software developer trained at Moringa School, with a degree in Business Information Technology from JKUAT. Most of what I build is an API and something that talks to it: routes, models, migrations, and the frontend state that keeps the two honest with each other.',
      'My first real job was integration support — testing system behaviour against requirements, reproducing issues other people reported, and writing up what was actually wrong. That left a mark on how I write code. I care about validation at the boundary, errors that say what failed, and tests that fail for the right reason.',
      'Before that I worked as an ICT technician, which meant Docker, backups, permissions, and downtime with someone waiting on you to fix it. Unglamorous, but it is why I am comfortable in a terminal and why I reach for reproducible environments by default.',
      'I am currently looking for full-stack or backend work, and I take on code review and AI coding-evaluation projects alongside it — reading unfamiliar code and explaining precisely what it gets wrong is the part of the job I enjoy most.',
    ],
    photo: {
      // TODO: Add a professional photo at /public/portrait.jpg and set src to
      // '/portrait.jpg'. Leaving it null renders a labelled placeholder frame.
      src: null,
      alt: `${NAME}, software developer`,
    },
  },

  /* ------------------------------------------------------------- projects */
  projects: [
    {
      id: 'versioned-product-api',
      title: 'Versioned Product REST API',
      tagline: 'Laravel 12 API with token auth, role-based policies, and a full Pest suite.',
      tech: ['Laravel 12', 'PHP', 'Sanctum', 'Pest', 'Spatie Query Builder', 'SQLite'],
      caseStudy: {
        problem:
          'A technical test asked for a product API with filtering, sorting, uploads, and authorisation. The obvious version — one fat controller doing validation, permission checks, and persistence inline — is the version that becomes unreviewable the moment a second resource is added.',
        solution:
          'Split the work by responsibility: Spatie Data DTOs validate the request, single-purpose Action classes own each mutation, a ProductPolicy decides who may act, and API Resources shape the response. Query strings drive filtering and sorting through an explicit allowlist, so no client can sort by a column I did not intend to expose.',
        result:
          'Twenty-six Pest tests pass with 154 assertions, covering the paths that usually break in review — a non-admin attempting a delete, a user editing another user\'s product, an unauthenticated request, and a thumbnail upload with the wrong MIME type. Every route sits under /api/v1, so a v2 can land without touching it.',
      },
      outcomes: [
        { value: '26', label: 'Pest tests, 154 assertions' },
        { value: '9', label: 'Endpoints under /api/v1' },
        { value: '5', label: 'Allowlisted sort fields' },
      ],
      demoUrl: null,
      repoUrl: 'https://github.com/34Mbithi/BACKENDTECHNICALTEST',
      image: {
        // TODO: Add a screenshot at /public/projects/product-api.png — the
        // Swagger page or a passing `php artisan test` run both read well.
        src: null,
        alt: 'Terminal output of the Pest suite with all product and auth tests passing',
      },
    },
    {
      id: 'product-dashboard',
      title: 'Product Management Dashboard',
      tagline: 'Vue 3 admin panel with guarded routes, Pinia state, and a reusable form kit.',
      tech: ['Vue 3', 'Pinia', 'Vue Router', 'Tailwind CSS', 'Vite', 'Axios'],
      caseStudy: {
        problem:
          'Admin panels rot in a predictable way: every page hand-rolls its own inputs, its own loading flag, and its own copy of the fetch logic. By the fourth page the same bug exists in four places.',
        solution:
          'Pulled the repeated parts out first. Five input components (text, number, textarea, searchable select, file upload) cover every form, a single Axios service wrapper owns the base URL and headers, and each domain gets its own Pinia store. A global navigation guard reads the persisted token, so route protection is one rule rather than a check pasted into each page.',
        result:
          'Nine routes ship with eight of them behind the auth guard, and destructive actions route through one shared confirmation modal instead of ad-hoc window.confirm calls. Adding a page means composing existing pieces — which is how the Orders, Customers, and Settings screens got built after the original brief.',
      },
      outcomes: [
        { value: '9', label: 'Routes, 8 behind an auth guard' },
        { value: '5', label: 'Pinia stores by domain' },
        { value: '5', label: 'Reusable input components' },
      ],
      demoUrl: 'https://34mbithi.github.io/product-management/',
      repoUrl: 'https://github.com/34Mbithi/product-management',
      image: {
        // TODO: Add a screenshot at /public/projects/dashboard.png
        src: null,
        alt: 'Product list screen with search, sidebar navigation, and row actions',
      },
    },
    {
      id: 'inkspace',
      title: 'InkSpace',
      tagline: 'Full-stack blogging platform — Flask JWT API with a React client.',
      tech: ['Flask', 'SQLAlchemy', 'Flask-Migrate', 'JWT', 'React', 'PostgreSQL'],
      caseStudy: {
        problem:
          'A blog looks simple until the data model bites. Posts belong to authors, carry many categories, and collect comments — and deleting any one of those three leaves orphaned rows behind if the relationships are declared carelessly.',
        solution:
          'Modelled it explicitly: a post_category association table for the many-to-many, cascade rules on the author and comment relationships, and ondelete="CASCADE" at the database level rather than trusting the ORM alone. Passwords are hashed through Werkzeug, usernames and emails are validated on the model itself so a bad write fails wherever it originates, and every mutating route is behind @jwt_required.',
        result:
          'Four route modules — auth, posts, comments, profile — each stay small enough to read in one sitting. Post listing is paginated from the first commit rather than retrofitted, and seed scripts mean a new contributor gets a populated database in one command.',
      },
      outcomes: [
        { value: '4', label: 'Route modules: auth, posts, comments, profile' },
        { value: '4', label: 'Models with cascade deletes' },
        { value: 'JWT', label: 'Required on every write path' },
      ],
      demoUrl: null,
      repoUrl: 'https://github.com/34Mbithi/InkSpaceBackend',
      image: {
        // TODO: Add a screenshot at /public/projects/inkspace.png
        src: null,
        alt: 'InkSpace post feed showing authored posts with category tags',
      },
    },
    {
      id: 'late-show-api',
      title: 'Late Show API',
      tagline: 'Flask REST API where the invalid write is the interesting case.',
      tech: ['Flask', 'Flask-SQLAlchemy', 'Flask-Migrate', 'SQLite', 'Python'],
      caseStudy: {
        problem:
          'Episodes, guests, and the appearances joining them, each appearance carrying a 1–5 rating. Rating validation living in the route handler means any other write path — a seed script, a future endpoint, a shell session — can quietly insert a 9.',
        solution:
          'Put the constraint on the model with an @validates hook, so the ValueError is raised by the ORM no matter who is writing. Routes catch it and return 400 with an errors array; appearances cascade with delete-orphan so removing an episode does not strand its rows.',
        result:
          'The rating rule holds regardless of entry point, and a malformed POST gets a 400 rather than a 500 and a corrupted row. Migrations are versioned with Flask-Migrate, so the schema is reproducible from a clean clone.',
      },
      outcomes: [
        { value: '1–5', label: 'Rating range enforced at the model' },
        { value: '3', label: 'Related models, cascade-safe' },
        { value: '400', label: 'On invalid writes, not 500' },
      ],
      demoUrl: null,
      repoUrl: 'https://github.com/34Mbithi/lateshow',
      image: {
        // TODO: Add a screenshot at /public/projects/lateshow.png — a Postman
        // request showing the 400 response body works well here.
        src: null,
        alt: 'Postman request returning a validation error for an out-of-range rating',
      },
    },
  ],

  /* ----------------------------------------------------------- experience */
  experience: [
    {
      id: 'exp-integration',
      // TODO: replace with the real company name.
      company: 'Employer to confirm',
      role: 'Software Developer Intern — Systems Integration Support',
      period: 'Jun 2025 — Sep 2025',
      location: 'Remote / Nairobi, Kenya',
      relatedProjectId: 'versioned-product-api',
      highlights: [
        'Supported web system integrations in Sitecore CMS on an Agile/Scrum team, validating system behaviour against written requirements before sign-off.',
        'Ran system testing and validation for the SBMCS Space Common Tactical Database (SCTD) project, where output had to hold up against government compliance standards.',
        'Analysed an AWS RDS snapshot migration and documented the findings that engineering decisions were made from.',
        'Reproduced and wrote up integration issues in enough detail that the fix did not need a second conversation.',
      ],
    },
    {
      id: 'exp-ict',
      // TODO: replace with the real company name.
      company: 'Employer to confirm',
      role: 'ICT / System Technician',
      period: 'Jan 2025 — May 2025',
      location: 'Nairobi, Kenya',
      highlights: [
        'Installed, configured, and maintained software systems while supporting users across software, hardware, and network issues.',
        'Cut downtime through faster remote diagnosis and resolution, improving system stability by roughly 50%.',
        'Managed small-scale databases, backups, user accounts, permissions, and security controls.',
        'Built development and testing environments with Docker and virtual machines to support backend deployments.',
      ],
    },
  ],

  /* --------------------------------------------------------------- skills */
  skills: [
    {
      id: 'languages',
      title: 'Languages',
      description: 'What I reach for day to day.',
      items: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'SQL', 'HTML5', 'CSS3'],
    },
    {
      id: 'frontend',
      title: 'Frontend',
      description: 'Where the state lives and the edge cases show up.',
      items: ['Vue 3', 'React', 'Pinia', 'Vue Router', 'Tailwind CSS', 'Vite'],
    },
    {
      id: 'backend',
      title: 'Backend & APIs',
      description: 'REST design, auth, validation, uploads.',
      items: ['Laravel', 'Flask', 'Node.js', 'Express', 'REST APIs', 'Sanctum / JWT', 'Pest'],
    },
    {
      id: 'data',
      title: 'Databases',
      description: 'Schema, migrations, and keeping the data consistent.',
      items: ['PostgreSQL', 'MySQL', 'SQLite', 'SQLAlchemy', 'Eloquent', 'Flask-Migrate'],
    },
    {
      id: 'platforms',
      title: 'Tools & Platforms',
      description: 'How it ships and how it gets debugged.',
      items: [
        'Git & GitHub',
        'Docker',
        'Postman',
        'GitHub Actions',
        'Vercel',
        'Linux',
        'Chrome DevTools',
      ],
    },
    {
      id: 'learning',
      title: 'Currently Learning',
      description: 'Deliberate practice, in progress.',
      items: ['Automated testing at scale', 'CI/CD pipelines', 'System design fundamentals'],
    },
  ],

  /* -------------------------------------------------------------- contact */
  contact: {
    heading: 'Let’s build something',
    message:
      'I am looking for full-stack and backend developer roles, and I take on code review and AI coding-evaluation work alongside them. If you have an API that needs building or code that needs a second pair of eyes, email is the fastest way to reach me — I reply to everything.',
    email: EMAIL,
    availability: 'Open to new opportunities · Remote or Nairobi, Kenya',
  },

  /* --------------------------------------------------------------- footer */
  footer: {
    name: NAME,
    statement: 'I build reliable APIs and the thoughtful interfaces that make them useful.',
    note: 'Built with Vue 3, TypeScript, and Tailwind CSS.',
  },
}

export default content
