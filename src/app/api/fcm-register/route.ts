import admin from "firebase-admin";
export const registrationTokens: string[] = [];

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const topic = "kiseokTopic"; // 올바른 형식의 토픽 이름 설정
  let message = "OK";

  if (token) {
    if (!isTokenExist(token)) {
      registrationTokens.push(token);
    }
    const messaging = admin.messaging();
    try {
      const response = await messaging.subscribeToTopic(
        registrationTokens,
        topic
      );
      if (response) {
        console.log("Successfully subscribed to topic:", response);
      }
    } catch (error) {
      console.log("Error subscribing to topic:", error);
      message = "Error subscribing to topic";
    }
  }

  return Response.json({
    message: message,
  });
}

function isTokenExist(token: string) {
  return registrationTokens.includes(token);
}
