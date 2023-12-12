// import React from 'react';
// import {Link, useNavigate} from 'react-router-dom';
// const Nav=() =>{
//     const auth = localStorage.getItem('user');
//     const navigate = useNavigate();
//     const logout =()=>{
//         localStorage.clear();
//         navigate('/signup')
//     }
//     return(
//         <div>
            
//             <img
//              src='https://img.freepik.com/premium-vector/c-vitamin-orange-logo-symbol-icon-vector-template_10135-887.jpg?w=740'alt='logo'className='logo'/>
//          {      auth ? <ul className='nav-ul'>
//                     <li><Link to="/">Products</Link></li>
//                     <li><Link to="/add">Add Product</Link></li>
//                     <li><Link to="/update">Update Product</Link></li>
//                     <li><Link to="/porfile">profile</Link></li>
//                     <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
//                 </ul>
//                     :
//                 <ul className='nav-ul nav-right'>
//                     <li><Link to="/signup">Sign Up</Link></li>
//                     <li><Link to="/login">Login</Link></li>
//                 </ul>
//           }
//         </div>
//     )
// }
// export default Nav;
// Nav.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from './Toggle'; // Import the Toggle component

const Nav = ({ theme, toggleTheme }) => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  };

  return (
    <div>
      <img
        src="https://img.freepik.com/premium-vector/c-vitamin-orange-logo-symbol-icon-vector-template_10135-887.jpg?w=740"
        alt="logo"
        className="logo"
      />
      {auth ? (
        <ul className={`nav-ul ${theme}`}>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          <li>
            <Link to="/update">Update Product</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logout} to="/signup">
              Logout ({JSON.parse(auth).name})
            </Link>
          </li>
          {/* Add the dark/light mode toggle button */}
          <li>
            <Toggle theme={theme} toggleTheme={toggleTheme} />
          </li>
        </ul>
      ) : (
        <ul className={`nav-ul nav-right ${theme}`}>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {/* Add the dark/light mode toggle button */}
          <li>
            <Toggle theme={theme} toggleTheme={toggleTheme} />
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;

