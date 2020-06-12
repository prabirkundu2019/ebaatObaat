import { ADDRESS } from '../Constants';

const initialState = {
    addresses: [],
    deliveryAddress: {}
};

const checkoutReducer = (state = initialState, action) => {  
    
    switch(action.type) {                
        case ADDRESS: 
            return {
                ...state,
                addresses: action.payload
            };
        case "DELIVERY_ADDRESS":
            return {
                ...state,
                deliveryAddress: action.payload
            }
        default:
            return state;
    }
}

export default checkoutReducer;