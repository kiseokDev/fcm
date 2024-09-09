import { useEffect, useState } from "react";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp, { vapidKey } from "../fcm/config";

const useFcmToken = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessaging();

          // Retrieve the notification permission status
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);

          // Check if permission is granted before retrieving the token
          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey: vapidKey,
            });
            if (currentToken) {
              setToken(currentToken);
              console.log("Token is available in hook");
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          }
        }
      } catch (error) {
        console.log("An error occurred while retrieving token:", error);
      }
    };

    retrieveToken();
  }, []);

  const requestPushNoti = async () => {
    const response = await fetch(`/api/fcm`);
    const data = await response.json();
    return data;
  };

  return { fcmToken: token, notificationPermissionStatus, requestPushNoti };
};

export default useFcmToken;
