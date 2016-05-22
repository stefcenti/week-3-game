/*****
* game.js - This file contains the javascript code for the hangman game
*
* This object has methods and properties for controling the game.
*
******/

	var hangman = {
		
		// Set the maximum number of games to a positive value.
		//		^^^  Maybe this should just be a prompt to continue?

		// Set the maximum number of guesses allowed to a positive value.
		// Set the number of wins to 0.
		// Set the string of guesses to ""
		// Set the currentWord to a random word in the list of superhero themed words
		// Set the displayedWord to a string that is 2x the length of currentWord
		//		with the characters alternating between '_' and ' '. i.e. when this string
		//		is displayed it will look as follows: "_ _ _ _ _ _"
		// Set the number of correct lettters to 0.
		//		When this number is equal to the number of letters in the currentWord, the
		//		user won the current game. Increase the number of wins and the number

		wordList: ["SUPERMAN", "SPIDERMAN", "GREEN ARROW", "CAT WOMAN"],

		maxGames: 3,
		numWins: 0,

		won: false,
		guessesLeft: 10,
		guesses: [], // Array of letters that have been guessed already
		currentWord: [], // Array of characters for the current word
		displayedWord: [],  // Array of characters with '_' for each letter of the current word
		blanksRemaining: 0, // String to keep track of how many blanks remain

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

		getDisplayedWord: function(){
			return this.displayedWord.join("");
		},

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
