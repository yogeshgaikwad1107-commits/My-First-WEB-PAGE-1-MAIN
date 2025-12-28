(function(){
  const params = new URLSearchParams(location.search);
  const letterParam = (params.get('letter') || 'A').toUpperCase();
  const modeParam = (params.get('mode') || 'indian');

  const letterEl = document.getElementById('letter');
  const phoneticEl = document.getElementById('phonetic');
  const namesEl = document.getElementById('names');
  const sourceEl = document.getElementById('source');
  const emptyMsg = document.getElementById('emptyMsg');

  letterEl.textContent = letterParam;

  async function fetchData() {
    const sources = ['/api/alphabets','alphabets.json'];

    for (const src of sources) {
      try {
        const r = await fetch(src);
        if (!r.ok) throw new Error(`Bad ${r.status}`);
        const data = await r.json();
        return {data, source: src === '/api/alphabets' ? 'server' : 'fallback'};
      } catch (err) {
        // try next
      }
    }

    // embedded fallback
    const embedded = [
      { letter: 'A', phonetic: 'Alpha', indian: 'Aarav', female: ['Aanya','Aisha','Ananya','Anika','Aarohi','Anushka','Avni','Amaya','Asha','Anvi'], names: ['Aarav','Arjun','Aditya','Aman','Akash','Amit','Aniket','Anirudh','Ansh','Ayaan','Avinash','Arnav'] },
      { letter: 'B', phonetic: 'Bravo', indian: 'Bharat', female: ['Bela','Bhavya','Bina','Bindiya','Barkha','Bani','Bhumika','Baani','Bela','Bidisha'], names: ['Bharat','Bhavesh','Bikram','Bilal','Brijesh','Bineet','Bhupen','Brij','Bharatendu','Bhuvan','Bharani','Balen'] },
      { letter: 'C', phonetic: 'Charlie', indian: 'Chirag', female: ['Chandni','Charvi','Chhaya','Chitra','Chandrika','Chetna','Chahak','Chandana','Charita','Charmi'], names: ['Chirag','Charan','Chetan','Chandan','Chinmay','Chaitanya','Chirantan','Chandran','Chinmoy','Chitra','Chetas','Chinmayak'] },
      { letter: 'D', phonetic: 'Delta', indian: 'Dhruv', female: ['Divya','Diya','Diksha','Damini','Deepa','Deepti','Disha','Dhriti','Darsha','Devika'], names: ['Dhruv','Deepak','Darshan','Danish','Dinesh','Dev','Dilip','Divyesh','Devansh','Darsh','Dwij','Debashish'] },
      { letter: 'E', phonetic: 'Echo', indian: 'Eshan', female: ['Esha','Eshani','Eveli','Eila','Eshita','Ekta','Eisha','Eshwari','Ekavi','Era'], names: ['Eshan','Eshwar','Ekagra','Emran','Ejaz','Eklavya','Ehsaan','Ebrahim','Ehtesham','Ebad','Eazaan','Eshaan'] },
      { letter: 'F', phonetic: 'Foxtrot', indian: 'Farhan', female: ['Farah','Fariya','Fiza','Falguni','Femina','Fariha','Fatima','Fahima','Farheen','Fariya'], names: ['Farhan','Faisal','Feroz','Farooq','Fazal','Fardeen','Fahad','Firoz','Faiyaz','Faiz','Farid','Farrukh'] },
      { letter: 'G', phonetic: 'Golf', indian: 'Gaurav', female: ['Gauri','Gita','Gulnaaz','Gulki','Gunjan','Gurleen','Gayatri','Gitali','Gulshan','Gurnoor'], names: ['Gaurav','Ganesh','Girish','Gautam','Gokul','Gulshan','Gautamraj','Govind','Girishan','Gagan','Gopal','Gurmeet'] },
      { letter: 'H', phonetic: 'Hotel', indian: 'Harsh', female: ['Harini','Hema','Hina','Hinaaz','Heena','Hrishita','Hiral','Hiralika','Hamsika','Himani'], names: ['Harsh','Hritik','Himanshu','Harish','Harinder','Himadri','Haresh','Hemant','Harpreet','Harit','Hiralal','Hameed'] },
      { letter: 'I', phonetic: 'India', indian: 'Ishan', female: ['Isha','Ira','Iraja','Iravati','Ishita','Ipsa','Ila','Ishani','Ilaa','Inaya'], names: ['Ishan','Irfan','Ishaan','Imran','Inder','Ilyas','Ishwar','Ishfaq','Ishmael','Ishaanvi','Ishith','Irav'] },
      { letter: 'J', phonetic: 'Juliett', indian: 'Jai', female: ['Jaya','Jahnavi','Jiya','Janhavi','Jasmin','Juthika','Juhi','Jiyaan','Jivika','Jivanta'], names: ['Jai','Jatin','Javed','Jaspal','Jayesh','Jugal','Jaiwant','Javedan','Jagadish','Jehangir','Jayant','Jashan'] },
      { letter: 'K', phonetic: 'Kilo', indian: 'Karan', female: ['Kavya','Kriti','Kiran','Kanika','Kripa','Kashvi','Kusum','Karishma','Khyati','Komal'], names: ['Karan','Kunal','Krishna','Kartik','Kishore','Kumar','Keshav','Karanveer','Kailash','Kavish','Kirtan','Kishan'] },
      { letter: 'L', phonetic: 'Lima', indian: 'Laksh', female: ['Lata','Lavanya','Likhita','Lekha','Lina','Lalita','Lajja','Lihini','Lisha','Lalima'], names: ['Laksh','Lokesh','Lalit','Laxman','Lokanath','Lalitendu','Lohit','Luv','Lahiri','Lohitashwa','Lekhan','Lalitkumar'] },
      { letter: 'M', phonetic: 'Mike', indian: 'Manav', female: ['Meera','Mina','Mitali','Maya','Madhuri','Manisha','Madhavi','Mohana','Minal','Monika'], names: ['Manav','Mohan','Manish','Mihir','Murtaza','Mayank','Munish','Mukul','Manohar','Mahesh','Mehul','Milind'] },
      { letter: 'N', phonetic: 'November', indian: 'Nikhil', female: ['Nisha','Neha','Nikita','Naina','Nidhi','Neelam','Nandita','Navya','Nupur','Nikita'], names: ['Nikhil','Naveen','Nitin','Naman','Naseem','Nikhilesh','Niranjan','Neil','Nadeem','Navdeep','Nayan','Nilesh'] },
      { letter: 'O', phonetic: 'Oscar', indian: 'Om', female: ['Oshin','Ojasvi','Oviya','Oorja','Oindrila','Ojaswini','Oorvi','Omi','Oshinika','Oorja'], names: ['Om','Ojas','Omesh','Onkar','Owais','Omar','Omkarnath','Oorjit','Ojaswin','Omprakash','Omkar','Ojasvi'] },
      { letter: 'P', phonetic: 'Papa', indian: 'Pranav', female: ['Pooja','Priya','Prisha','Pavitra','Pranali','Pallavi','Puja','Priti','Prerna','Parul'], names: ['Pranav','Pankaj','Parth','Piyush','Pradeep','Prakash','Pavan','Parveen','Prem','Prithvi','Pranay','Pushkar'] },
      { letter: 'Q', phonetic: 'Quebec', indian: 'Qasim', female: ['Qurat','Qudsia','Qamra','Qudsiyah','Qismat','Quratulain','Qudsia','Qamar','Qudsi','Qanita'], names: ['Qasim','Qadir','Qamar','Qaush','Qais','Quamar','Qutub','Qudrat','Qamaruddin','Qudsi','Qamarvash','Qazi'] },
      { letter: 'R', phonetic: 'Romeo', indian: 'Rohan', female: ['Rhea','Riya','Rimjhim','Ritika','Rashmi','Ritu','Roshni','Ragini','Roohi','Rubina'], names: ['Rohan','Rajat','Rakesh','Rishi','Rizwan','Rahul','Raghav','Rupesh','Roshan','Ritik','Ravindra','Rohit'] },
      { letter: 'S', phonetic: 'Sierra', indian: 'Sameer', female: ['Shruti','Sonia','Sneha','Swati','Smita','Simran','Shreya','Sakshi','Seema','Sarika'], names: ['Sameer','Sachin','Siddharth','Sahil','Sarvesh','Suresh','Siddhant','Sanjay','Sunil','Sumeet','Shivam','Suraj'] },
      { letter: 'T', phonetic: 'Tango', indian: 'Tanmay', female: ['Tanya','Trisha','Tanvi','Tara','Tanu','Teena','Tripti','Tina','Tulsi','Tarini'], names: ['Tanmay','Tarun','Tushar','Tariq','Tejas','Tapan','Trivikram','Tanuj','Tara','Tushit','Tarak','Tavr'] },
      { letter: 'U', phonetic: 'Uniform', indian: 'Uday', female: ['Usha','Urvashi','Upasana','Ujjwala','Uma','Udita','Unnati','Urvashi','Uthara','Urmi'], names: ['Uday','Utkarsh','Umesh','Umang','Ujjwal','Utsav','Udayan','Udayveer','Udvik','Udit','Udayprakash','Ujwal'] },
      { letter: 'V', phonetic: 'Victor', indian: 'Varun', female: ['Veda','Vani','Vasudha','Vriti','Vandana','Vasundhara','Vimala','Vashti','Vanshika','Veena'], names: ['Varun','Vikas','Vivek','Vikram','Vaibhav','Vivekanand','Vijay','Vimal','Vedant','Vasant','Vihan','Vraj'] },
      { letter: 'W', phonetic: 'Whiskey', indian: 'Waseem', female: ['Warda','Wahida','Wajida','Wamiqa','Wajeeha','Warda','Warda','Wimal','Wanshika','Wamika'], names: ['Waseem','Wajid','Wasim','Wahid','Warun','Wasef','Wali','Waseemuddin','Wajahat','Waseemul','Waris','Waseeq'] },
      { letter: 'X', phonetic: 'X-ray', indian: 'Xavier', female: ['Xena','Xara','Xaviera','Xenia','Xia','Xoe'], names: ['Xavier','Xerxes','Xavian','Xander','Xylon','Xavianth','Xayden','Xenon','Xavion','Xio','Xadrian','Xylen'] },
      { letter: 'Y', phonetic: 'Yankee', indian: 'Yash', female: ['Yamini','Yashika','Yasmin','Yukti','Yuvika','Yamini','Yashodhara','Yashvi','Yashna','Yashita'], names: ['Yash','Yogesh','Yasir','Yuvraj','Yogendra','Yuvin','Yuvan','Yunus','Yasiraj','Yatin','Yogendra','Yogit'] },
      { letter: 'Z', phonetic: 'Zulu', indian: 'Zain', female: ['Zara','Zainab','Zara','Zeenat','Zoya','Zarina','Zuleikha','Zehra','Zaina','Zubina'], names: ['Zain','Zeeshan','Zakir','Zubair','Zaheer','Zubairak','Zafar','Zayd','Zaeem','Zamin','Zayan','Zulfiqar'] }
    ];

    return {data: embedded, source: 'embedded'};
  }

  function renderLetter(entry, source) {
    if (!entry) {
      emptyMsg.style.display = 'block';
      sourceEl.querySelector('small').textContent = `Data source: ${source}`;
      phoneticEl.textContent = '';
      namesEl.innerHTML = '';
      return;
    }

    emptyMsg.style.display = 'none';
    phoneticEl.textContent = entry.phonetic ? `${entry.phonetic}` : '';

    const femaleList = (entry.female && entry.female.length) ? entry.female : [];
    const maleList = (entry.names && entry.names.length) ? entry.names : [(entry.indian || entry.phonetic || '')];

    // Build sections: Girls on top, Boys below
    const femaleSection = femaleList.length ? `
      <div class="female-section">
        <h4>Girls</h4>
        <div class="names-grid female-grid">
          ${femaleList.map((n, idx) => `
            <div class="name-card female-card font-${idx % 6}" data-name="${n}" tabindex="0" role="button" aria-label="Copy ${n}">
              <h3>${n}</h3>
              <div class="note">Click to copy</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const maleSection = `
      <div class="male-section">
        <h4>Boys</h4>
        <div class="names-grid male-grid">
          ${maleList.map((n, idx) => `
            <div class="name-card male-card font-${idx % 6}" data-name="${n}" tabindex="0" role="button" aria-label="Copy ${n}">
              <h3>${n}</h3>
              <div class="note">Click to copy</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    namesEl.innerHTML = femaleSection + maleSection;

    // attach copy handlers to all name-cards
    namesEl.querySelectorAll('.name-card').forEach((el) => {
      el.addEventListener('click', () => {
        const text = el.getAttribute('data-name');
        navigator.clipboard?.writeText(text).then(()=>{
          el.querySelector('.note').textContent = 'Copied!';
          setTimeout(()=> el.querySelector('.note').textContent = 'Click to copy', 1200);
        }).catch(()=>{
          alert(text);
        });
      });

      el.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          el.click();
        }
      });
    });

    sourceEl.querySelector('small').textContent = `Data source: ${source}`;
  }

  (async function init(){
    const result = await fetchData();
    const data = result.data;
    const src = result.source;

    const entry = data.find(it => (it.letter||'').toUpperCase() === letterParam);

    renderLetter(entry, src);
  })();
})();