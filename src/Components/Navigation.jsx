import { motion } from "framer-motion";

export default function Navigation({ update, displayState, dispatch }) {
  const leftTasksNumber =
    JSON.parse(localStorage.getItem("tasks"))?.reduce(
      (acc, cur) => (!cur.isDone ? acc + 1 : acc),
      0,
    ) ?? 0;

  const changeDisplay = (status) => {
    const allData = JSON.parse(localStorage.getItem("tasks"));
    const activeTasks = allData.filter((task) => !task.isDone);

    switch (status) {
      case "all":
        dispatch({ type: "both", dataPayload: allData, displayPayload: "all" });
        break;

      case "active":
        dispatch({
          type: "both",
          dataPayload: activeTasks,
          displayPayload: "active",
        });
        break;

      case "completed":
        dispatch({
          type: "both",
          dataPayload: allData.filter((task) => task.isDone),
          displayPayload: "completed",
        });
        break;

      case "clearCompleted":
        update(activeTasks);
        dispatch({ type: "displayState", displayPayload: "all" });
        break;
    }
  };

  const navigationButtons = [
    {
      sort: "heading",
      title: `${leftTasksNumber} items left`,
      style: "mr-auto tracking-wide text-gray-400",
    },
    {
      title: "all",
    },
    {
      title: "active",
    },
    {
      title: "completed",
    },
    {
      title: "Clear Completed",
      code: "clearCompleted",
      style:
        "ml-auto tracking-wide text-gray-400 transition-colors hover:text-slate600",
    },
  ];

  return (
    <>
      <motion.div className="flex flex-wrap gap-8 rounded-b-md px-6 py-5">
        {navigationButtons.map((btn, index) =>
          btn.sort === "heading" ? (
            <h3 key={btn.sort} className={btn.style}>
              {btn.title}
            </h3>
          ) : (
            <motion.button
              variants={{
                hidden: { opacity: 0, scale: [0.3, 0.1] },
                visible: { opacity: 1, scale: [1.3, 1] },
              }}
              transition={{ delay: index * 0.3 }}
              initial="hidden"
              animate="visible"
              key={btn.title}
              className={
                btn.style ??
                `border-b-solid border-b-2 tracking-wide text-gray-400 transition-all ${displayState === btn.title ? "border-b-indigo700 pb-[0.05rem] tracking-widest text-indigo700" : "border-b-transparent text-gray-400 hover:tracking-wide hover:text-slate600"}`
              }
              onClick={() => changeDisplay(btn.code ?? btn.title)}
            >
              {btn.title.charAt(0).toUpperCase() + btn.title.slice(1)}
            </motion.button>
          ),
        )}
      </motion.div>
    </>
  );
}
