export default(state = { comments: []}, payload) => {
    console.log("payload", payload);
    switch (payload.type){
        case 'add':
            return {
            ...state, 
            comments: payload.comments
        };
        default:
            return state;
    }
}
