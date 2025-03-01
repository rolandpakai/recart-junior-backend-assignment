import { Request } from 'express';

type SendNotificationProp = {
  req: Request;
  to: string; 
}

export const sendNotification = async ({req, to}: SendNotificationProp): Promise<unknown> => {
  const notificationsUrl = `${req.protocol}://${req.headers.host}/notifications`;

  const postData = {
    to,
  };
  
  const response = await fetch(notificationsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });
  const data = await response.json();

  return data;
}