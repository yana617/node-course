const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'jana.ru.sidorova@yandex.ru',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get alone with the app`,
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'jana.ru.sidorova@yandex.ru',
    subject: 'We are sad you\'re leaving us!',
    text: `Why you, ${name}, decided to cancel? Let us know your thoughts, then we can improve.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
};
