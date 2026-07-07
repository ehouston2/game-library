# Game Discovery Engine

A front-end web application for browsing, searching, and curating a personal library of video games. This project interfaces with the RAWG Video Games Database API to fetch real-time game data.

## Tech Stack

* **Framework:** React 
* **Language:** TypeScript (Strict Mode)
* **Build Tool:** Vite
* **Data Source:** RAWG API

## Features

* **Enterprise Type Safety:** Configured with strict TypeScript interfaces for predictable data flow and error prevention.
* **Defensive Architecture:** Implements comprehensive network lifecycle states (`isLoading`, `error`) to protect the UI during asynchronous API calls.
* **Local Caching:** Utilizes `localStorage` to persist the user's custom game library across browser sessions.
* **Responsive Grid:** (Upcoming) Dynamic CSS layout for rendering high-quality game cover art and metadata.

## Getting Started

To run this project locally, clone the repository and run the following commands:

1. Install the dependencies:
   ```bash
   npm install