# JikanExplorer

## Project Description

JikanExplorer is a front-end web application developed as part of a personal learning project aimed at mastering the use and integration of third-party REST APIs in JavaScript. 

This project allows you to explore the vast MyAnimeList database using the public Jikan API (v4). Users can discover popular anime and manga, search for specific titles, view in-depth details, and safely generate random recommendations.

## Main Features

* Dashboard (Home):
  - Dynamic display of trending anime and manga.
  - Infinite scrolling horizontal carousel to showcase popular titles.
  - Ranking grid displaying the top 6 highest-rated titles.

* Exploration Pages (Anime & Manga):
  - Navigation through the entire API catalog via a pagination system.
  - Functional search bar to find a title by name.
  - Interactive cards displaying the thumbnail, score, title, and genres on hover.

* Dynamic Details Page:
  - On-the-fly page construction by retrieving the title's ID from the URL.
  - Comprehensive information display: synopsis, score, global ranking, popularity, genres, themes, broadcast status, and studio.

* Random Generator:
  - Interface to discover a random anime or manga.
  - Automatic content filter: the script checks the genres and age rating of the returned title. If adult content (Hentai, Erotica, Rx) is detected, a new request is automatically triggered until a "safe" title is found.

* Error Handling and API Rate Limits:
  - Specific handling of HTTP 429 status code (Too Many Requests). Instead of breaking the page, a clear message informs the user of the temporary overload.
  - Wait times (setTimeout) integrated during multiple API calls on the homepage to avoid overloading the Jikan server.

## Technologies Used

* HTML5: Semantic structure.
* CSS3 & Tailwind CSS: Responsive layout (Mobile, Tablet, Desktop), dark theme, glassmorphism effects, and smooth animations integrated via the Tailwind CDN.
* JavaScript (Vanilla / ES6+): Front-end logic, DOM interaction, and asynchrony.
* Jikan API v4: Unofficial MyAnimeList REST API used to retrieve all data.

## Learning Objectives Achieved

This project was an opportunity to practice and consolidate several key web development concepts:

1. RESTful API Consumption: Using the global `fetch()` API to send HTTP requests (GET).
2. Asynchronous Programming: Mastering Promises and the `async / await` syntax to handle server response times.
3. JSON Data Manipulation: Extracting, formatting, and using nested data from a rich API.
4. Dynamic DOM Manipulation: Creating HTML elements on the fly (`document.createElement`), using Template Literals to inject complex blocks, and clearing containers.
5. Simple Routing: Using `URLSearchParams` to retrieve variables (ID and type) passed from one page to another via the URL.
6. Rate Limiting Management: Implementing logic to space out requests and handle server errors gracefully.

## Installation and Usage

Since this is a purely front-end project (with no embedded database or custom Node.js server), deployment is very simple:

1. Clone this repository to your local machine or download the files.
2. Simply open the `index.html` file in your web browser (Chrome, Firefox, Edge, etc.).
3. Navigate the site.

Technical note: An active internet connection is required for the site to function properly. It is necessary to fetch Tailwind CSS styles, Google fonts, and to make requests to the Jikan API.

## Project Structure

- `index.html`: Home page.
- `animes.html`: Global anime exploration page.
- `mangas.html`: Global manga exploration page.
- `details.html`: Modular page displaying information about the selected title.
- `random.html`: Page for random discovery.
- `script.js`: Contains all JavaScript logic and API calls.
- `styles.css`: Contains font imports and custom animations (especially for the carousels).
- `/assets`: Folder containing local static resources (logos, icon).

---

Developed as part of a learning journey to master APIs.