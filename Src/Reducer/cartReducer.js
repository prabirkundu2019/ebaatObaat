import { MENUS, SEARCH } from '../Constants';
const initialState = {
    items: [],
    filteredItems: [],
    cartItems: [],
    totalItem: 0,
    totalPrice: 0
};
const cartReducer = (state = initialState, action) => {
    switch(action.type)
    {        
        case MENUS:
            return {
                ...state,
                items: action.payload,
                filteredItems: action.payload
            };
        case SEARCH:
            let filtereditems = state.filteredItems.filter(item => {
                //console.log(item);
                return item.product.toLowerCase().includes(action.payload.toLowerCase())
            })
            //console.log(filtereditems);
            return {
                ...state, 
                items: filtereditems
            };
        case "ADD_TO_CART":
            //check if the action id exists in the addedItems
            let existed_item = state.cartItems.find(item=> action.payload.id === item.id)
            if(existed_item)
            {
                let index = state.cartItems.findIndex(item=> action.payload.id === item.id);
                let cart1 = [...state.cartItems];
                let item = {...cart1[index], quantity:cart1[index].quantity+1}
                cart1[index] = item;
                return{
                    ...state,
                    cartItems: cart1,
                    totalItem: state.totalItem + 1, 
                    totalPrice: state.totalPrice + action.payload.productPrice 
                }
            }else{
                //addedItem.quantity = 1;
                //calculating the total
                
                let newTotalItem = state.totalItem + 1
                let newTotal = state.totalPrice + action.payload.productPrice 
                
                return{
                    ...state,
                    cartItems: [...state.cartItems, action.payload],
                    //items: [...state.items, action.payload],
                    totalItem: newTotalItem,
                    totalPrice : newTotal
                }
            }

        case "REMOVE_FROM_CART":
            let itemToRemove = state.cartItems.find(item=> action.payload.id === item.id)
            let new_items = state.addedItems.filter(item=> action.payload.id !== item.id)
            
            //calculating the total
            let newTotalItem = state.totalItem - 1
            let newTotal = state.totalPrice - (itemToRemove.productPrice * itemToRemove.quantity )
            console.log(itemToRemove)
            return{
                ...state,
                cartItems: new_items,
                totalItem: newTotalItem,
                totalPrice: newTotal
            }

        case "ADD_QUANTITY":
          addedItem = state.cartItems.find(item=> item.id === action.payload.id)
          action.payload.quantity += 1 
          newTotalItem = state.totalItem + 1
          newTotal = state.totalPrice + action.payload.productPrice
          return{
              ...state,
              totalItem: newTotalItem,
              totalPrice: newTotal
          }

        case "SUB_QUANTITY":
            index = state.cartItems.findIndex(item=> item.id === action.payload.id);
            if(index > -1)
            {
                let cart1 = [...state.cartItems];
                if(cart1[index].quantity > 1) {
                    let item = {...cart1[index], quantity:cart1[index].quantity-1}
                    cart1[index] = item;
                }else {
                    cart1.splice(index, 1);
                }
                newTotal = 0;
                newTotalItem = 0;
                for(var i=0; i<cart1.length; i++)
                {
                    newTotal += cart1[i].productPrice * cart1[i].quantity;
                    newTotalItem += cart1[i].quantity;
                }
                return{
                    ...state,
                    cartItems: cart1,
                    totalItem: newTotalItem,
                    totalPrice: newTotal
                }
            }            
    }
    return state;
}

export default cartReducer;