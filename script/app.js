//Variables
const playerLives = document.querySelector("#player-lives");
const sound = document.querySelector("#flip-sound");

//Functions:

// Function to reset the game to its initial state
const resetGame = () => {
  const message = document.querySelector("#message");
  let randomCards = game.randomCards();
  const faces = document.querySelectorAll(".face");
  const cards = document.querySelectorAll(".theCard");
  // Loop through each card and reset their state
  randomCards.forEach((randomCard, index) => {
    cards[index].classList.remove("transform");
    //Wait for cards to flip back and randomize
    setTimeout(() => {
      // Enable clicking on the cards
      cards[index].style.pointerEvents = "all";
      // Set card name and face image
      cards[index].setAttribute("name", randomCard.name);
      faces[index].src = randomCard.src;
    }, 1000);
  });
  // Reset player's lives and update the display
  player.lives = 8;
  playerLives.innerHTML = `Score: ${player.lives}`;
  message.innerHTML = "";
};

// Function to check if the player has won the game
const checkIfWon = () => {
  // Get all transformed cards
  const cards = document.querySelectorAll(".transform");
  // If the number of transformed cards equals the total number of cards, the player has won
  if (cards.length === game.cards.length) {
    return true;
  }
};

// Class for the game logic
class Game {
  constructor(element) {
    this.gameContainer = document.querySelector(`#${element}`);
    // An array of card objects with src and name properties
    this.cards = [
      { src: "assets/images/maki.png", name: "maki" },
      { src: "assets/images/nigiri.png", name: "nigiri" },
      { src: "assets/images/gukan-maki.png", name: "gukan maki" },
      { src: "assets/images/ramen.png", name: "ramen" },
      { src: "assets/images/octopus.png", name: "octopus" },
      { src: "assets/images/makichops.png", name: "maki with chopsticks" },
      { src: "assets/images/sashimi.png", name: "sashimi" },
      { src: "assets/images/tempura.png", name: "tempura" },
      { src: "assets/images/gyoza.png", name: "gyoza" },
      { src: "assets/images/rice.png", name: "rice" },
      { src: "assets/images/maki.png", name: "maki" },
      { src: "assets/images/nigiri.png", name: "nigiri" },
      { src: "assets/images/gukan-maki.png", name: "gukan maki" },
      { src: "assets/images/ramen.png", name: "ramen" },
      { src: "assets/images/octopus.png", name: "octopus" },
      { src: "assets/images/makichops.png", name: "maki with chopsticks" },
      { src: "assets/images/sashimi.png", name: "sashimi" },
      { src: "assets/images/tempura.png", name: "tempura" },
      { src: "assets/images/gyoza.png", name: "gyoza" },
      { src: "assets/images/rice.png", name: "rice" },
    ];
  }
  //method randomCards sorts the array of cards randomly
  randomCards() {
    // Randomly shuffle the cards using the Fisher-Yates algorithm
    let random = this.cards.sort(() => Math.random() - 0.5);
    return random;
  }
  //Method generateCards generates html for the cards
  generateCard() {
    // Generate a random order of cards
    let items = this.randomCards();
    // Loop through each card and create HTML elements for them
    for (const item of items) {
      const card = document.createElement("div");
      const face = document.createElement("img");
      const back = document.createElement("div");
      // Set classes and attributes for card elements
      card.classList = "theCard";
      card.setAttribute("name", item.name);
      face.classList = "face";
      face.src = item.src;
      back.classList = "back";
      // Append card elements to the game container
      this.gameContainer.appendChild(card);
      card.appendChild(face);
      card.appendChild(back);
    }
  }
  //Method checkCards checks if the two selecte cards are matching (returns true or false)
  checkCards(cards) {
    // Compare the 'name' attribute of the two cards to determine if they match
    if (cards[0].getAttribute("name") === cards[1].getAttribute("name")) {
      return true;
    } else {
      return false;
    }
  }
}

// Class for the player
class Player {
  constructor(lives) {
    this.lives = lives;
  }
  // Method to decrease the player's lives
  decreaseLive() {
    this.lives--;
  }
  // Method to check if the player is out of lives
  isOutOfLives() {
    // If the player has no lives left, return true
    if (this.lives === 0) {
      return true;
    }
  }
}
// Initialize a player with 8 lives
let player = new Player(8);
// Initialize the game with the game container element
let game = new Game("game-container");
game.generateCard();

window.addEventListener("load", () => {
  // Event listener for card clicks within the game container
  game.gameContainer.addEventListener("click", (e) => {
    //Getting the element from which generated the event (event delegation to the parent container)
    const card = e.target.closest(".theCard");
    //If it exists then do stuff:
    if (card) {
      //Toggle the animation
      card.classList.toggle("transform");
      //Play the sound
      sound.play();
      //Add the class flipped to it so we can keep track which cards where clicked
      card.classList.add("flipped");
      const flipped = Array.from(document.querySelectorAll(".flipped"));
      //If we clicked two cards run the check
      if (flipped.length === 2) {
        //if the method checkCards returns true:
        if (game.checkCards(flipped)) {
          //Remove the flipped class form the card and prevent from clicking on it again
          flipped.forEach((card) => {
            card.classList.remove("flipped");
            card.style.pointerEvents = "none";
          });
        } else {
          //If the method checkCards returned false(cards didn't match) then remove the flipped class from the card and make the animation
          flipped.forEach((card) => {
            card.classList.remove("flipped");
            setTimeout(() => card.classList.remove("transform"), 1000);
          });
          //Decrease player's score
          player.decreaseLive();
          playerLives.innerHTML = `Score: ${player.lives}`;
          //Check if player is out of lives and reset the game
          if (player.isOutOfLives()) {
            resetGame();
          }
        }
        //If player won, reset the game
        if (checkIfWon()) {
          resetGame();
        }
      }
    }
  });
});
