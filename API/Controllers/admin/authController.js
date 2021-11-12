const userModel = require('../../Models/userModel');
const jsonwebtoken = require('jsonwebtoken');

const generateJwtToken = (id, admin) => {
    return jsonwebtoken.sign({
        id,
        admin
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    });
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
            if (data.admin === false) {
                return res.status(403).json({
                    success: false,
                    message: "Access Forbidden."
                });
            }

            const isAuthenticated = data.authenticate(password);
            if (isAuthenticated) {

                const token = generateJwtToken(data._id, data.admin);
                return res.json({
                    success: true,
                    message: "Admin Logged In successfully",
                    data: token
                })

            } else {
                return res.json({
                    success: false,
                    message: "Admin Login failed. Bad Authentication"
                })
            }

        } else {
            return res.json({
                success: false,
                message: "Admin Email Does not exist."
            });
        }
    })

}


module.exports = login;