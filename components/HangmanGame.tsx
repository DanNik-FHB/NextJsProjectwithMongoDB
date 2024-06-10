import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [lives, setLives] = useState(maxLives);
  const [guessedCorrectLetters, setGuessedCorrectLetters] = useState(0);
  const [guessedLetter, setGuessedLetter] = useState('');
  const [infoBox, setInfoBox] = useState(false);

  function countLetterFrequency(currentWord, letter) {
    let frequency = 0;
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === letter) {
        frequency++;
      }
    }
    return frequency;
  }

  function checkLetter(letter) {
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
    <View style={styles.container}>
      <Text style={styles.paragraph}>Hangman-Spiel</Text>
      <Text style={styles.paragraph}>Aktuelles Wort: {maskedWord}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setGuessedLetter}
        value={guessedLetter}
        maxLength={1}
        autoCapitalize="none"
      />
      <Button onPress={handleGuess} title="Buchstabe raten" />
      <Text style={styles.paragraph}>
        Bereits geratene Buchstaben: {guessedLetters.join(', ')}
      </Text>
      <Text style={styles.paragraph}>Verbleibende Leben: {lives}</Text>

      {lives === 0 && (
        <Text style={styles.paragraph}>
          Game Over! Das Wort war "{currentWord}"
        </Text>
      )}
      {lives > 0 && guessedCorrectLetters === new Set(currentWord).size && (
        <Text style={styles.paragraph}>
          Gratulation! Du hast das Wort "{currentWord}" erraten!
        </Text>
      )}
      {<Button onPress={initializeGame} title="Neues Spiel" />}
      {infoBox && (
        <Text style={styles.paragraph}>
          Dieser Buchstabe wurde bereits geraten.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 18,
  },
});
