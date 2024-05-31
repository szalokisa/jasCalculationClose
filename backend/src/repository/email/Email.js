import { createTransport } from 'nodemailer';

export default class Email {
  static async send(mailOptions) {
    const transporter = createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const promiseOfSendMail = new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info.response);
          }
        });
      });

      try {
        await promiseOfSendMail;
        return {
          message: 'MESSAGE_EMAIL_SENT',
        };
      } catch (error) {
        return {
          message: 'MESSAGE_EMAIL_ERROR',
          error: error,
        };
      }    
  }
}
