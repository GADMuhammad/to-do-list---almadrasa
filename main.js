import {
  tasksListElement,
  input,
  inputContainer,
  getDeleteIcons,
  marks,
  getEveryTask,
} from "./scripts/elements";
import "./scripts/toggleTheme";
import "./scripts/classAdded";
import "./scripts/filterTasks";
import { toggleTask } from "./scripts/classAdded";
import { countUncompletedTasks } from "./scripts/filterTasks";

export const fetchData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const renderTaskList = (tasks) => {
  let taskList = "";
  tasks.forEach((task) => {
    taskList += `
      <div class="TasksSquare__task toCheckWith ${
        task.isCompleted ? "TasksSquare__checked" : "TasksSquare__unchecked"
      }">
      <div class="inputSquare">
        <div class="inputSquare__check inputSquare__check--clicked">
          <img
            class="inputSquare__check--img"
            src="images/icon-check.svg"
            alt="click to remove task"
          />
        </div>
        <h2 class="TasksSquare__task--title ${
          task.isCompleted ? "TasksSquare__task--title1" : ""
        }">
          ${task.value}
        </h2>
      </div>
      <img
        src="images/icon-cross.svg"
        alt=""
        srcset=""
        class="TasksSquare__task--remove"
      />
    </div>`;
    // console.log(taskList);
    tasksListElement.innerHTML = taskList;
  });

  input.value = "";
  inputContainer.classList.remove("TasksSquare__checked");
};

const deleteTask = (e, index) => {
  const answer = confirm("Sure?");
  if (!answer) return;

  const tasks = fetchData("tasks");

  tasks.splice(index, 1);
  saveToData("tasks", tasks);

  initTaskList(tasks);

  // countUncompletedTasks();
};

const initTaskListeners = () => {
  getDeleteIcons().forEach((icon, index) => {
    icon.addEventListener("click", (e) => deleteTask(e, index));
  });

  marks().forEach((mark, index) => {
    mark.addEventListener("click", () => toggleTask(mark, index));
  });
};

const addTask = (e) => {
  e.preventDefault();

  const taskValue = input.value;

  if (!taskValue) return;

  const task = {
    value: taskValue,
    // isCompleted: inputContainer.classList.contains("TasksSquare__checked")? "TasksSquare__checked": "",
    isCompleted: inputContainer.classList.contains("TasksSquare__checked") ? true : false,
  };
  const tasks = fetchData("tasks") || [];

  tasks.push(task);
  saveToData("tasks", tasks);

  initTaskList(tasks);

  countUncompletedTasks();
};

export const saveToData = (key, data) => {
  // const tasks = fetchData(key) || [];
  // tasks.push(data);
  localStorage.setItem(key, JSON.stringify(data));
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask(e);
});

export const renderEmptyState = () => {
  tasksListElement.innerHTML = `<h3 class="TasksSquare__task--title no-tasks">No tasks yet...</h3>`;
};

export const initTaskList = (tasks) => {
  if (tasks?.length) {
    renderTaskList(tasks);
    initTaskListeners();
    countUncompletedTasks();
  } else if (!tasks?.length) {
    renderEmptyState();
  }
};

countUncompletedTasks();
