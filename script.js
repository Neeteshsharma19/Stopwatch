let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

// Format time (hh:mm:ss.ms)
function timeToString(time) {
  let date = new Date(time);
  let hrs = String(date.getUTCHours()).padStart(2, '0');
  let mins = String(date.getUTCMinutes()).padStart(2, '0');
  let secs = String(date.getUTCSeconds()).padStart(2, '0');
  let ms = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${hrs}:${mins}:${secs}.${ms}`;
}

function startPause() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = timeToString(elapsedTime);
    }, 10);
    startPauseBtn.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(timerInterval);
    startPauseBtn.textContent = "Start";
    isRunning = false;
  }
}

function reset() {
  clearInterval(timerInterval);
  display.textContent = "00:00:00.000";
  startPauseBtn.textContent = "Start";
  elapsedTime = 0;
  isRunning = false;
  laps.innerHTML = "";
}

function recordLap() {
  if (isRunning) {
    const lapTime = timeToString(elapsedTime);
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
    laps.appendChild(li);
  }
}

// Event listeners
startPauseBtn.addEventListener("click", startPause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);
