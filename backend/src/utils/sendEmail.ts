import nodemailer from 'nodemailer';

const sendEmail = async (to: string, subject: string, html: string): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"JediConnect" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to}`);
  } catch (err: any) {
    console.error('❌ Failed to send email:', err.message);
    throw new Error('Failed to send email');
  }
};

export default sendEmail;
