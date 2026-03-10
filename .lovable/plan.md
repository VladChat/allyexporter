

# AllyExporter LLC — Premium Dark Corporate Website

## Overview
A polished, modern dark corporate website for AllyExporter LLC with 5 pages, centralized company config, and premium UI design.

## Design System
- **Deep Black `#0B0C0E`** (~45%) — backgrounds, surfaces
- **Brand Blue `#7CB1D9`** (~35%) — accent, buttons, links, glows
- **White `#FFFFFF`** (~15%) — primary text
- **Steel Grey `#98999B`** (~5%) — secondary text, borders, muted elements
- Card-based layout with subtle borders, soft shadows, refined hover states, minimal motion

## Architecture
- `src/config/company.ts` — single source of truth for all company data (name, address, phone, email, nav labels, copy, etc.)
- All pages/components import from this config — no hardcoded duplication

## Pages & Content

### Home
- **Hero**: Split layout — left: headline "AllyExporter LLC" + short professional subheadline + "Contact Us" CTA; right: AI-generated Chicago skyline image in a rounded card
- **What We Do**: 3 premium cards (Business Operations, Brand Management, Public Company Contact)
- Optional compact trust section if it improves visual balance

### About
- Concise explanation of who the company is and what this website provides
- Corporate, human tone — no filler, no homepage repetition

### Contact
- Contact details displayed prominently
- Professional form: Full Name, Email, Subject, Message
- Full validation, loading/success/error states, accessible markup
- Honest submission logic (no fake sends — clean integration point for future backend)

### Privacy Policy & Terms of Use
- Simple, clean, minimal legal pages appropriate for a small company
- Linked from footer only

## Navigation
- **Header**: Home, About, Contact (minimal, elegant)
- **Footer**: Company name, copyright, Privacy Policy & Terms links, compact contact info

## Technical
- Fully responsive (desktop + mobile)
- Semantic HTML, accessible contrast, keyboard navigation
- Clean SEO meta titles/descriptions per page
- AI-generated Chicago skyline hero image (evening/blue-hour, realistic, cinematic)
- Reusable components, clean maintainable code

