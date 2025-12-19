let addBtn = document.getElementById("addBtn");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
    let taskText = taskInput.value;

    if (taskText === "") return;

    let li = document.createElement("li");
    li.innerText = taskText;

    li.addEventListener("click", function () {
        li.style.textDecoration = "line-through";
    });

    taskList.appendChild(li);
    taskInput.value = "";
});
