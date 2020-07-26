// import addLeadReducer from "@add/addLeadReducer";
import { combineReducers } from "redux";
import loginReducer from '@login/LoginReducer'
import forgotReducer from '@forgotPassword/ForgotReducer'
import registerReducer from '@register/RegisterReducer'
import homePageReducer from '@homepage/HomePageReducer'
import productGridReducer from '@productGrid/ProductGridReducer'
import cartContainerReducer from '@cartContainer/CartContainerReducer'
import productDetailsReducer from '@category/ProductDetailsReducer'



const appReducer = combineReducers({
    loginReducer,
    forgotReducer,
    registerReducer,
    homePageReducer,
    productGridReducer,
    cartContainerReducer,
    productDetailsReducer
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
