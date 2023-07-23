class Task {
  constructor(text, dueDate) {
    this.text = text;
    this.completed = false;
    this.dueDate = dueDate || null;
  }
}

class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.taskInput = document.getElementById("taskInput");
    this.dueDateInput = document.getElementById("dueDateInput");
    this.showCompletedCheckbox = document.getElementById("showCompleted");
    this.showUncompletedCheckbox = document.getElementById("showUncompleted");
    this.filterDueDateInput = document.getElementById("filterDueDate");

    this.addEventListeners();
    this.displayTasks();
  }

  addEventListeners() {
    document
      .getElementById("addTaskBtn")
      .addEventListener("click", () => this.addTask());
  }

  saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask() {
    const taskText = this.taskInput.value.trim();
    const dueDate = this.dueDateInput.value;

    if (taskText === "") return;

    const task = new Task(taskText, dueDate);
    this.tasks.push(task);

    this.taskInput.value = "";
    this.dueDateInput.value = "";

    this.saveTasksToLocalStorage();
    this.displayTasks();
  }

  toggleCompletion(index) {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.saveTasksToLocalStorage();
    this.displayTasks();
  }

  filterTasks() {
    const showCompleted = this.showCompletedCheckbox.checked;
    const showUncompleted = this.showUncompletedCheckbox.checked;
    const filterDueDate = this.filterDueDateInput.value;

    const filteredTasks = this.tasks.filter((task) => {
      if (showCompleted && !task.completed) return false;
      if (showUncompleted && task.completed) return false;
      if (filterDueDate && task.dueDate !== filterDueDate) return false;
      return true;
    });

    this.displayTasks(filteredTasks);
  }

  deleteCompletedTasks() {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.saveTasksToLocalStorage();
    this.displayTasks();
  }

  displayTasks(filteredTasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasksToDisplay = filteredTasks || this.tasks;

    tasksToDisplay.forEach((task, index) => {
      const taskItem = document.createElement("li"); // Create a new div for each task
      taskItem.className = "split"; // Add the "split" class to the task container
      taskItem.innerHTML = `
            <div class="generatedhtml">
              <input type="checkbox" onclick="toDoList.toggleCompletion(${index})" ${
        task.completed ? "checked" : ""
      }>
              <span class="${task.completed ? "task-completed" : ""}">${
        task.text
      }</span>
            </div>
            <div class="due-date">${
              task.dueDate ? "Due Date: " + task.dueDate : ""
            }</div>
          `;

      taskList.appendChild(taskItem); // Append the task div to the container div
    });
  }
}

const toDoList = new ToDoList();
