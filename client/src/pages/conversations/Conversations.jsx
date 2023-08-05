import { useEffect } from "react";
import "./conversations.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserConversations } from "../../redux/apiCalls/conversationApiCall";
import { Link } from "react-router-dom";
import formatTime from "../../utils/formatTime";

function Conversations() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { conversations } = useSelector((state) => state.conversation);
  useEffect(() => {
    dispatch(fetchUserConversations(user.id));
  }, [conversations]);
  return (
    <div className="conversations">
      <h2 className="conversations-page-title">محادثاتك</h2>
      <div className="container">
        {conversations.length > 0 &&
          conversations.map((conversation) => (
            <Link
              to={`/message/${conversation.id}`}
              className="conversation-item"
              key={conversation._id}
            >
              <span className="conversation-item-sender">
                {user.workshopName
                  ? conversation.userId.username
                  : conversation.WorkshopOwnerId.username}
              </span>
              <p className="conversation-item-text">
                {conversation.lastMessage}
              </p>
              <span className="conversation-item-time">
                {formatTime(conversation.updatedAt)}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Conversations;
