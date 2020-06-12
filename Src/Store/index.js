import { createStore, combineReducers, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import cartReducer from '../Reducer/cartReducer';
import checkoutReducer from '../Reducer/checkoutReducer';

const rootReducer = combineReducers(
    { 
        cart: cartReducer,
        checkout: checkoutReducer
    }
);

const middleware = [thunk];

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(...middleware));
}

export default configureStore;


// import { createStore, combineReducers } from 'redux'
// import cartItems from '../Reducer/cartReducer';

// export default store = createStore(cartItems)