let arrTodo = [];
let arrStatus = [];
let inputAddTodo = document.querySelector("#inputAddTodo");
let cardBox = document.querySelector("#cardBox");
let line = document.querySelectorAll(".line");
let img = document.querySelectorAll("img");

loadLocal();
function loadLocal() {
  let getLocal = localStorage.getItem("Todo");
  let getLocalStatus = localStorage.getItem("status");

  if (getLocal !== "" && getLocal !== null) {
    let elementSplitArr = getLocal.split(",");
    arrTodo = elementSplitArr;
    let elementSplitStatus = getLocalStatus.split(",");

    arrStatus = elementSplitStatus;
    creatElem();
    checkOut();
  }
}

function checkOut() {
  let inputArr = [];
  let inputCheck = document.querySelectorAll(".inputCheck");

  inputCheck.forEach((val) => {
    inputArr.push(val);
  });
  let getLocalSTATUS = localStorage.getItem("status");
  let elementSplitStatus = getLocalSTATUS.split(",");

  elementSplitStatus.forEach((val, i) => {
    if (val == "true") {
      line.forEach((val, index) => {
        if (i == index) {
          val.style.left = "40px";
          inputArr[i].checked = true;
        }
      });
    } else if (val == "false") {
      line.forEach((val, index) => {
        if (i == index) {
          val.style.left = "-370px";
        }
      });
    }

    localStorage.setItem("status", elementSplitStatus);
  });
}

let ButtonAddTodo = document
  .querySelector("#ButtonAddTodo")
  .addEventListener("click", (e) => {
    let flag = true;
    if (inputAddTodo.value != null && inputAddTodo.value != "") {
      arrTodo.forEach((items) => {
        if (inputAddTodo.value == items) {
          flag = false;
          inputAddTodo.value = null;
          inputAddTodo.focus();
        }
      });
      if (flag) {
        arrTodo.push(inputAddTodo.value);
        localStorage.setItem("Todo", arrTodo);


        arrStatus.push('false');
        console.log(arrStatus);
        localStorage.setItem("status", arrStatus);
        creatElem();
      }
    }
  });
function creatElem() {
  cardBox.innerHTML = "";
  arrTodo.forEach((item) => {
    let _paretDiv = document.createElement("div");
    _paretDiv.innerHTML = `  <div class="w-full flex items-center bg-bgCard  text-white text-xl px-10 py-4 my-2 relative">
        <h3 class="w-[80%]">${item}</h3>
        <div data-line="${item}" class="w-[55%] h-[2px] bg-white opacity-80 absolute top-[50%] left-[-350px]  line"></div>
        <div class="flex w-[20%] justify-center ">
          <input  data-data="${item}" onclick=check(this) class="w-[19px] me-2 bg-bgMain inputCheck" type="checkbox">
          <img onclick=del(this) class="cursor-pointer" src="src/img/icons8-trash.svg">
          </div>
      </div>`;

    cardBox.appendChild(_paretDiv);
    img = document.querySelectorAll("img");
    line = document.querySelectorAll(".line");
    inputAddTodo.value = null;
    inputAddTodo.focus();
    checkOut();
  });
}

function del(s) {
  let removeItem = s.previousElementSibling.getAttribute("data-data");

  let findIndex = arrTodo.indexOf(removeItem);
  s.parentElement.parentElement.remove();

  arrTodo.splice(findIndex, 1);

  let getLocalTODO = localStorage.getItem("Todo");
  let elementSplitArr = getLocalTODO.split(",");
  elementSplitArr.splice(findIndex, 1);
  localStorage.setItem("Todo", elementSplitArr);

  let getLocalSTATUS = localStorage.getItem("status");
  let elementSplitStatus = getLocalSTATUS.split(",");
  elementSplitStatus.splice(findIndex, 1);
  arrStatus.splice(findIndex, 1);
  
  localStorage.setItem("status", elementSplitStatus);
  loadLocal();
  checkOut();
}

function check(x) {
  let getLocalTODO = localStorage.getItem("Todo");
  let elementSplitArr = getLocalTODO.split(",");
  elementSplitArr.forEach((val, i) => {
    let y = x.getAttribute("data-data");
    if (val == y) {
      let getLocalSTATUS = localStorage.getItem("status");
      let elementSplitStatus = getLocalSTATUS.split(",");
      let flag = elementSplitStatus[i];
      if (flag == "false") {
        elementSplitStatus.splice(i, 1, "true");
      } else {
        elementSplitStatus.splice(i, 1, "false");
      }

      localStorage.setItem("status", elementSplitStatus);
    }
  });
  checkOut();
}
