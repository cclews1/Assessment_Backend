// Requires
const express = require('express');
const router = express.Router();
// Controllers
const controllers = require('../controllers')

router.get('/posts', controllers.getAllPosts);
router.post('/posts', controllers.createPost);
router.post('/like', controllers.addLike)
router.post('/unlike', controllers.revokeLike)
router.delete('/remove', controllers.deletePost)
module.exports = router