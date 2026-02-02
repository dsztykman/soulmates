# Soulmates Orchestra Website

A modern, high-performance bilingual (EN/FR) website for Soulmates Orchestra - premium live entertainment for corporate events, religious celebrations, and private occasions.

## Tech Stack

- **Framework**: Next.js 15 with App Router (SSG for performance + SEO)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API
- **i18n**: next-intl for bilingual EN/FR support

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Variables

```env
RESEND_API_KEY=re_xxxxxxxxx        # Required for contact form emails
CONTACT_EMAIL=your@email.com       # Recipient for contact form submissions
```

## Project Structure

```
soulmates/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Locale-based routing (en/fr)
│   │   │   ├── services/          # Service pages
│   │   │   ├── about/             # About page
│   │   │   ├── gallery/           # Gallery with lightbox
│   │   │   └── contact/           # Contact form
│   │   ├── api/contact/           # Contact form API
│   │   ├── globals.css            # Design system
│   │   ├── sitemap.ts             # Auto-generated sitemap
│   │   └── robots.ts              # Robots configuration
│   ├── components/
│   │   ├── layout/                # Header, Footer, LanguageSwitcher
│   │   ├── ui/                    # Button, Card, Input
│   │   ├── sections/              # Hero, ServicesGrid, Stats, etc.
│   │   ├── forms/                 # ContactForm
│   │   └── seo/                   # StructuredData
│   ├── i18n/                      # Internationalization config
│   ├── lib/                       # Utils, constants, animations
│   └── messages/                  # Translation files (en.json, fr.json)
└── public/images/                 # Static images
```

## Features

- **Bilingual Support**: Full EN/FR translation with URL prefixes
- **Dark Elegant Theme**: Black/gold color scheme
- **Animated Sections**: Scroll-triggered animations via Framer Motion
- **Gallery with Lightbox**: Masonry grid with category filtering
- **Contact Form**: Validation, honeypot spam protection, email notifications
- **SEO Optimized**: Structured data (JSON-LD), sitemap, robots.txt

## Site Routes

| English | French | Page |
|---------|--------|------|
| `/en` | `/fr` | Home |
| `/en/services` | `/fr/services` | Services Hub |
| `/en/services/corporate` | `/fr/services/entreprises` | Corporate Events |
| `/en/services/bar-mitzvahs` | `/fr/services/bar-mitzvahs` | Bar/Bat Mitzvahs |
| `/en/services/private-events` | `/fr/services/evenements-prives` | Private Events |
| `/en/about` | `/fr/a-propos` | About |
| `/en/gallery` | `/fr/galerie` | Gallery |
| `/en/contact` | `/fr/contact` | Contact |

## Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Docker

### Build and Run

```bash
# Build the Docker image
docker build -t soulmates-orchestra .

# Run the container
docker run -p 3000:3000 \
  -e RESEND_API_KEY=your_api_key \
  -e CONTACT_EMAIL=your@email.com \
  soulmates-orchestra
```

### Using Docker Compose

```bash
# Create .env file with your variables
echo "RESEND_API_KEY=your_api_key" > .env
echo "CONTACT_EMAIL=your@email.com" >> .env

# Build and run
docker compose up -d

# View logs
docker compose logs -f

# Stop
docker compose down
```

The site will be available at http://localhost:3000

## Deployment

### Vercel

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dsztykman/soulmates)

### Required Environment Variables

1. `RESEND_API_KEY` - Get from [Resend](https://resend.com)
2. `CONTACT_EMAIL` - Email for receiving contact form submissions

## Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Gold | `#C9A962` | Primary/accent |
| Background | `#0A0A0A` | Main background |
| Surface | `#1A1A1A` | Cards/sections |
| Text | `#FAFAFA` | Primary text |
| Muted | `#A1A1A1` | Secondary text |

### Typography

- **Headlines**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## License

Private - All rights reserved.
