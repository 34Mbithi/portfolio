/**
 * Content contracts for the site.
 *
 * These types exist so `data/content.ts` can be edited freely without anyone
 * having to read layout code — if a required field is missing or misspelled,
 * `npm run type-check` fails before the site ever renders.
 */

/** Every anchor-navigable section. Adding one here forces the nav to handle it. */
export type SectionId = 'about' | 'projects' | 'experience' | 'skills' | 'contact'

/** Icon keys understood by the IconGlyph component. */
export type IconName = 'github' | 'linkedin' | 'email' | 'resume' | 'external' | 'arrow-down'

export interface NavItem {
  id: SectionId
  label: string
}

export interface SocialLink {
  label: string
  /** null keeps launch-incomplete links out of the interface. */
  href: string | null
  icon: IconName
  /** Set for mailto: and file downloads so we don't add rel="noopener" noise. */
  external?: boolean
}

/** The Problem → Solution → Result narrative that turns a demo into evidence. */
export interface CaseStudy {
  problem: string
  solution: string
  result: string
}

/** A single headline number. Keep `value` short — it renders large. */
export interface Outcome {
  value: string
  label: string
}

export interface ProjectImage {
  /** Path under /public, or null to render the built-in placeholder frame. */
  src: string | null
  /** Describe the screenshot's content, not the fact that it is a screenshot. */
  alt: string
}

/** One labelled chunk of a code view, e.g. "Request" then "Response". */
export interface CodeBlock {
  label?: string
  /** HTTP-style status shown beside the label, e.g. { code: 400, text: 'Bad Request' }. */
  status?: { code: number; text: string }
  /** Pre-formatted text. Rendered as-is, monospaced, never reflowed. */
  code: string
}

/**
 * A code-native project visual: routes, a request/response pair, a schema.
 * For API projects this is better evidence than a screenshot of a terminal.
 *
 * Copy it from the repository rather than writing it — every line should be
 * something a reader can find in the code.
 */
export interface CodeView {
  /** Window title: a file path, or an endpoint. */
  title: string
  blocks: CodeBlock[]
  /** Where this comes from, shown as the caption, e.g. "app/routes.py". */
  source: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  /** Rendered as chips. Order them by relevance, not alphabetically. */
  tech: string[]
  caseStudy: CaseStudy
  outcomes: Outcome[]
  /** null hides the button rather than rendering a dead link. */
  demoUrl: string | null
  repoUrl: string | null
  /** A screenshot. When `src` is set it always wins over `codeView`. */
  image: ProjectImage
  /** Shown when there is no screenshot. Neither → labelled placeholder. */
  codeView?: CodeView
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  /** Free text, e.g. "Mar 2023 — Present". */
  period: string
  location: string
  /** Impact statements. Lead with the outcome, not the task. */
  highlights: string[]
  /** Cross-links the timeline entry to a Project.id, if one is related. */
  relatedProjectId?: Project['id']
  /** Draws the live indicator on the timeline node. */
  current?: boolean
}

export interface SkillGroup {
  id: string
  title: string
  description: string
  items: string[]
}

/** A key/value row in the hero side panel. */
export interface HeroHighlight {
  /** Rendered small and monospaced — keep it to one or two words. */
  label: string
  value: string
}

export interface HeroContent {
  name: string
  /** One line. This is the single most-read sentence on the site. */
  tagline: string
  intro: string
  /** Small rotating/static labels above the name. */
  eyebrow: string
  /**
   * Fills the right-hand column of the hero on desktop. Three or four rows —
   * this is a summary card, not a second CV.
   */
  highlights: HeroHighlight[]
}

export interface AboutContent {
  heading: string
  /** Each string is a paragraph. Two to four reads best. */
  paragraphs: string[]
  photo: {
    src: string | null
    alt: string
  }
}

export interface ContactContent {
  heading: string
  message: string
  email: string
  /** Shown under the email button. */
  availability: string
}

export interface SiteContent {
  nav: NavItem[]
  social: SocialLink[]
  hero: HeroContent
  about: AboutContent
  projects: Project[]
  experience: ExperienceEntry[]
  skills: SkillGroup[]
  contact: ContactContent
  footer: {
    name: string
    statement: string
    note: string
  }
}
