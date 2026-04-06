# Healthcare Job Tracker

A job search intelligence tool that monitors 103 healthcare companies and surfaces relevant director-level operations and clinical leadership roles daily.

## Problem

Job boards show stale postings. A candidate searching for director-level healthcare operations roles wastes hours clicking through listings only to find positions are already filled or removed. Manual searches across 100+ company career pages aren't feasible daily.

## Solution

This app automatically scrapes career pages from 103 healthcare companies every morning, filters for relevant director/VP/manager-level operations and clinical leadership roles, verifies that each posting is still active, and emails a digest of new findings.

### Sample Output

The dashboard shows a clean, filterable table of roles:

| Company | Title | Location | Salary | Found | Status |
|---------|-------|----------|--------|-------|--------|
| Talkiatry | Director of Operations, Psychotherapy | NYC | $165K-$175K | 1d ago | Active |
| Headway | Sr. Director, Clinical Operations | Remote | -- | 3d ago | Active |
| Select Medical | Director of Rehabilitation | NJ | -- | 1w ago | Stale |

## Architecture

```
Vercel Cron (7 AM ET daily)
    |
    v
Scraper Orchestrator
    |--- Greenhouse API (8 companies)
    |--- Ashby API (6 companies)
    |--- Lever API (5 companies)
    |--- HTML/Cheerio (84 companies)
    |
    v
Role Filter (title + location matching)
    |
    v
Link Verification (detect closed/stale postings)
    |
    v
PostgreSQL (Prisma ORM)
    |
    |--- Next.js Dashboard (Vercel)
    |--- Email Digest (Resend)
```

## Company Coverage (103 companies, 11 categories)

| Category | Count | Examples |
|----------|-------|---------|
| Telehealth / Virtual Care | 39 | Expressable, Talkiatry, Lyra Health, Spring Health, Rula |
| Healthcare Ops / Value-Based Care | 7 | Headway, Alma, Evolent Health, Cityblock |
| ABA / Autism Providers | 8 | Cortica, AnswersNow, Hopebridge, BlueSprig |
| Rehabilitation | 7 | Select Medical/Kessler, Encompass Health, Kindred |
| Skilled Nursing Facilities | 3 | Centers Health Care, CareOne, Genesis |
| IDD / Developmental Disabilities | 8 | Jewish Board, YAI, AHRC NYC, Community Options |
| Home Health / Hospice | 5 | VNS Health, BAYADA, Amedisys, Enhabit |
| Health Systems | 4 | Hackensack Meridian, RWJBarnabas, Northwell, Mount Sinai |
| Health Tech / Clinical Ops | 9 | Devoted Health, Oscar Health, Noom, Hinge Health |
| Healthcare Nonprofits | 7 | Montefiore, NewYork-Presbyterian, Catholic Charities |
| Healthcare Staffing | 6 | AMN Healthcare, Cross Country, Soliant |

## Role Filtering

**Included titles**: Director, VP, Program Director, Regional Manager, Head of, Chief, Operations Manager, Clinical Supervisor, Rehabilitation Manager/Director, Quality Director, Care Coordination Director

**Excluded**: Treating SLP/OT/PT, BCBA/RBT (without leadership scope), DSP, RN/LPN (without director), Teacher, Aide

**Location filter**: Remote, NJ, NY (all boroughs), Jersey City, Hoboken, Newark, US-wide

## Cost

| Service | Tier | Monthly Cost |
|---------|------|-------------|
| Vercel | Hobby | $0 |
| PostgreSQL (Vercel/Neon) | Free | $0 |
| Resend | Free (3,000 emails/mo) | $0 |
| **Total** | | **$0** |

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (or use Vercel Postgres)

### Local Development

```bash
git clone https://github.com/AnthonyShalagin/job-tracker-healthcare.git
cd job-tracker-healthcare
npm install
cp .env.example .env
# Fill in DATABASE_URL, CRON_SECRET, RESEND_API_KEY
npx prisma db push
npm run seed
npm run dev
```

### Manual Scrape Test

```bash
curl -X POST http://localhost:3000/api/scrape \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"companies": ["Hazel Health"]}'
```

### Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add Vercel Postgres (or connect Neon)
4. Set environment variables: `DATABASE_URL`, `CRON_SECRET`, `RESEND_API_KEY`, `NEXT_PUBLIC_APP_URL`
5. Deploy - cron runs automatically at 7 AM ET daily

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (auto-set with Vercel Postgres) |
| `DIRECT_URL` | Direct database connection (for migrations) |
| `CRON_SECRET` | Auth token for cron endpoint (`openssl rand -hex 32`) |
| `RESEND_API_KEY` | Resend API key for email notifications |
| `NEXT_PUBLIC_APP_URL` | Deployed Vercel URL |

## Design Decisions

- **Prisma v6 + PostgreSQL** over SQLite: Vercel serverless needs a network-accessible DB
- **103 companies in config file** over admin UI: config-as-code, no CRUD overhead
- **4 scraper types** (Greenhouse/Ashby/Lever APIs + HTML): API scrapers are reliable, HTML scrapers are fallback
- **Link verification**: HEAD + body check for closed-position phrases, distinguishes active/stale/closed
- **Email only on new roles**: no empty daily emails cluttering inbox
- **Stone/neutral UI palette**: clean, professional, LinkedIn-inspired

## Tech Stack

- **Framework**: Next.js 16 + TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Prisma ORM + PostgreSQL
- **Scraping**: Greenhouse/Ashby/Lever public APIs + Cheerio for HTML
- **Email**: Resend
- **Hosting**: Vercel (cron + serverless)

## License

MIT
