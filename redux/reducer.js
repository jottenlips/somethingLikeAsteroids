const defaultState = {
    asteroids: [],
    shouldFireLaser: false,
    laserDirectionX: 0,
    laserDirectionY: 0,
    laserDirectionZ: 0
};

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "UPDATE_ASTEROID_X":
            if (action.payload.x !== null)  {
                const x_index = action.payload.id;
                const x_pre = state.asteroids.slice(0, x_index);
                const x_curr = state.asteroids[x_index];
                const x_post = state.asteroids.slice(x_index + 1);

                const x_currAsteroid = {
                    x: action.payload.x,
                    y: x_curr.y,
                    z: x_curr.z,
                    speed: x_curr.speed,
                    size: x_curr.size
                };

                return {
                    asteroids: x_pre.concat(x_currAsteroid).concat(x_post)
                };
            } else {
                return state
            }

        case "UPDATE_ASTEROID_Y":
            if (action.payload.y !== null) {
                const y_index = action.payload.id;
                const y_pre = state.asteroids.slice(0, y_index);
                const y_curr = state.asteroids[y_index];
                const y_post = state.asteroids.slice(y_index + 1);

                const y_currAsteroid = {
                    x: action.payload.x,
                    y: y_curr.y,
                    z: y_curr.z,
                    speed: y_curr.speed,
                    size: y_curr.size
                };

                return {
                    asteroids: y_pre.concat(y_currAsteroid).concat(y_post)
                };
            } else {
                return state
            }

        case "UPDATE_ASTEROID_Z":
            if (action.payload.z !== null) {
                const z_index = action.payload.id;
                const z_pre = state.asteroids.slice(0,z_index);
                const z_curr = state.asteroids[z_index];
                const z_post = state.asteroids.slice(z_index + 1);

                const z_currAsteroid = {
                    x: action.payload.x,
                    y: z_curr.y,
                    z: z_curr.z,
                    speed: z_curr.speed,
                    size: z_curr.size
                };
                return {
                    asteroids: z_pre.concat(z_currAsteroid).concat(z_post)
                };
            } else {
                return state
            }

        case "ASTEROID_CREATED":
            return {
                asteroids: state.asteroids.concat(action.payload)
            };
        case "FIRE_LASER":
            return {
                asteroids: state.asteroids,
                shouldFireLaser: true,
                laserDirectionX: action.payload.x,
                laserDirectionY: action.payload.y,
                laserDirectionZ: action.payload.z,
            };
        case "LASER_DID_FIRE":
            return {
                asteroids: state.asteroids,
                shouldFireLaser: false,
                laserDirectionX: 0,
                laserDirectionY: 0,
                laserDirectionZ: 0,
            };
        default:
            return state;
    }
};