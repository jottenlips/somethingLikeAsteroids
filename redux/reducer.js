const defaultState = {
    asteroids: []
};

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "UPDATE_ASTEROID_X":
            return {
                state
            };
        case "UPDATE_ASTEROID_Y":
            return {
                state
            };
        case "UPDATE_ASTEROID_Z":
            return {
                state
            };
        case "ASTEROID_CREATED":
            return {
                asteroids: state.asteroids.concat(action.payload)
            };
        default:
            return state;
    }
};