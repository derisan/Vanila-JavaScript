const $seatList = document.querySelector(".seat-list");
const $seatsNotOccupied = [
  ...document.querySelectorAll(".row .seat:not(.seat__occupied)"),
];
const $textSeats = document.querySelector(".summary__text--seats");
const $textPrice = document.querySelector(".summary__text--price");
const $movieSelected = document.querySelector(".select");

const updateTexts = function () {
  const numSelectedSeats = document.querySelectorAll(
    ".row .seat.seat__selected"
  ).length;
  const ticketPrice = $movieSelected.value;
  $textSeats.textContent = numSelectedSeats;
  $textPrice.textContent = `$${ticketPrice * numSelectedSeats}`;
};

const setDataToLocal = function () {
  const selectedMovieIndex = $movieSelected.selectedIndex;
  const selectedSeatsIndex = [
    ...document.querySelectorAll(".row .seat.seat__selected"),
  ].map((seat) => $seatsNotOccupied.indexOf(seat));

  localStorage.setItem("selectedMovieIndex", selectedMovieIndex);
  localStorage.setItem(
    "selectedSeatsIndex",
    JSON.stringify(selectedSeatsIndex)
  );
};

const getDataFromLocal = function () {
  const movieIndex = localStorage.getItem("selectedMovieIndex");
  const selectedSeatsIndex = JSON.parse(
    localStorage.getItem("selectedSeatsIndex")
  );

  if (movieIndex !== null) {
    $movieSelected.selectedIndex = movieIndex;
  }

  if (selectedSeatsIndex !== null) {
    selectedSeatsIndex.forEach((index) => {
      $seatsNotOccupied[index].classList.add("seat__selected");
    });
  }
};

$seatList.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("seat__occupied") &&
    e.target.classList.contains("seat")
  ) {
    e.target.classList.toggle("seat__selected");
    updateTexts();
    setDataToLocal();
  }
});

$movieSelected.addEventListener("change", (e) => {
  $seatsNotOccupied.forEach((seat) => {
    seat.classList.remove("seat__selected");
  });
  updateTexts();
  setDataToLocal();
});

getDataFromLocal();
updateTexts();
