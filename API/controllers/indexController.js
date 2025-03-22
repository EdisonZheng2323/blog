const db = require('../db/queries');
const bcrypt = require('bcryptjs');

async function getPost(req, res){
  const {postId} = req.params;
  try {
    const post = await db.getPost(postId);
    res.json({post});
  }
  catch (error){
    console.error(error);
    next(error);
  }
}

async function postSignUp(req, res){
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.insertUser(req.body.username, hashedPassword);
    const users = await db.getAllUsers();
    res.json({users: users, username: req.body.username, message: "Successful Sign up"});
  } 
  catch (error) {
    console.error(error);
    next(error);
  }
}


async function getPosts(req, res){
  const posts = await db.getAllPosts();
  res.json({posts});
}

async function postPost(req, res){

}



module.exports = {postSignUp, getPosts, getPost};