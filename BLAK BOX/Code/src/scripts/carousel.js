const track = document.querySelector('.carousel_track');
const cards = Array.from(track.children);
const prevButton = document.querySelector('.prev_btn');
const nextButton = document.querySelector('.next_btn');

const cardWidth = cards[0].getBoundingClientRect().width + 20;

let currentPosition = 0;

function moveCarousel(position) {
  track.style.transform = `translateX(${position}px)`;
}

nextButton.addEventListener('click', () => {
  const maxScroll = -(cardWidth * (cards.length - 3));

  if (currentPosition <= maxScroll) {
    currentPosition = 0;
  } else {
    currentPosition -= cardWidth;
    if (currentPosition < maxScroll) currentPosition = maxScroll;
  }

  moveCarousel(currentPosition);
});

prevButton.addEventListener('click', () => {
  const maxScroll = -(cardWidth * (cards.length - 3));

  if (currentPosition >= 0) {
    currentPosition = maxScroll;
  } else {
    currentPosition += cardWidth;
    if (currentPosition > 0) currentPosition = 0;
  }

  moveCarousel(currentPosition);
});

setInterval(() => {
  const maxScroll = -(cardWidth * (cards.length - 3));

  if (currentPosition <= maxScroll) {
    currentPosition = 0;
  } else {
    currentPosition -= cardWidth;
    if (currentPosition < maxScroll) currentPosition = maxScroll;
  }

  moveCarousel(currentPosition);
}, 3000);


