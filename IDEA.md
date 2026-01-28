# Swift, Kotlin Multiplatform & GitHub Pages — Reference Notes

This document summarizes key findings and architectural decisions around using Swift, Kotlin Multiplatform, and GitHub Pages for building and hosting static or interactive web applications.

---

## 1. Can Swift run on GitHub Pages?

No.

GitHub Pages can only serve static files. It cannot execute Swift code or any server-side logic.

### What GitHub Pages supports
- HTML
- CSS
- JavaScript
- WebAssembly (WASM)
- Images and static assets

### Correct mental model
Swift can be used at build time, not runtime.

Swift code → generate static files → GitHub Pages

---

## 2. Using Swift to build static websites

### Option A: Publish (Recommended)
- Swift-based static site generator
- Type-safe HTML generation
- Outputs pure HTML and CSS
- Comparable to Jekyll, but written in Swift

Best for:
- Blogs
- Portfolios
- Documentation sites
- SEO-friendly static pages

---

### Option B: Plot (Low-level HTML DSL)
- Swift DSL for writing HTML
- Manual control over page structure
- Requires explicitly writing files like index.html

---

### Option C: React + Vite + Bun (Selected)
- Modern, production-ready JavaScript stack
- Type-safe with TypeScript
- Lightning-fast build times with Vite
- Bun as runtime and package manager
- Easy deployment to GitHub Pages

Status: Production-ready, recommended.

---

## 3. Interactive sites like workstation-diagram

Reference project:
- Repository: akexorcist/workstation-diagram
- Live site: workstation.akexorcist.dev
- Built with Kotlin Multiplatform and Compose
- Compiled into static HTML, JavaScript, and WebAssembly

Important note:

GitHub Pages only serves the build output.  
The source language (Kotlin, Swift, etc.) does not matter once compiled.

---

## 4. Hosting on GitHub Pages

Recommended deployment flow:

Source code → build → dist (static files) → GitHub Pages

Common deployment approaches:
- GitHub Actions to GitHub Pages (official Pages workflow)
- GitHub Actions to gh-pages branch

Common pitfalls:
- Project Pages URLs include the repository name (https://username.github.io/repository/)
- Asset paths must be relative or configured with a base path
- .nojekyll may be required for folders starting with an underscore

---

## 5. Is there a Swift equivalent to Kotlin Multiplatform?

Short answer: No (not yet).

Kotlin Multiplatform provides:
- Shared business logic
- Targets Android (JVM), iOS (Native), Web (JS or WASM), and Desktop
- Native UI per platform
- Mature tooling and ecosystem

---

## 6. Swift alternatives (comparison)

SwiftWasm:
- Closest in spirit to Kotlin Multiplatform
- Experimental
- Limited ecosystem
- No Android target

Swift with C or C++ shared core:
- Technically possible
- Poor ergonomics
- Not web-friendly
- High maintenance cost

Swift Package Manager (Apple ecosystem):
- iOS, macOS, Linux support
- No Android
- No browser runtime

---

## 7. What Swift currently lacks

- Android compilation target
- Official browser runtime
- SwiftUI for Web
- Unified “write once, run everywhere” story

Swift remains Apple-first by design.

---

## 8. Practical production recommendation

Most real-world teams use:

Shared contracts via OpenAPI or gRPC  
iOS implemented in Swift  
Android implemented in Kotlin  
Web implemented in JavaScript (Vue or React)

This avoids experimental toolchains while remaining scalable and maintainable.

---

## 9. Tech Stack Decision

**Selected: React + Vite + Bun**

Rationale:
- No need for cross-platform code sharing (no iOS/Android app planned)
- Modern, mature tooling with excellent developer experience
- Fast build times and hot module replacement
- Simple deployment to GitHub Pages
- Large ecosystem and community support

Reference:
- Inspired by: akexorcist/workstation-diagram
- Built with: Kotlin Multiplatform (for Android code sharing)
- Our approach: Pure React/TypeScript (no code sharing needed)

---

## 10. TL;DR

Can Swift run on GitHub Pages? No
Can Swift generate static sites? Yes
Is there a Swift equivalent to Kotlin Multiplatform? Not yet
Selected tech stack: React + Vite + Bun + TypeScript
Best production approach: Static build plus APIs

---

## Notes

This document is intended as a technical reference for architecture and tooling decisions involving Swift, Kotlin Multiplatform, and static web hosting on GitHub Pages.