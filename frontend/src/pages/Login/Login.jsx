import React, { useState, useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { login } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isError, isSuccess, message  } = useSelector((state) => state.auth);
  useEffect(() => {
    if(isError){
      toast.error(message || 'Login Failed' ,{
        position: 'top-right',
        theme: 'dark',
      });
    }
    if (isSuccess || user){
         toast.success(`Welcome back ,${form.username}` ,{
          position: 'top-right',
          theme: 'dark',
         })
      navigate('/');
    } 
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(form)).then(() => {

    });
  }

  return (
    <div className='min-h-screen flex item-center justify-center bg-gray-900 text-white pt-5 pb-40'> 
    <div className='bg-gray-800 p-8 rounded-2x1 shadow-xl w-full max-w-md '> 
     <h2 className='text-3xl font-bold text-center mb-6 text-purple-500 '>Login Page</h2>
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
      <label htmlFor="name" className='block text-sm font-medium mb-1'>Username:</label>
      <input type='name' id='name' placeholder="john" onChange={e => setForm({ ...form, username: e.target.value })}
      className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg foucs-outline-none focus:ring-2 focus:ring-blue-500' />
      </div>

      <div>
       <label htmlFor="password" className='block text-sm font-medium mb-1'>Password:</label>
      <input placeholder="Password" id='password' type="password" onChange={e => setForm({ ...form, password: e.target.value })} 
      className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg foucs-outline-none focus:ring-2 focus:ring-blue-500'/>
      </div>
      <button type="submit" className='w-full py-2 bg-purple-900 hover:bg-purple-500 rounded-lg text-white transition duration-300'>Login</button>
    </form>
    </div>
    </div>
  )
}

export default Login
