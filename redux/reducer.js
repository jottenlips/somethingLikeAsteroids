const defaultState = {
    text: "Tokyo",
    keyword: "tokyo"
};

export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "UPDATE_ASTEROID_LOCATION":
            return {
                text: action.payload.text,
                keyword: action.payload.keyword
            };
        default:
            return state;
    }
};