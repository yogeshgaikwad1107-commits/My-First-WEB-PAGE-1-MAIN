# My-First-WEB-PAGE-1

Simple static site + small Node/Express backend that serves the phonetic alphabet A–Z.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start server:

   ```bash
   npm start
   ```

3. Open the site in your browser:

   http://localhost:3000

Click the **Explore More** button to fetch and view the alphabets.

### If the server can't run

- If `npm` or `node` is not available on your machine, the frontend now includes a **client-only fallback** (`alphabets.json`) so the Explore button works without running the Node backend. To test locally without Node, you can use VS Code Live Server or run a quick static server, for example:

  - Python 3: `python -m http.server 8000`
  - VS Code: install the **Live Server** extension and click "Go Live"

Open `http://localhost:8000` (or the Live Server URL) and click **Explore More**. If you do want the full backend, install Node.js (includes npm) from https://nodejs.org then run:

```bash
npm install
npm start
```

Tip: The site now supports two modes: **Indian Names** (default) and **Phonetic**. Use the buttons above the alphabet grid to switch modes after clicking **Explore More**.

### Video background and theme

- The site supports an optional hero video background. Place a file named `assets/hero.mp4` in the project root to use a local video, or edit `index.html` and change the `<source>` URL to a public MP4 URL.
- Use the **Video** button in the header to toggle the background video on/off. Your preference is stored in localStorage.
- If you do not add a video, the hero falls back to a stylish dark/gold gradient theme.

