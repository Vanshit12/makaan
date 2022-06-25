export const  authReducer = (state, action) => {

    switch (action.type){
        case "LOGOUT":
            return {...state,authUser:null}
        case "LOGIN":
            return {...state,authUser:action.payload}
        case "NOTIFICATION_FETCH":
            return {...state,notifications:[...action.payload]}
        case "USER_INFO_FETCH":
            return {...state,user_info:{...action.payload}}
        case "SITE_SETTINGS":
            return {...state,site_settings:{...action.payload}}
        default:
            return state;
    }
}