let initialState={
    UserData:undefined,
}

export default function UserDataReducer(currentState=initialState,action){
switch (action.type) {
        case "UserData":
            return {
                UserData:action.payload,
                // ...currentState
            }
       
    default:return currentState;
        
}
}