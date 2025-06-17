import nodemailer from 'nodemailer';

const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `No Reply <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html: message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email failed to send:', error);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;
