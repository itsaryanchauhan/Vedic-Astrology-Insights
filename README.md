# Vite React TypeScript Astrology App

## Overview

This project is a Vite-based React application that provides astrology insights through various features, including horoscopes and Vedic interpretations. The application is built using TypeScript and styled with Tailwind CSS.

## Project Structure

project-root
│
├── /public
│ ├── index.html
│ └── assets
│ ├── stars.png
│ └── vite.svg
│
├── /src
│ ├── /components
│ ├── /pages
│ ├── /utils
│ ├── /styles
│ ├── /hooks
│ ├── App.jsx
│ ├── main.tsx
│ └── vite-env.d.ts
│
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
└── README.md

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- Interactive globe visualization.
- Horoscope and Vedic astrology insights.
- User-friendly chatbot interface for astrology queries.

## Usage

- Navigate to the landing page to explore features.
- Use the chatbot to ask questions about your horoscope or astrology.

## Components

- **BirthDetailsForm**: A form component for collecting user's birth details.
- **GeetaBot**: A chatbot component that interacts with the user and provides responses based on user input.
- **Globe**: A component that displays an interactive globe.
- **HoroscopeBot**: A chatbot component specifically for horoscope-related queries.
- **PlanetCard**: Displays information about a specific planet.
- **VedicInterpretation**: Displays interpretations based on Vedic astrology.

## Utilities

- **api.js**: Contains functions for making API calls related to astrology data.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
