import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: 'your-email@gmail.com', pass: 'your-password' }
    });

    await transporter.sendMail({ from: 'your-email@gmail.com', to, subject, text });
};

export default sendEmail;