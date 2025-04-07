const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
let index = 0;

document.getElementById('next').addEventListener('click', () => {
    index = (index + 1) % slide.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
});

document.getElementById('prev').addEventListener('click', () => {
    index = (index - 1 + slide.length) % slide.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
});