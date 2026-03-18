# My Weather App

A simple full-stack weather application built with React (Vite) and Express.
Users can enter a city name to get the current weather information.

## Features

- Search weather by city name
- Shows temperature (°C), weather condition, date, and location
- Backend proxy endpoint to keep API key on the server
- Input validation and friendly error messages

## Tech Stack

- Frontend: React + Vite + Bootstrap
- Backend: Node.js + Express + CORS + dotenv
- Weather API: [WeatherAPI](https://www.weatherapi.com/)

## Project Structure

```text
weather1/
├── backend/
│   └── app.js
├── src/
│   ├── components/
│   ├── services/
│   └── App.jsx
├── public/
└── package.json
```

## Prerequisites

- Node.js 18+
- npm
- A free API key from WeatherAPI

## Environment Variables

Create a `.env` file in the project root:

```env
WEATHER_API_KEY=your_weatherapi_key_here
PORT=3000
```

## Installation

```bash
npm install
```

## Running the App

Run frontend and backend in two terminals from the project root.

### Terminal 1 (Backend)

```bash
node backend/app.js
```

### Terminal 2 (Frontend)

```bash
npm run dev
```

Then open the Vite URL shown in terminal (usually `http://localhost:5173`).

## API Endpoint

### `POST /api/weather`

Request body:

```json
{
  "city": "London"
}
```

Success response:

```json
{
  "temp": 16,
  "condition": "Partly cloudy",
  "date": "2026-03-18 10:30",
  "city": "London, United Kingdom"
}
```

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- Frontend service calls backend at `http://localhost:3000/api/weather`
- If you change backend port, update `src/services/weatherService.js`
