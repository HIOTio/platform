
const welcomeMail = require("../email_templates/welcome.ejs");
const nodemailer = require("nodemailer");
var debug = require("debug")("email.js");

exports.send = function (subject, message, recipient) {
    nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass  // generated ethereal password
        }
    });

    let mailOptions = {
        from: "'Fred Foo 👻' <foo@blurdybloop.com>", // sender address
        to: "bar@blurdybloop.com, baz@blurdybloop.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>" // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            debug(error);
        }
        debug("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        debug("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
    return true;
};
