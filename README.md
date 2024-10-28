# FilmFind

**FilmFind** is a web application that allows users to search for movies and series. It uses the OMDB API to provide detailed information about each title, including ratings, plot, genre, and more. Check out the site [here](film-find.vercel.app).

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: OMDb API integration
- **HTTP Client**: Axios

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jadhavanushka/filmfind.git
   cd filmfind
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up API Key:**
   - Get an API key from [OMDb API](http://www.omdbapi.com/apikey.aspx).
   - Create a `.env` file in the root directory and add your API key:
     ```plaintext
     REACT_APP_OMDB_API_KEY=your_api_key
     ```

4. **Start the application:**
   ```bash
   npm start
   ```
   The app should now be running on `http://localhost:3000`.


## API Reference
Using OMDB API to fetch movie data.

1. **Search**: http://www.omdbapi.com/?s=<query>&type=<type>&page=<page>&apikey=<your_api_key>
2. **Details**: http://www.omdbapi.com/?i=<imdbID>&apikey=<your_api_key>

   
