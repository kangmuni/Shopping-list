const addedList = document.querySelector(".addedList");
const ulElement2 = addedList.querySelector("ul");
const button = document.querySelector("button");
const input = document.querySelector("input");
const footerText = document.querySelector(".footer__text");

let count = 3;
footerText.innerHTML = `${count}개의 메모`;

// onAdd 함수 안에 추가하면 왜 작동이 안될까?
input.addEventListener("click", () => {
  if (input.value === "추가하기") {
    input.value = "";
  }
});

function onAdd() {
  const text = input.value; // 1. input에서 텍스트 받기
  if (text === "" || text === "추가하기") {
    input.focus();
    return false;
  } else {
    const item = createItem(text); // 2. text를 넘겨서 태그들이 제대로 장착 된 item을 만들기
    ulElement2.prepend(item); // 3. 완성된 item을 마지막으로 ul태그에 붙여넣기
    footerText.textContent = `${(count = count + 1)}개의 메모`; // 아이템이 증가되면 +1개의 메모
    item.scrollIntoView({ block: "end" }); // 4. 새롭게 추가된 아이템을 기준으로 스크롤링
    input.value = ""; // 5. input 초기화 하기
    input.focus(); // focus 사용법을 하나 알아가서 좋군!
  }
}

function createItem(text) {
  const today = new Date(); // 날짜 예쁘게 출력하기
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  const liElement = document.createElement("li"); // <li>

  const divElement1 = document.createElement("div"); // <div class="list">
  divElement1.setAttribute("class", "list");
  divElement1.textContent = text;

  const divElement2 = document.createElement("div"); // <div class="date">
  divElement2.setAttribute("class", "date");
  divElement2.textContent = `${year}. ${month}. ${date}`;

  const divElement3 = document.createElement("div"); // <div class="listAndDate">
  divElement3.setAttribute("class", "listAndDate");

  const iElement = document.createElement("i"); // <i class="fas fa-trash-alt">
  iElement.setAttribute("class", "fas fa-trash-alt");
  iElement.addEventListener("click", () => {
    ulElement2.removeChild(liElement);
    footerText.innerHTML = `${(count = count - 1)}개의 메모`; // 아이템이 삭제되면 -1개의 메모
  });

  divElement3.appendChild(divElement1);
  divElement3.appendChild(divElement2);

  liElement.appendChild(divElement3);
  liElement.appendChild(iElement);

  return liElement;
}

button.addEventListener("click", () => {
  onAdd();
});
// 나는 처음에 onAdd 함수로 작성을 안하고 안에서만 다 하려고 하니까
// 일일이 클릭과 엔터 이벤트 안에 이 모든 복잡한 과정을 똑같이 복붙했다.
// 즉, 함수를 꺼내서 사용 할 줄을 알아야 하고
// 그 전에 단계별로 무엇이 필요한지 순차적으로 작성하는법이 중요하다.
input.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    // event.key === "Enter"
    onAdd();
  }
});

const moreBtn = document.querySelector(".fixedList__top button");
const hidden = document.querySelector(".fixedList ul");
moreBtn.addEventListener("click", () => {
  moreBtn.classList.toggle("clicked");
  hidden.classList.toggle("hidden");
});

const fixedList = document.querySelector(".fixedList");
const fixedTrash = fixedList.querySelectorAll(".fa-trash-alt");
const banners = fixedList.querySelectorAll("span");
console.log(banners);
for (let i = 0; i < fixedTrash.length; i++) {
  for (let j = 0; j < banners.length; j++) {
    fixedTrash[0].addEventListener("mouseover", () => {
      banners[0].style.display = "block";
      fixedTrash[0].addEventListener("mouseout", () => {
        banners[0].style.display = "none";
      });
    });
    fixedTrash[1].addEventListener("mouseover", () => {
      banners[1].style.display = "block";
      fixedTrash[1].addEventListener("mouseout", () => {
        banners[1].style.display = "none";
      });
    });
    fixedTrash[2].addEventListener("mouseover", () => {
      banners[2].style.display = "block";
      fixedTrash[2].addEventListener("mouseout", () => {
        banners[2].style.display = "none";
      });
    });
  }
}
