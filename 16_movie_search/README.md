# Movie Search

## Description
A simple Next.js application that allows users to search for movies and display details using the OMDB API.

## Functionalities
- Search by movie title
- Display movie details (title, poster, synopsis)
- Fetch data from the OMDB API

## Overview of the Mini Next.js Application
The Movie Search application enables users to:
- Search by movie title
- View movie details such as title, poster, and synopsis
- Utilize the OMDB API for movie data retrieval

## Tech-Stack Used
- **Next.js**: A React framework for building full-stack web applications.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Shadcn UI**: Beautifully designed Tailwind CSS components for UI enhancement.
- **OMDB API**: The Open Movie Database API for fetching movie details.
- **Vercel**: Used for deploying the Next.js web application.

## Deployment
Check out the live application here: [Movie Search](https://16-movie-search-rho.vercel.app/)

## API Key Setup
1. Get a free API key from OMDB: [OMDB API Key](https://www.omdbapi.com/apikey.aspx)
2. A verification link to activate your key will be sent to your email.
3. Store the API key in a `.env.local` file:
   ```env
   NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
   ```
4. Restart your development server after updating the environment variables.

## Installation & Setup
To run this project locally, follow these steps:

### 1. Clone the repository:
```sh
git clone https://github.com/Hammadsheikh5/30-Projects-FrontEnd.git
```

### 2. Navigate to the project directory:
```sh
cd 30-Projects-FrontEnd/16_movie_search
```

### 3. Install dependencies:
```sh
yarn install  # or npm install
```

### 4. Start the development server:
```sh
yarn dev  # or npm run dev
```

## License
This project is open-source and available under the MIT License.

---
Developed by **Hammad Sheikh** as part of the 30 Frontend Projects Series.

