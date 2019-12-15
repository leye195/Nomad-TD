
const todo = document.querySelector(".d1_u"),
  doing = document.querySelector(".d2_u"),
  done = document.querySelector(".d3_u"),
  todo_in = document.querySelector(".todo_input"),
  limited = 7;
let todo_list = [],
  doing_list = [],
  done_list = [];
function createTag(type, name) {
  const li = document.createElement("li"),
    p = document.createElement("p"),
    d = document.createElement("div"),
    b1 = document.createElement("button"),
    b2 = document.createElement("button"),
    b3 = document.createElement("button");
  p.innerHTML = name;
  d.className = "btn_container";
  b1.className = "r";
  b1.innerHTML = "❌";
  b1.addEventListener("click", handleDelete);
  li.className = "grid";
  li.appendChild(p);
  if (type === "todo") {
    b2.className = "c";
    b2.innerHTML = "✅";
    b1.classList.add("todo_btn");
    b2.classList.add("todo_btn");
    b2.addEventListener("click", handleNext);
    d.appendChild(b1);
    d.appendChild(b2);
    li.append(d);
  } else if (type === "doing") {
    b2.className = "c";
    b2.innerHTML = "✅";
    b3.className = "b";
    b3.innerHTML = "⏪";
    b1.classList.add("doing_btn");
    b2.classList.add("doing_btn");
    b3.classList.add("doing_btn");
    b2.addEventListener("click", handleNext);
    b3.addEventListener("click", handleBack);
    d.appendChild(b1);
    d.appendChild(b2);
    d.appendChild(b3);
    li.append(d);
  } else if (type === "done") {
    b2.className = "b";
    b2.innerHTML = "⏪";
    b1.classList.add("done_btn");
    b2.classList.add("done_btn");
    b2.addEventListener("click", handleBack);
    d.appendChild(b1);
    d.appendChild(b2);
    li.append(d);
  }
  return li;
}
function limitInput() {
  console.log("123123");
  if (todo_list.length >= limited) todo_in.style.visibility = "hidden";
  else todo_in.style.visibility = "visible";
}
function handleTodoIn(e) {
  const target = e.target;
  const li = createTag("todo", target.value);
  li.id = new Date().getTime();
  console.log(li);
  todo.appendChild(li);
  let todo_obj = {
    id: li.id,
    text: target.value
  };
  todo_list.push(todo_obj);
  target.value = "";
  limitInput();
  saveList();
}
function deleteItem(type, id) {
  console.log(id);
  if (type === "todo") {
    todo_list = todo_list.filter(item => Number(item.id) !== Number(id));
  } else if (type === "doing") {
    doing_list = doing_list.filter(item => Number(item.id) !== Number(id));
  } else if (type === "done") {
    done_list = done_list.filter(item => Number(item.id) !== Number(id));
  }
  saveList();
}
function handleDelete(e) {
  const target = e.target,
    parent = target.parentNode;
  const id = parent.parentNode.id;
  console.log(target.className);
  if (target.classList.contains("todo_btn")) {
    deleteItem("todo", id);
    todo.removeChild(parent.parentNode);
  } else if (target.classList.contains("doing_btn")) {
    console.log(2);
    deleteItem("doing", id);
    doing.removeChild(parent.parentNode);
  } else if (target.classList.contains("done_btn")) {
    console.log(3);
    deleteItem("done", id);
    done.removeChild(parent.parentNode);
  }
  saveList();
  limitInput();
}
function handleNext(e) {
  const target = e.target,
    parent = target.parentNode,
    txt = parent.previousElementSibling.innerHTML,
    id = parent.parentNode.id,
    obj = {
      id: id,
      text: txt
    };
  if (target.classList.contains("todo_btn")) {
    const li = createTag("doing", txt);
    li.id = id;
    todo.removeChild(parent.parentNode);
    doing.appendChild(li);
    deleteItem("todo", id);
    doing_list.push(obj);
  } else if (target.classList.contains("doing_btn")) {
    const li = createTag("done", txt);
    li.id = id;
    doing.removeChild(parent.parentNode);
    done.appendChild(li);
    deleteItem("doing", id);
    done_list.push(obj);
  }
  saveList();
  limitInput();
}
function handleBack(e) {
  const target = e.target,
    parent = target.parentNode,
    txt = parent.previousElementSibling.innerHTML,
    id = parent.parentNode.id,
    obj = {
      id: id,
      text: txt
    };
  if (target.classList.contains("done_btn")) {
    const li = createTag("doing", txt);
    li.id = id;
    done.removeChild(parent.parentNode);
    doing.appendChild(li);
    deleteItem("done", id);
    doing_list.push(obj);
  } else {
    const li = createTag("todo", txt);
    li.id = id;
    doing.removeChild(parent.parentNode);
    todo.appendChild(li);
    deleteItem("doing", id);
    todo_list.push(obj);
  }
  saveList();
  limitInput();
}
function saveList() {
  localStorage.setItem("todo", JSON.stringify(todo_list));
  localStorage.setItem("doing", JSON.stringify(doing_list));
  localStorage.setItem("done", JSON.stringify(done_list));
}
function loadList() {
  todo_list = !localStorage.todo ? [] : JSON.parse(localStorage.todo);
  doing_list = !localStorage.doing ? [] : JSON.parse(localStorage.doing);
  done_list = !localStorage.done ? [] : JSON.parse(localStorage.done);
  todo_list.forEach(item => {
    const li = createTag("todo", item.text);
    li.id = item.id;
    todo.appendChild(li);
  });
  doing_list.forEach(item => {
    const li = createTag("doing", item.text);
    li.id = item.id;
    doing.appendChild(li);
  });
  done_list.forEach(item => {
    const li = createTag("done", item.text);
    li.id = item.id;
    done.appendChild(li);
  });
  limitInput();
}
function init() {
  loadList();
  todo_in.addEventListener("change", handleTodoIn);
}
init();
