"use client";
import useFcmToken from "@/utils/hooks/useFcmToken";

export default function Fcm() {
  const { fcmToken, notificationPermissionStatus, requestPushNoti } =
    useFcmToken();

  const registerTokenHandler = async () => {
    const response = await fetch(`/api/fcm-register?token=${fcmToken}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <p>토큰 있냐? : {fcmToken ? "true" : "false"}</p>
      <button onClick={registerTokenHandler}>토큰저장</button>
      <br />
      <button onClick={() => requestPushNoti()}>알림호출</button>
      <p>알림 허가 여부 : {notificationPermissionStatus}</p>
      <h1>{fcmToken}</h1>
    </div>
  );
}
