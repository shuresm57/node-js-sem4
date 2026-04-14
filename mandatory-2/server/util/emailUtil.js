import nodemailer from 'nodemailer';
const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

async function sendWelcomeEmail(email, name) {
    const info = await transporter.sendMail({
    from: '"Rachet and Clank FanClub" <info@rcfc.com>',
    to: `${email}`,
    subject: 'Welcome to the Fanclub!',
    text: 
        `
        Welcome ${name}!
        We are so happy you wanted to join our club!
        `,
    html: 
        `
        <h1>Welcome ${name}!</h1>

        <p>We are so happy you wanted to join our club!</p>
        
        `
    });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

export async function sendPasswordRecoveryEmail(email, name, link) {
    const info = await transporter.sendMail({
    from: '"Rachet and Clank FanClub" <info@rcfc.com>',
    to: `${email}`,
    subject: 'Password Recovery',
    text: 
     `
        Hi ${name}!

        You requested to reset your password, click the link below to proceed.
        The link is valid for 15 minutes
        ${link}
        `
    ,
    html: 
        `
        <h1>Hi ${name}!</h1>

        <p>You requested to reset your password, click the link below to proceed.</p>
        <p>The link is valid for 15 minutes</p>
        <a href=${link}>Click me<a>
        `
    });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
