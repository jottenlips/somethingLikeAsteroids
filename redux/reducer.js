const defaultState = {
    asteroids: []
};

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "UPDATE_ASTEROID_LOCATION":
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