import { toast } from "react-toastify";
import request from "../../utils/request";
import { messageActions } from "../slices/messageSlice";

export function createMessage(messageInfo) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/messages", messageInfo, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });
      dispatch(messageActions.addMessageToMessages(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}

export function fetchMessages(conversationId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/messages/${conversationId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          Cookie: document.cookie.i18next,
        },
        withCredentials: true,
      });

      dispatch(messageActions.setMessages(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
}
