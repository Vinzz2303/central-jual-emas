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
