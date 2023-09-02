import { useEffect } from "react";
import "./conversations.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserConversations } from "../../redux/apiCalls/conversationApiCall";
import { Link } from "react-router-dom";
import formatTime from "../../utils/formatTime";
import { useTranslation } from "react-i18next";
import limitText from "../../utils/limitText";

function Conversations() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { conversations, loading } = useSelector((state) => state.conversation);
  const { t, i18n } = useTranslation();
  document.title = t("user_conversations_page_title");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    dispatch(fetchUserConversations(user.id));
  }, []);

  return (
    <div
      className="conversations"
      style={{ direction: i18n.language === "en" ? "ltr" : "rtl" }}
    >
      <div className="container">
        <h2 className="conversations-page-title">{t("user_conversations")}</h2>
        {loading ? (
          t("loading")
        ) : conversations?.length > 0 ? (
          conversations?.map((conversation) => (
            <Link
              to={`/message/${conversation.id}`}
              className="conversation-item"
              key={conversation._id}
            >
              <span className="conversation-item-sender">
                {user.workshopName
                  ? conversation.userId.username
                  : conversation.mechanicId.username}
              </span>
              <p className="conversation-item-text">
                {limitText(conversation.lastMessage, 30)}
              </p>
              <span className="conversation-item-time">
                {formatTime(conversation.updatedAt)}
              </span>
            </Link>
          ))
        ) : (
          <div>{t("no_user_conversations")}</div>
        )}
      </div>
    </div>
  );
}

export default Conversations;
