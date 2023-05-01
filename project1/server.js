const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const login = require('./login');
const words = require('./words');
const game = require('./game');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));

const session = {};

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if (sid && session[sid]) {
        const username = session[sid].username;
        if(!game.userGames[username]) {
          game.createNewGameForUser(username);
      }
        const seceretWord = game.userGames[username].secertWord;
        console.log(`logged in as ${username} and answer is ${seceretWord}`);
        res.send(login.dataStore(username));
        return;
    }
    else {
      res.send(login.login());
    }
});

app.post('/login', (req, res) => {
    const username = req.body.username.trim();
    const regex = /^[a-zA-Z0-9]*$/;
    if (username == "dog") {
        res.status(401).send(login.loginInvalid(' Username cannot be Dog.'));
        return;
    } else if (!username) {
        res.status(401).send(login.loginInvalid('Username cannot be null.'));
        return;
    } else if (!username.match(regex)) {
        res.status(401).send(login.loginInvalid('Please enter a valid username which only have letters or numbers.'));
        return;
    }
   
    const uuidv4 = require('uuid').v4;
    const sid = uuidv4(); 
    session[sid] = {username};
    res.cookie('sid', sid);
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete session[sid];
    res.clearCookie('sid');
    res.redirect('/');
});

app.post('/guess', (req, res) => {
  const sid = req.cookies.sid;
  if (sid && session[sid]) {
    const username = session[sid].username;
    const guessedWord = req.body.guess.trim().toLowerCase();
    game.handleGuessedWord(username, guessedWord);
    res.redirect('/');
  } else {
    res.send(login.login());
  }
});

app.post('/new-game', (req, res) => {
  const sid = req.cookies.sid;
  if (sid && session[sid]) {
    const username = session[sid].username;
    game.saveCurrentGame(username);
    game.createNewGameForUser(username);
    res.redirect('/');
  } else {
    res.send(login.login());
  }
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
