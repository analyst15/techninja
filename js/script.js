const nav = document.querySelector('nav');
const logo = document.querySelector('#logo');
const hamburger = document.querySelector('#hamburger');
const menu = document.querySelector('.menu');
const dropdown = document.querySelector('.dropdown');
const slideshow = document.querySelector('.slideshow');
const background = document.querySelector('.background');
const backgroundImg = document.querySelectorAll('.background img');
const slideBtns = document.querySelectorAll('.slideshow span');
const form = document.getElementById('form');
const submitBtn = document.getElementById('button');
const faqItems = document.querySelectorAll('.faq-item')

const serviceContainer = document.querySelector('.services-btns');
const serviceBtns = document.querySelectorAll('.btn-services');

const nextSlide = 10000 // 1000/s
let currentSlide = 1;

// NAV

document.addEventListener('click', (e) => { // Open/Closes hamburger container
  if (e.target === hamburger) {
    hamburger.classList.toggle('open');
    dropdown.classList.toggle('hidden');
  } else if (e.target !== menu && hamburger.classList.contains('open')) {
    hamburger.classList.toggle('open');
    dropdown.classList.toggle('hidden');
  }
})

window.onscroll = function() { scrollFunction() }; // Changes NAV bar height on scroll
function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("logo").style.width = "7rem";
    dropdown.style.top = "5rem";
  } else {
    document.getElementById("logo").style.width = "10rem";
    dropdown.style.top = "7.2rem";
  }
}

logo.addEventListener('click', () => { // Was too lazy to implement a link on every html page
  window.location.href = "../";
})


// HOME

if (slideshow) {
  slideshow.addEventListener('click', (e) => { // Listens for slideshow button click
    if (e.target === slideshow) return;
    slideTo(e.target.id-1)
  })

  setInterval(() => { // Interval changes image
    currentSlide === 3 ? slideTo(0) : slideTo(currentSlide);
  }, nextSlide);

  function slideTo(id) { // Changes image to given ID
    currentSlide = id+1;
    backgroundImg.forEach(e => {
      e.style.opacity = '0';
    })
    slideBtns.forEach(e => {
      e.style.opacity = '0.5';
    })
    backgroundImg[id].style.opacity = '1';
    slideBtns[id].style.opacity = '1';

    background.style.setProperty('--blink', '#fff');
  }
}

// SERVICES

if (serviceContainer) {
  serviceContainer.addEventListener('click', (e) => { // Displays proper container on button click
    for (let i = 0; i < serviceBtns.length; i++) {
      const clickedBtn = document.querySelector(`.btn-services:nth-of-type(${i+1})`);
      const item = document.querySelector(`.item:nth-of-type(${i+1})`);
      if (e.target !== serviceContainer && e.target === clickedBtn && !clickedBtn.classList.contains('active')) {
        e.target.classList.toggle('active');
        item.classList.toggle('active');
        console.log(item, clickedBtn)
      } else if (e.target !== serviceContainer && e.target !== clickedBtn && clickedBtn.classList.contains('active')) {
        clickedBtn.classList.toggle('active');
        item.classList.toggle('active');
        console.log(item, clickedBtn)
      } 
    }
  })
}


// CONTACT

if (form) {
  form.addEventListener('submit', function(event) { // Sends email to EmailJS
    event.preventDefault();

    submitBtn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_lm2ccpe';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        submitBtn.value = 'Send Email';
        alert('Sent!');
      }, (err) => {
        submitBtn.value = 'Send Email';
        alert(JSON.stringify(err));
      });
  });
}

faqItems.forEach(item => {
  console.log(faqItems.length)
  item.addEventListener('click', (e) => {
    if (e.target.classList.contains('faq-item')) e.target.classList.toggle('active');
  })
})