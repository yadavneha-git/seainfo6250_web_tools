const game = require('./game');

const login = {
    dataStore: function (username) {
        return `
        <!doctype html>
        <html>
        
        <head>
            <title>Word Guessing Game</title>
            <link rel="stylesheet" href="datastorestyle.css">
        </head>
        
        <body>
            <h1>Word Guessing Game</h1>
            <div class="welcome">
                <h2>Welome ${username} to the word guessing game. Have fun!!!</h2>
            </div>
            <div class="won">
            <div class="win">
                ${login.getGameWonMessage(username)}
            </div>
            </div>
            <div class="control-button">
                <div class="newGame">
                    <form class="myForm" method="post" action="/new-game">
                        <button class="button-active" type="submit">New Game</button>
                    </form>
                </div>
                <div class="logOut-app">
                    <form class="myForm" method="post" action=/logout?_method=DELETE">
                        <button class="button-active type=" submit">Logout</button>
                    </form>
                </div>
            </div>
            <div class="game">
                <div class="dataStore">
                    <h3>Dashboard</h3>
                    <ul class="data">
                        <li class="dashboard">Number of total guess: ${game.userGames[username].numerOfGuess}</li>
                        <li class="dashboard">${game.userGames[username].lastGuessedWord}</li>
                    </ul>
                    <h4>Previous guessed words and match count</h4>
                    ${login.getGuessedWordListWithMatchCount(username)}
                </div>
                <div class="word-list">
                    <h4>Possible guess word list</h4>
                    ${login.getPossibleGuessWordList(username)}
                </div>
                <div class="gameguess">
                    ${login.getGameFormAndSubmitButton(username)}
                </div>
                <div class="previousGame">
                    <h3>Previous Games Stats</h3>
                    ${login.getPreviousGameStats(username)}
                </div>
            </div>
        
        
        </body>
      `;
    },

    getPreviousGameStats: function (username) {
        return `<ol class="messages">` +
            game.userPreviousGames[username]
                .map(
                    (previousGame) => `
        <li>
        Number of total guess made: ${previousGame.numerOfGuess}
        & Won the game - ${previousGame.won}
        </li>
      `
                )
                .join("") +
            `</ol>`;
    },

    getGameWonMessage: function (username) {
        let gameWonMessage = ``;
        if (game.userGames[username].won) {
            gameWonMessage = `Hurray!!! You have won the game.`;
        }
        return gameWonMessage;
    },

    getGameFormAndSubmitButton: function (username) {
        let input = `<input class = "guessInput" type="text" name="guess"  value "" placeholder="Enter your guess" required>`;
        let submitButton = `<button class="button-active type="submit">Make a Guess</button>`;
        if (game.userGames[username].won) {
            input = `<input class = "guessInput" type="text" name="guess"  value "" placeholder="You have won the game!!" disabled>`;
            submitButton = `<button class="disableGuessInput" type="submit" disabled>Make a Guess</button>`;
        }
        return `
        <div class="gameguess">
                <form class="myForm" method="POST" action="/guess">
                ${input}
                ${submitButton}
                </form>
        </div>
        `;
    },

    getPossibleGuessWordList: function (username) {
        const guessWordList = game.getPossibleGuessWordListForUser(username);
        let posibbleGuessWordList = '<p><pre>';
        for (let i = 0; i < guessWordList.length; i++) {
            if (i !== 0 && i % 10 === 0) {
                posibbleGuessWordList += '<br>' + guessWordList[i] + '  ';
            } else {
                posibbleGuessWordList += guessWordList[i] + '  ';
            }
        }
        posibbleGuessWordList += '</pre></p>';
        return posibbleGuessWordList;
    },

    getGuessedWordListWithMatchCount: function (username) {
        const guessedWordList = game.getGuessedWordsWithMatchCount(username);
        let guessedWord = '<p><pre>';
        for (let i = 0; i < guessedWordList.length; i++) {
            if (i !== 0 && i % 5 === 0) {
                guessedWord += '<br>' + guessedWordList[i].guessedWord + '-' + guessedWordList[i].matchCount + '  ';
            } else {
                guessedWord += guessedWordList[i].guessedWord + '-' + guessedWordList[i].matchCount + '  ';
            }
        }
        guessedWord += '</pre></p>';
        return guessedWord;
    },

    login: function () {
        return `   
            <!doctype html>
            <html>

            <head>
                <title>Word Guessing Game</title>
                <link rel="stylesheet" href="style.css">
            </head>

            <body>
                <h1>Word Guessing Game </h1>
                <h2 class="head">Welcome to Guess the word challege</h2>
                <div class="login-app">
                    <form class="form" action="/login" method="POST">
                        <label for="username">Username :</label><br>
                        <input name="username" placeholder="">
                        <button class="button-active type=" submit">Login</button>
                    </form>
                </div>

            </body>

            </html>
    `;
    },

    loginInvalid: function (errormessage) {
        return `
        <!doctype html>
        <html>
        <head>
        <title>Word Guessing Game</title>
        <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <h1>Word Guessing Game</h1>
            <div class="login-invalid">
                <p>${errormessage}</p>
                <p>Invalid username Please <a href="/">Try Again</a></p> 
            </div>
        </body>
        </html>
      `;
    },
};
module.exports = login;

