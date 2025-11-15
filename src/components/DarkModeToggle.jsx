
// import React, { useEffect, useState } from "react";

// const DarkModeToggle = () => {
//     const [darkMode, setDarkMode] = useState(false);

//     useEffect(() => {
//         const savedMode = localStorage.getItem("theme");
//         if (savedMode === "dark") {
//             setDarkMode(true);
//             document.documentElement.classList.add("dark");
//         }
//     }, []);

//     const toggleDarkMode = () => {
//         if (darkMode) {
//             document.documentElement.classList.remove("dark");
//             localStorage.setItem("theme", "light");
//             setDarkMode(false);
//         } else {
//             document.documentElement.classList.add("dark");
//             localStorage.setItem("theme", "dark");
//             setDarkMode(true);
//         }
//     };

//     return (
//         <button
//             onClick={toggleDarkMode}
//             className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded transition"
//         >
//             {darkMode ? "🌙 Dark" : "☀️ Light"}
//         </button>
//     );
// };

// export default DarkModeToggle;