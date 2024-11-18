import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.gmail.com', 
      port: 587, 
      secure: false, 
      auth: {
        user: 'ogbkiy@gmail.com', 
        pass: 'nuof iope ubow lqlq', 
      },
    });
  }

  async sendMail(to: string, text: string): Promise<void> {
    const subject = 'verify qilish';
    const mailOptions = {
      from: 'ogbkiy@gmail.com', 
      to,
      subject,
      text: `http://127.0.0.1:3000/users/${text}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email yuborildi: ' + subject);
    } catch (error) {
      console.error('Email yuborishda xato:', error);
    }
  }
}
