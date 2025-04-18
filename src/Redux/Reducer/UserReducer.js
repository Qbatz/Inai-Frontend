
import { GET_USER_INFO_REDUCER, SIGN_IN_REDUCER, LOG_OUT, LOG_IN, SIGN_UP_VERIFICATION_REDUCER, OTP_SEND_REDUCER, STORE_VERIFY_CODE, ACCOUNT_REGISTER_REDUCER } from "../../Utils/Constant";

export const initialState = {

    token: '',
    isLoggedIn: false,
    is_verified: null,
    otpValue: 0,
    verifyCode: '',
    isTrue: false,
    emailId: '',
    userDetails: [],
}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {

        case SIGN_IN_REDUCER:
          return { ...state, token : action.payload.token }
 
          case LOG_IN:
            return { ...state,  isLoggedIn: true  }
   
          case LOG_OUT:
          return { ...state,  isLoggedIn: false  }

          case SIGN_UP_VERIFICATION_REDUCER:
            return { ...state, is_verified: action.payload.is_verified , emailId: action.payload.emailId}
   
         case OTP_SEND_REDUCER:
            return { ...state, otpValue: action.payload.response.otp }
            
         case STORE_VERIFY_CODE:
            return { ...state, verifyCode: action.payload || '' }
   
         case ACCOUNT_REGISTER_REDUCER:
            return { ...state, isTrue: true , is_verified: null}

        case GET_USER_INFO_REDUCER:
            return { ...state, userDetails: action.payload.users };

        default:
            return state;
    }


}
export default UserReducer;