const merchantReducer = (state = {
    name: "",
    logoUrl: "",
    user: ""
}, action) => {
    switch (action.type) {
        case "SET_MERCHANT_NAME":
            state = {
                ...state,
                name: action.payload
            };            
            break;
        case "SET_MERCHANT_LOGOURL":
            state = {
                ...state,
                logoUrl: action.payload
            };
            break;
        case "SET_USER_NAME":
            state = {
                ...state,
                user: action.payload
            };
            break;
    }
    return state;
};

export default merchantReducer;