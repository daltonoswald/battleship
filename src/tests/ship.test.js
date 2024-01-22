import { Ship } from "../ship.js";

test('check health', () => {
    let largeShip = new Ship('carrier', 5);
    expect(largeShip.checkHealth()).toBe(5);
})

test('hit', () => {
    let smallShip = new Ship('submarine', 3);
    smallShip.hit();
    expect(smallShip.checkHealth()).toBe(2);
    expect(smallShip.isSunk).toBe(false);
})

test('damaged', () => {
    let tinyShip = new Ship('destroyer', 2);
    expect(tinyShip.isDamaged()).toBe(false);
    tinyShip.hit();
    expect(tinyShip.checkHealth()).toBe(1);
    expect(tinyShip.isDamaged()).toBe(true);
})

test('sunk', () => {
    let bigShip = new Ship('battleship', 4);
    bigShip.hit();
    bigShip.hit();
    bigShip.hit();
    bigShip.hit();
    expect(bigShip.isSunk).toBe(true);
})