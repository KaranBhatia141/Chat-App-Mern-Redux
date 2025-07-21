import React from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../axios/api';

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async (receiverId) => {
  const token = localStorage.getItem('token');
  try{
  const res = await API.get(`/chat/${receiverId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}catch(err){
   return thunkAPI.rejectWithValue(err.response?.data?.msg || 'failed to fetch message');
}
});

export const sendMessage = createAsyncThunk('chat/sendMessage', async ({ receiverId, text }) => {
  const token = localStorage.getItem('token');
  try{
  const res = await API.post('/chat/send', { receiverId, text }, {
   headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}catch(err){
    return thunkAPI.rejectWithValue(err.response?.data?.msg || 'Failed to send message');
}
});

export const fetchAllUsers = createAsyncThunk('chat/fetchAllUsers', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
    if (!token) return thunkAPI.rejectWithValue('No token');

  try {
    const res = await API.get('/auth/users',{
      headers: { Authorization: `Bearer ${token}` },
    });                                           // or wherever your route is
    
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.msg || 'Failed to fetch users');
  }
});
export const deleteMessage = createAsyncThunk('chat/deleteMessage' , 
  async (messageId , thunkAPI) =>{
    try{
      const res = await API.delete(`/chat/${messageId}`);
      const { messageId: id , deletedBy} = res.data;
      return { messageId: id , deletedBy};
    }catch(err){
      return thunkAPI.rejectWithValue(err.response.data || 'Delete failed');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: { messages: [], 
    users: [],
    status: 'idle' },
  reducers: {
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    })
    .addCase(deleteMessage.fulfilled , (state , action)=>{
     const { messageId, deletedBy } = action.payload;
     const msg = state.messages.find(m => m._id === messageId);
     if (msg) {
     msg.deleted = true;
     msg.deletedBy = { username: deletedBy }; // you can pass full user object too
  }
  })
    .addCase(deleteMessage.rejected, (state , action)=>{
      state.error = action.payload;
    });
  }
});

export const { receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;