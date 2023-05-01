const words = require('./words');

const userGames = {};
const userPreviousGames = {};

function createNewGameForUser(userName) {
    userGames[userName] = {
        guessedWords: [],
        secertWord: pickRandomWord(words),
        numerOfGuess: 0,
        lastGuessedWord: '',
        won: false
    }
    if (!userPreviousGames[userName]) {
        userPreviousGames[userName] = [];
    }
}

function saveCurrentGame(userName) {
    userPreviousGames[userName].push(userGames[userName]);
}

function pickRandomWord(words) {
    const index = Math.floor(Math.random() * words.length);
    return words[index].toLowerCase();
}

function handleGuessedWord(username, guessedWord) {
    if (isValidGuess(username, guessedWord)) {
        const matchCount = countNumberOfLettersMatched(guessedWord, userGames[username].secertWord);
        userGames[username].lastGuessedWord = 'Last guessed word is \"' + guessedWord + '\" and match count is ' + matchCount;
        userGames[username].numerOfGuess = userGames[username].numerOfGuess + 1;
        userGames[username].guessedWords.push(guessedWord);
        if (guessedWord === userGames[username].secertWord) {
            userGames[username].won = true;
        }
    } else {
        userGames[username].lastGuessedWord = 'Last guessed word \"' + guessedWord + '\" is a invalid word.';
    }
}

function isValidGuess(username, guessedWord) {
    const alreadyGuessedWords = userGames[username].guessedWords;
    if (!words.includes(guessedWord) || alreadyGuessedWords.includes(guessedWord)) {
        return false;
    } else {
        return true;
    }
}

function getGuessedWordsWithMatchCount(username) {
    const guessedWordsWithMatchCount = [];
    const guessedWords = userGames[username].guessedWords;
    const secretWord = userGames[username].secertWord;
    for (let i = 0; i < guessedWords.length; i++) {
        const guessedWord = guessedWords[i];
        const matchCount = countNumberOfLettersMatched(secretWord, guessedWord);
        guessedWordsWithMatchCount.push({ guessedWord: guessedWord, matchCount: matchCount });
    }
    return guessedWordsWithMatchCount;
}

function countNumberOfLettersMatched(word1, word2) {
    let count = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word2.includes(word1[i])) {
            count = count + 1;
            word2 = word2.replace(word1[i], '');
        }
    }
    return count;
}

function getPossibleGuessWordListForUser(username) {
    let possibleGuessWordListForUser = [];
    for (let i = 0; i < words.length; i++) {
        if (!userGames[username].guessedWords.includes(words[i])) {
            possibleGuessWordListForUser.push(words[i]);
        }
    }
    return possibleGuessWordListForUser;
}

const game = {
    userGames,
    userPreviousGames,
    createNewGameForUser,
    handleGuessedWord,
    getGuessedWordsWithMatchCount,
    getPossibleGuessWordListForUser,
    saveCurrentGame,
};

module.exports = game;
