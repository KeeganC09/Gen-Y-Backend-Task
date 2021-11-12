const express = require('express');
const router = express.Router();

const {
    addPost,
    getPost
} = require('../Controllers/postController');

const {
    isLoggedIn,
    isAdmin,
    isUser
} = require('../middleware/authMiddleware');

router.post('/', isLoggedIn, isAdmin, addPost);
router.get('/', isLoggedIn, isUser, getPost);

module.exports = router;