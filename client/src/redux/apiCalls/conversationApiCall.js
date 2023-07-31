import request from "../../utils/request";
import { conversationActions } from "../slices/conversationSlice";

export function createConversation(conversationInfo) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/conversations/",
        conversationInfo,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchOtherUserData(userId, type) {
  return async (dispatch, getState) => {
    try {
      if (type === "user") {
        const { data } = await request.get(`/api/user/profile/${userId}`, {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        });
        dispatch(conversationActions.setOtherUser(data));
      } else {
        const { data } = await request.get(`/api/workshop-owner/${userId}`);
        dispatch(conversationActions.setOtherUser(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchUserConversations(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/conversations/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(conversationActions.setConversations(data));
    } catch (error) {
      console.log(error);
    }
  };
}
