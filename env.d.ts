/// <reference types="vite/client" />

// No `*.vue` module shim here on purpose: vue-tsc understands SFCs natively,
// and a catch-all shim would shadow real component types, silently erasing
// prop and emit type-checking across the app.
