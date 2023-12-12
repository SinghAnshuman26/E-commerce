
// import './App.css';
// import Nav from './component/Nav'
// import Footer from './component/Footer';
// import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import SignUp from './component/SignUp';
// import PrivateComponent from './component/PrivateComponent';
// import Login from './component/Login';
// import AddProduct from './component/AddProduct';
// import ProductList from './component/ProductList';
// import UpdateProduct from './component/UpdateProduct';
// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//       <Nav/>
//      <Routes>

//         <Route element={<PrivateComponent />}>
//         <Route path="/" element={<ProductList />}/>
//         <Route path="/add" element={<AddProduct />}/>
//         <Route path="/logout" element={<h1>Logout Component</h1>}/>
//         <Route path="/update/:id" element={<UpdateProduct />}/>
//         <Route path="/porfile" element={<h1>Profile Component</h1>}/>
//         </Route>

//         <Route path="/signup" element={<SignUp/>}/>
//         <Route path="/login" element={<Login/>}/>
//      </Routes>
//      </BrowserRouter>
//      <Footer/>
//     </div>
//   );
// }

// export default App;
// App.js

import React, { useState } from 'react';
import './App.css';
import Nav from './component/Nav';
import Footer from './component/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './component/SignUp';
import PrivateComponent from './component/PrivateComponent';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import ProductList from './component/ProductList';
import UpdateProduct from './component/UpdateProduct';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`App ${theme}`}>
      <BrowserRouter>
        <Nav theme={theme} toggleTheme={toggleTheme} />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/porfile" element={<h1>Profile Component</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;



