/** @type {import('next').NextConfig} */

// When deploying to GitHub Pages as a project site (username.github.io/repo-name),
// set NEXT_PUBLIC_BASE_PATH to /<repo-name> in your environment / CI.
// For a custom domain or username.github.io root, leave it empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig = {
  output: 'export',        // Emit a fully static site into ./out
  basePath,
  trailingSlash: true,     // Required for static export on GitHub Pages
  images: {
    unoptimized: true,     // Next.js Image Optimization is not available in static export
  },
}

export default nextConfig
