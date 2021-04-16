const { idText } = require('typescript');
const { Post } = require('../models')

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({content: req.body.content, likes: 0});
    return res.status(201).json({
      post
    })
  } catch (err) {
    return res.status(500).json({error: err.message})
  }
}

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll()
    return res.status(200).json({posts})
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

exports.addLike = async (req, res) => {
  const {id} = req.body 
  try {
    const post = await Post.findOne({where: {
      id: id
    }})
    .then( async post => {
      await post.increment('likes');
      res.status(201).json({post})
    })
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

exports.revokeLike = async (req, res) => {
  const {id} = req.body 
  try {
    const post = await Post.findOne({where: {
      id: id
    }})
    .then( async post => {
      await post.decrement('likes');
      res.status(201).json({post})
    })
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

exports.deletePost = async (req, res) => {
  const {id} = req.body;
  try {
    const post = await Post.destroy({
      where: {id: id}
    })
    .then(num => {
      if (num == 1) {
        res.status(200).json({message: 'successful deletion'})
      } else {
        throw new Error('Post not found.')
      }
    })
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}