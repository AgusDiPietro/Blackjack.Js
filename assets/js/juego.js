/**
 * 2C = Two of Clubs 
 * 2D = Two of Diamnonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
*/

let deck = [];
const tipes = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerPoints = 0,
    pcPoints = 0;

//Ref HTMl
const btnAsk = document.querySelector('#btnAsk');
const btnStop = document.querySelector('#btnStop');
const btnNew = document.querySelector('#btnNew');

const divComputerCards = document.querySelector('#computer-cards');
const divPlayerCards = document.querySelector('#player-cards');
const HTMlpoints = document.querySelectorAll('small');

const createDeck = () => {
    
    for( let i = 2; i <= 10; i++ ) {
        for (let tipe of tipes) {
            deck.push( i + tipe ); 
        }
    }

    for (let tipe of tipes) {
        for( let spe of specials ) {
            deck.push( spe + tipe);
        }
    }
    deck = _.shuffle (deck);
    console.log(deck)
    return deck;
}

createDeck();

const askCard = () => {

    if (deck.length === 0 ) {
        throw 'No more cards in the deck';
    }
    const card = deck.pop();
    console.log(deck);
    console.log(card);
    return card;
}

const cardValue = (card) => {

    const value = card.substring(0, card.length -1);
    return (isNaN (value ) ) ?
            (value === 'A') ? 11: 10
            : value *1;
}

//Pc turn
const pcTurn = (minPoints) => {

    do{

    const card = askCard();

    pcPoints = pcPoints + cardValue(card);
    HTMlpoints[1].innerText = pcPoints;

    // <!-- <img class="carta" src="assets/cartas/cartas/2S.png"> -->
    const cardImage = document.createElement('img');
    cardImage.src = `assets/cartas/cartas/${card}.png`;
    cardImage.classList.add('card');

    divComputerCards.append(cardImage);

    if(playerPoints > 21) {
        break;
    }

    } while ( (pcPoints < minPoints) && (minPoints <= 21));
} 

const value = cardValue (askCard());
console.log([value]);

//Events
btnAsk.addEventListener('click', () => {

    const card = askCard();

    playerPoints = playerPoints + cardValue(card);
    HTMlpoints[0].innerText = playerPoints;

    // <!-- <img class="carta" src="assets/cartas/cartas/2S.png"> -->
    const cardImage = document.createElement('img');
    cardImage.src = `assets/cartas/cartas/${card}.png`;
    cardImage.classList.add('card');

    divPlayerCards.append(cardImage);

    if(playerPoints > 21) {
        console.warn('You lost');
        btnAsk.disabled = true;
        pcTurn(playerPoints);

    }else if(playerPoints === 21) {
        console.warn('21 great!');
        btnAsk.disabled = true;
        pcTurn(playerPoints);
      }
});

btnStop.addEventListener('click', () =>{
    btnAsk.disabled = true;
    btnStop.disabled = true;

    pcTurn(playerPoints);


})
