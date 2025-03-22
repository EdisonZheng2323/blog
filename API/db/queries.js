const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function insertUser(username, password){
  await prisma.user.create({
    data: {
      username: username,
      password: password
    }
  })
}

async function getAllUsers(){
  const users = await prisma.user.findMany();
  return users;
}

async function getAllPosts(){
  const posts = await prisma.post.findMany();
  return posts;
}

async function getPost(postId){
  const post = await prisma.post.findUnique({
    where: {id: parseInt(postId)}
  })
  return post;
}

module.exports = {insertUser, getAllUsers, getAllPosts, getPost};
