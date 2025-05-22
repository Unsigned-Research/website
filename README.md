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

### 1. Install `gh-pages` (if not already installed)
```sh
pnpm add -D gh-pages
```

### 2. Add the deploy script to your `package.json`
Add the following to your `scripts` section:
```json
"deploy": "gh-pages -d out"
```

### 3. Deploy
Run:
```sh
pnpm run deploy
```
This will push the contents of the `out` directory to the `gh-pages` branch.

### 4. Configure GitHub Pages
- Go to your repository on GitHub.
- Navigate to **Settings > Pages**.
- Set the source to the `gh-pages` branch and root (`/`).

Your site will be live at `https://<your-username>.github.io/<your-repo>/`.

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