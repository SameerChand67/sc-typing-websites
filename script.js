const QUOTES = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect when it comes to typing.",
  "Speed and accuracy are both important.",
  "Consistency is the key to improvement.",
  "Typing faster helps save time in your day.",
  "Focus on hitting the right keys without looking.",
  "Take regular breaks to avoid fatigue.",
  "Muscle memory builds up with repetition."
];

const quoteDisplay = document.getElementById("quoteDisplay");
const quoteInput = document.getElementById("quoteInput");
const timerText = document.getElementById("timer");
const wpmText = document.getElementById("wpm");
const accuracyText = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");

let startTime;
let timerInterval;
let currentQuote = "";

function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

function renderNewQuote() {
  currentQuote = getRandomQuote();
  quoteDisplay.innerText = currentQuote;
  quoteInput.value = "";
  quoteInput.disabled = false;
  quoteInput.focus();
  startTime = null;
  timerText.textContent = "0";
  wpmText.textContent = "0";
  accuracyText.textContent = "100%";
  clearInterval(timerInterval);
}

quoteInput.addEventListener("input", () => {
  const typedText = quoteInput.value;
  const correct = currentQuote.startsWith(typedText);
  quoteInput.style.borderColor = correct ? "green" : "red";

  if (!startTime) {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
  }

  if (typedText === currentQuote) {
    clearInterval(timerInterval);
    const timeTaken = (new Date() - startTime) / 1000;
    const words = currentQuote.split(" ").length;
    const wpm = Math.round((words / timeTaken) * 60);
    const accuracy = calculateAccuracy(typedText, currentQuote);
    wpmText.textContent = wpm;
    accuracyText.textContent = accuracy + "%";
    quoteInput.disabled = true;
  }
});

function updateTimer() {
  if (startTime) {
    const time = Math.floor((new Date() - startTime) / 1000);
    timerText.textContent = time;
  }
}

function calculateAccuracy(typed, original) {
  let correct = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === original[i]) correct++;
  }
  return Math.round((correct / original.length) * 100);
}

startBtn.addEventListener("click", renderNewQuote);

// Initial load
renderNewQuote();
