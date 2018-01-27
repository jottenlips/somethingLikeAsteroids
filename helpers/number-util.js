export function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export function generateRandomSpeed() {
  //
    return getRandomInt(40000) + 10000;
}

export function isNegative(num) {
	return (num < 0);
}

export function randomSphereCoordinate(radius){
   const u = Math.random();
   const v = Math.random();
   const theta = 2 * Math.PI * u;
   const phi = Math.acos(2 * v - 1);
   const x = (radius * Math.sin(phi) * Math.cos(theta));
   const y = (radius * Math.sin(phi) * Math.sin(theta));
   const z = (radius * Math.cos(phi));
   const point = {x:x,y:y,z:z};
   return point;
}