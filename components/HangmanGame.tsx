import React, { useState, useEffect } from 'react';

const words = [
  'apfel', 'banane', 'kirsche', 'orange', 'birne', 'aprikose', 'schokolade', 'krokodil', 'elefant', 'gitarre',
  'sonnenblume', 'regenbogen', 'bibliothek', 'flamingo', 'wassermelone', 'zebra', 'kaktus', 'papagei', 'diamant',
  'erdbeere', 'kaffeetasse', 'tannenzapfen', 'schneeflocke', 'hubschrauber', 'astronaut', 'bananenbrot', 'pinguin',
  'lavendel', 'orangensaft', 'regenschirm', 'karamell', 'krokus', 'wasserski', 'flamingofeder', 'zitronensorbet',
  'schmetterling', 'kiefernzapfen', 'sonnenuntergang', 'tannenbaum', 'erdnussbutter', 'papierflieger', 'diamantring',
  'zitronenlimonade', 'schneemann', 'hubschrauberlandeplatz', 'astronomie', 'bananensplit', 'pinguinbaby',
];

const maxLives = 5;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export default function HangmanGame() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [currentWord, setCurrentWord] = useState<string | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [lives, setLives] = useState(maxLives);
  const [guessedCorrectLetters, setGuessedCorrectLetters] = useState(0);
  const [guessedLetter, setGuessedLetter] = useState('');
  const [infoBox, setInfoBox] = useState(false);

  useEffect(() => {
    if (mounted) {
      setCurrentWord(getRandomWord());
    }
  }, [mounted]);

  function countLetterFrequency(currentWord: string, letter: string) {
    let frequency = 0;
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === letter) {
        frequency++;
      }
    }
    return frequency;
  }

  function checkLetter(letter: string) {
    setInfoBox(false);
    if (guessedLetters.includes(letter)) {
      setInfoBox(true);
      return;
    }

    if (currentWord && currentWord.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      const frequency = countLetterFrequency(currentWord, letter);
      setGuessedCorrectLetters(guessedCorrectLetters + frequency);
    } else {
      setLives(lives - 1);
      setGuessedLetters([...guessedLetters, letter]);
    }
    setGuessedLetter('');
  }

  const maskedWord = currentWord
    ? currentWord
        .split('')
        .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ')
    : '';

  function handleGuess() {
    if (guessedLetter.length === 1) {
      checkLetter(guessedLetter);
    }
  }

  function initializeGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setGuessedCorrectLetters(0);
    setLives(maxLives);
  }

  if (!mounted) {
    return null; 
  }

  return (
    <div style={styles.container}>
      <p style={styles.paragraph}>Hangman-Spiel</p>
      <p style={styles.paragraph}>Aktuelles Wort: {maskedWord}</p>
      <input
        style={styles.input}
        onChange={(e) => setGuessedLetter(e.target.value)}
        value={guessedLetter}
        maxLength={1}
        autoCapitalize="none"
      />
      <button onClick={handleGuess}>Buchstabe raten</button>
      <p style={styles.paragraph}>
        Bereits geratene Buchstaben: {guessedLetters.join(', ')}
      </p>
      <p style={styles.paragraph}>Verbleibende Leben: {lives}</p>

      {lives === 0 && (
        <p style={styles.paragraph}>
          Game Over! Das Wort war "{currentWord}"
        </p>
      )}
      {lives > 0 && currentWord && guessedCorrectLetters === currentWord.length && (
        <p style={styles.paragraph}>
          Gratulation! Du hast das Wort "{currentWord}" erraten!
        </p>
      )}
      <button onClick={initializeGame}>Neues Spiel</button>
      {infoBox && (
        <p style={styles.paragraph}>
          Dieser Buchstabe wurde bereits geraten.
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'lavender',
    alignItems: 'center',
    padding: '16px',
  },
  paragraph: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  input: {
    width: '40px',
    height: '40px',
    borderColor: 'black',
    borderWidth: '1px',
    textAlign: 'center',
    fontSize: '18px',
  },
};
