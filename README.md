# Genti's Barbershop (Tiranë) — Official Web Platform 💈

Bilingual web application (Shqip 🇦🇱 & English 🇬🇧) for **Genti's Barbershop**, located on Rruga Demneri, Tiranë, Albania.

Featuring:
- 📱 **Interactive Online WhatsApp Booking System** with direct messaging to `+355 69 518 8660`
- ✂️ **Services & Transparent Pricing Menu** with ALL (Lek) and EUR (€) toggle
- 🖼️ **Showcase Gallery** with reserved slots for salon photos
- 👤 **Master Barbers & Stylist Profiles** (Genti, Klodi)
- 📅 **Dynamic Weekly Schedule** (Monday, Wednesday – Sunday open until 10 PM; **Tuesday closed / pushim**)
- ⭐ **5.0★ Google Maps Reviews**
- 📍 **Google Maps & Navigation Integration** with Plus Code `8QGH+CQ Tiranë, Albania`
- 🌐 **Instant Bilingual Toggle (Shqip / English)** with persistent preference

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ or 20+
- npm

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start local Vite development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Test Production Build Locally

```bash
# Build the application
npm run build

# Start the production Express server
npm start
```

Visit `http://localhost:8080`.

---

## 🐙 Step 1: Push to GitHub

Initialize your repository and push to GitHub:

```bash
# Initialize git if not already initialized
git init

# Add all project files
git add .

# Create initial commit
git commit -m "feat: complete Genti's Barbershop bilingual platform ready for Cloud Run"

# Rename branch to main
git branch -M main

# Link to your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/gentis-barbershop.git

# Push to GitHub
git push -u origin main
```

---

## ☁️ Step 2: Deploy to Google Cloud Run

You have two easy methods to deploy on Google Cloud Run:

### Option A: Direct Source Deployment (Recommended - Easiest & Fastest)

Google Cloud Run can build and deploy directly from your source directory using the included `Dockerfile` and `server.js`:

```bash
# 1. Log in to your Google Cloud account
gcloud auth login

# 2. Set your Google Cloud Project
gcloud config set project YOUR_PROJECT_ID

# 3. Enable required Google Cloud APIs (one-time setup)
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

# 4. Deploy directly from the source directory
gcloud run deploy gentis-barbershop \
  --source . \
  --region europe-west1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080
```

Cloud Run will provide you with a live HTTPS URL (e.g. `https://gentis-barbershop-xxxxx-ew.a.run.app`).

---

### Option B: Build & Deploy using Docker

If you prefer building and pushing Docker container images manually:

```bash
# 1. Build Docker image
docker build -t gcr.io/YOUR_PROJECT_ID/gentis-barbershop:latest .

# 2. Authenticate Docker with Google Container Registry
gcloud auth configure-docker

# 3. Push image to Container Registry
docker push gcr.io/YOUR_PROJECT_ID/gentis-barbershop:latest

# 4. Deploy image to Cloud Run
gcloud run deploy gentis-barbershop \
  --image gcr.io/YOUR_PROJECT_ID/gentis-barbershop:latest \
  --region europe-west1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080
```

---

### Option C: Automated CI/CD via GitHub Actions

A ready-to-use GitHub Actions workflow is included in `.github/workflows/deploy.yml`.

1. Go to your GitHub repository **Settings** -> **Secrets and variables** -> **Actions**.
2. Add these two secrets:
   - `GCP_PROJECT_ID`: Your Google Cloud project ID.
   - `GCP_SA_KEY`: Your Google Cloud Service Account JSON key (with Cloud Run Admin & Storage Admin roles).
3. Every time you push to the `main` branch, your website will be automatically tested, built, and deployed to Cloud Run!

---

## 🌐 Custom Domain Setup on Cloud Run

To connect a custom domain (like `gentisbarbershop.al` or `gentisbarber.com`):

1. Go to **Google Cloud Console** -> **Cloud Run** -> **Manage Custom Domains**.
2. Click **Add Mapping**, select service `gentis-barbershop`.
3. Enter your domain name and follow the DNS instructions (adds DNS records with free automatic Google-managed SSL certificate).

---

## 📁 Repository Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Actions Cloud Run deploy
├── public/                     # Static icons & manifest
├── src/
│   ├── assets/images/          # Barbershop interior & haircut craft photography
│   ├── components/             # Modular React components
│   │   ├── BookingWhatsApp.tsx # Online WhatsApp appointment wizard
│   │   ├── CallModal.tsx       # Quick phone call modal
│   │   ├── ErrorBoundary.tsx   # Fault-tolerant error boundary
│   │   ├── Footer.tsx          # Barbershop footer
│   │   ├── Header.tsx          # Top nav & live hours alert
│   │   ├── Hero.tsx            # Hero banner & primary CTAs
│   │   ├── LanguageSwitch.tsx  # Shqip 🇦🇱 / English 🇬🇧 toggle
│   │   ├── MapLocationSection.tsx # Google Maps embed & directions
│   │   ├── MobileQuickBar.tsx  # Ergonomic mobile thumb navigation
│   │   ├── PricingServices.tsx # Pricing catalog & currency switcher
│   │   ├── ReviewsSection.tsx  # 5.0★ Google reviews
│   │   ├── ShowcaseGallery.tsx # Gallery with reserved photo slots
│   │   └── StaffSection.tsx    # Master barbers profiles
│   ├── context/
│   │   └── LanguageContext.tsx # Bilingual state & localStorage sync
│   ├── data/
│   │   └── barbershopData.ts   # Shop data, services, schedule & reviews
│   ├── i18n/
│   │   └── translations.ts     # Complete Albanian & English dictionaries
│   ├── App.tsx
│   ├── main.tsx
│   └── types.ts
├── Dockerfile                  # Multi-stage production container for Cloud Run
├── .dockerignore               # Docker exclusions
├── .gitignore                  # Git exclusions
├── cloudbuild.yaml             # Cloud Build configuration
├── server.js                   # Production Express SPA runner
├── package.json
└── vite.config.ts
```

---

## 📄 License
© Genti's Barbershop, Rruga Demneri, Tiranë 1000, Albania. All rights reserved.
