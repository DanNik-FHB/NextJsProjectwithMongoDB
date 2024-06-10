import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button } from 'react-native';
import { CSSProperties } from 'react';

const words = ['apfel', 'banane', 'kirsche', 'orange', 'birne', 'aprikose', 'schokolade', 'krokodil',
  'elefant', 'gitarre', 'sonnenblume', 'regenbogen', 'bibliothek', 'flamingo', 'wassermelone', 'zebra',
  'kaktus', 'papagei', 'diamant', 'erdbeere', 'kaffeetasse', 'tannenzapfen', 'schneeflocke', 'kürbis',
  'hubschrauber', 'astronaut', 'bananenbrot', 'pinguin', 'lavendel', 'orangensaft', 'schildkröte',
  'regenschirm', 'karamell', 'krokus', 'kirschblüte', 'wasserski', 'kaktusblüte', 'flamingofeder',
  'zitronensorbet', 'schmetterling', 'kiefernzapfen', 'sonnenuntergang', 'kaffeemühle', 'tannenbaum',
  'erdnussbutter', 'papierflieger', 'diamantring', 'wassermelonenstück', 'zitronenlimonade', 'schneemann',
  'kürbissuppe', 'hubschrauberlandeplatz', 'astronomie', 'bananensplit', 'pinguinbaby'];

const maxLives = 5;

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export default function HangmanGame() {
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [lives, setLives] = useState(maxLives);
  const [guessedCorrectLetters, setGuessedCorrectLetters] = useState(0);
  const [guessedLetter, setGuessedLetter] = useState('');
  const [infoBox, setInfoBox] = useState(false);

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
    if (guessedLetters.includes(letter)) {
      setInfoBox(true);
      return;
    }

    if (currentWord.includes(letter)) {
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
    .split('')
    .map((letter) => (guessedLetters.includes(letter) ? letter : '_'))
    .join(' ');

  function handleGuess() {
    if (guessedLetter.length === 1) {
      setInfoBox(false); // Reset infoBox state when making a new guess
      checkLetter(guessedLetter);
    }
  }

  function initializeGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setGuessedCorrectLetters(0);
    setLives(maxLives);
    setInfoBox(false); // Reset infoBox state when initializing a new game
  }

  return (
    <div style={styles.container}>
      <p style={styles.paragraph}>Hangman-Spiel</p>
      <p style={styles.paragraph}>Aktuelles Wort: {maskedWord}</p>
      <input
        style={styles.input as CSSProperties}
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
      {lives > 0 && guessedCorrectLetters === new Set(currentWord).size && (
        <p style={styles.paragraph}>
          Gratulation! Du hast das Wort "{currentWord}" erraten!
        </p>
      )}
      {<button onClick={initializeGame}>Neues Spiel</button>}
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
    justifyContent: 'center',
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
    borderColor: 'gray',
    borderWidth: '1px',
    textAlign: 'center',
    fontSize: '18px',
  } as CSSProperties,
};
