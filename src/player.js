import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import Hit from './imgs/x.svg'
import Circle from './imgs/circle.svg'
import { alertGameOver } from "./screens";

class Player {
    constructor(name) {
        this.name = name;
        this.turn = false;
        this.gameboard = new Gameboard(this.name);
        this.carrier = new Ship('carrier', 5);
        this.battleship = new Ship('battleship', 4);
        this.destroyer = new Ship('destroyer', 3);
        this.submarine = new Ship('submarine', 3);
        this.patrolBoat = new Ship('patrol boat', 2);
        this.allShips = [this.carrier, this.battleship, this.destroyer, this.submarine, this.patrolBoat];
    }

    makeAttack(column, row, enemyBoard) {
        if (enemyBoard.checkAllShipsSunk() === true || this.turn === false) {
            return;
        }
        if (enemyBoard.notGuessed(column, row)) {
            enemyBoard.receiveAttack(column, row);
        }
        return;
    }

    computerMove(userPlayer) {
        if (this.gameboard.checkAllShipsSunk() === true) {
            return;
        }
        let damagedShip = userPlayer.allShips.some(ship => {
            return ship.isDamaged();
        });
        if (damagedShip === true) {
            let hitLocations = [];
            for (let column = 0; column < userPlayer.gameboard.board.length; column++) {
                for (let row = 0; row < userPlayer.gameboard.board[column].length; row++) {
                    if (userPlayer.gameboard.board[column][row] === 'hit') {
                        hitLocations.push(`${column}${row}`);
                    }
                }
            }
            let damagedLocations = [];
            hitLocations.forEach(location => {
                let hitColumn = Number(location.slice(0, 1));
                let hitRow = Number(location.slice(1, 2));
                if (hitColumn === 0 && hitRow === 0) {
                    if (userPlayer.gameboard.containsShip(hitColumn +1, hitRow) ||
                        userPlayer.gameboard.containsShip(hitColumn, hitRow +1)) {
                            damagedLocations.push(location);
                    } 
                } else if (hitColumn === 0 && hitRow === 9) {
                    if (userPlayer.gameboard.containsShip(hitColumn +1, hitRow) ||
                        userPlayer.gameboard.containsShip(hitColumn, hitRow -1)) {
                            damagedLocations.push(location);
                    }
                } else if (hitColumn === 9 && hitRow === 0) {
                    if (userPlayer.gameboard.containsShip(hitColumn -1, hitRow) ||
                        userPlayer.gameboard.containsShip(hitColumn, hitRow +1)) {
                            damagedLocations.push(location);
                        }
                } else if (hitColumn === 9 && hitRow === 9) {
                    if (userPlayer.gameboard.containsShip(hitColumn -1, hitRow) ||
                        userPlayer.gameboard.containsShip(hitColumn, hitRow -1)) {
                            damagedLocations.push(location);
                        }
                } else if (hitColumn === 0) {
                    if (userPlayer.gameboard.containsShip(hitColumn +1, hitRow) ||
                        userPlayer.gameboard.containsShip(hitColumn, hitRow +1) ||
                        userPlayer.gameboard.containsShip(hitColumn, hitRow -1)) {
                            damagedLocations.push(location);
                        }
                } else if (hitColumn === 9) {
                    if (userPlayer.gameboard.containsShip(hitColumn -1, hitRow) ||
                    userPlayer.gameboard.containsShip(hitColumn, hitRow +1) ||
                    userPlayer.gameboard.containsShip(hitColumn, hitRow -1)) {
                        damagedLocations.push(location);
                    }
                } else if (hitRow === 0) {
                    if (userPlayer.gameboard.containsShip(hitColumn +1, hitRow) ||
                        userPlayer.gameboard.containsShip(hitColumn -1, hitRow) ||
                        userPlayer.gameboard.containsShip(hitColumn, hitRow +1)) {
                            damagedLocations.push(location);
                        }
                    } else if (hitRow === 9) {
                        if (userPlayer.gameboard.containsShip(hitColumn +1, hitRow) ||
                            userPlayer.gameboard.containsShip(hitColumn -1, hitRow) ||
                            userPlayer.gameboard.containsShip(hitColumn, hitRow -1)) {
                                damagedLocations.push(location);
                            }
                    } else {
                        if (userPlayer.gameboard.containsShip(hitColumn +1, hitRow) ||
                            userPlayer.gameboard.containsShip(hitColumn -1, hitRow) ||
                            userPlayer.gameboard.containsShip(hitColumn, hitRow +1) ||
                            userPlayer.gameboard.containsShip(hitColumn, hitRow -1)) {
                                damagedLocations.push(location);
                            }
                    }
                });
                let randomDamage = damagedLocations[Math.floor(Math.random() * damagedLocations.length)];
                let damageColumn = Number(randomDamage.slice(0, 1));
                let damageRow = Number(randomDamage.slice(1, 2));
                let damageGuesses = [];
                if (damageColumn === 0 && damageRow === 0) {
                    damageGuesses.push(`${damageColumn +1}${damageRow}`);
                damageGuesses.push(`${damageColumn}${damageRow +1}`);
            } else if (damageColumn === 0 && damageRow === 9) {
                damageGuesses.push(`${damageColumn +1}${damageRow}`);
                damageGuesses.push(`${damageColumn}${damageRow -1}`);
            } else if (damageColumn === 9 && damageRow === 0) {
                damageGuesses.push(`${damageColumn -1}${damageRow}`);
                damageGuesses.push(`${damageColumn}${damageRow +1}`);
            } else if (damageColumn === 9 && damageRow === 9) {
                damageGuesses.push(`${damageColumn -1}${damageRow}`);
                damageGuesses.push(`${damageColumn}${damageRow -1}`);
            } else if (damageColumn === 0) {
                damageGuesses.push(`${damageColumn +1}${damageRow}`);
                damageGuesses.push(`${damageColumn}${damageRow +1}`);
                damageGuesses.push(`${damageColumn}${damageRow -1}`);
            } else if (damageColumn === 9) {
                damageGuesses.push(`${damageColumn -1}${damageRow}`);
                damageGuesses.push(`${damageColumn}${damageRow +1}`);
                damageGuesses.push(`${damageColumn}${damageRow -1}`);
            } else if (damageRow === 0) {
                damageGuesses.push(`${damageColumn +1}${damageRow}`);
                damageGuesses.push(`${damageColumn -1}${damageRow}`);
                damageGuesses.push(`${damageColumn}${damageRow +1}`);
            } else if (damageRow === 9) {
                damageGuesses.push(`${damageColumn +1}${damageRow}`);
                damageGuesses.push(`${damageColumn -1}${damageRow}`);
                damageGuesses.push(`${damageColumn}${damageRow -1}`);
            } else {
                damageGuesses.push(`${damageColumn +1}${damageRow}`);
                damageGuesses.push(`${damageColumn -1}${damageRow}`);
                damageGuesses.push(`${damageColumn}${damageRow +1}`);
                damageGuesses.push(`${damageColumn}${damageRow -1}`);
            }
            let validGuesses = damageGuesses.filter(item => {
                let itemColumn = item.slice(0, 1);
                let itemRow = item.slice(1, 2);
                return userPlayer.gameboard.notGuessed(itemColumn, itemRow);
            })

            console.log(validGuesses);

            let randomDamageGuess = validGuesses[Math.floor(Math.random() * validGuesses.length)];
            this.makeAttack(randomDamageGuess.slice(0, 1), randomDamageGuess.slice(1, 2), userPlayer.gameboard);
            userPlayer.renderPlayerBoard();
        } else {
            let notGuessed = [];
            for (let i = 0; i < userPlayer.gameboard.board.length; i++) {
                for (let j = 0; j < userPlayer.gameboard.board[i].length; j++) {
                    if (userPlayer.gameboard.notGuessed(i, j) === true) {
                        notGuessed.push(`${i}${j}`);
                    }
                }
            }
            if (notGuessed.length > 0) {
                let randomGuess = notGuessed[Math.floor(Math.random() * notGuessed.length)];
                let randomColumn = randomGuess.slice(0, 1);
                let randomRow = randomGuess.slice(1, 2);
                this.makeAttack(randomColumn, randomRow, userPlayer.gameboard);
                userPlayer.renderPlayerBoard();
            }
        }
    }

    renderPlayerBoard() {
        for (let i = 0; i < this.gameboard.board.length; i++) {
            for (let j = 0; j < this.gameboard.board[i].length; j++) {
                if (this.gameboard.board[i][j] !== 'hit' &&
                    this.gameboard.board[i][j] !== 'miss' &&
                    this.gameboard.board[i][j] !== '') {
                        let square = document.getElementById(`p${j}${i}`);
                        let shipName = this.gameboard.board[i][j].name.toLowerCase().replace(/\s/g, '-');
                        square.style.backgroundColor = 'blue';
                    } else if (this.gameboard.board[i][j] === 'miss') {
                        let square = document.getElementById(`p${j}${i}`);
                        let missIMG = document.createElement('img');
                        missIMG.classList.add('targetMiss');
                        missIMG.src = Circle;
                        while (square.hasChildNodes()) {
                            square.removeChild(square.lastChild);
                        }
                        square.appendChild(missIMG);
                        square.style.background = 'none';
                    } else if (this.gameboard.board[i][j] === 'hit') {
                        let square = document.getElementById(`p${j}${i}`);
                        let hitIMG = document.createElement('img');
                        hitIMG.classList.add('targetHit');
                        hitIMG.src = Hit;
                        while (square.hasChildNodes()) {
                            square.removeChild(square.lastChild);
                        }
                        square.appendChild(hitIMG);
                        square.style.background = 'none';
                    }
            }
        }
    }

    renderEnemyBoard() {
        for (let i = 0; i < this.gameboard.board.length; i++) {
            for (let j = 0; j < this.gameboard.board[i].length; j++) {
                if (this.gameboard.board[i][j] === 'miss') {
                    let square = document.getElementById(`e${j}${i}`);
                    let missIMG = document.createElement('img');
                    missIMG.classList.add('targetMiss');
                    missIMG.src = Circle;
                    while (square.hasChildNodes()) {
                        square.removeChild(square.lastChild);
                    }
                    square.appendChild(missIMG);
                    square.style.background = 'none';
                } else if (this.gameboard.board[i][j] === 'hit') {
                    let square = document.getElementById(`e${j}${i}`);
                    let hitIMG = document.createElement('img');
                    hitIMG.classList.add('targetHit');
                    hitIMG.src = Hit;
                    while (square.hasChildNodes()) {
                        square.removeChild(square.lastChild);
                    }
                    square.appendChild(hitIMG);
                }
            }
        }
    }
    winGame() {
        alertGameOver(this.name);
    }
}

export { Player }