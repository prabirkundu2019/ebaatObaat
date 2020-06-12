const initialState = {
    cartItems: [],
    totalItem: 0,
    totalPrice: 0
};
const cartReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case "ADD_TO_CART":
            //check if the action id exists in the addedItems
            let existed_item = state.cartItems.find(item=> action.payload.id === item.id)
            if(existed_item)
            {
                action.payload.quantity += 1 
                return{
                    ...state,
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
            addedItem = state.cartItems.find(item=> item.id === action.payload.id)
            //if the qt == 0 then it should be removed
            action.payload.quantity -= 1 
            newTotalItem = state.totalItem - 1
            if(addedItem.quantity === 1){
                let new_items = state.cartItems.filter(item=>item.id !== action.payload.id)
                newTotal = state.totalPrice - addedItem.productPrice
                return{
                    ...state,
                    cartItems: new_items,
                    totalItem: newTotalItem,
                    totalPrice: newTotal
                }
            }else {
                addedItem.quantity -= 1
                let newTotal = state.totalPrice - addedItem.productPrice
                return{
                    ...state,
                    totalItem: newTotalItem,
                    totalPrice: newTotal
                }
            }
    }
    return state;
}

export default cartReducer;