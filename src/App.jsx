import { useEffect, useReducer, useState } from "react";
import Header from "./Components/Header";
import Input from "./Components/Input";
import Task from "./Components/Task";
import Navigation from "./Components/Navigation";
import { motion } from "framer-motion";

const reducer = (state, action) => {
  switch (action.type) {
    case "dataDisplayed":
      return {
        dataDisplayed: action.dataPayload,
        displayState: state.displayState,
      };

    case "displayState":
      return { displayState: action.displayPayload, ...state };

    case "both":
      return {
        dataDisplayed: action.dataPayload,
        displayState: action.displayPayload,
      };
  }
};

function App() {
  const [isChecked, setIsChecked] = useState(false);

  const getData = () => JSON.parse(localStorage.getItem("tasks")) || [];

  const [{ dataDisplayed, displayState }, dispatch] = useReducer(reducer, {
    dataDisplayed: getData(),
    displayState: "all",
  });

  useEffect(() => {
    !getData().length && localStorage.setItem("tasks", JSON.stringify([]));
  }, []);

  const addTasks = (newTasks, submit = true) => {
    // both
    displayState === "all" &&
      dispatch({ type: "dataDisplayed", dataPayload: newTasks });

    // submitting a new task
    if (
      ((displayState === "active" && !isChecked) ||
        (displayState === "completed" && isChecked)) &&
      submit
    ) {
      dispatch({
        type: "dataDisplayed",
        dataPayload: newTasks.filter((task) => task.isDone === isChecked),
      });
    }

    // editing an exist task
    if (!submit && displayState === "active") {
      dispatch({
        type: "dataDisplayed",
        dataPayload: newTasks.filter((task) => !task.isDone),
      });
    } else if (!submit && displayState === "completed") {
      dispatch({
        type: "dataDisplayed",
        dataPayload: newTasks.filter((task) => task.isDone),
      });
    }
  };

  const submit = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      const newTasks = [
        { title: event.target.value, isDone: isChecked },
        ...getData(),
      ];

      localStorage.setItem("tasks", JSON.stringify(newTasks));

      addTasks(newTasks);

      event.target.value = "";
    }
  };

  const update = (value) => {
    localStorage.setItem("tasks", JSON.stringify(value));
    dispatch({ type: "dataDisplayed", dataPayload: value });
  };

  const onDeleteTask = (index) => {
    const newTasks = getData().filter(
      (task) => task.title !== getData()[index].title,
    );
    update(newTasks);
  };

  return (
    <>
      <Header />
      <Input
        submit={submit}
        isChecked={isChecked}
        onChecked={() => setIsChecked((prev) => !prev)}
      />
      <motion.div
        variants={{
          initial: { opacity: 0, y: 3, marginBottom: 2 },
          visible: { opacity: 1, y: 0, marginBottom: 0 },
        }}
        initial="initial"
        animate="visible"
        exit="initial"
        transition={{ duration: 1 }}
        className="mx-auto mb-5 w-[45rem] rounded-md bg-slate200 shadow-lg max-md:w-11/12"
      >
        {!dataDisplayed.length ? (
          <p className="border-b-2 border-gray300 p-5 text-xl tracking-wider text-gray-400">
            No task to display.
          </p>
        ) : (
          dataDisplayed?.map((task, index) => (
            <Task
              key={task.title}
              task={task}
              onDeleteTask={() => onDeleteTask(index)}
              addTasks={addTasks}
            />
          ))
        )}

        <Navigation
          update={update}
          displayState={displayState}
          dispatch={dispatch}
        />
      </motion.div>
    </>
  );
}

export default App;
