import { ADDRESS, ORDER } from '../Constants';

const initialState = {
    addresses: [],
    deliveryAddress: {},
    user: {},
    orders: []
};

const checkoutReducer = (state = initialState, action) => {  
    
    switch(action.type) {                
        case ADDRESS: 
            return {
                ...state,
                addresses: action.payload
            };
        case ORDER:
            return {
                ...state,
                orders: action.payload
            }
        case "DELIVERY_ADDRESS":
            return {
                ...state,
                deliveryAddress: action.payload
            }
        case "SET_USER":
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default checkoutReducer;