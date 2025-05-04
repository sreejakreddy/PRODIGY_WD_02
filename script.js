script.js 

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

document.getElementById('startBtn').addEventListener('click', startStopwatch);
document.getElementById('pauseBtn').addEventListener('click', pauseStopwatch);
document.getElementById('resetBtn').addEventListener('click', resetStopwatch);
document.getElementById('lapBtn').addEventListener('click', recordLap);

function startStopwatch() {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
  }
}

function pauseStopwatch() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = Date.now() - startTime;
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  display.textContent = '00:00:00';
  lapsList.innerHTML = '';
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  const totalMilliseconds = elapsedTime;
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10).toString().padStart(2, '0');

  display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
  if (running) {
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${display.textContent}`;
    lapsList.appendChild(lapItem);
  } else {
    alert("Start the stopwatch before recording laps.");
  }
}
