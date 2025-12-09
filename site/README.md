# Electrum Observatory — Website  
**Official Website for the Electrum Observatory Research Project**

This repository contains the **public-facing website** for the  
Electrum Observatory, a research project focused on measuring privacy risks,  
surveillance patterns, and honeypot-like behavior within the Electrum P2P server network.

The site is built with **Next.js**, **Tailwind CSS v4**, and deployed via **GitHub Pages** as a fully static export.  
It serves as the **central hub** for documentation, methodology, visualizations, results, and research reports.

---

## Purpose of This Website

The website provides:

- A clear overview of the research goals  
- Methodology used to scan and fingerprint Electrum servers  
- Interactive and static visualizations from Jupyter notebooks  
- Results and clustering analysis  
- Honeypot suspicion indicators  
- Public dataset documentation  
- Final privacy and security recommendations  

It is the **official presentation layer** of the Electrum Observatory project —  
a place for researchers, Bitcoin developers, and privacy analysts to explore the findings.

---

## Tech Stack

- **Next.js (App Router, Static Export)**
- **Tailwind CSS v4**
- **GitHub Actions for CI/CD deploy**
- **GitHub Pages hosting**
- **Markdown-driven documentation when needed**

---

## Project Structure (Website)

```
app/
  page.tsx                 → Home (Project Overview)
  methodology/page.tsx     → Methodology & Research Pipeline
  results/page.tsx         → Results & Visualizations
  dataset/page.tsx         → Dataset Documentation
  honeypots/page.tsx       → Honeypot Indicators
  about/page.tsx           → Project Background & Credits

components/
  Navbar.tsx               → Global navigation
globals.css                → Minimal Tailwind v4 global styles
```

---

## Development

Install dependencies:

```bash
npm install
npm run dev
```

Run local dev server at:

```
http://localhost:3000
```

---

## Static Export (GitHub Pages)

Before deploying:

```bash
npm run build
npx next export
```

The static output will be written to the `out/` directory, which is deployed automatically using **GitHub Actions**.

---

## License

MIT License — open for research, auditing, and transparency.
