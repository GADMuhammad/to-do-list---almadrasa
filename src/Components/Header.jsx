import { useState } from "react";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";

export default function Header() {
  const [isDark, setIsDark] = useState(
    document.body.classList.contains("dark"),
  );

  const changeMode = () => {
    document.body.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return (
    <div className="mx-auto my-10 flex w-[45rem] animate-up items-center justify-between font-JosefinSans max-md:w-11/12">
      <h1 className="text-5xl font-bold tracking-extra-wide">TODO</h1>
      <button>
        <img onClick={changeMode} src={isDark ? moon : sun} />
      </button>
    </div>
  );
}
