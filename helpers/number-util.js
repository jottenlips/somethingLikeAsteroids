export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function generateRandomCoordinate() {

	//needs 2 change
    return getRandomInt(-200)-100;
}

export function generateRandomSpeed() {
    // returns 5-10
    return getRandomInt(5) + 5;
}

export function isNegative(num) {
	return (num < 0);
}