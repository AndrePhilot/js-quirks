function guessingGame() {
    const RANDOM_NUM = Math.floor(Math.random() * 100);
    let isWon = false;
    let numGuesses = 0;
    return (guess) => {
        if (isWon) return "The game is over, you already won!";
        numGuesses++;
        if (guess === RANDOM_NUM) {
            isWon = true;
            return `You win! You found ${guess} in ${numGuesses} guesses.`;
        } else if (guess > RANDOM_NUM) {
            return `${guess} is too high!`;
        } else {
            return `${guess} is too low!`;
        }
    }
}

module.exports = { guessingGame };
