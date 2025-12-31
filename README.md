# Rockchip AI Lab Website

This repository contains the source code for the Rockchip AI Lab website, built with HTML, CSS, and JavaScript.

## Project Structure

```
Rockchip-AI-Lab/
├── public/                 # Built website files (deployed to GitHub Pages)
├── src/                    # Source files
│   ├── pages/              # HTML pages (Home, CV, LLM, VLM, UI)
│   ├── components/         # Reusable components (navigation, RK chips header)
│   └── styles.css          # Main stylesheet
├── .github/workflows/      # GitHub Actions workflows
├── build.js                # Build script
├── package.json            # Project configuration
└── README.md               # This file
```

## Pages

The website includes the following pages:
- Home
- Computer Vision (CV)
- Large Language Models (LLM)
- Visual Language Models (VLM)
- User Interface (UI)

Each page features information about Rockchip processors RK3588 and RK1820 at the top.

## Development

To run the project locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the website:
   ```bash
   npm run build
   ```

3. Start a local server:
   ```bash
   npm start
   ```

## Deployment

The website is automatically deployed to GitHub Pages using GitHub Actions when changes are pushed to the `main` branch.