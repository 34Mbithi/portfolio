/**
 * Minimal syntax highlighter for the site's code snippets: JSON bodies,
 * route tables, schema sketches, a few lines of Python/PHP.
 *
 * Produces plain tokens that components render as spans — no v-html, no
 * highlighter dependency. Colours are the component's job, since the same
 * tokens sit on a dark window in project cards and a themed panel in the hero.
 */

export type Tone = 'plain' | 'string' | 'number' | 'method' | 'keyword' | 'comment' | 'punct'

export interface Token {
  text: string
  tone: Tone
}

// Order matters: earlier alternatives win at the same position.
const RULES: [RegExp, Tone][] = [
  [/#.*$/, 'comment'],
  [/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, 'string'],
  [/\b(?:GET|POST|PUT|PATCH|DELETE)\b/, 'method'],
  [/\b(?:ON DELETE CASCADE|auth:sanctum|PK|FK)\b|→/, 'keyword'],
  [/-?\b\d+(?:\.\d+)?\b/, 'number'],
  [/[{}[\],:]/, 'punct'],
]

const MASTER = new RegExp(RULES.map(([re]) => `(${re.source})`).join('|'), 'gu')

export function tokenizeLine(line: string): Token[] {
  const out: Token[] = []
  let last = 0
  for (const match of line.matchAll(MASTER)) {
    const index = match.index ?? 0
    if (index > last) out.push({ text: line.slice(last, index), tone: 'plain' })
    const group = match.slice(1).findIndex((g) => g !== undefined)
    out.push({ text: match[0], tone: RULES[group]?.[1] ?? 'plain' })
    last = index + match[0].length
  }
  if (last < line.length) out.push({ text: line.slice(last), tone: 'plain' })
  return out
}

/** Splits a block into lines of tokens, dropping one trailing newline. */
export function tokenize(code: string): Token[][] {
  return code.replace(/\n$/, '').split('\n').map(tokenizeLine)
}
