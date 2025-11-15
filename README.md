# Next.js Static Site for GitHub Pages

This project is a static site built with Next.js and deployed to GitHub Pages.

## Prerequisites
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

## Getting Started

Install dependencies:
```sh
pnpm install
```

## Building the Static Site

To build the static site, run:
```sh
pnpm run build
```
This will generate a static `out` directory.

## Deploying to GitHub Pages

There are two main deployment scripts available:

### 1. Standard Deploy
This will build and deploy your site to GitHub Pages using the default configuration.
```sh
pnpm run deploy
```

### 2. Custom Domain Deploy
If you need to deploy with a custom domain (using the `CNAME` file), use:
```sh
pnpm run deploy:custom
```

Both scripts will:
- Clean previous builds
- Build the static site
- Copy the `CNAME` file (for custom domains)
- Add a `.nojekyll` file
- Deploy the contents of the `out` directory to the `gh-pages` branch using `gh-pages`

---

## Notes
- Make sure your `next.config.mjs` includes:
  ```js
  output: "export",
  ```
- If your site is not at the root (e.g., a project page), you may need to set the `basePath` and `assetPrefix` in `next.config.mjs`.

---

## License
MIT 