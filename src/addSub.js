import { useState,useReducer } from "react";
const ACTION ={
    INCREMENT:"increment",
    DECREMENT:"decrement"
}
function reducer(state,action){
    switch(action.type){
        case ACTION.INCREMENT:
            return {count:state.count+1};
        case ACTION.DECREMENT:
            return {count:state.count-1};
    
}
}
function AddSub(){
const [state,dispatch]=useReducer(reducer,{count:0});
function increment(){
    dispatch({type:ACTION.INCREMENT})
}
function decrement(){
    dispatch({type:ACTION.DECREMENT})
    // setCount(preCount=>preCount-1);
}

return(
    <div>
        <button onClick={increment}>+</button>
        <span>{state.count}</span>
        <button onClick={decrement}>-</button>   
    </div>
)

}
export default AddSub;