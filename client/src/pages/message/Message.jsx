import { useEffect, useRef, useState } from "react";
import "./message.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createMessage,
  fetchMessages,
} from "../../redux/apiCalls/messageApiCall";
import { useParams } from "react-router-dom";
import MessageBox from "../../components/message-box/MessageBox";
import { toast } from "react-toastify";
import { fetchOtherUserData } from "../../redux/apiCalls/conversationApiCall";
import formatTime from "../../utils/formatTime";
import { io } from "socket.io-client";

function Message() {
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState("");
  const [messageType, setMessageType] = useState("text");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { conversationId } = useParams();
  const { messages } = useSelector((state) => state.message);
  const { otherUser } = useSelector((state) => state.conversation);
  const messagesContainerRef = useRef(null);
  const socket = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const handleSendMessage = (e, sentBy) => {
    e.preventDefault();
    try {
      if (messageText === "") {
        return toast.warning("لا يمكن ارسال رسالة فارغة");
      }

      socket?.current.emit("sendMessage", {
        senderId: user.id,
        receiverId: user.workshopName
          ? conversationId.substring(0, 24)
          : conversationId.substring(24, 48),
        content: messageText,
      });
      const messageInfo = {
        conversationId,
        sentBy,
        messageType,
        messageText,
      };
      dispatch(createMessage(messageInfo));
      setMessageText("");
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    socket.current = io("https://arabity.onrender.com"); // http://localhost:8000

    socket.current.on("getMessage", (data) => {
      setArrivalMessage(data?.content);
    });
  }, []);

  useEffect(() => {
    socket?.current?.emit("addUser", user.id);
  }, [user.id, conversationId]);

  useEffect(() => {
    dispatch(fetchMessages(conversationId));
  }, [conversationId, dispatch, arrivalMessage]);

  useEffect(() => {
    if (
      user.id === conversationId.substring(0, 24) ||
      user.id === conversationId.substring(24, 48)
    ) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchOtherUser = (conversationId) => {
    if (user.workshopName) {
      const otherUserId = conversationId.substring(0, 24);
      dispatch(fetchOtherUserData(otherUserId, "user"));
    } else {
      const otherUserId = conversationId.substring(24, 48);
      dispatch(fetchOtherUserData(otherUserId, "workshopOwner"));
    }
  };
  useEffect(() => {
    fetchOtherUser(conversationId);
  }, [conversationId, user.id]);

  return (
    <div className="message">
      {user.id === conversationId.substring(0, 24) ||
      user.id === conversationId.substring(24, 48) ? (
        <div className="message-container">
          <div className="message-bar-info">
            <p>انت تراسل: {otherUser?.username} </p>
            {otherUser?.workshopName && <p>ورشة: {otherUser?.workshopName}</p>}
          </div>
          <div ref={messagesContainerRef} className="sent-messages">
            {messages.length > 0 &&
              messages.map((msg) => {
                return (
                  <MessageBox
                    key={msg._id}
                    text={msg.message}
                    time={formatTime(msg.createdAt)}
                    view={
                      msg.sentBy === user.id ? "sent-by-me" : "sent-by-others"
                    }
                  />
                );
              })}
          </div>
          <form
            onSubmit={(e) => handleSendMessage(e, user.id)}
            className="send-message-wrapper"
          >
            <input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="message-text-input"
              type="text"
              placeholder="اكتب رسالتك"
            />
            <button type="submit" className="message-send-btn">
              ارسال
            </button>
          </form>
        </div>
      ) : (
        <div>لا يمكن عرض المحادثة</div>
      )}
    </div>
  );
}

export default Message;
