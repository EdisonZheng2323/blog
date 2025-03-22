const {Router} = require("express");
const router = Router();
const passport = require('passport');
const {postSignUp, getPosts, getPost} = require('../controllers/indexController');
const jwt = require("jsonwebtoken");

router.post('/api/signup', postSignUp);

router.post('/api/login', passport.authenticate("local", { session: false }), (req, res) => {
  const token = jwt.sign({id: req.user.id, username: req.user.username, password: req.user.password}, 'cats', {expiresIn: '24h'});
  res.json({token});
});

function verifyJWT(req, res, next){
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });
  jwt.verify(token, 'cats', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

  router.get("/api/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
  
  router.get('/api/posts', verifyJWT, getPosts);

  router.get('/api/posts/:postId', verifyJWT, getPost);

module.exports = router;