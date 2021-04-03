export const initialState = {
    idAdm: '',
    idCourt: ''
};

export const UserReducer = (state, action) => {
    switch(action.type)
    {
        case 'setIdAdm':
            return { ...state, idAdm: action.payload.idAdm };
        break;
        case 'setIdCourt':
            return { ...state, idCourt: action.payload.idCourt };
        break;
        default:
            return state;
    }
}