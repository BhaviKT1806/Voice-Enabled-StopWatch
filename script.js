let isRunning = false;
let time = 0; // Time in seconds
let timerInterval;

const timeDisplay = document.getElementById("time-display");
const startStopButton = document.getElementById("start-stop");
const micButton = document.getElementById("mic-btn");

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

function pad(num) {
    return num < 10 ? `0${num}` : num;
}

function startStop() {
    if (isRunning) {
        // Stop the timer
        clearInterval(timerInterval);
        startStopButton.textContent = "Start";
    } else {
        // Start the timer
        timerInterval = setInterval(function () {
            time++;
            timeDisplay.textContent = formatTime(time);
        }, 1000);
        startStopButton.textContent = "Stop";
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    time = 0;
    timeDisplay.textContent = "00:00:00";
    startStopButton.textContent = "Start";
}

// Voice recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.continuous = false; // Stops listening after one command
recognition.interimResults = false; // Don't show partial results

recognition.onstart = function() {
    console.log("Voice recognition started. Speak a command.");
    micButton.style.backgroundColor = '#ff3e6d'; // Change mic button color while active
};

recognition.onend = function() {
    console.log("Voice recognition stopped.");
    micButton.style.backgroundColor = '#ff5c8d'; // Reset mic button color when inactive
};

recognition.onerror = function(event) {
    console.log("Error occurred in speech recognition: " + event.error);
};

recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log("Voice command received: " + command);

    if (command.includes("start") && !isRunning) {
        startStop();
    } else if (command.includes("stop") && isRunning) {
        startStop();
    } else if (command.includes("reset")) {
        reset();
    }
};

// Function to start voice recognition when the mic button is clicked
function startVoiceRecognition() {
    recognition.start();  // Start voice recognition
}
