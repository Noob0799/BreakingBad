const initState = {
    charDetails: {}
};

const charReducer = (state = initState, action) => {
    console.log(action.type);
    if(action.type === 'UPDATE_CHAR_INFO'){
        console.log(action.charObj);
        state.charDetails = {...action.charObj};
    }
    console.log('State', state);
    return state;
}

export default charReducer;