export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function generateRandomCoordinate() {

	//needs 2 change
    return getRandomInt(400) - 200;
}

export function generateRandomSpeed() {
    // returns 5-10
    return getRandomInt(5) + 5;
}