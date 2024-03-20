let time = 0;
let intervalId = null;

function startTimer() {
    intervalId = setInterval(() => {
        time++;
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

const $ = selector => document.querySelector(selector);

const $form = $("#form");
const $task = $("#task");
const $tasks = $("#tasks");

let currentTask = null;

$form.addEventListener("submit", (event) => {
    event.preventDefault();
    conometer($task.value);
    $task.value = "";
});

function conometer(task) {
  if(!task) return
  if(currentTask===null){
    iniciarTarea(task);
    return
  }
  terminartarea();
  publicarTasks();
  if(task!="end") {
    iniciarTarea(task);
  }
}

let tareasEjecutadas = new Map()

function iniciarTarea(task){
  startTimer();
  currentTask = task;
  tareasEjecutadas.set(task,"...");
}

function terminartarea(){
  stopTimer()
  agendarTarea(currentTask);
}

function publicarTasks(){
  if(tareasEjecutadas){
    $tasks.innerHTML = JSON.stringify(Object.fromEntries(tareasEjecutadas), null, 4)
  }
}

function agendarTarea(task){
  if(tareasEjecutadas.get(task))tareasEjecutadas.set(task,0);
  tareasEjecutadas.set(task,tareasEjecutadas.get(task)+time);
}