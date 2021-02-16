const addedList = document.querySelector(".addedList");
const ulElement = addedList.querySelector("ul");
const button = document.querySelector("button");
const input = document.querySelector("input");
const footerText = document.querySelector(".footer__text");

let count = 3;
footerText.innerHTML = `${count}개의 메모`;

input.addEventListener("click", () => {
  if (input.value === "추가하기") {
    input.value = "";
  }
});

function onAdd() {
  const text = input.value;
  if (text === "" || text === "추가하기") {
    input.focus();
    return false;
  } else {
    const item = createItem(text);
    ulElement.prepend(item);
    footerText.textContent = `${(count = count + 1)}개의 메모`;
    item.scrollIntoView({ block: "end" });
    input.value = "";
    input.focus();
  }
}

let id = 0; // UUID
function createItem(text) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();

  const liElement = document.createElement("li");
  liElement.setAttribute("data-key", id);
  liElement.innerHTML = `
    <div class="listAndDate">
      <div class="list">${text}</div>
      <div class="date">${year}. ${
    month + 1
  }. ${date}. ${hours} : ${minutes}</div>
    </div>
    <i class="fas fa-trash-alt" data-id=${id}></i>
`;
  liElement.addEventListener("mouseenter", (event) => {
    const key = event.target.dataset.key;
    const trash = addedList.querySelector(`.addedList li i[data-id="${key}"]`);
    trash.style.visibility = "visible";
    liElement.addEventListener("mouseleave", (event) => {
      const key = event.target.dataset.key;
      const trash = addedList.querySelector(
        `.addedList li i[data-id="${key}"]`
      );
      trash.style.visibility = "hidden";
    });
  });
  id++;
  return liElement;
}

button.addEventListener("click", () => {
  onAdd();
});

input.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    onAdd();
  }
});

let toggling = 1;
const moreBtn = document.querySelector(".fixedList__top button");
const hidden = document.querySelector(".fixedList ul");
moreBtn.addEventListener("click", () => {
  moreBtn.classList.toggle("clicked");
  hidden.classList.toggle("hidden");
  if (toggling % 2 === 1) {
    ulElement.style.height = "60vh";
  } else {
    ulElement.style.height = "40vh";
  }
  toggling++;
});

ulElement.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(
      `.addedList li[data-key="${id}"]`
    );
    toBeDeleted.remove();
    footerText.textContent = `${(count = count - 1)}개의 메모`;
  }
});

const fixedList = document.querySelector(".fixedList");
const fixedLi = fixedList.querySelectorAll("li");
console.log(fixedLi);

fixedLi.forEach((el) => {
  console.log(el);
  el.addEventListener("mouseenter", (event) => {
    const key = event.target.dataset.key;
    if (key) {
      const trash = fixedList.querySelector(
        `.fixedList li i[data-id="${key}"]`
      );
      trash.style.visibility = "visible";
      el.addEventListener("mouseleave", () => {
        trash.style.visibility = "hidden";
      });
    }
  });
});
