# JAY SURIYA R — Interactive Developer Portfolio

An interactive creative-developer portfolio built with React, Vite, Tailwind CSS, GSAP (ScrollTrigger + SplitType), Lenis smooth scroll, and Three.js (React Three Fiber + Drei).

All personal details, academic credentials, internships, club roles, projects, research work, skills, and hackathon achievements are sourced directly from Jay Suriya R's CV, Resume, and verified GitHub repositories.

## Features

- **Preloader & Coordinated Entrance**: Fast, non-blocking `00% -> 100%` preloader synced to font readiness with a GSAP curtain exit feeding directly into the Hero character reveal.
- **Interactive 3D Experience (Three.js / R3F)**:
  - **Hero Kinetic Core**: Procedural obsidian-and-titanium gyroscope with neon-lime neural shell reacting to mouse movement and scroll progress.
- **GSAP + SplitType + Lenis**: Character-by-character reveals, clip-path visual reveals, vertical animated timeline spine, magnetic interactive buttons, dual-track technology ticker, and Lenis scroll synced to `ScrollTrigger`.
- **Custom Cursor & Accessibility**: Fine-pointer desktop dual-element cursor (`VIEW`, `EXPLORE`, `DRAG`), automatically disabled on touch screens and when `prefers-reduced-motion: reduce` is active.
- **Centralized Content Config**: Update all profile metadata, `profileImage`, project screenshots, GitHub/demo links, skills, and achievements in `src/config/portfolioConfig.js`.
- **Contact & Resume Flow**: Direct PDF resume download (`/Jay_Suriya_R_Resume.pdf`) and validated contact form supporting EmailJS environment variables with a transparent `mailto:` fallback.

## Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS 3
- **Animation & Scroll**: GSAP 3, ScrollTrigger, SplitType, Lenis
- **3D & Graphics**: Three.js, React Three Fiber, Drei, Lucide React
- **SEO & Contact**: React Helmet Async, EmailJS (`@emailjs/browser`)

## Local Setup & Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview the production bundle locally:
   ```bash
   npm run preview
   ```

## Customization & Optional Configuration

### Content & Profile Photo
Edit [`src/config/portfolioConfig.js`](src/config/portfolioConfig.js):
- To display a personal portrait in the **About** section, place your image inside `public/profile.jpg` and set `personal.profileImage: '/profile.jpg'`.
- All project descriptions, verified screenshots (`public/projects/`), GitHub URLs, live demo links, skills, and timeline entries live in the same config file.

### Optional EmailJS Integration
By default, submitting the contact form opens the visitor's default email client addressed to `jaysuriya.rv@gmail.com` (`mailto:` fallback). To send messages directly without opening a mail client, create a `.env` file (or configure Vercel Environment Variables):

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Deploying to Vercel

1. Push the repository to GitHub (`JAYSURIYA02/Portfolio`).
2. Import the repository in Vercel (framework preset: **Vite**).
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. `vercel.json` is configured with SPA rewrites (`/(.*) -> /index.html`).
4. Add any optional `VITE_EMAILJS_*` environment variables in Vercel Project Settings if desired, then deploy.
