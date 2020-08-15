import { MENUS } from '../Constants';
import axios from 'axios';

export const getMenus = (catId, subCatId) => dispatch => {
    console.log(catId, subCatId);
    let url = "";
    let data = {};
    if(subCatId == 0)
    {
        url= "http://api.pimento.in/api/ProductPrice/GetAllByCategory";
        data = {  
            "ApiKey":  'AJHG56778HGJGJHG111',
            "productCategoryId" : catId,
        }
    }else{
        url = "http://api.pimento.in/api/ProductPrice/GetAllBySubCategory";
        data = {  
            "ApiKey":  'AJHG56778HGJGJHG111',
            "productCategoryId" : catId,
            "productSubCategoryId":subCatId,
        }
    }
    
    axios.post(url, data,
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