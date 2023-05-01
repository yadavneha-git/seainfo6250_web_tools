const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 4000;

const sessions = require('./model/sessions');
const users = require('./model/users');
const feed = require('./model/feed');
const posts = require('./model/posts');
const followers = require('./model/followers')
const followees = require('./model/followees');
const { KEYS } = require('./util/constants');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

//check session
app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

//login
app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if (!users.isValidUsername(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  const usernameTrimmed = username.trim();

  if (usernameTrimmed === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(usernameTrimmed);
  const existingUserData = users.getUserData(username);

  if (!existingUserData) {
    const userData = {
      [KEYS.POSTS_KEY]: posts.makePostList(),
      [KEYS.FOLLOWERS_KEY]: followers.makeFollowerList(),
      [KEYS.FOLLOWEES_KEY]: followees.makeFolloweeList()
    };

    users.addUserData(usernameTrimmed, userData);
  }

  res.cookie('sid', sid);
  res.json({ username: usernameTrimmed });
});

//logout
app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    sessions.deleteSession(sid);
  }
  res.json({ wasLoggedIn: !!username });
});

// Fetch user home page feed
app.get('/api/v1/feeds', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(feed.generateUserHomePageFeed(username));
});

//search user
app.get('/api/v1/users', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const searchText = req.query['contains'];
  if (!searchText || searchText.trim() == '') {
    res.status(400).json({ error: 'required-search-text' });
    return;
  }
  res.json(users.searchUsers(username, searchText));
});

//add a followee
app.post('/api/v1/followees', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { followee } = req.body;
  if (!followee || followee.trim() == '') {
    res.status(400).json({ error: 'required-followee-to-follow' });
    return;
  }

  const followeeList = users.getUserData(username)[KEYS.FOLLOWEES_KEY];
  const id = followeeList.addFollowee(followee);
  res.json(followeeList.getFollowee(id));
});

//get user's followees
app.get('/api/v1/followees', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const followeeList = users.getUserData(username)[KEYS.FOLLOWEES_KEY];
  res.json(followeeList.getFollowees());
});

//un follow a user
app.delete('/api/v1/followees/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;
  const followeeList = users.getUserData(username)[KEYS.FOLLOWEES_KEY];
  const exists = followeeList.contains(id);
  let followee;
  if (exists) {
    followee = followeeList.getFollowee(id);
    followeeList.deleteFollowee(id);
  }

  res.json({ message: exists ? `followee ${id} deleted` : `followee ${id} did not exist`, followee });
});

//add a follower
app.post('/api/v1/followers', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { followee } = req.body;
  if (!followee || followee.trim() == '') {
    res.status(400).json({ error: 'required-followee-to-add-follower' });
    return;
  }

  const followerList = users.getUserData(followee)[KEYS.FOLLOWERS_KEY];
  const id = followerList.addFollower(username);
  res.json(followerList.getFollower(id));
});

//delete follower
app.delete('/api/v1/followers/:followee', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { followee } = req.params;
  const followerList = users.getUserData(followee)[KEYS.FOLLOWERS_KEY];
  const id = followerList.findFollower(username);
  if (id) {
    followerList.deleteFollower(id);//
  }

  res.json({ message: id ? `follower ${username} deleted` : `follower ${username} did not exist`, username });
});

//Add post
app.post('/api/v1/posts', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { post } = req.body;
  if (!post || post.trim() == '') {
    res.status(400).json({ error: 'required-post' });
    return;
  }

  if (post.trim().length > 140) {
    res.status(400).json({ error: 'invalid-post-length' });
    return;
  }

  const currentUserData = users.getUserData(username);
  const postList = currentUserData[KEYS.POSTS_KEY];
  const id = postList.addPost(post.trim());

  res.json(id);
});

// delete post
app.delete('/api/v1/posts/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !username || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;
  const postsList = users.getUserData(username)[KEYS.POSTS_KEY];
  const exists = postsList.contains(id);
  if (exists) {
    postsList.deletePost(id);
  }

  res.json({ message: exists ? `post ${id} deleted` : `post ${id} did not exist` });
});

// get profile feed
app.get('/api/v1/profileFeeds', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json(feed.generateProfileFeed(username));
});

//Add reply
app.post('/api/v1/replies', (req, res) => {
  const sid = req.cookies.sid;
  const currentUsername = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValidUsername(currentUsername)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { reply } = req.body;
  if (!reply || reply.trim() == '') {
    res.status(400).json({ error: 'required-reply' });
    return;
  }

  if (reply.trim().length > 140) {
    res.status(400).json({ error: 'invalid-reply-length' });
    return;
  }

  const { postId } = req.body;
  if (!postId || postId.trim() == '') {
    res.status(400).json({ error: 'required-postId' });
    return;
  }

  const { username } = req.body;
  if (!username || username.trim() == '') {
    res.status(400).json({ error: 'required-username-for-reply' });
    return;
  }

  const postUserData = users.getUserData(username);
  const postList = postUserData[KEYS.POSTS_KEY];
  const post = postList.getPost(postId);
  const replyList = post[KEYS.REPLIES_KEY];
  const id = replyList.addReply(reply, currentUsername);

  res.json(id);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
