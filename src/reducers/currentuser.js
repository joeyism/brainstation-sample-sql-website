
export default(state = {}, payload) => {
    switch (payload.type){
        case 'set':
            return {
            ...state, 
            currentuser: payload.user
        };
        default:
            return state;
    }
}
