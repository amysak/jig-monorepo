import { User } from "entities";
import { ActionTypes } from "./types";

const setCurrentUser = (user: User) => ({
  type: ActionTypes.SET_CURRENT_USER,
  user,
});
//@ts-ignore
const logOutRequest = () => ({ type: ActionTypes.USER_LOGOUT_REQUEST });
//@ts-ignore
const loggedOutSuccess = () => ({ type: ActionTypes.USER_LOGGED_OUT });

export { setCurrentUser, logOutRequest, loggedOutSuccess };
