import entryStyle from "./frontbook.entry.scss";

// Inject stylesheet
window.addEventListener("load", () => {
  const style = document.createElement("style");
  style.textContent = entryStyle;
  document.head.append(style);
});
