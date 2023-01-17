import { ActionTypes } from ".";

const sendNotificationRequest = (notification: {
  message: string;
  type: string;
}) => ({
  type: ActionTypes.SEND_NOTIFICATION_REQUEST,
  notification,
});
const sendNotificationSuccess = () => ({
  type: ActionTypes.SEND_NOTIFICATION_SUCCESS,
});
const sendNotificationFailure = () => ({
  type: ActionTypes.SEND_NOTIFICATION_FAILURE,
});

export {
  sendNotificationRequest,
  sendNotificationSuccess,
  sendNotificationFailure,
};
