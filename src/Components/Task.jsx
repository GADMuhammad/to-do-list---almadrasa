import Circle from "./Circle";
import x from "../assets/icon-cross.svg";
import { motion } from "framer-motion";

export default function Task({ task, onDeleteTask, addTasks }) {
  const { title, isDone } = task;

  const handleCheck = () => {
    const getData = JSON.parse(localStorage.getItem("tasks")) || [];

    const newTasks = getData.map((task) =>
      title === task.title && isDone === task.isDone
        ? { ...task, isDone: !task.isDone }
        : task,
    );

    localStorage.setItem("tasks", JSON.stringify(newTasks));
    addTasks(newTasks, false); // changing doing state
  };

  return (
    <motion.div className="group mx-auto flex animate-up items-center border-b-2 border-gray300 px-6 py-5 opacity-100 transition-all">
      <Circle isChecked={isDone} onChecked={handleCheck} />

      <h1
        className={`px-2 ${isDone ? "text-gray-500 line-through" : "text-slate600"}`}
      >
        {task.title}
      </h1>

      <button
        onClick={onDeleteTask}
        className="ml-auto flex-shrink-0 opacity-0 transition-all duration-300 hover:!opacity-100 group-hover:opacity-50 max-xl:opacity-100"
      >
        <img src={x} />
      </button>
    </motion.div>
  );
}
