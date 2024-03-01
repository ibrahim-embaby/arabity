import { useEffect, useRef } from "react";
import "./conversations.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteConversation,
  fetchUserConversations,
} from "../../redux/apiCalls/conversationApiCall";
import { Link } from "react-router-dom";
import formatTime from "../../utils/formatTime";
import { useTranslation } from "react-i18next";
import limitText from "../../utils/limitText";
import { Helmet } from "react-helmet-async";
import DeleteIcon from "@mui/icons-material/Delete";
import { io } from "socket.io-client";
import { conversationActions } from "../../redux/slices/conversationSlice";

function Conversations() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { conversations, loading } = useSelector((state) => state.conversation);
  const { t, i18n } = useTranslation();

  const socket = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    socket.current = io.connect(process.env.REACT_APP_SERVER_URL);
    dispatch(fetchUserConversations());
  }, []);

  socket.current?.on("connect_error", (err) => {
    // Check if the error message has already been printed.
    if (err) {
      // Print the error message once.
      console.error(err);
      socket.current.disconnect();
    }
  });

  useEffect(() => {
    socket?.current?.emit("addUser", user.id);
  }, [user.id]);

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      // if the conversation already exists, update the last message
      // else, get the new conversation and add it in the conversations array
      dispatch(fetchUserConversations());
    });

    socket.current?.on("conversationDeleted", (data) => {
      dispatch(conversationActions.deleteConversation(data.conversationId));
    });
  }, []);

  const handleDeleteConversation = (conversationId) => {
    socket?.current.emit("deleteConversation", {
      receiverId: user.workshopName
        ? conversationId.substring(0, 24)
        : conversationId.substring(24, 48),
      conversationId,
    });
    dispatch(deleteConversation(conversationId));
  };

  return (
    <div
      className="conversations"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      <Helmet>
        <title>{t("user_conversations_page_title")}</title>
        <meta
          name="description"
          content="Arabity - Conversations Page, here you can find your all conversations"
        />
      </Helmet>
      <div className="container">
        <h2 className="conversations-page-title">{t("user_conversations")}</h2>
        {loading ? (
          t("loading")
        ) : conversations?.length > 0 ? (
          conversations?.map((conversation) => (
            <div className="conversation-item-wrapper" key={conversation._id}>
              <Link
                to={`/message/${conversation.id}`}
                className="conversation-item"
              >
                <span className="conversation-item-photo-wrapper">
                  {user.workshopName ? (
                    <img
                      className="conversation-item-photo"
                      src={conversation.userId.profilePhoto.url}
                    />
                  ) : (
                    <img
                      className="conversation-item-photo"
                      src={conversation.mechanicId.profilePhoto.url}
                    />
                  )}
                </span>
                <div className="conversation-item-info">
                  <span className="conversation-item-sender">
                    {user.workshopName
                      ? conversation.userId.username
                      : conversation.mechanicId.workshopName}
                  </span>
                  <p className="conversation-item-text">
                    {limitText(conversation.lastMessage, 30)}
                  </p>
                  <span className="conversation-item-time">
                    {formatTime(conversation.updatedAt)}
                  </span>
                </div>
              </Link>
              <div
                className="delete-rating-btn"
                onClick={() => handleDeleteConversation(conversation.id)}
              >
                <span> {t("delete_btn")}</span>
                <DeleteIcon />
              </div>
            </div>
          ))
        ) : (
          <div>{t("no_user_conversations")}</div>
        )}
      </div>
    </div>
  );
}

export default Conversations;
