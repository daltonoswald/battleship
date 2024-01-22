import { Ship } from "../ship.js";
import { Gameboard } from "../gameboard.js";

test('gameboard creation test', () => {
    let test = new Gameboard('test');
    test.board[3][5] = 'hello';
    expect(test.board[3][5]).toEqual('hello');
});

test('ship placement', () => {
    let newGameboard = new Gameboard('test');
    newGameboard.placeShip(2, 5, 'testShip');
    expect(newGameboard.board[2][5]).toBe('testShip');
})

test('ship class placement', () => {
    let newGameboard = new Gameboard('test');
    let newShip = new Ship('testShip', 3);
    newGameboard.placeShip(8, 2, newShip);
    expect(newGameboard.board[8][2]).toEqual(newShip);
});

test('receive attack', () => {
    let newGameboard = new Gameboard('test');
    let newShip = new Ship('testShip', 3);
    newGameboard.placeShip(8, 2, newShip);
    newGameboard.receiveAttack(8, 2);
    expect(newShip.checkHealth()).toEqual(2);
})

test('attacks on same ship to sink', () => {
    let newGameboard = new Gameboard('test');
    let newShip = new Ship('testShip', 3);
    newGameboard.placeShip(5, 1, newShip);
    newGameboard.placeShip(5, 2, newShip);
    newGameboard.placeShip(5, 3, newShip);
    newGameboard.receiveAttack(5, 1);
    newGameboard.receiveAttack(5, 2);
    newGameboard.receiveAttack(5, 3);
    expect(newShip.isSunk).toBe(true);
});

test('attack misses', () => {
    let newGameboard = new Gameboard('test');
    let newShip = new Ship('testShip', 3);
    newGameboard.placeShip(5, 1, newShip);
    newGameboard.receiveAttack(2, 5);
    expect(newGameboard.board[2][5]).toBe('miss');
});

test('miss log', () => {
    let newGameboard = new Gameboard('test');
    let newShip = new Ship('testShip', 3);
    newGameboard.placeShip(5, 1, newShip);
    newGameboard.receiveAttack(2, 5);
    newGameboard.receiveAttack(5, 1);
    newGameboard.receiveAttack(5, 3);
    expect(newGameboard.reportMisses()).toEqual([(2, 5), (5, 3)]);
})

test('check all not sunk', () => {
    let newGameboard = new Gameboard('test');
    let newShip = new Ship('testShip', 3);
    newGameboard.placeShip(5, 1, newShip);
    newGameboard.placeShip(5, 2, newShip);
    newGameboard.placeShip(5, 3, newShip);
    newGameboard.receiveAttack(5, 1);
    newGameboard.receiveAttack(5, 2);
    expect(newGameboard.checkAllShipsSunk()).toBe(false);
})

test('one sunk one not', () => {
    let newGameboard = new Gameboard('test');
    let newShipOne = new Ship('testShipOne', 3);
    newGameboard.placeShip(5, 1, newShipOne);
    newGameboard.placeShip(5, 2, newShipOne);
    newGameboard.placeShip(5, 3, newShipOne);
    newGameboard.receiveAttack(5, 1);
    newGameboard.receiveAttack(5, 2);
    newGameboard.receiveAttack(5, 3);
    let newShipTwo = new Ship('testShipTwo', 2);
    newGameboard.placeShip(2, 1, newShipTwo);
    newGameboard.placeShip(2, 2, newShipTwo);
    expect(newGameboard.checkAllShipsSunk()).toBe(false);
});

test('check all sunk', () => {
    let newGameboard = new Gameboard('test');
    let newShip = new Ship('testShip', 3);
    newGameboard.placeShip(5, 1, newShip);
    newGameboard.placeShip(5, 2, newShip);
    newGameboard.placeShip(5, 3, newShip);
    newGameboard.receiveAttack(5, 1);
    newGameboard.receiveAttack(5, 2);
    newGameboard.receiveAttack(5, 3);
    expect(newGameboard.checkAllShipsSunk()).toBe(true);
})