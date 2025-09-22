
# Kolam Design Analyzer

Kolam Design Analyzer is a web application for exploring, creating, and learning about traditional South Indian Kolam patterns. The app provides interactive tools to draw Kolams, upload your own designs, and learn step-by-step with guided lessons.

## Features

- **Interactive Canvas:** Draw Kolam patterns with grid, symmetry, and color options.
- **Learn Mode:** Step-by-step lessons for beginners to advanced Kolam designs.
- **Upload & Analyze:** Upload images of Kolams for analysis and inspiration.
- **Responsive UI:** Modern, mobile-friendly interface with smooth animations.
- **About & Fun Facts:** Learn about the cultural significance of Kolams.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
1. Clone the repository:
	```sh
	git clone https://github.com/mayurgoswami/KolamDesignAnalyzer.git
	cd KolamDesignAnalyzer
	```
2. Install dependencies:
	```sh
	npm install
	```

### Running Locally
Start the development server:
```sh
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production
```sh
npm run build
```
The output will be in the `dist/` folder.

### Deployment
Deploy to GitHub Pages:
```sh
npm run deploy
```

## Project Structure

- `src/` — React components and assets
  - `CanvasSection/` — Drawing canvas for Kolam creation
  - `LearnSection/` — Guided lessons and interactive learning
  - `UploadSection/` — Image upload and analysis
  - `AboutSection/` — Info and fun facts about Kolams
  - `Header/`, `Footer/`, `HeroSection/` — UI layout components
- `public/` — Static assets (favicon, SVG)
- `index.html` — Main HTML entry point

## Technologies Used
- React 19
- Vite
- React Router DOM
- React Konva (canvas drawing)
- Framer Motion (animations)
- Lucide React (icons)

## License
MIT

---
*Created by Mayur Goswami. For educational and cultural purposes.*
