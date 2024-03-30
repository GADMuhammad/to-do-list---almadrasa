import { fetchData, initTaskList, saveToData } from "../main";
import { body, themeImages } from "./elements";

const toggleDarkMode = () => {
  if (fetchData("darkModeFlag").length === 0) {
    body.classList.remove("App-is-dark");
  } else {
    body.classList.toggle("App-is-dark");
  }

  saveToData("darkModeFlag", body.classList.contains("App-is-dark"));
};

themeImages.forEach((themeImage) => {
  themeImage.addEventListener("click", toggleDarkMode);
  // saveToData("darkModeFlag", body.classList.contains("App-is-dark"));
});
// ------------------------------------------------

export const initDataOnstartUp = () => {
  // if (!localStorage.getItem("darkModeFlag")) return;

  // if (fetchData("darkModeFlag").length === 0) return;

  fetchData("darkModeFlag") && toggleDarkMode();

  initTaskList(fetchData("tasks"));
};

initDataOnstartUp();
