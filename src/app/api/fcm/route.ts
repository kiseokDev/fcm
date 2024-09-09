import admin from "firebase-admin";
import firebaseConfig from "@/utils/fcm/fcm-firebase-adminsdk.json";
import { getMessaging } from "firebase/messaging";

interface NotificationData {
  data: {
    title: string;
    body: string;
    image: string;
    click_action: string;
  };
}

export async function GET(req: Request, res: Response) {
  try {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(
          firebaseConfig as admin.ServiceAccount
        ),
      });

      console.log("Authentication success");
    }

    let tokenList: Array<string> = [
      "dLL-tYQjEc8RCFoS_gSP_B:APA91bF-e-FgeQNxeEazS0KI2iUObzzHOhnfdn0HjPub7ZkRqvREhGo4vTGUrjvyjNfjwpvLQ18uOncj-8woWbaXP4oF2gVhIQQ2-AUuj1hI6mOMbAsC-qeTpzvaqY7Vo3Czn4a7ICxE",
    ];
    // const docRef = doc(db, "subscribe", "tokens");
    //TODO: firebase에서 토큰을 가져와서 tokenList에 넣어주기

    const message = {
      notification: {
        title: "Portugal vs. Denmark",
        body: "5 to 1",
      },
      tokens: tokenList,
    };

    const res = await admin.messaging().sendEachForMulticast(message);

    return Response.json(res);
  } catch (error) {
    return Response.error();
  }
}
