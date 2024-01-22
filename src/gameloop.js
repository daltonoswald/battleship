import { Player } from './player'
import { placeUserShips } from './placeShips'
import { placeEnemyShips } from './placeEnemyShips'
import { alertGameStart } from './screens';

async function gameLoop(userName) {
    const userPlayer = new Player(userName);
    await placeUserShips(userPlayer);
    userPlayer.renderPlayerBoard();
    userPlayer.turn = true;

    const computerPlayer = new Player('Computer');
    placeEnemyShips(computerPlayer, computerPlayer.carrier);
    placeEnemyShips(computerPlayer, computerPlayer.battleship);
    placeEnemyShips(computerPlayer, computerPlayer.destroyer);
    placeEnemyShips(computerPlayer, computerPlayer.submarine);
    placeEnemyShips(computerPlayer, computerPlayer.patrolBoat);
    computerPlayer.renderEnemyBoard();

    playTurn(userPlayer, computerPlayer);
}

function playTurn(userPlayer, computerPlayer){
    alertGameStart();

    let enemySquares = document.querySelectorAll('.enemySquare');
    enemySquares.forEach(square => {
        square.addEventListener('click', () => {
            let squareColumn = square.id.slice(2, 3);
            let squareRow = square.id.slice(1, 2);
            if (computerPlayer.gameboard.notGuessed(squareColumn, squareRow) === false ||
                computerPlayer.gameboard.checkAllShipsSunk() === true ||
                userPlayer.gameboard.checkAllShipsSunk() === true ||
                userPlayer.turn === false) {
                    return;
                }
            userPlayer.makeAttack(squareColumn, squareRow, computerPlayer.gameboard);
            userPlayer.turn = false;
            computerPlayer.turn = true;
            computerPlayer.renderEnemyBoard();
            if (computerPlayer.gameboard.checkAllShipsSunk() === true) {
                userPlayer.winGame();
            }

            setTimeout(function() {
                if (document.querySelector('.alertBox').classList.contains('hidden')) {
                    setTimeout(function() {
                        computerPlayer.computerMove(userPlayer);
                        userPlayer.turn = true;
                        computerPlayer.turn = false;
                        if (userPlayer.gameboard.checkAllShipsSunk() === true) {
                            computerPlayer.winGame();
                        }
                    }, 0)
                } else {
                    setTimeout(function() {
                        computerPlayer.computerMove(userPlayer);
                        userPlayer.turn = true;
                        computerPlayer.turn = false;
                        if (userPlayer.gameboard.checkAllShipsSunk() === true) {
                            computerPlayer.winGame();
                        }
                    }, 1250);
                }
            }, 500)
        })
    })
}

export { gameLoop };