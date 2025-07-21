import React, { Fragment ,useEffect } from 'react';
import { Route, Routes  } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ChatPage from './pages/ChatPage/ChatPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProctedRoute';
import Home from './pages/Home/Home';
import { loadUser } from './features/auth/authSlice';
import { useDispatch ,useSelector } from 'react-redux';
import About from './components/About';
import ContactUs from './components/ContactUs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
   
  if (status === 'loading') {
    return <div>Loading...</div>;
  }



  return (
    
        <div>
          <ToastContainer 
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rt1={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
               />
          <Navbar/>
           <Routes>
            <Route element={<Home />}  path="/" />
            <Route element={<Register />}  path="/register" />
            <Route element={<Login />}  path="/login" />
            <Route element={<About />}  path="/about" />
            <Route element={<ContactUs />}  path="/contact" />
             <Route
              path="/chat/:id"
              element={
              <ProtectedRoute>
              <ChatPage />
              </ProtectedRoute>
                }
  />
           </Routes>
        </div>
    
  )
}

export default App;