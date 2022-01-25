const { UniqueConstraintError } = require("sequelize/lib/errors");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { UserModel } = require("../models");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    let { username, passwordhash } = req.body.user;
    try {
        const User = await UserModel.create({
            username,
            passwordhash: bcrypt.hashSync(passwordhash, 13),
        });

        let token = jwt.sign({ id: User.id }, "i_am_secret", { expiresIn: 60 * 60 * 24 });

        res.status(201).json({
            user: User,
            message: "User successfully registered",
            sessionToken: token
        });
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Username already in use",
            });
        } else {
            res.status(500).json({
                message: err
            });
        }
    }
});
router.post("/login", async (req, res) => {
    let { username, passwordhash } = req.body.user;

    try {
        let User = await UserModel.findOne({
            where: {
                username: username,
               
            },
        });

        if (User) {

            let passwordComparison = await bcrypt.compare(passwordhash, User.passwordhash);

            if (passwordComparison) {

                let token = jwt.sign({ id: User.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

                res.status(200).json({
                    user: User,
                    message: "User successfully logged in!",
                    sessionToken: token
                });
            }
        } else {
            res.status(401).json({
                message: 'Incorrect username or password'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: err
        })
    }
});

module.exports = router;