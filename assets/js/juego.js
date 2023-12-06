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
    console.log(deck);
    deck = _.shuffle (deck);
    console.log(deck)
}

createDeck();