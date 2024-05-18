/* This is a simple dark mode toggle button that changes the background color of the page to black and the text color to white when clicked.*/

import { useState } from "react";

let darkMode = false;

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [Label, setLabel] = useState("☀️");

  const handleToggle = () => {
    setIsDark(!isDark);
    setLabel(isDark ? "🌙" : "☀️");
    darkMode = isDark;

    document.body.style.backgroundColor = isDark ? "black" : "white";
    document.body.style.color = isDark ? "white" : "black";
    document.body.style.transition = "all 0.75s";
  };

  return (
    <button className="darkModeToggle"
      onClick={handleToggle}
      data-testid ="dark-mode"
      style={{
        height: "30px",
        width: "100px",
        borderRadius: "15px",
        backgroundColor: isDark ? "white" : "black",
        borderColor: isDark ? "black" : "white",
        color: isDark ? "white" : "black",
      }}
    >{Label}</button>
  );

};

export { darkMode };