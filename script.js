<<<<<<< HEAD
const track = document.querySelector('.testimonial-track');
let index = 0;

function slideTestimonial(){
  const cards = document.querySelectorAll('.testimonial-card');
  const cardWidth = cards[0].offsetWidth + 24;
  index++;

  if(index > cards.length - 3){
    index = 0;
  }

  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

setInterval(slideTestimonial, 4000);
=======
const track = document.querySelector('.testimonial-track');
const wrapper = document.querySelector('.testimonial-wrapper');
let index = 0;

function slideTestimonial(){
  const cards = document.querySelectorAll('.testimonial-card');
  if (!track || !wrapper || cards.length === 0) return;

  const gap = parseFloat(getComputedStyle(track).gap || 24);
  const cardWidth = cards[0].offsetWidth + gap;
  const visible = Math.max(1, Math.floor(wrapper.offsetWidth / cardWidth));

  index++;
  if (index > cards.length - visible) index = 0;

  track.style.transform = `translateX(-${index * cardWidth}px)`;
}

window.addEventListener('resize', () => {
  index = 0;
  slideTestimonial();
});

setInterval(slideTestimonial, 4500);
>>>>>>> 17aa559 (feat: migrate to react + premium UI)
