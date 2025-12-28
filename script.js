document.addEventListener('DOMContentLoaded', () => {
  const exploreBtn = document.getElementById('exploreBtn');
  const container = document.getElementById('alphabet-container');
  const section = document.getElementById('alphabet-section');
  const modeIndianBtn = document.getElementById('mode-indian');
  const modePhoneticBtn = document.getElementById('mode-phonetic');
  const sourceEl = document.getElementById('name-source');

  let alphabetsData = null;
  let lastLoadedFrom = null; // 'server' or 'fallback'
  let mode = 'indian'; // default mode as you requested

  function render(data) {
    if (!data) return;
    const html = data.map(a => {
      const displayName = mode === 'indian' ? (a.indian || a.name || a.phonetic) : (a.phonetic || a.name || a.indian);
      const originLabel = mode === 'indian' ? 'Indian' : 'Phonetic';
      return `
      <div class="alphabet-card" role="article" aria-label="${a.letter} - ${displayName}" data-letter="${a.letter}">
        <div class="alphabet-letter">${a.letter}</div>
        <div class="alphabet-name">${displayName}</div>
        <div style="opacity:0.7; font-size:12px; margin-top:8px;">${originLabel}</div>
      </div>
    `;
    }).join('');

    container.innerHTML = html;

    // make cards navigate to per-letter page
    container.querySelectorAll('.alphabet-card').forEach(card => {
      card.addEventListener('click', () => {
        const L = card.dataset.letter;
        const url = `letter.html?letter=${encodeURIComponent(L)}&mode=${encodeURIComponent(mode)}`;
        window.location.href = url;
      });
    });

    updateSourceIndicator();
  }

  function updateSourceIndicator() {
    if (!lastLoadedFrom) return;
    sourceEl.querySelector('small').textContent = `Data source: ${lastLoadedFrom === 'server' ? 'server' : 'local fallback'}`;
  }

  function setMode(newMode) {
    mode = newMode;
    modeIndianBtn.classList.toggle('active', mode === 'indian');
    modePhoneticBtn.classList.toggle('active', mode === 'phonetic');
    modeIndianBtn.setAttribute('aria-selected', mode === 'indian');
    modePhoneticBtn.setAttribute('aria-selected', mode === 'phonetic');
    if (alphabetsData) render(alphabetsData);
  }

  modeIndianBtn.addEventListener('click', () => setMode('indian'));
  modePhoneticBtn.addEventListener('click', () => setMode('phonetic'));

  async function loadAlphabets() {
    exploreBtn.disabled = true;
    exploreBtn.textContent = 'Loading...';

    // Try backend first, then fall back to local JSON
    const sources = ['/api/alphabets', 'alphabets.json'];

    for (const src of sources) {
      try {
        const resp = await fetch(src);
        if (!resp.ok) throw new Error(`Fetch ${src} failed: ${resp.status}`);
        const data = await resp.json();
        alphabetsData = data;
        lastLoadedFrom = src === '/api/alphabets' ? 'server' : 'fallback';
        render(alphabetsData);
        exploreBtn.textContent = 'Explore More';
        exploreBtn.disabled = false;
        section.scrollIntoView({ behavior: 'smooth' });
        console.info(`Loaded alphabets from ${src}`);
        return;
      } catch (err) {
        console.warn(`Could not load from ${src}:`, err.message || err);
        // try next source
      }
    }

    // As a last resort, use an embedded built-in dataset so the page works even when opened via file://
    const embedded = [
      { letter: 'A', phonetic: 'Alpha', indian: 'Aarav', female: ['Aanya','Aisha','Ananya','Anika','Aarohi','Anushka','Avni','Amaya','Asha','Anvi'], names: ['Aarav','Arjun','Aditya','Aman','Akash','Amit','Aniket','Anirudh','Ansh','Ayaan','Avinash','Arnav'] },
      { letter: 'B', phonetic: 'Bravo', indian: 'Bharat', female: ['Bela','Bhavya','Bina','Bindiya','Barkha','Bani','Bhumika','Baani','Bela','Bidisha'], names: ['Bharat','Bhavesh','Bikram','Bilal','Brijesh','Bineet','Bhupen','Brij','Bharatendu','Bhuvan','Bharani','Balen'] },
      { letter: 'C', phonetic: 'Charlie', indian: 'Chirag', female: ['Chandni','Charvi','Chhaya','Chitra','Chandrika','Chetna','Chahak','Chandana','Charita','Charmi'], names: ['Chirag','Charan','Chetan','Chandan','Chinmay','Chaitanya','Chirantan','Chandran','Chinmoy','Chitra','Chetas','Chinmayak'] },
      { letter: 'D', phonetic: 'Delta', indian: 'Dhruv', names: ['Dhruv','Deepak','Darshan','Danish','Dinesh','Dev','Dilip','Divyesh','Devansh','Darsh','Dwij','Debashish'] },
      { letter: 'E', phonetic: 'Echo', indian: 'Eshan', names: ['Eshan','Eshwar','Ekagra','Emran','Ejaz','Eklavya','Ehsaan','Ebrahim','Ehtesham','Ebad','Eazaan','Eshaan'] },
      { letter: 'F', phonetic: 'Foxtrot', indian: 'Farhan', names: ['Farhan','Faisal','Feroz','Farooq','Fazal','Fardeen','Fahad','Firoz','Faiyaz','Faiz','Farid','Farrukh'] },
      { letter: 'G', phonetic: 'Golf', indian: 'Gaurav', names: ['Gaurav','Ganesh','Girish','Gautam','Gokul','Gulshan','Gautamraj','Govind','Girishan','Gagan','Gopal','Gurmeet'] },
      { letter: 'H', phonetic: 'Hotel', indian: 'Harsh', names: ['Harsh','Hritik','Himanshu','Harish','Harinder','Himadri','Haresh','Hemant','Harpreet','Harit','Hiralal','Hameed'] },
      { letter: 'I', phonetic: 'India', indian: 'Ishan', names: ['Ishan','Irfan','Ishaan','Imran','Inder','Ilyas','Ishwar','Ishfaq','Ishmael','Ishaanvi','Ishith','Irav'] },
      { letter: 'J', phonetic: 'Juliett', indian: 'Jai', names: ['Jai','Jatin','Javed','Jaspal','Jayesh','Jugal','Jaiwant','Javedan','Jagadish','Jehangir','Jayant','Jashan'] },
      { letter: 'K', phonetic: 'Kilo', indian: 'Karan', names: ['Karan','Kunal','Krishna','Kartik','Kishore','Kumar','Keshav','Karanveer','Kailash','Kavish','Kirtan','Kishan'] },
      { letter: 'L', phonetic: 'Lima', indian: 'Laksh', names: ['Laksh','Lokesh','Lalit','Laxman','Lokanath','Lalitendu','Lohit','Luv','Lahiri','Lohitashwa','Lekhan','Lalitkumar'] },
      { letter: 'M', phonetic: 'Mike', indian: 'Manav', names: ['Manav','Mohan','Manish','Mihir','Murtaza','Mayank','Munish','Mukul','Manohar','Mahesh','Mehul','Milind'] },
      { letter: 'N', phonetic: 'November', indian: 'Nikhil', names: ['Nikhil','Naveen','Nitin','Naman','Naseem','Nikhilesh','Niranjan','Neil','Nadeem','Navdeep','Nayan','Nilesh'] },
      { letter: 'O', phonetic: 'Oscar', indian: 'Om', names: ['Om','Ojas','Omesh','Onkar','Owais','Omar','Omkarnath','Oorjit','Ojaswin','Omprakash','Omkar','Ojasvi'] },
      { letter: 'P', phonetic: 'Papa', indian: 'Pranav', names: ['Pranav','Pankaj','Parth','Piyush','Pradeep','Prakash','Pavan','Parveen','Prem','Prithvi','Pranay','Pushkar'] },
      { letter: 'Q', phonetic: 'Quebec', indian: 'Qasim', names: ['Qasim','Qadir','Qamar','Qaush','Qais','Quamar','Qutub','Qudrat','Qamaruddin','Qudsi','Qamarvash','Qazi'] },
      { letter: 'R', phonetic: 'Romeo', indian: 'Rohan', names: ['Rohan','Rajat','Rakesh','Rishi','Rizwan','Rahul','Raghav','Rupesh','Roshan','Ritik','Ravindra','Rohit'] },
      { letter: 'S', phonetic: 'Sierra', indian: 'Sameer', names: ['Sameer','Sachin','Siddharth','Sahil','Sarvesh','Suresh','Siddhant','Sanjay','Sunil','Sumeet','Shivam','Suraj'] },
      { letter: 'T', phonetic: 'Tango', indian: 'Tanmay', names: ['Tanmay','Tarun','Tushar','Tariq','Tejas','Tapan','Trivikram','Tanuj','Tara','Tushit','Tarak','Tavr'] },
      { letter: 'U', phonetic: 'Uniform', indian: 'Uday', names: ['Uday','Utkarsh','Umesh','Umang','Ujjwal','Utsav','Udayan','Udayveer','Udvik','Udit','Udayprakash','Ujwal'] },
      { letter: 'V', phonetic: 'Victor', indian: 'Varun', names: ['Varun','Vikas','Vivek','Vikram','Vaibhav','Vivekanand','Vijay','Vimal','Vedant','Vasant','Vihan','Vraj'] },
      { letter: 'W', phonetic: 'Whiskey', indian: 'Waseem', names: ['Waseem','Wajid','Wasim','Wahid','Warun','Wasef','Wali','Waseemuddin','Wajahat','Waseemul','Waris','Waseeq'] },
      { letter: 'X', phonetic: 'X-ray', indian: 'Xavier', names: ['Xavier','Xerxes','Xavian','Xander','Xylon','Xavianth','Xayden','Xenon','Xavion','Xio','Xadrian','Xylen'] },
      { letter: 'Y', phonetic: 'Yankee', indian: 'Yash', names: ['Yash','Yogesh','Yasir','Yuvraj','Yogendra','Yuvin','Yuvan','Yunus','Yasiraj','Yatin','Yogendra','Yogit'] },
      { letter: 'Z', phonetic: 'Zulu', indian: 'Zain', names: ['Zain','Zeeshan','Zakir','Zubair','Zaheer','Zubairak','Zafar','Zayd','Zaeem','Zamin','Zayan','Zulfiqar'] }
    ];

    alphabetsData = embedded;
    lastLoadedFrom = 'embedded';
    render(alphabetsData);
    exploreBtn.textContent = 'Explore More';
    exploreBtn.disabled = false;
    section.scrollIntoView({ behavior: 'smooth' });
    console.info('Loaded embedded alphabets (no network)');
  }

  exploreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (container.children.length > 0) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      loadAlphabets();
    }
  });

  // Initialize default mode
  setMode(mode);

  // Video toggle: enable/disable (remove/recreate) background video (persisted in localStorage)
  const videoToggle = document.getElementById('videoToggle');
  const heroEl = document.querySelector('.hero');

  function createBgVideo() {
    // do nothing if already present
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

  // run once
  updateVideoState();
});
