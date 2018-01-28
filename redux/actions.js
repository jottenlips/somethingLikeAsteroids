export const updateAsteroidX = data => ({
    // data = {id, x}
    type: "UPDATE_ASTEROID_X",
    payload: data

})

;export const updateAsteroidY = data => ({
    // data = {id, y}
    type: "UPDATE_ASTEROID_Y",
    payload: data

})

;export const updateAsteroidZ = data => ({
    // data = {id, z}
    type: "UPDATE_ASTEROID_Z",
    payload: data
});

export const asteroidCreated = asteroid => ({
    type: "ASTEROID_CREATED",
    payload: asteroid
});

export const fireLaser = laserData => ({
    type: "FIRE_LASER",
    payload: laserData
});

export const laserDidFire = () => ({
    type: "LASER_DID_FIRE",
    payload: {}
});
