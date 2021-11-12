const userModel = require('../Models/userModel');
const jsonwebtoken = require('jsonwebtoken');

const generateJwtToken = (id, admin) => {
    return jsonwebtoken.sign({
        id,
        admin
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    });
}

const register = (req, res) => {

    const {
        email,
        password,
        admin
    } = req.body;

    userModel.findOne({
        email: email
    }).exec((error, data) => {

        if (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Some Error occurred while searching for existing email. Contact your administrator"
            });
        }


        if (data) {
            return res.json({
                success: false,
                message: "User Email Already Exists."
            })
        }


        const _user = new userModel({
            email,
            password,
            admin
        });

        _user.save((error, user) => {
            if (error) {
                console.log(error);

                return res.status(500).json({
                    success: false,
                    message: "Some Error occurred while saving the user. Contact your administrator"
                });
            }
            if (user) {

                const token = generateJwtToken(user._id, user.admin);
                return res.json({
                    success: true,
                    message: "User has been successfully saved",
                    data: {
                        user: {
                            email: user.email
                        },
                        token: token
                    }
                })
            }
        })
    })
}

const login = (req, res) => {

    const {
        email,
        password
    } = req.body;

    userModel.findOne({
        email: email
    }).exec((error, data) => {

        if (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "DB Error occurred. Contact your administrator"
            });
        }

        if (data) {

            const isAuthenticated = data.authenticate(password);
            if (isAuthenticated) {

                const token = generateJwtToken(data._id, data.admin);
                return res.json({
                    success: true,
                    message: "User Logged In successfully",
                    data: token
                })

            } else {
                return res.json({
                    success: false,
                    message: "User Login failed. Bad Authentication"
                })
            }

        } else {
            return res.json({
                success: false,
                message: "User Email Does not exist."
            });
        }
    })
}

module.exports = {
    register,
    login
}