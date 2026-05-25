# 🚀 Neil Justin's Modern Developer Portfolio

A premium, highly interactive, and responsive portfolio website designed for **Neil Justin Marcelo**, a BS Computer Science Student. Built with the latest web standards including Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Framer Motion.

---

## ✨ Features

- **Dynamic Loading Screen:** A sleek entry transition that sets a premium tone.
- **Glassmorphism Design:** Beautiful dark-themed aesthetic with modern CSS gradients, blurred backgrounds, and subtle borders.
- **Micro-Animations:** Fluid scrolling animations, custom hover effects, and parallax-like elements powered by Framer Motion.
- **Smooth Navigation:** One-page layout with custom smooth-scroll anchors.
- **Projects Showcase:** Interactive portfolio cards detailing software projects.
- **Certificates Slider:** Clean slider displaying credentials and achievements.
- **Contact Form:** Interactive contact card with smooth feedback and submission states.
- **Fully Responsive:** Optimised experience across all devices (Desktop, Tablet, Mobile).

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Components:** Built using [Radix UI](https://www.radix-ui.com/) (Shadcn UI style)

---

## 📂 Project Structure

```text
PORTFOLIO/
├── app/                  # Next.js App Router pages, global styles, and root layout
│   ├── globals.css       # Tailwind stylesheet and root CSS variables
│   ├── layout.tsx        # HTML wrapper & global Providers
│   └── page.tsx          # Main entry (portfolio single-page)
├── components/           # Reusable components
│   ├── ui/               # Lower-level Shadcn UI primitives (button, input, dialogue)
│   ├── about-section.tsx # About section with educational & skill details
│   ├── contact-section.tsx # Interactive email form
│   ├── footer.tsx        # Bottom footer section
│   ├── hero-section.tsx  # Hero landing with name and interactive elements
│   ├── loading-screen.tsx # Initial screen loader
│   ├── navbar.tsx        # Responsive navigation bar
│   ├── projects-section.tsx # Projects grid with filters
│   └── theme-provider.tsx # Light/dark mode context provider
├── hooks/                # Custom React hooks
├── lib/                  # Helper utilities (e.g. cn class merger)
├── public/               # Static assets (images, logos, icons, resume PDF)
├── package.json          # Node scripts and project dependencies
├── pnpm-lock.yaml        # Lockfile for pnpm package manager
└── tsconfig.json         # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.x or v20+ recommended)
- **pnpm** (preferred package manager) or **npm** / **yarn**

---

### Installation

1. **Clone or download the project** and open your terminal in the root directory.
2. **Install dependencies:**
   
   If using **pnpm** (recommended, since `pnpm-lock.yaml` is present):
   ```bash
   pnpm install
   ```

   Alternatively, if you prefer **npm** or **yarn**:
   ```bash
   npm install
   # or
   yarn install
   ```

---

### Running the Project

#### 1. Development Mode
Run the development server locally:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the live site. The development server supports Hot Module Replacement (HMR).

#### 2. Building for Production
To compile a highly optimized production build:
```bash
pnpm build
# or
npm run 
# or
yarn build build
```

#### 3. Starting the Production Server
After building, run the built site locally in production mode:
```bash
pnpm start
# or
npm run start
# or
yarn start
```

#### 4. Linting
Verify code quality and style using ESLint:
```bash
pnpm lint
# or
npm run lint
# or
yarn lint
```

---

