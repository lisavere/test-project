import './style.css'
import './src/styles/menu.scss'
import './src/styles/styles.scss'
import './src/styles/body.scss'

let viewPort; 

const hamburger = document.querySelector('.hamburger'),
  menuContainer = document.querySelector('#_menu');

hamburger.addEventListener('click', () => toggleMenu());

const elements = [hamburger, menuContainer];

function toggleMenu() {
  elements.forEach(s => s.classList.toggle('active'));
}

function removeActiveMenu() {
  elements.forEach(s => s.classList.remove('active'));
}

function setViewPort() {
  viewPort = document.documentElement.clientWidth;
}

setViewPort();

window.onresize = () => {
  removeActiveMenu();

  setViewPort();
  setCutElements();

  resetElements();
}

document.addEventListener("click", function (event) {
  if (event.target.id == 'close') {
    toggleMenu();
  }
});

const menuItems = Array(12).fill({
  name: 'Menu'
}),
  items = Array(17).fill({
    title: 'Title',
    text: //'SomeText'
      'Some text Some text Some text Some text  Some text Some text Some text Some text Some text Some text Some text Some text Some text'
  });

let elementsToHide = 0;

function setCutElements() {
  // сколько элементов скрывать c конца списка
  if (viewPort > 1280) {
    elementsToHide = items.length % 5;
  }
  else if (viewPort > 1024) {
    elementsToHide = items.length % 4;
  }
  else if (viewPort > 640) {
    elementsToHide = items.length % 3;
  }
  else {
    elementsToHide = items.length % 2;
  }
}

const menu = document.querySelector('#_menu'),
  body = document.querySelector('#_data_body');

// заполнение элементов меню
function setMenuElements() {
  menuItems.forEach((item, index) => {
    menu.innerHTML += `
    <div class="item ${index == 0 ? 'first' : ''}">
      <div class="item_el"></div>
      <div class="item_text">${item.name}</div>
    </div>
    `;
  });
}

// заполнение элементов "тела"
function setBodyItems() {
  items.forEach((item, index) => {
    let hide = index > items.length - 1 - elementsToHide;
    body.innerHTML += `
      <div class="_element" style="display: ${hide ? 'none' : 'flex'}">
        <div>
          <span class="title"><strong>${item.title}</strong></span>
          <span>
            ${item.text}
          </span>
        </div>
      </div>
    `;
  });
}

setCutElements();
setMenuElements();
setBodyItems();

// перезапись при ресайзе окна
function resetElements() {
  body.innerHTML = ``;

  setBodyItems();
}