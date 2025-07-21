import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../axios/api'

export const register = createAsyncThunk('auth/register', async (formData) => {  
  try{
  const res = await API.post('/auth/register', formData)
  // localStorage.setItem('token', res.data.token)
  return res.data.user || 'Registration successful'
  }catch(err){
    return thunkAPI.rejectWithValue(err.response?.data?.msg || 'Registration failed');
  }
});

export const login = createAsyncThunk('auth/login', async (formData) => {
  const res = await API.post('/auth/login', formData)
  localStorage.setItem('token', res.data.token)
  return res.data.user
});

export const loadUser = createAsyncThunk('auth/loadUser', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  if (!token) return thunkAPI.rejectWithValue('No token');
  try {
    const res = await API.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.msg || 'Token expired');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.user = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
         state.status = 'succeeded';
         state.error = null;
        // state.user = action.payload
        // state.token = localStorage.getItem('token')
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.token = localStorage.getItem('token')
      })
      .addCase(loadUser.pending, (state)=>{
        state.status = 'loading';
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
     })
     .addCase(loadUser.rejected, (state) => {
      state.status = 'failed'
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
       });
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
 