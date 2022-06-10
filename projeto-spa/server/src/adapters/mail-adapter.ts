export interface SendMailData {
    subject: string;
    body: string;
    userName: string;
    userMail: string;
}

export interface MailAdapter {
    sendMail: (data: SendMailData) => Promise<void>;
}