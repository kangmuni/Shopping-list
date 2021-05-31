const fixedList = document.querySelector('.fixedList');
const addedList = document.querySelector('.addedList');
const addedList_ul = addedList.querySelector('ul');
const input = document.querySelector('input');
const footerText = document.querySelector('.footer__text');

const body = document.querySelector('body');
const container = document.querySelector('.container');
const sunBtn = document.querySelector('.fa-sun');
const moonBtn = document.querySelector('.fa-moon');
const addText = document.querySelector('.addText');
const chevron = document.querySelector('.fa-chevron-down');
const fixedList_li = fixedList.querySelectorAll('li');
const addedList_li = addedList.querySelectorAll('li');
const footer = document.querySelector('footer');

const addedList_changeDark = addedList.getElementsByTagName('li');
let bodyMode = document.getElementsByTagName('body')[0];

moonBtn.addEventListener('click', () => {
  moonBtn.style.display = 'none';
  sunBtn.style.display = 'flex';
  body.classList.toggle('dark');
  container.classList.toggle('dark');
  addText.classList.toggle('dark');
  fixedList.classList.toggle('dark');
  addedList.classList.toggle('dark');
  input.classList.toggle('dark');
  chevron.classList.toggle('dark');
  footer.classList.toggle('dark');
  fixedList_li.forEach((li) => {
    li.classList.toggle('dark');
  });
  Array.from(addedList_changeDark).forEach((li) => {
    li.classList.toggle('dark');
  });
});

sunBtn.addEventListener('click', () => {
  moonBtn.style.display = 'flex';
  sunBtn.style.display = 'none';
  body.classList.toggle('dark');
  container.classList.toggle('dark');
  addText.classList.toggle('dark');
  fixedList.classList.toggle('dark');
  addedList.classList.toggle('dark');
  input.classList.toggle('dark');
  chevron.classList.toggle('dark');
  footer.classList.toggle('dark');

  fixedList_li.forEach((li) => {
    li.classList.toggle('dark');
  });
  Array.from(addedList_changeDark).forEach((li) => {
    li.classList.toggle('dark');
  });
});

let count = 3;
footerText.innerText = `${count}개의 메모`;

input.addEventListener('click', () => {
  if (input.value === '추가하기') {
    input.value = '';
  }
});

function onAdd() {
  const text = input.value;
  if (text === '' || text === '추가하기') {
    input.focus();
    return;
  } else {
    const item = createItem(text);
    addedList_ul.prepend(item);
    footerText.textContent = `${(count = count + 1)}개의 메모`;
    item.scrollIntoView({ block: 'end' });
    input.value = '';
    input.focus();
  }
}

let id = 0;
function createItem(text) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();

  const liElement = document.createElement('li');
  liElement.setAttribute('data-key', id);
  bodyMode.className === 'dark' ? liElement.classList.add('dark') : '';
  liElement.innerHTML = `
    <div class="listAndDate">
      <div class="list">${text}</div>
      <div class="date">${year}. ${
    month + 1
  }. ${date}. ${hours} : ${minutes}</div> 
    </div>
    <div class="icons">
      <i class="fas fa-thumbtack" data-id=${id}></i>
      <i class="fas fa-trash-alt" data-id=${id}></i>
    </div>
`;
  liElement.addEventListener('mouseenter', (event) => {
    const key = event.target.dataset.key;
    const icons = addedList.querySelectorAll(
      `.addedList li i[data-id="${key}"]`
    );
    icons.forEach((icon) => {
      icon.style.visibility = 'visible';
    });
    liElement.addEventListener('mouseleave', (event) => {
      const key = event.target.dataset.key;
      const icons = addedList.querySelectorAll(
        `.addedList li i[data-id="${key}"]`
      );
      icons.forEach((icon) => {
        icon.style.visibility = 'hidden';
      });
    });
  });
  id++;
  return liElement;
}

input.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    onAdd();
  }
});

let toggling = 1;
const fixedList_ul = document.querySelector('.fixedList ul');
const moreBtn = document.querySelector('.fixedList__top button');
moreBtn.addEventListener('click', () => {
  moreBtn.classList.toggle('clicked');
  fixedList_ul.classList.toggle('hidden');
  if (toggling % 2 === 1) {
    addedList_ul.style.height = '428px';
  } else {
    addedList_ul.style.height = '245px';
  }
  toggling++;
});

addedList_ul.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(
      `.addedList li[data-key="${id}"]`
    );
    toBeDeleted.remove();
    footerText.textContent = `${(count = count - 1)}개의 메모`;
  }
});

fixedList_li.forEach((el) => {
  el.addEventListener('mouseenter', (event) => {
    const key = event.target.dataset.key;
    if (key) {
      const pin = fixedList.querySelector(`.fixedList li i[data-id="${key}"]`);
      pin.style.visibility = 'visible';
      el.addEventListener('mouseleave', () => {
        pin.style.visibility = 'hidden';
      });
    }
  });
});
