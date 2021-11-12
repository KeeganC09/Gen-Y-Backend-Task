const postModel = require('../Models/postModel');

const addPost = (req, res) => {

    const {
        title,
        description
    } = req.body;

    const _post = new postModel({
        title,
        description
    });

    _post.save((error, post) => {
        if (error) {
            return res.status(500).json({
                error: error,
                success: false,
                message: "DB Error occurred. Contact your administrator"
            })
        }

        if (post) {
            res.status(201).json({
                success: true,
                data: post,
                message: "Post added successfully"
            });
        }
    })
}

const getPost = async (req, res) => {

    try {
        const posts = await postModel.find({});
        res.json({
            Posts: posts,
            message: "Successful"
        })
    }
    catch (error) {
        res.json({
            data: [],
            message: "Error"
        })
    }
}

module.exports = {
    addPost,
    getPost
}