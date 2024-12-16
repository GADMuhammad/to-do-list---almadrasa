import Circle from "./Circle";
import { motion } from "framer-motion";

export default function Input({ isChecked, onChecked, submit }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 3, marginBottom: 2 },
        visible: { opacity: 1, y: 0, marginBottom: 0 },
      }}
      initial="initial"
      animate="visible"
      exit="initial"
      transition={{ duration: 1 }}
      className="mx-auto flex w-[45rem] rounded-md bg-slate200 py-2 pl-5 shadow-md transition-all max-md:w-11/12"
    >
      <Circle isChecked={isChecked} onChecked={onChecked} />
      <input
        onKeyDown={submit}
        placeholder="Create a new todo..."
        className="h-12 w-full rounded bg-inherit px-2 text-lg text-indigo700 caret-purple-500 focus:outline-none"
      />
    </motion.div>
  );
}

// Consolas, 'Courier New', monospace, Operator Mono Lig
