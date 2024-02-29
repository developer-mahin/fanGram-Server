import nodemailer from 'nodemailer';
import config from '../config';
import AppError from './AppError';
import httpStatus from 'http-status';

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'robin.shrkr@gmail.com',
      pass: 'gcpw icyh zgiy yqrr',
    },
  });

  try {
    await transporter.sendMail({
      from: 'robin.shrkr@gmail.com', // sender address
      to, // list of receivers
      subject, //'Reset your password within ten mins!', // Subject line
      text: '', // plain text body
      html, // html body
    });
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Something went wrong mail not sended please try again',
    );
  }
};
