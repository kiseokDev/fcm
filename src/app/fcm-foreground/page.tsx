"use client";
import React, { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/utils/fcm/config";
import useFcmToken from "@/utils/hooks/useFcmToken";

export default function page() {
  const { fcmToken, notificationPermissionStatus, requestPushNoti } =
    useFcmToken();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging();
      const unsubscribe = onMessage(messaging, async (payload) => {
        console.log("Foreground push notification received:", payload);
        const { title, body } = payload.notification || {};
        //push notification을 받았을 때의 처리
        const registration = await navigator.serviceWorker.ready;
        if (title && body) {
          registration.showNotification(title, {
            body: body,
            tag: `CHiN-noti-${Date.now()}`,
          });
        } else {
          console.error("알림 표시 중 오류 발생:", payload);
        }

        // Handle the received push notification while the app is in the foreground
        // You can display a notification or update the UI based on the payload
      });
      return () => {
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, []);

  return (
    <div>
      <h1>알림허가여부: {notificationPermissionStatus}</h1>
      <h1>fcmToken: {fcmToken ? "있다" : "없다"}</h1>
      <button onClick={() => requestPushNoti()}>noti 알리기</button>
      <br />
    </div>
  );
}
