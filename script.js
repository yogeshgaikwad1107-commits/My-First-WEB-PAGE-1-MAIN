document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const container = document.getElementById('font-styles-container');
  const noResultsMsg = document.getElementById('no-results-msg');

  // Array of font styles with emojis and CSS properties
  const fontStyles = [
    { name: '🎨 Bold Italic', css: 'font-weight: 900; font-style: italic; font-size: 28px;' },
    { name: '✨ Cursive', css: 'font-family: cursive; font-size: 28px; font-style: italic;' },
    { name: '🌟 Monospace', css: 'font-family: monospace; font-size: 26px; font-weight: bold; letter-spacing: 2px;' },
    { name: '💎 Shadow', css: 'font-weight: 700; font-size: 28px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);' },
    { name: '🔥 Small Caps', css: 'font-variant: small-caps; font-weight: bold; font-size: 28px;' },
    { name: '🎭 Comic Sans', css: 'font-family: "Comic Sans MS", cursive; font-size: 26px; font-weight: bold;' },
    { name: '🌈 Rainbow Color', css: 'background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: bold; font-size: 28px;' },
    { name: '🎪 Outlined', css: 'font-weight: bold; font-size: 28px; -webkit-text-stroke: 2px var(--accent); color: transparent;' },
    { name: '⭐ Uppercase Heavy', css: 'text-transform: uppercase; font-weight: 900; letter-spacing: 3px; font-size: 26px;' },
    { name: '💫 Underline Double', css: 'text-decoration: underline double; text-decoration-color: var(--accent); font-weight: bold; font-size: 28px;' },
    { name: '🌊 Wave', css: 'font-style: italic; font-weight: 700; font-size: 28px; letter-spacing: 2px;' },
    { name: '🎯 Serif Fancy', css: 'font-family: Georgia, serif; font-size: 28px; font-weight: bold; letter-spacing: 1px;' },
    { name: '🚀 Futuristic', css: 'font-family: "Arial Black", sans-serif; font-size: 24px; font-weight: 900; letter-spacing: 4px; text-transform: uppercase;' },
    { name: '💖 Pink Glow', css: 'color: #ff69b4; text-shadow: 0 0 10px #ff69b4, 0 0 20px #ff1493; font-weight: bold; font-size: 28px;' },
    { name: '🌙 Blue Glow', css: 'color: #00d4ff; text-shadow: 0 0 10px #00d4ff, 0 0 20px #0099ff; font-weight: bold; font-size: 28px;' },
    { name: '🔮 Mystical', css: 'font-family: Georgia, serif; font-style: italic; font-weight: 700; font-size: 28px; letter-spacing: 3px;' },
    { name: '⚡ Electric', css: 'background: linear-gradient(90deg, #ffff00, #ff8800); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-weight: 900; font-size: 28px;' },
    { name: '🎨 Graffiti', css: 'font-family: "Impact", sans-serif; font-size: 26px; font-weight: 900; letter-spacing: 2px; transform: skew(-10deg);' },
    { name: '🌸 Elegant', css: 'font-family: "Trebuchet MS", sans-serif; font-size: 28px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase;' },
    { name: '🎪 Strikethrough', css: 'text-decoration: line-through; font-weight: bold; font-size: 28px; letter-spacing: 2px;' }
  ];

  function generateFontStyles(text) {
    container.innerHTML = '';
    noResultsMsg.textContent = '';

    if (!text.trim()) {
      noResultsMsg.textContent = 'Start typing to see your word in 20 stylish fonts!';
      return;
    }

    const fragment = document.createDocumentFragment();

    fontStyles.forEach((style, index) => {
      const item = document.createElement('div');
      item.className = 'font-style-item';

      const preview = document.createElement('div');
      preview.className = 'preview';
      preview.innerHTML = `<span style="${style.css}">${text}</span>`;

      const styleName = document.createElement('div');
      styleName.className = 'style-name';
      styleName.textContent = style.name;

      item.appendChild(preview);
      item.appendChild(styleName);

      // Click to open in new tab
      item.addEventListener('click', () => {
        openInNewTab(text, style.css, style.name);
      });

      fragment.appendChild(item);
    });

    container.appendChild(fragment);
  }

  function openInNewTab(text, css, styleName) {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${text} - ${styleName}</title>
        <style>
          body {
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #0b0f1a, #2b1b1d);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            font-family: 'Poppins', Arial, sans-serif;
          }
          .container {
            text-align: center;
          }
          .text-display {
            ${css}
            color: #ffd54d;
            margin: 20px 0;
            word-break: break-word;
          }
          .style-info {
            color: rgba(255, 255, 255, 0.7);
            margin-top: 30px;
            font-size: 16px;
          }
          .back-btn {
            display: inline-block;
            margin-top: 30px;
            padding: 10px 20px;
            background: #ffd54d;
            color: #000;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            font-size: 14px;
            transition: 0.3s;
          }
          .back-btn:hover {
            background: white;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 style="color: #ffd54d; margin-bottom: 30px;">${styleName}</h1>
          <div class="text-display">${text}</div>
          <div class="style-info">
            <p>Style: <strong>${styleName}</strong></p>
            <p>Go back and try other styles!</p>
          </div>
          <button class="back-btn" onclick="window.history.back()">← Go Back</button>
        </div>
      </body>
      </html>
    `;

    const newTab = window.open('', '_blank');
    newTab.document.write(htmlContent);
    newTab.document.close();
  }

  // Listen for input
  searchInput.addEventListener('input', (e) => {
    generateFontStyles(e.target.value);
  });

  // Video toggle functionality
  const videoToggle = document.getElementById('videoToggle');
  const heroEl = document.querySelector('.hero');

  function createBgVideo() {
    if (!heroEl) return null;
    let v = document.getElementById('bgVideo');
    if (v) return v;
    v = document.createElement('video');
    v.id = 'bgVideo';
    v.autoplay = true;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;

    const src = document.createElement('source');
    src.src = 'assets/hero.mp4';
    src.type = 'video/mp4';
    v.appendChild(src);

    const overlay = heroEl.querySelector('.hero-overlay');
    if (overlay) heroEl.insertBefore(v, overlay);
    else heroEl.insertBefore(v, heroEl.firstChild);

    try { v.play(); } catch (e) { /* ignore */ }
    return v;
  }

  function removeBgVideo() {
    const v = document.getElementById('bgVideo');
    if (v && v.parentNode) v.parentNode.removeChild(v);
  }

  function updateVideoState() {
    const enabled = localStorage.getItem('videoEnabled') !== 'false';
    if (!videoToggle || !heroEl) return;
    if (enabled) {
      createBgVideo();
      videoToggle.textContent = 'Video On';
      videoToggle.setAttribute('aria-pressed', 'false');
    } else {
      removeBgVideo();
      videoToggle.textContent = 'Video Off';
      videoToggle.setAttribute('aria-pressed', 'true');
    }
  }

  if (videoToggle) {
    videoToggle.addEventListener('click', () => {
      const cur = localStorage.getItem('videoEnabled') !== 'false';
      localStorage.setItem('videoEnabled', (!cur).toString());
      updateVideoState();
    });
  }

  updateVideoState();

  // Explore button functionality - opens search bar in new tab
  const exploreBtn = document.getElementById('exploreBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(window.location.href + '#search-section', '_blank');
    });
  }
});
