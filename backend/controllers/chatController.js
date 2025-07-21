const Message = require('../models/Message');


//chat controller
const sendMessage = async (req, res) => {   // sendMessage controller 
  try{         
  const senderId = req.user.id;   // require senderid with id from client 
  const { receiverId, text } = req.body;  // receverid with text msg 

  const newMessage = await Message.create({     // const create msg in db 
    sender: senderId,     // save user id ,
    receiver: receiverId, // save receiverid,
    text, // message 
  });

  
  res.status(201).json(newMessage);   // created resource send response 
}catch(err){      
    console.error(err);  
    res.status(500).json({ msg: 'Failed to send message' });  // send response internal server
}
};

// get msg controller
const getMessages = async (req, res) => {  
  try{
  const senderId = req.user.id;   // aquire sender id 
  const  receiverId  = req.params.receiverId;   // aquire recevierid 

  const messages = await Message.find({  //  find msg between two user 
    $or: [
      { sender: req.user.id, receiver: receiverId },  //or means either condition match , msg sent by current user to resiver
      { sender: receiverId, receiver: req.user.id },   // Messages sent by the receiver to the current user.
    ]
  }).sort({ timestamp: 1 , createdAt: 1 }).populate('deletedBy' , 'username'); // sort use for olderst msg , populate user for reslted dat fetch

  res.status(200).json(messages);   // server is ok send response
} catch(err){
   res.status(500).json({ msg: 'Failed to fetch messages' }); // internal server error
}
};

// delete msg controller 
const deleteMessage = async (req , res ) =>{
  const messageId = req.params.id;  // msgid from client 

  try{
    const message = await Message.findById(messageId);   // find msg by id 
    if(!message){
      return res.status(404).json({msg :'Message not found'}); // response not found 
    }
    message.deleted = true;
    message.deletedBy = req.user.id;
  await message.save();  // save msg delete by
  res.status(200).json({msg:'Message deleted' ,
     messageId: message._id,
     deletedBy: req.user.id,                      //send response with msgId ,delete By UserId 
  });
}catch(err){
  res.status(500).json({msg:'Server error' , error: err.message});  // send response internal server error 
}
};

module.exports = {getMessages,sendMessage,deleteMessage};