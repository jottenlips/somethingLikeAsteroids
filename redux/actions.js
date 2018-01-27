export const updateAsteroidPosition = data => ({

    // data = {
    // id
    // x
    // y
    // z
    // }

    type: "UPDATE_ASTEROID_POSITION",
    payload: data
});

export const asteroidCreated = asteroid => ({
    type: "ASTEROID_CREATED",
    payload: asteroid
})
