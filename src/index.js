const js_clock = document.querySelector(".js_clock"),
  dat = document.querySelector(".date"),
  change = document.querySelector(".change"),
  user = document.querySelector(".user_name"),
  user_modal = document.querySelector(".user_modal"),
  js_input = document.querySelector(".js_input"),
  close = document.querySelector(".close"),
  s=document.querySelectorAll(".username span");
  js_confirm = document.querySelector(".js_confirm");
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let ch = "AM",
  greeting = "Good Morning☀ ";
var options = { month: "long" };
function getTime() {
  const now = new Date();
  const Y = now.getFullYear(),
    M = new Intl.DateTimeFormat("en-US", options).format(now.getMonth()),
    D = now.getDate(),
    h = now.getHours(),
    m = now.getMinutes(),
    s = now.getSeconds(),
    day = days[now.getDay()];
  if (h >= 12) {
    ch = "PM";
    if(h>=12 && h<18){
      greeting = "Good Afternoon🤗 ";
      console.log(greeting);
    }else if(h>=18){
      greeting = "Good Night☾ ";
    }
  } else {
    ch = "AM";
    greeting = "Good Morning☀ ";
  }
  const clock = `${h > 12 ? h - 12 : h}:${m > 9 ? m : "0" + m}:${
    s > 9 ? s : "0" + 9
  } ${ch}`;
  js_clock.innerHTML = clock;
  dat.innerHTML = `${day},${M} ${D},${Y}`;
  s[0].innerText = `${greeting}`;
}
function randomizeImage() {
  const body = document.querySelector("body"),
    img = new Image(),
    idx = Math.floor(Math.random() * 3) + 1;
  console.log(idx);
  img.src = `src/img/${idx}.jpg`;
  img.classList.add("bg");
  body.appendChild(img);
}
function handleClose() {
  user_modal.style.display = "none";
}
function handleChange() {
  user_modal.style.display = "block";
}
function handleInput(e) {
  const n = e.target.value;
  if (n !== "") {
    saveUser(n);
    s[1].innerText = ` ${n}!!!`;
    user_modal.style.display = "none";
    e.target.value = "";
  }
}
function handleConfirm() {
  const n = js_input.value;
  if (n !== "") {
    saveUser(n);
    user_modal.style.display = "none";
    s[1].innerText = ` ${n}!!!`;
    js_input.value = "";
  }
}
function saveUser(name) {
  localStorage.user = name;
}
function loadUser() {
  const u = localStorage.user;
  if (!u) {
    user_modal.style.display = "block";
  } else {
    s[1].innerText+= ` ${u}!!!`;
    user_modal.style.display = "none";
  }
}
function init() {
  setInterval(getTime, 1000);
  randomizeImage();
  loadUser();
  js_input.addEventListener("change", handleInput);
  js_confirm.addEventListener("click", handleConfirm);
  change.addEventListener("click", handleChange);
  close.addEventListener("click", handleClose);
}
init();
