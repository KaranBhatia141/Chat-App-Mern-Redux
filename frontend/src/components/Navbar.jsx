import {Link} from "react-router-dom";
import {useSelector , useDispatch} from 'react-redux';
import {logout} from '../features/auth/authSlice';
import { useState , useEffect } from "react";


function Navbar() {
    const {user} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    return (
    <nav className="flex justify-between item-center p-4 bg-gray-100 dark:bg-gray-800 text-black dark:text-white shadow">
        <h1 className="text-xl font-bold text-purple-500"><Link to={'/'}>ChatSphere</Link></h1>
        <a href="/" className="hover:text-purple-500">Home</a>
        <a href="/about" className="hover:text-purple-500">About Us</a>
        <a href="contact" className="hover:text-purple-500">Contact</a>

    <div>
       {user ? (
          <>
            <span className="text-purple-500 px-7">{user.username}</span>
            <Link to={`/chat/${user._id}`} >
              <span className="text-purple-500 px-7">Chat Page</span>
            </Link>
            <button className="text-red-400" onClick={() => dispatch(logout())}>Logout</button>
          </>
        ) : (
          <>
            <span className="text-purple-500"><Link to="/login" className="mr-4">Login</Link></span>
            {/* <Link to="/register">Register</Link> */}
          </>
        )}
        
      
    </div>
    </nav>
    
  );
};

export default Navbar;

