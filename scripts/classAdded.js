import { fetchData, saveToData } from "../main";
import { getEveryTask, marks } from "./elements";
import { countUncompletedTasks } from "./filterTasks";

marks().forEach((mark) => {
  mark.addEventListener("click", () => {
    mark.closest(".toCheckWith").classList.toggle("TasksSquare__checked");
  });
});

export const toggleTask = (mark, index) => {
  const tasks = fetchData("tasks");

  mark.closest(".TasksSquare__task")?.classList.toggle("TasksSquare__checked");

  mark
    ?.closest(".inputSquare")
    ?.querySelector(".TasksSquare__task--title")
    ?.classList.toggle("TasksSquare__task--title1");

  if (tasks[index - 1]) tasks[index - 1].isCompleted = !tasks[index - 1].isCompleted;

  // console.log(tasks[index]);

  // tasks[index - 1].isCompleted = !tasks[index - 1].isCompleted;

  // console.log(tasks);
  saveToData("tasks", tasks);

  countUncompletedTasks();
};
