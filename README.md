# week-3-game

Super Hero Hangman!

Play hangman with your favorite superheros!!

Screenshot:

![Super Hero Hangman](/readme-images/superhero_hangman_screen_01.png?raw=true"superhero_hangman_screen_01.png") 

Technologies used:

HTML5
CSS3
Jquery

Interesting Snippet of Code: 

(Note: This code is from the introduction to objects in Javascript.  This is the main hangman game object used for keeping track of the state of the game. Knowing what I do now this would be done differently but I think it is advanced considering what I knew at the time.)

	var hangman = {
		
		wordList: [
			"SUPERMAN", "SPIDERMAN", "GREEN ARROW", "CAT WOMAN",
			"AQUAMAN", "WONDER WOMAN", "THE XMEN", "JUSTICE LEAGUE",
			"ANTMAN", "BATMAN", "ROBIN", "DARK KNIGHT", "DEADPOOL", 
			"CAPTAIN AMERICA", "IRONMAN", "GREEN LANTERN", "CLARK KENT",
			"BRUCE WAYNE", "BARRY ALLEN", "DIANA", "OLIVER QUEEN",
			"ARROW", "THE FLASH", "HAL JORDAN", "MARVEL COMICS", 
			"DC COMICS"],

		maxGames: 3,
		numWins: 0,

		won: false,
		guessesLeft: 10,
		guesses: [], // Array of letters that have been guessed already
		currentWord: [], // Array of characters for the current word
		displayedWord: [],  // Array of characters with '_' for each letter of the current word
		blanksRemaining: 0, // String to keep track of how many blanks remain

		// Keep track of the word to display with letter guessed so far.
		initDisplayedWord: function(){
			// For each character in currentWord append '_ ' to displayedWord.

			for (var i=0; i < this.currentWord.length; i++){
				if (this.currentWord[i] == " "){
					this.displayedWord[i] = " ";
					continue;
				}
				this.displayedWord[i] = "_ ";
			}
		},

		// Initialize the state of the game to the beginning.
		newGame: function(guessesAllowed){
			this.won = false;
			this.guessesLeft = guessesAllowed;
			this.guesses = [];
			this.currentWord = [];
			this.displayedWord = [];

			// Take a random word from the word list and copy each
			// character into an array for easier parsing
			var word = this.wordList[Math.floor(Math.random()*this.wordList.length)];
			for (var i=0; i < word.length; i++) {
				this.currentWord[i] = word[i];
			}

			this.initDisplayedWord();
		},

		// Retrieve the word to display as a string.
		getDisplayedWord: function(){
			return this.displayedWord.join("");
		},

		// Retrieve the guesses that have been made as a string.
		getGuesses: function() {
			return this.guesses.join("");
		},

		letterEntered: function(userInput){
			// Check if the letter entered has been entered previously
			// If it has already been entered, return true
			// If it has not been entered then append to guesses and return false
			for(var i=0; i < this.guesses.length; i++) {
				if (this.guesses[i] == userInput + ","){
					return true;
				}
			}
			this.guesses.push(userInput + ",");
			return false;
		},
		
		letterFound: function(userInput) {
			// Loop through the current word searching for the character entered.
			// If the character is found, replace the blank in the displayed word
			// with the character found at that index.
			// Continue until all the letters in the current word have been checked.

			var found = false;
			for(var i=0; i < this.currentWord.length; i++){
				if (this.currentWord[i] == userInput){
					this.displayedWord[i] = userInput;
					found = true;
				}
			}
			return found;
		},

		/****
			Update the hangman attributes based on the user's guess.
			The HTML will use the attributes to update the display
		****/
		takeGuess: function(userInput){
			// Check if letter has already been entered
			// If the letter has already been entered then wait for another character
			// otherwise proceed below to process the new letter
			if (this.letterEntered(userInput)){
				return;
			}

			// Check if letter entered is in the current word
			// letterFound() will modify the displayedWord array
			//		so every occurance of the letter is in place
			if (this.letterFound(userInput)){
				// If we guessed all the correct letters, we won!
				if (this.currentWord.join("") == this.displayedWord.join("")) {
					this.won = true;
					this.numWins++;
				}
			}
			else {
				this.guessesLeft--;
			}
		},

		/*****
			Start a new game.
			Display the current word as a word of blanks, i.e. "_ _ _ _ _"
			Get a random letter to use as if input by the user.
			Convert it to uppercase.
			Play the game as instructed.
		*****/
		autoPlay: function(guessesAllowed){

			// Initialize properties for a new game
			this.newGame(guessesAllowed);
				
			document.write("<br>Guesses Left: " + this.guessesLeft + "<br>");

			document.write("<br>" + this.displayedWord.join(""));

			do {
				// simulate letter entered by user
				var userInput = randomLetter().toUpperCase();

				// Check if letter has already been entered
				// If the letter has already been entered then wait for another character
				// otherwise proceed below to process the new letter
				if (this.letterEntered(userInput)){
					continue;
				}

				// Check if letter entered is in the current word
				// letterFound() will modify the displayedWord array
				//		so every occurance of the letter is in place
				if (this.letterFound(userInput)){
					// If we guessed all the correct letters, we won!
					if (this.currentWord.join("") == this.displayedWord.join("")) {
						this.won = true;
					}
				}
				else {
					this.guessesLeft--;
				}

				document.write("<br>Guesses Entered: " + this.guesses.join("") + "<br>");
				document.write("<br>Guesses Left: " + this.guessesLeft + "<br>");
				document.write(this.displayedWord.join(""));

			}while (!this.won && this.guessesLeft > 0);

			document.writeln("<br>The word was: " + this.currentWord.join("") + "<br>");
			if (this.won){
				document.writeln("You WON!!!");
			}
			else {
				document.writeln("You LOST - BUMMER!!");
			}
			
		}

	} // end of hangman object

	// --- FUNCTIONS ---

	// Temporary function to return a random letter as the user's guess

	function randomLetter() {

		var letters = ['a', 'b', 'c', 'd','e', 'f', 'g', 'i', 'r', 'n', 'o','w', 's','u','p','m','q'];
		return letters[Math.floor(Math.random()*letters.length)];
	}

	function playHangman(gameCount, guessCount) {

		hangman.maxGames = gameCount;
		while (hangman.maxGames > 0) {
			hangman.autoPlay(guessCount); // automatically play 5 times
			hangman.maxGames--;
		}

	}

Author:

Stefanie Centi

License:

This project is licensed under the MIT License - see the LICENSE.md file for details

Acknowledgments:

To my children who love superheros!
