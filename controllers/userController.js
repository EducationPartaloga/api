
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models")
const User = db.User;


// exports.index = async (req, res) => {
//     res.status(200).json(
//         {
//             "message": process.env.API_PORT,
//             "status": "ok!"
//         }
//     );
// };

exports.register = async (req, res) => {

    const { firstName, lastName, email, password } = req.body;

    const oldUser = await User.findOne({ where: {email} });

    if (oldUser) return res.status(409).json({"message": "Такой пользователь уже существует"});


      const token = jwt.sign(
        {firstName, lastName, email, password},
        process.env.TOKEN_KEY,
        { expiresIn: '600s' }
      )

        const mailTemplate = require('../templates/verificationMailTemplate');
        const send = require('../services/mailer');

        const data = {
            userName: firstName + ' ' + lastName,
            token: token
        };

        const options = {
            from: "TESTING <7718118@gmail.com>"
            to: email,
            subject: "Регистрация в приложении Instagram",
            text: `Перейдите по ссылке 'https://instagram.lern.dev/api/v1/confirm?tkey=${token}'`
            html: mailTemplate(data)
        };

        send(options, (info)=> {
                console.log("Email semd successfully");
                console.log("MESSAGGE ID: ", info.messageId);
        })

    return res.status(200).json({"message": "Письмо отправлено"});
};

exports.confirm = async (req, res) => {



};

    const { firstName, lastName, email, password} = req.user;

    let encryptedPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: encryptedPassword
    });

    const token = jwt.sign(
        { id: user.id, email },
        process.env.TOKEN_KEY,
        {
            expiresIn: 365 * 24 * 60 * 60 * 1000,
        }
    );
    // save user token
    user.token = token;
    await user.save({ fields: ['token'] });

    return res.status(201).json;



exports.update = async (req, res) => {
    return res.send("NOT IMPLEMENTED: Site Home Page");
};

exports.delete = async (req, res) => {
    return res.send("NOT IMPLEMENTED: Site Home Page");
};