import { fetchData, initTaskList, renderEmptyState, saveToData } from "../main";
import {
  activeButton,
  activeTitle,
  allButton,
  clearButton,
  completedButton,
  navigation,
  numberOfTasksSpan,
  tasksListElement,
} from "./elements";

activeButton.addEventListener("click", () => {
  tasksListElement.classList.add("completed--tasks-hidden");
  tasksListElement.classList.remove("uncompleted--tasks-hidden");

  navigation.classList.add("navigation-border");
});

completedButton.addEventListener("click", () => {
  tasksListElement.classList.remove("completed--tasks-hidden");
  tasksListElement.classList.add("uncompleted--tasks-hidden");

  navigation.classList.remove("navigation-border");
});

allButton.addEventListener("click", () => {
  tasksListElement.classList.remove("completed--tasks-hidden");
  tasksListElement.classList.remove("uncompleted--tasks-hidden");

  navigation.classList.add("navigation-border");
});

export const countUncompletedTasks = () => {
  const tasks = fetchData("tasks");

  let filteredArray = tasks.filter((task) => !task.isCompleted);

  numberOfTasksSpan.innerHTML = filteredArray.length;
};

clearButton.addEventListener("click", () => {
  // const tasks = fetchData("tasks");
  // if (tasks.length === 0) {
  //   renderEmptyState();
  // } else {
  const tasks = fetchData("tasks");

  tasks.forEach((task) => {
    if (task.isCompleted) console.log(tasks.indexOf(task));
    if (task.isCompleted) tasks.splice(tasks.indexOf(task), 1);
  });

  saveToData("tasks", tasks);

  initTaskList(tasks);
  // }
});
