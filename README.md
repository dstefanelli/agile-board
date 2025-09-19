# Agile Board

A modern task management application built with React and TypeScript.

## Features

- 📋 Task management
- 🔒 User authentication
- 🌍 Internationalization (i18n) support
- 💅 Modern UI with Shadcn components
- 🔄 Real-time updates with TanStack Query
- 🎭 Mock API with Mirage.js

## Prerequisites

- Node.js (v20.19+ / 22.12+)

## Installation

```bash
npm install
```

## Available Scripts

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Tech Stack

- ⚛️ **React 18** - UI Library
- 🏗️ **TypeScript** - Type Safety
- ⚡ **Vite** - Build Tool
- 🎨 **Tailwind CSS** - Styling
- 🔍 **TanStack Query** - Data Fetching
- 🌐 **i18next** - Internationalization
- 🎭 **Mirage.js** - API Mocking
- ✅ **Vitest** - Testing
- 📝 **ESLint** - Linting
- 💅 **Prettier** - Code Formatting

## Project Structure

```
src/
├── api/          # API integration
├── components/   # React components
├── configs/      # Configuration files
├── context/      # React context
├── hooks/        # Custom hooks
├── i18n/         # Internationalization
├── lib/          # Utilities and helpers
├── mockData/     # Mock API data and server
└── models/       # TypeScript interfaces
```

## Environment Variables

Create a `.env.development` file in the root directory and copy `.env.sample` content.


## Authentication

Default test credentials:

- Email: test@example.com
- Password: 1234

