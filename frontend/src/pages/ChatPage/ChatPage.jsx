import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessages, sendMessage, receiveMessage , deleteMessage } from '../../features/chat/chatSlice';
import socket from '../../socket/socket';
import UserSlidebar from '../../components/UserSlidebar'; 
import { toast } from 'react-toastify';



function ChatPage() {
  const { id: receiverId } = useParams();
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { user , token } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.chat);
  const { error } = useSelector(state => state.chat);
  const { users } = useSelector(state => state.chat);
  const selectedUser = users.find((u) => u._id === receiverId);

  useEffect(() => {
    if (!user || !receiverId || !token) return ;
    if(error) {
      toast.error(error.msg || "Something went wrong while deleting the message");
    }
    if(!socket.connected){  
     socket.auth.token = token;
    //  console.log(' Connecting socket with token:', token);
     socket.connect();
  }
       socket.emit('joinRoom', { senderId: user._id, receiverId });
       
       socket.on('receiveMessage', (msg) => {
           dispatch(receiveMessage(msg));
           if (msg.senderId !== user._id) {
           toast.info(`New message from ${selectedUser?.username || 'User'} 💌`, {
          theme: 'dark',
        });
      }
        });
        dispatch(fetchMessages(receiverId));
    return () => {
      socket.off('receiveMessage');
      // socket.disconnect();
       socket.emit('leaveRoom', { senderId: user._id, receiverId });
    };
  }, [receiverId , user , token , error]);

  const handleSend = () => {
    if (!text.trim()) {
      toast.warning('Cannot send empty message', {
      theme: 'dark',
      });
      return
    }
    const msg = { receiverId, text };
    dispatch(sendMessage(msg));
    socket.emit('sendMessage', { ...msg, senderId: user._id });
    setText('');
     toast.success('Message sent 🚀', {
      theme: 'dark',
      autoClose: 1500,
     });
  };
  const handleDelete = (id) =>{
    if(confirm('Are you sure you want to delete this message')) {
        dispatch(deleteMessage(id));
         toast.info('Message deleted', {
        theme: 'dark',
      });
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
  {/* Sidebar */}
  <div className="w-full md:w-1/3 lg:w-1/4 border-b md:border-b-0 md:border-r border-gray-700">
    <UserSlidebar />
  </div>

  {/* Chat Area */}
  <div className="flex-1 flex flex-col">
    {/* Header */}
    <div className="px-4 py-3 bg-gray-800 border-b border-gray-700">
      <h2 className="text-lg md:text-xl font-bold">
        Chatting with {selectedUser?.username || 'Loading...'}
      </h2>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-sm sm:text-base">
      {messages.map((msg, idx) => {
        const isOwn = msg.sender === user._id;
        return (
          <div
            key={idx}
            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-[70%] break-words ${
                msg.deleted
                  ? 'bg-gray-700 text-gray-400 italic text-xs'
                  : isOwn
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-900 text-gray-100'
              }`}
            >
              {msg.deleted ? (
                <>Message deleted by {msg.deletedBy?.username || 'someone'}</>
              ) : (
                <>
                  <strong className="text-xs block mb-1">
                    {isOwn ? 'Me' : selectedUser?.username}
                  </strong>
                  {msg.text}
                  {isOwn && (
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="text-xs block mt-1 text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>

    {/* Input Bar */}
    <div className="border-t border-gray-700 px-4 py-3 bg-gray-800 flex items-center gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 bg-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none"
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-full"
      >
        Send
      </button>
    </div>
  </div>
</div>

  );
};

export default ChatPage;