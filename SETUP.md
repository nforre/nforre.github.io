# Setup (React + React Three Fiber)

Copy these files into the root of `nforre.github.io`, replacing the old `src/`, `index.html`,
`package.json`, `vite.config.ts` and `tsconfig.json` (keep any GitHub Actions workflow you already have).

    bun install      # or: npm install   (regenerates the lockfile)
    bun run dev      # or: npm run dev
    bun run build    # outputs to dist/

- Edit blog posts, projects, jobs and skills in `src/data.ts`.
- The 3D heart lives in `src/Scene.tsx`.
- Lenis smooth scroll is set up in `src/lenis.ts`.
