
//const sleep = document?.querySelector(".sleep");
const music = document?.querySelector(".music");

//sleep?.addEventListener("mousedown", clicked1, false);
music?.addEventListener("mousedown", clicked2, false);

// city?.addEventListener("mousedown", clicked3, false);
const soundPlayer = new Audio("/images/characters/people/music.mp3");
// function clicked1(e) {
//   e.preventDefault();
//   alert("Music stopped");
//   soundPlayer.pause();
//   soundPlayer.currentTime = 0;
// }
function clicked2(e) {
  e.preventDefault();
  alert("Music started");

  soundPlayer.play();
  soundPlayer.loop = true;
}
soundPlayer.play();
const sleep = document?.querySelector(".sleep");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

sleep.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//moon
const moon = document?.querySelector(".moon");
const modal2 = document.querySelector(".modal2");
const closeButton2 = document.querySelector(".close-button2");

function toggleModal2() {
  modal2.classList.toggle("show-modal2");
}

function windowOnClick2(event) {
  if (event.target === modal2) {
    toggleModal2();
  }
}

moon.addEventListener("click", toggleModal2);
closeButton2.addEventListener("click", toggleModal2);
window.addEventListener("click", windowOnClick2);

//cityDay
const cityDay = document?.querySelector(".cityDay");
const modal3 = document.querySelector(".modal3");
const closeButton3 = document.querySelector(".close-button3");

function toggleModal3() {
  modal3.classList.toggle("show-modal3");
}

function windowOnClick3(event) {
  if (event.target === modal3) {
    toggleModal3();
  }
}

cityDay.addEventListener("click", toggleModal3);
closeButton3.addEventListener("click", toggleModal3);
window.addEventListener("click", windowOnClick3);


