// import addLeadReducer from "@add/addLeadReducer";
import { combineReducers } from "redux";
import loginReducer from '@login/LoginReducer'
import forgotReducer from '@forgotPassword/ForgotReducer'

const appReducer = combineReducers({
    loginReducer,
    forgotReducer
});

const rootReducer = (state, action) => {
return appReducer(state, action);
};

export default rootReducer;
