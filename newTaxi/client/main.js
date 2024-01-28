let menu = document.querySelector('#menu-icons');
let navigation = document.querySelector('.navigation');

menu.onclick = () =>  {
   menu.classList.toggle('bx-x');
   navigation.classList.toggle('open');
}
const sr = ScrollReveal({
  distance: '65px',
  duration: 2600,
  delay: 450,
  reset: false
})
sr.reveal('.reveal',{delay:200,origin:'top'});

window.addEventListener("scroll", function() {
  var navbar = document.getElementById("header");

  if (window.scrollY > 50) { // Порог прокрутки, после которого начнется исчезновение
      navbar.style.transform = "translateY(-100%)"; // Скрываем навигационный бар
  } else {
      navbar.style.transform = "translateY(0)"; // Показываем навигационный бар
  }
});


/*------Send order-------*/
function hideElement(elementId) {
  const element = document.querySelector(elementId);
  if (element) {
    element.style.display = 'none';
  }
}

function handleShadowClick() {
  const os = document.querySelector('#shadow');
  hideElement('#shadow');
  hideElement('#filled');
  hideElement('#notfill');
}

function fillOrder() {
  const os = document.querySelector('#shadow');
  os.style.display = 'block';
  const f = document.querySelector('#filled');
  f.style.display = 'block';
  os.addEventListener('click', handleShadowClick, { once: true });
}

function nFillOrder() {
  const os = document.querySelector('#shadow');
  os.style.display = 'block';
  const nf = document.querySelector('#notfill');
  nf.style.display = 'block';
  os.addEventListener('click', handleShadowClick, { once: true });
}

/*-----Order data---------*/
function order(){
const submit = document.getElementById('submit')
let number = document.getElementById('number');
let loc = document.getElementById('loc');
let arrival = document.getElementById('arrival');
let comment = document.getElementById('comment');

submit.addEventListener('click', function() {
  let Onumber = number.value;
  let Oloc = loc.value;
  let Oarrival = arrival.value;
  let Ocomment = comment.value;
  
  if(Onumber === ''|| Oloc === '' || Oarrival === ''){
    nFillOrder();
    return;
  }
  fillOrder();
  const dataOrder = {
    Onumber: Onumber,
    Oloc: Oloc,
    Oarrival: Oarrival,
    Ocomment: Ocomment
  };
  console.log(dataOrder);

  fetch('database/saveData.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: Object.entries(dataOrder).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')
  })
  .then(response => response.text())
  .then(data => {
    console.log(data); // Ответ от сервера
    fillOrder();
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
});
}
order();

/*----Receiving id for scrolling----*/
function scrollToSection(sectionID) {
  var section = document.getElementById(sectionID); // Получаем элемент секции по его id
  if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Прокручиваем к секции плавно
  }
}

/*-----------Info driver ---------*/
document.addEventListener("DOMContentLoaded", function () {
  const taxiDriver = document.getElementById("taxiDriver");
  const text = taxiDriver.textContent;
  taxiDriver.textContent = "";

  let index = 0;

  function typeText() {
    if (index < text.length) {
      if (text[index] === '\n') {
        taxiDriver.innerHTML += '<p></p>';
      } else {
        taxiDriver.lastChild.textContent += text[index];
      }

      index++;
      setTimeout(typeText, 20);
    }
  }

  typeText(); 
});