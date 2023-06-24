const db = require("../models")
const User = db.User;

exports.check = async (req, res, next) => {


    let email = req.body.email ? req.body.email : null;

    const oldUser = await User.findOne({ where: {email} });

    if (oldUser) return res.status(409).json({"message": "Такой пользователь уже существует"});

    return next();
}