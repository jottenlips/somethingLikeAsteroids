export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function generateRandomCoordinate() {
    return getRandomInt(400) - 200;
}

export function generateRandomSpeed() {
    // returns 5-10
    return getRandomInt(5) + 5;
}