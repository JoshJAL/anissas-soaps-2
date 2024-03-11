'use server';

import nodemailer from 'nodemailer';

export async function sendConfirmationEmail(customerEmail: string) {
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

export async function sendCustomFormNotification(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  message: string
) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: 'anissassoaps@gmail.com',
        pass: 'dmaz bwjf wyqi tlij'
      }
    });

    const mail_configs = {
      to: 'anissassoaps@gmail.com, anissa@anissasoaps.com',
      subject: `Custom Soap Request from ${firstName.trim()} ${lastName.trim()}`,
      html: `<p>${firstName.trim()} ${lastName.trim()}, has sent the following message regarding a custom soap order:</p>
<p>${message}</p>
<p>They can be reached at either <a href="mailto:${email}">${email}</a> or <a href="tel:${phone}">${phone}</a></p>`
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

export async function sendWholesaleFormNotification(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  message: string,
  businessName: string
) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: 'anissassoaps@gmail.com',
        pass: 'dmaz bwjf wyqi tlij'
      }
    });

    const mail_configs = {
      to: 'anissassoaps@gmail.com, anissa@anissasoaps.com',
      subject: `Custom Soap Request from ${firstName.trim()} ${lastName.trim()}`,
      html: `<p>${firstName.trim()} ${lastName.trim()}, has sent the following message regarding a wholesale request for ${businessName.trim()}:</p>
<p>${message}</p>
<p>They can be reached at either <a href="mailto:${email}">${email}</a> or <a href="tel:${phone}">${phone}</a></p>`
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
