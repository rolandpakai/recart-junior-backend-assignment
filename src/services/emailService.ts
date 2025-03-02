import FormData from 'form-data';
import Mailgun, { MessagesSendResult } from 'mailgun.js';

type SendEmailProp = {
  from: string;
  to: string;
  subject: string;
  text: string;
}

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api', 
  key: process.env.MAILGUN_API_KEY!,
});

export const sendEmail = async ({from, to, subject, text}: SendEmailProp): Promise<MessagesSendResult> => {
  if (!process.env.MAILGUN_DOMAIN) {
    throw new Error('Missing Mailgun domain');
  }
  
  return await mg.messages.create(process.env.MAILGUN_DOMAIN , {
    from,
    to,
    subject,
    text,
  });
}