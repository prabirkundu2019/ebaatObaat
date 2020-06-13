import { MENUS } from '../Constants';
import axios from 'axios';

export const getMenus = () => dispatch => {
    let data = {  
        "ApiKey":  'AJHG56778HGJGJHG211'
    }
    axios.post('http://quickbillingapi.ezoneindiaportal.com/api/ProductPrice/GetAll', data,
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