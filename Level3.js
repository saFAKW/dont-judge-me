// Imports from HTML
const home = document.getElementById("return");
const start = document.getElementById("start");
const test = document.getElementById("test_text");
const countdown = document.getElementById("countdown");
const input = document.getElementById("text");
const display = document.getElementById("points")

// Variables
let score = 0;
let count = 0;
let sentences = [];
let words = [];
let game_state = false;
let time_interval;

// Constants
const starting_minutes = 2;
let time = starting_minutes * 60; // Total time in seconds

// Load text from file for formatting
// Make easy() return a Promise
function hard() {
    return fetch("hard.txt")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch easy.txt");
            }
            return response.text();
        })
        .then(text => {
            sentences = text.split(/\s+/);
            word_splitting(); // populates `words`
        })
        .catch(err => console.error("Fetch error:", err));
}

//Display words individually
function word_splitting(){
    words = []; // Clear previous words
    for (let i = 0; i < sentences.length && words.length < 500; i++) {
        const splitWords = sentences[i].split(/\s+/);
        words.push(...splitWords); //ellipses split the sentence so items are stored 1D not 2D
    }
}

// Timer logic
function timer() {
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;

    countdown.textContent = `${minutes}:${seconds}`;

    if (time > 0) {
        time--;
    } else {
        clearInterval(time_interval);
        calc_speed();
    }
}

// Speed calculation
function calc_speed() {
    const wpm = score / starting_minutes; // rough estimate
    display.textContent = wpm.toString() + " WPM"
}

// Go to home page
function go_home() {
    game_state = false;
    window.location.href = "TSChomepage.html";
}

// Check user input word
function validateWord(word) {
    if (word === words[count]) {
        score += 1;
        input.style.borderColor = "green";
    }else{
        input.style.borderColor = "red";
    }
    count++;
}

// Start game logic
async function run_level() {
    await hard(); //extracts the sentences from the CSV
    time_interval = setInterval(timer, 1000); //starts the timer
    test.textContent = words[0]; //updates singular word 
    game_state = true; 
}

// Event listeners
start.addEventListener("click", run_level);
home.addEventListener("click", go_home);

input.addEventListener("keydown", function (event) {
    if (event.key === " ") {
        event.preventDefault(); //disregard any whitespace a part of the input
        const user = input.value.trim();
        if (game_state) {
            validateWord(user);
            test.textContent = words[count]; //updates display of full sentence
        }
        input.value = "";
    }
});