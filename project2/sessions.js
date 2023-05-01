const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
}

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

function getLoggedinUsers() {
  const loggedinUsers = [];
  Object.values(sessions).map(username => {
    loggedinUsers.push(username.username);
  })
  return loggedinUsers.filter((username,
    index) => loggedinUsers.indexOf(username) === index);
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getLoggedinUsers,
};