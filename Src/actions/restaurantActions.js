import { MENUS } from '../Constants';
import axios from 'axios';

export const getMenus = (catId) => dispatch => {
    let data = {  
        "ApiKey":  'AJHG56778HGJGJHG111',
        "productCategoryId" : catId
    }
    axios.post('http://api.pimento.in/api/ProductPrice/GetAllByCategory', data,
    {
        headers: {"Content-Type":  'application/json'}
    })
    // .then(company => {
    //   console.log(company  );
    // })
    .then(menu => dispatch({
        type: MENUS,
        payload: menu.data
    }));
}