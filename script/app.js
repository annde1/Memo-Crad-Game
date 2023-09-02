//Variables
const playerLives = document.querySelector("#player-lives");
const sound = document.querySelector("#flip-sound");

//Functions:
const resetGame = () => {
  const message = document.querySelector("#message");
  let randomCards = game.randomCards();
  const faces = document.querySelectorAll(".face");
  const cards = document.querySelectorAll(".theCard");
  randomCards.forEach((randomCard, index) => {
    cards[index].classList.remove("transform");
    //Wait for cards to flip back and randomize
    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      cards[index].setAttribute("name", randomCard.name);
      faces[index].src = randomCard.src;
    }, 1000);
  });
  player.lives = 8;
  playerLives.innerHTML = `Score: ${player.lives}`;
  message.innerHTML = "";
};

const checkIfWon = () => {
  const cards = document.querySelectorAll(".transform");
  if (cards.length === game.cards.length) {
    return true;
  }
};

class Game {
  constructor(element) {
    this.gameContainer = document.querySelector(`#${element}`);
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
    let random = this.cards.sort(() => Math.random() - 0.5);
    return random;
  }
  //Methid generateCards randomly generates html for the cards
  generateCard() {
    let items = this.randomCards();
    for (const item of items) {
      const card = document.createElement("div");
      const face = document.createElement("img");
      const back = document.createElement("div");
      card.classList = "theCard";
      card.setAttribute("name", item.name);
      face.classList = "face";
      face.src = item.src;
      back.classList = "back";
      this.gameContainer.appendChild(card);
      card.appendChild(face);
      card.appendChild(back);
    }
  }
  //Method checkCards checks if the two selecte cards are matching (returns true or false)
  checkCards(cards) {
    if (cards[0].getAttribute("name") === cards[1].getAttribute("name")) {
      return true;
    } else {
      return false;
    }
  }
}

class Player {
  constructor(lives) {
    this.lives = lives;
  }
  decreaseLive() {
    this.lives--;
  }
  isOutOfLives() {
    if (this.lives === 0) {
      return true;
    }
  }
}
let player = new Player(8);

let game = new Game("game-container");
game.generateCard();

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
