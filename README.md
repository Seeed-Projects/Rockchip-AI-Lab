# Rockchip AI Lab Website

This repository contains the source code for the Rockchip AI Lab website, built with HTML, CSS, and JavaScript.

## Project Structure

```
Rockchip-AI-Lab/
├── dist/                   # Distribution directory
├── img/                    # Image assets
├── node_modules/           # Node.js dependencies
├── public/                 # Built website files (deployed to GitHub Pages)
├── src/                    # Source files
│   ├── components/         # Reusable components (navigation, RK chips header)
│   ├── content/            # Content files organized by chip model and AI field
│   │   ├── rk1820/         # Content for RK1820 chip
│   │   │   ├── cv/         # Computer Vision content
│   │   │   ├── llm/        # Large Language Model content
│   │   │   ├── ui/         # User Interface content
│   │   │   └── vlm/        # Visual Language Model content
│   │   └── rk3588/         # Content for RK3588 chip
│   │       ├── cv/         # Computer Vision content
│   │       ├── llm/        # Large Language Model content
│   │       ├── ui/         # User Interface content
│   │       └── vlm/        # Visual Language Model content
│   ├── js/                 # JavaScript files
│   ├── pages/              # HTML pages (Home, CV, LLM, VLM, UI)
│   ├── index.html          # Main HTML file
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

Each page allows users to select between Rockchip processors RK3588 and RK1820, and dynamically loads relevant content from the corresponding content directories.

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

4. For development with auto-rebuild:
   ```bash
   npm run dev
   ```

## Deployment

The website is automatically deployed to GitHub Pages using GitHub Actions when changes are pushed to the `main` branch.