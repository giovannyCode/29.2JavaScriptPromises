class Game {
  constructor() {
      this.deck_id = null;
      this.addCardToBoard = this.addCardToBoard.bind(this);
 }

  createNewDeck() {
    return axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => {
            this.deck_Id = response.data.deck_id;
            console.log(`Deck id Created: ${this.deck_id}`);
        })
        .catch(error => {
            console.log(`Oops, there was a problem: ${error}`);
        });
}

  shuffleDeck() {
    return axios.get(`https://deckofcardsapi.com/api/deck/${this.deck_Id}/shuffle`)
    .then(response => {
      console.log(response.data);
      console.log(`Deck id ${response.data.deck_id} has been shuffled`);
          })
    .catch(error => {
        console.log(`Oops, there was a problem: ${error}`);
    });

      
  }

drawCard()
{
  return axios.get(`https://deckofcardsapi.com/api/deck/${this.deck_Id}/draw/?count=1`)
        .then(response => {
          console.log(response.data);
          console.log(response.data.cards[0].image);
          console.log(response.data.cards[0].suit);
          console.log(response.data.cards[0].value);
          return {
            image: response.data.cards[0].image,
            remaining: response.data.remaining
        };  
        })
        .catch(error => {
            console.log(`Oops, there was a problem: ${error}`);
            alert(`Oops, there was a problem: There are no more cards on deck`)
        });

}

addCardToBoard(event)
{
  const remaining = document.getElementById("remaining");

  const mainRow= document.getElementById("mainrow");
  const col1 = document.createElement("div");
  col1.classList.add('col-1');
  const image = document.createElement("img");
  this.drawCard().then(reponse => {
    image.setAttribute("src", reponse.image);
    col1.append(image);
    mainRow.append(col1);
    remaining.innerHTML = reponse.remaining
}).catch(error => {
    // Handle errors if needed
    console.log(error);
});

}
setupEventListener() {
 
  const button = document.getElementById('gameButton');
  button.addEventListener('click', this.addCardToBoard);
}

}
const myGame = new Game();

myGame.createNewDeck()
    .then(() => {
        console.log(`I am  inside  of the main game the  id created was ${myGame.deck_Id}`)
        myGame.shuffleDeck();
        myGame.setupEventListener();
    })