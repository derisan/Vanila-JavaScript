const $video = document.querySelector(".video");
const $btnPlay = document.querySelector(".btn--play");
const $btnStop = document.querySelector(".btn--stop");
const $progressBar = document.querySelector(".controls__progress");
const $timestamp = document.querySelector(".controls__timestamp");

const togglePlayStatus = function () {
  if ($video.paused) {
    $video.play();
  } else {
    $video.pause();
  }
};

const updatePlayIcon = function () {
  if ($video.paused) {
    $btnPlay.innerHTML = '<i class="fa-solid fa-play fa-2x"></i>';
  } else {
    $btnPlay.innerHTML = '<i class="fa-solid fa-pause fa-2x"></i>';
  }
};

const stopVideo = function () {
  $video.currentTime = 0;
  $video.pause();
};

const updateTimeStamp = function () {
  const mins = String(Math.trunc($video.currentTime / 60)).padStart(2, 0);
  const secs = String(Math.trunc($video.currentTime % 60)).padStart(2, 0);
  $timestamp.textContent = `${mins}:${secs}`;
};

const updateProgressBar = function () {
  $progressBar.value = ($video.currentTime / $video.duration) * 100;
};

const onTimeUpdate = function () {
  updateProgressBar();
  updateTimeStamp();
};

const setVideoProgress = function () {
  $video.currentTime = ($video.duration * +$progressBar.value) / 100;
};

$video.addEventListener("click", togglePlayStatus);
$video.addEventListener("pause", updatePlayIcon);
$video.addEventListener("play", updatePlayIcon);
$video.addEventListener("timeupdate", onTimeUpdate);
$btnPlay.addEventListener("click", togglePlayStatus);
$btnStop.addEventListener("click", stopVideo);
$progressBar.addEventListener("change", setVideoProgress);
