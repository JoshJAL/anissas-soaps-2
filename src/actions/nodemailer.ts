import nodemailer from 'nodemailer';

export default function sendConfirmationEmail(customerEmail: string) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: 'anissassoaps@gmail.com',
        pass: 'dmaz bwjf wyqi tlij'
      }
    });

    const mail_configs = {
      to: customerEmail,
      subject: "Anissa's Soaps Order Confirmation",
      html: `<h1>Thank you for your order!</h1>`
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.error(error);
        return reject(error);
      }
      return resolve(info);
    });
  });
}
