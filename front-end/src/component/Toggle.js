// import React from "react";
// function Toggle({theme,toggleTheme}){
//     return(
//         <button onClick={toggleTheme}>{theme ==='light' ? 'Dark Mode':'Light Mode'}</button>
//     );
// }

// export default Toggle;
// components/Toggle.js
// Toggle.js*****
import React from 'react';

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <div>
      <button onClick={toggleTheme}>
        Theme ({theme === 'light' ? 'Dark' : 'Light'})
      </button>
    </div>
  );
};

export default Toggle;


