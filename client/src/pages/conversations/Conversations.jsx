import { useEffect } from "react";
import "./conversations.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserConversations } from "../../redux/apiCalls/conversationApiCall";
import { Link } from "react-router-dom";
import formatTime from "../../utils/formatTime";
import { useTranslation } from "react-i18next";
import limitText from "../../utils/limitText";
import { Helmet } from "react-helmet-async";

function Conversations() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { conversations, loading } = useSelector((state) => state.conversation);
  const { t, i18n } = useTranslation();

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
            <Link
              to={`/message/${conversation.id}`}
              className="conversation-item"
              key={conversation._id}
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
          ))
        ) : (
          <div>{t("no_user_conversations")}</div>
        )}
      </div>
    </div>
  );
}

export default Conversations;
