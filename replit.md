# My First Web Page - Font Style Generator

## Overview
A stylish Node.js/Express application that serves a dynamic Font Style Generator. Users can enter any word and see it displayed in 20 unique, stylish fonts with emojis. Each font style opens in a new tab for a full-screen preview.

## Project Structure
- `server.js` - Express server serving static files on port 5000 (0.0.0.0)
- `index.html` - Main landing page with hero section and font search interface
- `script.js` - JavaScript handling font generation and new tab functionality
- `style.css` - Merged into index.html
- `alphabets.json` - Legacy data (can be removed)
- `letter.html`, `letter.js` - Legacy letter pages (can be removed)

## Features
✨ **Font Style Generator:**
- 20 unique font styles with emoji labels
- Includes: Bold Italic, Cursive, Monospace, Neon Glow, Rainbow, Electric, Mystical, and more
- Real-time preview as you type
- Click any style to open full-screen preview in new tab
- Max 30 characters per search

## Running the Application
The server runs on port 5000 at 0.0.0.0 and serves:
- Static files from project root
- HTML with embedded search functionality

## User Journey
1. Hero section greets users with "Explore More" button
2. Click button to scroll to Font Style Generator
3. Type any word in search bar
4. See 20 stylish fonts instantly
5. Click any font to see full-screen preview
6. Use "Go Back" button to return to generator

## Recent Changes
- 2025-01-01: Initial setup for Replit environment (port 5000)
- 2025-01-01: Removed alphabet grid section
- 2025-01-01: Added Font Style Generator with 20 stylish fonts + emojis
- 2025-01-01: Implemented new tab preview feature for each font style
