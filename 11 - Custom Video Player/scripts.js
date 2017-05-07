// Get our elements

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");

const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const fullScreen = player.querySelector(".fullscreen");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");



// Build out functions

function togglePlay() {
  (video.paused) ? video.play() : video.pause();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function toggleFullScreen() {
  // console.log(player.classList);
  player.webkitRequestFullScreen();
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Add event listeners

// Updates button and progress bar
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener('timeupdate', handleProgress);

// Event listeners for toggle play on play button, video and with spacebar
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
window.addEventListener("keypress", e => { if (e.keyCode === 32) { togglePlay() }});

// Event listener for fullscreen button
fullScreen.addEventListener("click", toggleFullScreen);

// Event listeners for skip buttons
skipButtons.forEach(button => button.addEventListener('click', skip));

// Event listeners for volume and speed inputs
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// Uses flag to only call scrub function when mouse is clicked or down
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
