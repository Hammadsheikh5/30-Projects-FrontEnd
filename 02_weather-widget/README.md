# Day 2: Weather Widget

## Description
A widget to display the current weather of a location.

## Functionalities
- Search by city
- Display current temperature and weather conditions
- Use a weather API (e.g., WeatherAPI)

## Overview of the Mini Next.js Application
Our Weather Widget application allows users to:
- Search by city
- Display current temperature and weather conditions

## Tech Stack Used
- **Next.js**: A React framework for building full-stack web applications.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **ShadCN UI**: Beautifully designed Tailwind CSS components for UI enhancement.
- **WeatherAPI**: Provides access to real-time weather information for millions of locations worldwide.
- **Vercel**: For deploying the Next.js web application.

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Hammadsheikh5/30-Projects-FrontEnd.git
   cd 30-Projects-FrontEnd/02-weather-widget
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add your WeatherAPI key:
     ```sh
     NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
     ```

4. Run the application:
   ```sh
   npm run dev
   ```

5. Open in browser:
   - Navigate to `http://localhost:3000` to view the application.

## Deployment
- The app is deployed using **Vercel**.
- Visit the live version here: [Live Demo](https://02-weather-widget-blush.vercel.app/)

## Contributing
Feel free to contribute! Fork the repository, make your changes, and submit a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).

