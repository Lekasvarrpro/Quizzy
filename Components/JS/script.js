// References
const quizTitle = document.getElementById("quiz-title");
const timePerQuestionEl = document.getElementById("time-per-question");
const totalQuestionsEl = document.getElementById("total-questions");
const questionBox = document.getElementById("question-box");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const timerEl = document.getElementById("time-left");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const totalScoreEl = document.getElementById("total-score");
const restartBtn = document.getElementById("restart-btn");

// Load selected module and timer
const selectedModule = localStorage.getItem("selectedModule") || "technology";
const timePerQuestion = 20; // default 20s
let timeoutId;

// Quiz data
const quizData = {
  technology: [
    {
      q: "HTML stands for?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "High Text Machine Language",
        "Hyper Tool Markup Language",
      ],
      answer: 0,
    },
    {
      q: "CSS is used for?",
      options: [
        "Styling web pages",
        "Structuring web pages",
        "Programming server",
        "Database management",
      ],
      answer: 0,
    },
    {
      q: "Which of these is a JavaScript framework?",
      options: ["React", "Laravel", "Django", "Flask"],
      answer: 0,
    },
    {
      q: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Structured Question Language",
        "Sequential Query Language",
      ],
      answer: 0,
    },
    {
      q: "Which company developed Python?",
      options: ["Microsoft", "Apple", "Google", "Python Software Foundation"],
      answer: 3,
    },
    {
      q: "Purpose of Git?",
      options: [
        "Version control",
        "Text editing",
        "Web hosting",
        "Database management",
      ],
      answer: 0,
    },
    {
      q: "Protocol for secure communication?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      answer: 2,
    },
    {
      q: "DNS stands for?",
      options: [
        "Domain Name System",
        "Data Network Server",
        "Direct Name Service",
        "Digital Network System",
      ],
      answer: 0,
    },
    {
      q: "Which is NOT a NoSQL database?",
      options: ["MongoDB", "Cassandra", "PostgreSQL", "Redis"],
      answer: 2,
    },
    {
      q: "In AI, NLP stands for?",
      options: [
        "Natural Logic Processing",
        "Neural Language Processing",
        "Natural Language Processing",
        "Neural Learning Protocol",
      ],
      answer: 2,
    },
  ],

  science: [
    {
      q: "Water's chemical formula?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      answer: 0,
    },
    {
      q: "Earth revolves around?",
      options: ["Moon", "Sun", "Mars", "Venus"],
      answer: 1,
    },
    {
      q: "Which gas is essential for respiration?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
      answer: 0,
    },
    {
      q: "Unit of force?",
      options: ["Newton", "Pascal", "Joule", "Watt"],
      answer: 0,
    },
    {
      q: "What causes tides?",
      options: ["Sun's gravity", "Earth's rotation", "Moon's gravity", "Wind"],
      answer: 2,
    },
    {
      q: "DNA stands for?",
      options: [
        "Deoxyribonucleic Acid",
        "Deoxy Nuclear Acid",
        "Dynamic Nucleic Acid",
        "Deoxyribonitro Acid",
      ],
      answer: 0,
    },
    { q: "pH of pure water?", options: ["5", "6", "7", "8"], answer: 2 },
    {
      q: "Light year measures?",
      options: ["Time", "Distance", "Speed", "Mass"],
      answer: 1,
    },
    {
      q: "Which planet is known as Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: 1,
    },
    {
      q: "Which particle has no charge?",
      options: ["Proton", "Electron", "Neutron", "Photon"],
      answer: 2,
    },
  ],

  animals: [
    {
      q: "Largest land animal?",
      options: ["Elephant", "Rhino", "Hippo", "Giraffe"],
      answer: 0,
    },
    {
      q: "Fastest land animal?",
      options: ["Cheetah", "Lion", "Tiger", "Leopard"],
      answer: 0,
    },
    {
      q: "Which bird cannot fly?",
      options: ["Penguin", "Eagle", "Parrot", "Ostrich"],
      answer: 0,
    },
    {
      q: "Mammals lay eggs?",
      options: ["Yes", "No", "Some", "All"],
      answer: 2,
    },
    {
      q: "What do koalas eat?",
      options: ["Eucalyptus leaves", "Grass", "Fruits", "Insects"],
      answer: 0,
    },
    {
      q: "Largest marine animal?",
      options: ["Shark", "Blue Whale", "Dolphin", "Orca"],
      answer: 1,
    },
    {
      q: "Animal with prehensile tail?",
      options: ["Monkey", "Tiger", "Elephant", "Lion"],
      answer: 0,
    },
    {
      q: "Which insect produces honey?",
      options: ["Ant", "Bee", "Butterfly", "Beetle"],
      answer: 1,
    },
    {
      q: "Fastest bird in flight?",
      options: ["Falcon", "Eagle", "Sparrow", "Hawk"],
      answer: 0,
    },
    {
      q: "Oldest living species?",
      options: ["Shark", "Turtle", "Crocodile", "Horsehoe Crab"],
      answer: 3,
    },
  ],

  gk: [
    {
      q: "Capital of France?",
      options: ["Berlin", "Paris", "Rome", "London"],
      answer: 1,
    },
    {
      q: "Largest ocean?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      answer: 3,
    },
    {
      q: "Currency of Japan?",
      options: ["Yuan", "Yen", "Dollar", "Rupee"],
      answer: 1,
    },
    {
      q: "UN HQ is in?",
      options: ["Paris", "New York", "London", "Geneva"],
      answer: 1,
    },
    {
      q: "First human in space?",
      options: [
        "Yuri Gagarin",
        "Neil Armstrong",
        "Buzz Aldrin",
        "Valentina Tereshkova",
      ],
      answer: 0,
    },
    {
      q: "Nobel Prize is awarded in?",
      options: ["Peace", "Science", "Literature", "All"],
      answer: 3,
    },
    {
      q: "Fastest animal?",
      options: ["Cheetah", "Falcon", "Lion", "Tiger"],
      answer: 1,
    },
    {
      q: "Which country has pyramids?",
      options: ["Mexico", "Egypt", "India", "China"],
      answer: 1,
    },
    {
      q: "Biggest desert?",
      options: ["Sahara", "Gobi", "Kalahari", "Arabian"],
      answer: 0,
    },
    {
      q: "Olympics held every?",
      options: ["2 years", "4 years", "5 years", "3 years"],
      answer: 1,
    },
  ],

  maths: [
    { q: "2 + 2 = ?", options: ["3", "4", "5", "6"], answer: 1 },
    { q: "5 × 3 = ?", options: ["15", "10", "20", "8"], answer: 0 },
    { q: "Square root of 16?", options: ["2", "4", "8", "6"], answer: 1 },
    { q: "10 ÷ 2 = ?", options: ["4", "5", "2", "10"], answer: 1 },
    { q: "5² = ?", options: ["10", "20", "25", "15"], answer: 2 },
    {
      q: "Value of π (approx)?",
      options: ["3.14", "2.71", "3.41", "3.00"],
      answer: 0,
    },
    {
      q: "Solve: 2x + 3 = 7",
      options: ["x=1", "x=2", "x=3", "x=4"],
      answer: 1,
    },
    { q: "Derivative of x²?", options: ["x", "2x", "x²", "2"], answer: 1 },
    { q: "Integral of 2 dx?", options: ["x²", "2x", "x", "1"], answer: 1 },
    { q: "Value of log10(100)?", options: ["1", "2", "10", "100"], answer: 1 },
  ],

  environment: [
    {
      q: "What is global warming?",
      options: ["Cooling Earth", "Warming Earth", "Pollution", "Rainfall"],
      answer: 1,
    },
    {
      q: "Main greenhouse gas?",
      options: ["Oxygen", "Nitrogen", "CO2", "Hydrogen"],
      answer: 2,
    },
    {
      q: "Which layer protects from UV?",
      options: ["Troposphere", "Ozone layer", "Stratosphere", "Mesosphere"],
      answer: 1,
    },
    {
      q: "Deforestation affects?",
      options: ["Air", "Soil", "Biodiversity", "All"],
      answer: 3,
    },
    {
      q: "Acid rain caused by?",
      options: ["CO2", "Sulfur dioxide", "O2", "N2"],
      answer: 1,
    },
    {
      q: "Renewable energy example?",
      options: ["Coal", "Oil", "Solar", "Gas"],
      answer: 2,
    },
    {
      q: "Endangered species?",
      options: ["Panda", "Cow", "Cat", "Dog"],
      answer: 0,
    },
    {
      q: "Largest rainforest?",
      options: ["Amazon", "Congo", "Daintree", "Sundarbans"],
      answer: 0,
    },
    {
      q: "Recycling helps?",
      options: ["Waste reduction", "Pollution", "Resource saving", "All"],
      answer: 3,
    },
    {
      q: "Sustainable development means?",
      options: [
        "Short-term growth",
        "Long-term growth",
        "Only economic",
        "Only social",
      ],
      answer: 1,
    },
  ],

  history: [
    {
      q: "Who was first President of USA?",
      options: [
        "Abraham Lincoln",
        "George Washington",
        "John Adams",
        "Thomas Jefferson",
      ],
      answer: 1,
    },
    {
      q: "Which empire built Colosseum?",
      options: ["Roman", "Greek", "Persian", "Egyptian"],
      answer: 0,
    },
    {
      q: "World War I started in?",
      options: ["1914", "1918", "1939", "1945"],
      answer: 0,
    },
    {
      q: "Mahatma Gandhi was from?",
      options: ["India", "Pakistan", "England", "South Africa"],
      answer: 0,
    },
    {
      q: "Which revolution was in 1789?",
      options: ["American", "French", "Russian", "Industrial"],
      answer: 1,
    },
    {
      q: "Who discovered America?",
      options: ["Columbus", "Magellan", "Vespucci", "Cook"],
      answer: 0,
    },
    {
      q: "First man on Moon?",
      options: [
        "Neil Armstrong",
        "Buzz Aldrin",
        "Yuri Gagarin",
        "Alan Shepard",
      ],
      answer: 0,
    },
    {
      q: "Which dynasty ruled China longest?",
      options: ["Qin", "Han", "Ming", "Zhou"],
      answer: 3,
    },
    {
      q: "Cold War was between?",
      options: ["USA & USSR", "USA & Germany", "UK & USSR", "China & USSR"],
      answer: 0,
    },
    {
      q: "Industrial Revolution began in?",
      options: ["UK", "USA", "France", "Germany"],
      answer: 0,
    },
  ],

  cyber: [
    {
      q: "Full form of VPN?",
      options: [
        "Virtual Private Network",
        "Very Private Network",
        "Virtual Public Network",
        "Virtual Personal Network",
      ],
      answer: 0,
    },
    {
      q: "Firewall protects from?",
      options: ["Malware", "Viruses", "Unauthorized access", "All"],
      answer: 2,
    },
    {
      q: "Phishing means?",
      options: ["Fishing", "Scamming", "Hacking", "Virus"],
      answer: 1,
    },
    {
      q: "Strong password includes?",
      options: ["Numbers", "Letters", "Special chars", "All"],
      answer: 3,
    },
    {
      q: "Which is NOT a malware?",
      options: ["Virus", "Trojan", "Firewall", "Worm"],
      answer: 2,
    },
    {
      q: "Two-factor authentication?",
      options: [
        "One password",
        "Two steps verification",
        "Biometric only",
        "SMS only",
      ],
      answer: 1,
    },
    {
      q: "HTTPS uses?",
      options: ["SSL/TLS", "FTP", "IP", "HTTP only"],
      answer: 0,
    },
    {
      q: "Ransomware is?",
      options: [
        "Software attack",
        "Hardware attack",
        "Network attack",
        "Physical attack",
      ],
      answer: 0,
    },
    {
      q: "Encryption purpose?",
      options: ["Hide data", "Secure data", "Delete data", "Duplicate data"],
      answer: 1,
    },
    {
      q: "White hat hacker?",
      options: ["Ethical hacker", "Illegal hacker", "Student", "Admin"],
      answer: 0,
    },
  ],

  ai: [
    {
      q: "AI stands for?",
      options: [
        "Artificial Intelligence",
        "Automated Internet",
        "Applied Information",
        "Advanced Innovation",
      ],
      answer: 0,
    },
    {
      q: "Turing test checks?",
      options: ["Human-like intelligence", "Speed", "Memory", "Accuracy"],
      answer: 0,
    },
    {
      q: "Machine Learning is?",
      options: ["Subset of AI", "Unrelated", "Hardware", "Algorithm"],
      answer: 0,
    },
    {
      q: "Deep Learning uses?",
      options: ["Neural Networks", "SQL", "HTML", "Robots"],
      answer: 0,
    },
    {
      q: "NLP stands for?",
      options: [
        "Natural Language Processing",
        "Neural Learning Protocol",
        "Network Learning Process",
        "None",
      ],
      answer: 0,
    },
    {
      q: "Supervised learning needs?",
      options: ["Labeled data", "Unlabeled data", "Random data", "All"],
      answer: 0,
    },
    {
      q: "Which is AI application?",
      options: ["ChatGPT", "Excel", "Word", "PowerPoint"],
      answer: 0,
    },
    {
      q: "Reinforcement learning uses?",
      options: ["Rewards", "Punishments", "Both", "None"],
      answer: 2,
    },
    {
      q: "Which language is used in AI?",
      options: ["Python", "C++", "Java", "All"],
      answer: 3,
    },
    {
      q: "GANs are used for?",
      options: ["Image Generation", "Web design", "Database", "OS"],
      answer: 0,
    },
  ],

  movies: [
    {
      q: "Which movie won Best Picture 2020?",
      options: ["1917", "Parasite", "Joker", "Ford v Ferrari"],
      answer: 1,
    },
    {
      q: "Director of 'Inception'?",
      options: [
        "Christopher Nolan",
        "Steven Spielberg",
        "James Cameron",
        "Quentin Tarantino",
      ],
      answer: 0,
    },
    {
      q: "Movie with highest grossing?",
      options: ["Avatar", "Titanic", "Avengers Endgame", "Star Wars"],
      answer: 2,
    },
    {
      q: "Genre of 'The Godfather'?",
      options: ["Action", "Crime", "Comedy", "Drama"],
      answer: 1,
    },
    {
      q: "Lead actor of 'Iron Man'?",
      options: [
        "Chris Hemsworth",
        "Robert Downey Jr.",
        "Chris Evans",
        "Mark Ruffalo",
      ],
      answer: 1,
    },
    {
      q: "Which is animated movie?",
      options: ["Inception", "Toy Story", "Titanic", "Joker"],
      answer: 1,
    },
    {
      q: "Which movie franchise has Jedi?",
      options: ["Star Wars", "Star Trek", "Matrix", "Lord of Rings"],
      answer: 0,
    },
    {
      q: "Which movie is Marvel?",
      options: ["Avengers", "Batman", "Joker", "Inception"],
      answer: 0,
    },
    {
      q: "Oscar for Best Director 2021?",
      options: ["Bong Joon-ho", "Chloé Zhao", "Sam Mendes", "Todd Phillips"],
      answer: 1,
    },
    {
      q: "Longest running movie series?",
      options: ["James Bond", "Fast & Furious", "Avengers", "Star Wars"],
      answer: 0,
    },
  ],

  music: [
    {
      q: "Composer of 'Fur Elise'?",
      options: ["Mozart", "Beethoven", "Bach", "Chopin"],
      answer: 1,
    },
    {
      q: "Which instrument has keys?",
      options: ["Violin", "Guitar", "Piano", "Flute"],
      answer: 2,
    },
    {
      q: "Genre of Taylor Swift?",
      options: ["Pop", "Rock", "Jazz", "Blues"],
      answer: 0,
    },
    {
      q: "Which is a string instrument?",
      options: ["Piano", "Flute", "Guitar", "Drum"],
      answer: 2,
    },
    {
      q: "Composer of 'Four Seasons'?",
      options: ["Vivaldi", "Bach", "Mozart", "Beethoven"],
      answer: 0,
    },
    {
      q: "Which instrument is wind?",
      options: ["Flute", "Guitar", "Piano", "Violin"],
      answer: 0,
    },
    {
      q: "Genre of Beethoven's 5th?",
      options: ["Classical", "Jazz", "Pop", "Rock"],
      answer: 0,
    },
    {
      q: "Which is percussion?",
      options: ["Drum", "Violin", "Flute", "Piano"],
      answer: 0,
    },
    {
      q: "Composer of 'Moonlight Sonata'?",
      options: ["Beethoven", "Chopin", "Mozart", "Bach"],
      answer: 0,
    },
    {
      q: "Which is electronic music?",
      options: ["EDM", "Jazz", "Rock", "Classical"],
      answer: 0,
    },
  ],

  programming: [
    {
      q: "Which language is interpreted?",
      options: ["Python", "C", "C++", "Java"],
      answer: 0,
    },
    {
      q: "Which is compiled language?",
      options: ["JavaScript", "Python", "C++", "HTML"],
      answer: 2,
    },
    {
      q: "Purpose of loop?",
      options: ["Repeat code", "Store data", "Calculate", "Debug"],
      answer: 0,
    },
    {
      q: "Variable stores?",
      options: ["Value", "Function", "Object", "Array"],
      answer: 0,
    },
    {
      q: "Function in JS uses?",
      options: ["function keyword", "var", "let", "const"],
      answer: 0,
    },
    {
      q: "OOP stands for?",
      options: [
        "Object Oriented Programming",
        "Object Order Program",
        "Online Operating Program",
        "Open Online Program",
      ],
      answer: 0,
    },
    {
      q: "Which is frontend language?",
      options: ["Python", "HTML", "C++", "Java"],
      answer: 1,
    },
    {
      q: "Which is backend language?",
      options: ["HTML", "CSS", "Python", "JS"],
      answer: 2,
    },
    {
      q: "Git is used for?",
      options: ["Version Control", "Debugging", "Design", "Testing"],
      answer: 0,
    },
    {
      q: "Which is a web framework?",
      options: ["Node", "React", "Angular", "Vue"],
      answer: 1,
    },
  ],

  space: [
    {
      q: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: 0,
    },
    {
      q: "What is the closest star to Earth?",
      options: ["Proxima Centauri", "Alpha Centauri", "The Sun", "Sirius"],
      answer: 2,
    },
    {
      q: "Which planet has rings?",
      options: ["Earth", "Mars", "Saturn", "Venus"],
      answer: 2,
    },
    {
      q: "What is the largest planet in our Solar System?",
      options: ["Jupiter", "Saturn", "Neptune", "Earth"],
      answer: 0,
    },
    {
      q: "The Moon revolves around?",
      options: ["The Sun", "Earth", "Mars", "Jupiter"],
      answer: 1,
    },
    {
      q: "What force keeps planets in orbit?",
      options: ["Magnetism", "Gravity", "Friction", "Nuclear Force"],
      answer: 1,
    },
    {
      q: "Which planet is known as the Morning Star?",
      options: ["Mars", "Venus", "Mercury", "Jupiter"],
      answer: 1,
    },
    {
      q: "First human in space?",
      options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"],
      answer: 1,
    },
    {
      q: "What is a light-year?",
      options: ["Time", "Distance", "Speed", "Mass"],
      answer: 1,
    },
    {
      q: "Which spacecraft first landed humans on the Moon?",
      options: ["Apollo 11", "Sputnik 1", "Vostok 1", "Challenger"],
      answer: 0,
    },
  ],

  geography: [
    {
      q: "Which is the largest continent?",
      options: ["Africa", "Asia", "Europe", "Australia"],
      answer: 1,
    },
    {
      q: "The Nile river flows through which continent?",
      options: ["Asia", "Europe", "Africa", "South America"],
      answer: 2,
    },
    {
      q: "Mount Everest is located in which country?",
      options: ["India", "China", "Nepal", "Bhutan"],
      answer: 2,
    },
    {
      q: "Which ocean is the largest?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      answer: 2,
    },
    {
      q: "The Sahara Desert is in which part of the world?",
      options: ["Africa", "Asia", "Australia", "North America"],
      answer: 0,
    },
    {
      q: "Which country has the most population?",
      options: ["India", "USA", "China", "Russia"],
      answer: 2,
    },
    {
      q: "The longest river in the world is?",
      options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
      answer: 1,
    },
    {
      q: "Which country has the most time zones?",
      options: ["USA", "Russia", "France", "China"],
      answer: 2,
    },
    {
      q: "Which mountain range separates Europe and Asia?",
      options: ["Alps", "Andes", "Ural", "Himalayas"],
      answer: 2,
    },
    {
      q: "Which is the smallest country by area?",
      options: ["Monaco", "Vatican City", "Malta", "Liechtenstein"],
      answer: 1,
    },
  ],

  sports: [
    {
      q: "How many players are there in a football (soccer) team?",
      options: ["9", "10", "11", "12"],
      answer: 2,
    },
    {
      q: "Which sport uses a shuttlecock?",
      options: ["Tennis", "Badminton", "Squash", "Table Tennis"],
      answer: 1,
    },
    {
      q: "Which country invented cricket?",
      options: ["USA", "India", "England", "Australia"],
      answer: 2,
    },
    {
      q: "The Olympic Games are held every how many years?",
      options: ["2", "3", "4", "5"],
      answer: 2,
    },
    {
      q: "Which sport uses the term 'home run'?",
      options: ["Baseball", "Basketball", "Soccer", "Rugby"],
      answer: 0,
    },
    {
      q: "In tennis, what is the score 40-40 called?",
      options: ["Deuce", "Advantage", "Set Point", "Break Point"],
      answer: 0,
    },
    {
      q: "Which country won the first FIFA World Cup?",
      options: ["Brazil", "Uruguay", "Italy", "Germany"],
      answer: 1,
    },
    {
      q: "Michael Phelps is famous in which sport?",
      options: ["Swimming", "Athletics", "Gymnastics", "Cycling"],
      answer: 0,
    },
    {
      q: "Which sport is known as 'the king of sports'?",
      options: ["Basketball", "Football (Soccer)", "Cricket", "Tennis"],
      answer: 1,
    },
    {
      q: "In which sport is the term 'alley-oop' used?",
      options: ["Basketball", "Volleyball", "Tennis", "Football"],
      answer: 0,
    },
  ],
};

// Initialize
let currentQuestion = 0;
let score = 0;
let timer;

// Set header info
quizTitle.innerText =
  selectedModule.charAt(0).toUpperCase() + selectedModule.slice(1) + " Quiz";
timePerQuestionEl.innerText = timePerQuestion;
totalQuestionsEl.innerText = quizData[selectedModule].length;

// Start quiz
function startQuiz() {
  // Reset variables
  currentQuestion = 0;
  score = 0;

  // Reset UI
  resultBox.style.display = "none";
  questionBox.style.display = "block";
  optionsContainer.innerHTML = ""; // <-- clear old buttons
  nextBtn.style.display = "none";

  // Reset timers
  clearInterval(timer);
  clearTimeout(timeoutId);

  showQuestion();
}

// Show question
function showQuestion() {
  clearInterval(timer);

  const q = quizData[selectedModule][currentQuestion];
  questionText.innerText = q.q;
  optionsContainer.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.classList.add("home-btn");
    btn.disabled = false; // ensure button is enabled
    btn.style.backgroundColor = ""; // reset previous colors
    btn.addEventListener("click", () => selectAnswer(idx, btn));
    optionsContainer.appendChild(btn);
  });

  // Timer
  let timeLeft = timePerQuestion;
  timerEl.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

// Handle answer selection
function selectAnswer(selected, btn) {
  clearInterval(timer);

  const correct = quizData[selectedModule][currentQuestion].answer;
  const optionButtons = document.querySelectorAll(".home-btn");

  optionButtons.forEach((b, idx) => {
    b.disabled = true;
    if (idx === correct) b.style.backgroundColor = "#0eba3fff"; // correct
    if (idx === selected && idx !== correct)
      b.style.backgroundColor = "#be2626"; // wrong
  });

  if (selected === correct) score++;

  timeoutId = setTimeout(nextQuestion, 800); // small delay
}

// Next question
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData[selectedModule].length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// End quiz
function endQuiz() {
  clearInterval(timer);
  questionBox.style.display = "none";
  resultBox.style.display = "block";
  scoreEl.innerText = score;
  totalScoreEl.innerText = quizData[selectedModule].length;
}

// Restart quiz
restartBtn.addEventListener("click", startQuiz);

// Auto-start quiz on page load
window.onload = startQuiz;
