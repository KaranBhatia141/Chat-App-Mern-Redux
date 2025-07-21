import React, { useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { register } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const handleSubmit = (e) => {
    e.preventDefault()
    const { username, email, password } = form;

    if (!username || !email || !password) {
      toast.warning('Please fill in all fields ✍️', {
        position: 'top-right',
        theme: 'dark',
      })
      return
    }

    dispatch(register(form))
    .unwrap()
    .then(() => {
     toast.success(`Registered successfully 🎉` ,{
      position: 'top-right',
      theme: 'dark',
     })
      navigate('/login')
  })
  .catch((err)=>{
     toast.error(err || 'Registration failed 💔', {
      position: 'top-right',
      theme: 'dark',
  })
  })
  }

  return (
    <div className='min-h-screen flex item-center justify-center bg-gray-900 text-white pt-5 pb-20'>
    <div  className='bg-gray-800 p-8 rounded-2x1 shadow-xl w-full max-w-md '>
      <h2 className='text-3xl font-bold text-center mb-6 text-purple-500 '>Registration Page</h2>
    <form onSubmit={handleSubmit} className='space-y-6'>
       
       <div> 
      <label htmlFor="name" className='block text-sm font-medium mb-1'>Username</label>
      <input type='name'id="name" placeholder="username" onChange={e => setForm({ ...form, username: e.target.value })} 
       className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg foucs-outline-none focus:ring-2 focus:ring-blue-500' />
       </div>

      <div>
      <label htmlFor="email" className='block text-sm font-medium mb-1'>Email</label>
      <input type='email' id='email' placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} 
       className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg foucs-outline-none focus:ring-2 focus:ring-blue-500' />
       </div>

      <div>
      <label htmlFor="password" className='block text-sm font-medium mb-1'>Password</label>
      <input placeholder="Password" id='password' type="password" onChange={e => setForm({ ...form, password: e.target.value })} 
      className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg foucs-outline-none focus:ring-2 focus:ring-blue-500'/>
      </div>

      <button type="submit" className='w-full py-2 bg-purple-900 hover:bg-purple-500 rounded-lg text-white transition duration-300'>Register</button>
    </form>
    </div>
    </div>
  )
}

export default Register
