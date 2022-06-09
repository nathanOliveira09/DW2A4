import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9f92a126c44201",
      pass: "8ae3c5588018d1"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body, userName, userMail}: SendMailData) {
    await transport.sendMail({
        from: `${userName} <${userMail}>`,
        to: 'FeedGet - Error Reports <feedbackerros@feedget.com>',
        subject,
        html: body,
    });
    }
}