import { Injectable } from "@nestjs/common";
// import configuration from 'src/config/configuration';
// import { EmailOptions } from '@nextnm/nestjs-mailgun';
// import { User } from '../user/user.entity';
// import { sendOTPEmailTemplate } from './emails/templates/send-otp';
// import { User } from '../../../models/user/user.entity';
// import { newUserEmailTemplate } from './emails/templates/new-user';
// import { passwordResetSuccessEmailTemplate } from './emails/templates/password-reset-success';
// import { subscriptionSuccessEmailTemplate } from './emails/templates/subscription-success';

// const formData = require('form-data');
// const Mailgun = require('mailgun.js');

// const mailgun = new Mailgun(formData);

// export interface IMailSend {
//   to: string;
//   subject: string;
//   text: string;
//   html?: string;
// }

// @Injectable()
// export class MailService {
//   client: any;

//   constructor() {
//     // private mailgun: MailgunService,
//     this.client = mailgun.client({
//       username: 'api', //configuration().JIGBID_DOMAIN,
//       key: configuration().MAIL_GUN_PRIVATE_KEY,
//       public_key: configuration().MAIL_GUN_PUBLIC_KEY,
//     });
//   }

//   async send(mail: IMailSend) {
//     const email: EmailOptions = {
//       ...mail,
//       from: 'Team at Jigbid <noreply@jigbid.com>',
//       to:
//         configuration().NODE_ENV === 'development'
//           ? 'densyutopia@gmail.com'
//           : mail.to,
//     };

//     try {
//       const status = await this.client.messages.create(
//         configuration().JIGBID_DOMAIN,
//         email
//       );

//       console.log(status);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async emailVerification(emailAddress: string) {
//     return await this.client.validate.get(emailAddress);
//   }

//   otpVerification(otp: string, user: User) {
//     const mail = {
//       to: user.email,
//       subject: 'Jigbid: Password Reset Request',
//       text: '',
//       html: sendOTPEmailTemplate(otp, user).html,
//     };

//     this.send(mail);
//   }

//   passwordResetSuccess(user: User) {
//     const mail = {
//       to: user.email,
//       subject: 'Jigbid: Password Reset Success',
//       text: '',
//       html: passwordResetSuccessEmailTemplate(user).html,
//     };

//     this.send(mail);
//   }

//   newUser(user: User) {
//     const mail = {
//       to: user.owner.email,
//       subject: 'Welcome! Your first step is...',
//       text: '',
//       html: newUserEmailTemplate(user).html,
//     };

//     this.send(mail);
//   }

//   async subscriptionSuccess(user: User, subscription: any) {
//     const mail = {
//       to: user.email,
//       subject: 'Here is your invoice',
//       text: '',
//       // attachment: await request(subscription.invoice_pdf),
//       html: subscriptionSuccessEmailTemplate(user, subscription).html,
//     };

//     this.send(mail);
//   }
// }
