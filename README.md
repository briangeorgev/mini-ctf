# mini-ctf

A small browser-based Capture the Flag challenge built with plain HTML, CSS, and JavaScript.

## What it includes

- player name entry
- multiple CTF-style challenges
- score tracking
- leaderboard stored in `localStorage`
- beginner-friendly hidden flag puzzles

## How to run

Open `index.html` in a browser.

You can also serve it locally with a simple static server:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Notes

This project is intentionally simple and beginner-friendly. It is designed to teach web-based CTF concepts using browser inspection, hidden DOM content, and source-viewing.

## Files

- `index.html` – page structure
- `style.css` – styling
- `script.js` – game logic and challenge data
