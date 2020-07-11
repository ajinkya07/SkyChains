// import addLeadReducer from "@add/addLeadReducer";
import { combineReducers } from "redux";
import loginReducer from '@login/LoginReducer'
import forgotReducer from '@forgotPassword/ForgotReducer'
import registerReducer from '@register/RegisterReducer'



const appReducer = combineReducers({
    loginReducer,
    forgotReducer,
    registerReducer
});

const rootReducer = (state, action) => {
return appReducer(state, action);
};

export default rootReducer;
