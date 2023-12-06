/**
 * 2C = Two of Clubs 
 * 2D = Two of Diamnonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
*/

let deck = [];
const tipes = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

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

const value = cardValue (askCard());
console.log([value]);