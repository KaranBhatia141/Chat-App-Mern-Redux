import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../features/chat/chatSlice';
import { Link } from 'react-router-dom';

function UserSlidebar() {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state.chat);
    const { user:me } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []); 
  return (

     <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white dark:bg-gray-900 border-r dark:border-gray-700">
      {/* Logo / Title */}
      <h2 className="text-2xl font-bold mb-6 text-purple-600">ChatSphere</h2>

      {/* Search (optional) */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full py-2 pl-10 pr-4 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none"
        />
        <svg
          className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Dynamic User List */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {users
            .filter((u) => u._id !== me._id)
            .map((u) => (
              <li key={u._id}>
                <Link
                  to={`/chat/${u._id}`}
                  className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-purple-100 dark:hover:bg-gray-800 transition"
                >
                  {/* Optional: user avatar */}
                  <div className="h-8 w-8 bg-purple-200 rounded-full flex-shrink-0 flex items-center justify-center text-purple-600 font-bold">
                    {u.username.charAt(0).toUpperCase()}
                  </div>

                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {u.username}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </nav>

      {/* Current User Info */}
      <div className="mt-6 pt-6 border-t dark:border-gray-700">
        <Link to="/profile" className="flex items-center space-x-3 px-4 py-2 rounded-md hover:bg-purple-100 dark:hover:bg-gray-800 transition">
          <div className="h-8 w-8 bg-purple-400 rounded-full" />
          <span className="text-gray-800 dark:text-gray-200 font-semibold">
            {me.username}
          </span>
        </Link>
      </div>
    </aside>
  );
}



export default UserSlidebar