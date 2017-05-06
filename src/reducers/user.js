
export default(state = [], payload) => {
    switch (payload.type){
        case 'add':
            return [...state, payload.user];
        default:
            return state;
    }
}
