const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Alphabets A-Z with phonetic, Indian boys' name and expanded names list
const alphabets = [
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

// Serve static files from project root
app.use(express.static(path.join(__dirname)));

// API endpoint
app.get('/api/alphabets', (req, res) => {
  res.json(alphabets);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
