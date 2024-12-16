import check from "../assets/icon-check.svg";

export default function Circle({ isChecked, onChecked }) {
  return (
    <div
      className={`${isChecked ? "border-none bg-custom-gradient" : "hover:border-none hover:bg-hover-custom-gradient"} group mx-2 flex h-[1.75rem] w-[1.75rem] flex-shrink-0 cursor-pointer justify-center self-center rounded-full border-[1px] border-gray300 transition-all duration-300`}
      onClick={onChecked}
    >
      <img
        src={check}
        className={`h-3 w-3 self-center ${isChecked ? "block" : "hidden group-hover:block"}`}
        alt="check mark"
      />
    </div>
  );
}
