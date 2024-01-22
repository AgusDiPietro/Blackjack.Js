
const myModule = (() => {
    'use strict'

    let deck = [];
    const tipes = ['C', 'D', 'H', 'S'],
         specials = ['A', 'J', 'Q', 'K'];

    let playerPoints = [];

    //Ref HTMl
    const btnAsk = document.querySelector('#btnAsk'),
          btnStop = document.querySelector('#btnStop'),
          btnNew = document.querySelector('#btnNew');

    const divPlayersCards = document.querySelectorAll('.divCarts')
          HTMlpoints = document.querySelectorAll('small');

    const startGame = (numPlayers = 2) => {
            deck = createDeck();
            for( let i = 0; i< numPlayers; i++){
                playerPoints.push(0);
            }

            pointsHTML.forEach(element => element.innerText = 0 );
            divPlayersCards.forEach(element => element.innerHTML = ' ');


            btnAsk.disabled = false;
            btnStop.disabled = false;
        }

    const createDeck = () => {
        
        deck = [];
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
        return _.shuffle (deck);

    }
    
    const askCard = () => {
        if (deck.length === 0 ) {
            throw 'No more cards in the deck';
        }
        return deck.pop();

    const cardValue = (card) => {

        const value = card.substring(0, card.length -1);
        return (isNaN (value ) ) ?
                (value === 'A') ? 11: 10
                : value *1;
    }

    const accumulatePoints = (card, turn) => {
        playerPoints [turn] = playerPoints[turn] + cardValue(card);
        HTMlpoints[turn].innerText = playerPoints[turn];
        return playerPoints[turn];
    }
   
    const createCard = (card, turn) => {

        const cardImage = document.createElement('img');
        cardImage.src = `assets/cartas/cartas/${card}.png`;
        cardImage.classList.add('card');
        divPlayersCards[turn].append(cardImage);
    }
 
    const detWinner = () => {

        const[minPoints, pcPoints] = playerPoints;

        setTimeout(() => {
            
            if(pcPoints === minPoints) {
                alert('House wins');
            }else if ( minPoints > 21) {
                alert('House wins');
            }else if (pcPoints >21 ){
                alert('Player wins');
            }else {
                alert('House wins')
            }
            }, 100);

    }

    //Pc turn
    const pcTurn = (minPoints) => {

        let pcPoints = 0;
        do{

        const card = askCard();
        pcPoints = accumulatePoints(card,playerPoints.length - 1);
        createCard(card, playerPoints.length -1);
        } while ( (pcPoints < minPoints) && (minPoints <= 21));

        detWinner();
    } 

    const value = cardValue (askCard());
    console.log([value]);

    //Events
    btnAsk.addEventListener('click', () => {

        const card = askCard();
        const playerPoints = accumulatePoints(card, 0);

        createCard(card, 0);

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
        pcTurn(playerPoints[0]);
    })

    btnNew.addEventListener('click', () => {
        startGame();
    })
    }

    //Public
    return {
        newGame: startGame

    };

})();