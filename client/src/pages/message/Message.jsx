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
import { production } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import i18ns from "@emoji-mart/data/i18n/ar.json";

function Message() {
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState("");
  const [messageType] = useState("text");
  const [showEmojis, setShowEmojis] = useState(false);
  const { conversationId } = useParams();
  const { messages } = useSelector((state) => state.message);
  const { otherUser } = useSelector((state) => state.conversation);
  const messagesContainerRef = useRef(null);
  const socket = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const { t, i18n } = useTranslation();
  document.title = t("user_messages_page_title");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    socket.current = io(
      production ? "https://arabity.onrender.com" : "http://localhost:8000"
    );
    dispatch(fetchMessages(conversationId));
  }, []);

  socket.current?.on("connect_error", (err) => {
    // Check if the error message has already been printed.
    if (err) {
      // Print the error message once.
      console.error(err);
      socket.current.disconnect();
    }
  });

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
    socket.current.on("getMessage", (data) => {
      dispatch(fetchMessages(conversationId));
    });
  }, [conversationId]);

  useEffect(() => {
    socket?.current?.emit("addUser", user.id);
  }, [user.id, conversationId]);

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
      dispatch(fetchOtherUserData(otherUserId, "mechanic"));
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
          <div
            className="message-bar-info"
            style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
          >
            <p>
              {t("you_are_messaging")}
              {otherUser?.username}{" "}
            </p>
            {otherUser?.workshopName && (
              <p>
                {t("workshop")}
                {otherUser?.workshopName}
              </p>
            )}
          </div>
          <div className="messages-container-body">
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
              style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
            >
              <div className="text-input-wrapper">
                <input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="message-text-input"
                  type="text"
                  placeholder={t("write_your_message")}
                />
                <div
                  className="emoji-select-icon"
                  onClick={() => setShowEmojis((prev) => !prev)}
                >
                  <TagFacesIcon />
                </div>

                {showEmojis && (
                  <div className="emoji-picker-wrapper">
                    <Picker
                      data={data}
                      onEmojiSelect={(e) =>
                        setMessageText(messageText + e.native)
                      }
                      i18n={i18n.language === "ar" && i18ns}
                      perLine={8}
                    />
                  </div>
                )}
              </div>
              <button type="submit" className="message-send-btn">
                {t("send")}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>{t("cant_show_conversation")}</div>
      )}
    </div>
  );
}

export default Message;
