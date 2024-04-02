const taskTitleEl = $('#task-title');
const datepickerEl = $('#datepicker');
const descriptionEl = $('#description');
const taskSubmitEl = $('#task-submit');
const todoList = $('#to-do');



//Returns an array of objects
function readTasksFromStorage() {
let taskList = JSON.parse(localStorage.getItem('tasks'));
// let nextId = JSON.parse(localStorage.getItem("nextId"));

if (!taskList) {
    taskList = [];
  }

  return taskList;
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

//Todo: create a function to generate a unique task id
function generateTaskId() {

    // var result = '';
    // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    // var length = 8; // Fixed length
    // for (var i = 0; i < length; i++) {
    //     result += characters.charAt(Math.floor(Math.random() * characters.length));
    // }
    // return result;

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>')
    .addClass('card project-card draggable my-3')
    .attr('data-project-id', task.id);
  const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
  const cardBody = $('<div>').addClass('card-body');
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-project-id', task.id);
//   cardDeleteBtn.on('click', handleDeleteProject);

  // ? Sets the card background color based on due date. Only apply the styles if the dueDate exists and the status is not done.
  if (task.dueDate && task.status !== 'done') {
    const now = dayjs();
    const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

    // ? If the task is due today, make the card yellow. If it is overdue, make it red.
    if (now.isSame(taskDueDate, 'day')) {
      taskCard.addClass('bg-warning text-white');
    } else if (now.isAfter(taskDueDate)) {
      taskCard.addClass('bg-danger text-white');
      cardDeleteBtn.addClass('border-light');
    }
  }

  // ? Gather all the elements created above and append them to the correct elements.
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
  taskCard.append(cardHeader, cardBody);

  // ? Return the card so it can be appended to the correct lane.
  return taskCard;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = readTasksFromStorage();

  // ? Empty existing project cards out of the lanes
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  // ? Loop through projects and create project cards for each status
  for (let task of tasks) {
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
    }
  }
}

// // Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

  // Read user input from the form
  const taskTitle = taskTitleEl.val().trim();
  const taskDate = datepickerEl.val(); 
  const taskDescription = descriptionEl.val(); 
console.log(taskTitle);
  const newTask = {
    // ? Here we use a Web API called `crypto` to generate a random id for our project. This is a unique identifier that we can use to find the project in the array. `crypto` is a built-in module that we can use in the browser and Nodejs.    id: crypto.randomUUID(),
    title: taskTitle,
    dueDate: taskDate,
    description: taskDescription,
    status: 'to-do',
    // id: crypto.randomUUID()
  };
console.log(newTask);
  let taskList = readTasksFromStorage();
  taskList.push(newTask);

  saveTasksToStorage(taskList);

  renderTaskList();

  taskTitleEl.val('');
  datepickerEl.val(''); 
  descriptionEl.val('');
}

// // Todo: create a function to handle deleting a task
// function handleDeleteTask(event) {

// }

// // Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {

// }


// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    taskSubmitEl.on('submit', handleAddTask);
});

$(function () {
    $("#datepicker").datepicker();
});