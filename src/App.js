import {useReducer} from "react";
import  DigitBuffering  from "./digitBuffering";
import  OperatorBuffering  from "./operatorBuffering";

export const ACTION={
 ADD_DIGIT: "add digit",
 CLEAR: "clear",
 CHOOSE_OPERATER : "operater",
 DELETE_DIGIT: "delete digit",
 EVALUATE: "evaluate"
}
function reducer(state,{type,payload}){
  switch(type){
    case ACTION.ADD_DIGIT:
      if(state.currentOperand==="0" && payload.digit==="0"){
        return state
      }
      if(payload.digit==="." && state.currentOperand.includes(".")){
        return state
      }
      return { 
      ...state,
      currentOperand: `${state.currentOperand || ""}${payload.digit}`,
  }
  case ACTION.EVALUATE:
    if(state.currentOperand==null || state.previousOperand==null || state.operation==null){
      return state
    }
    return {
      ...state,
      previousOperand: null,
      operation: null,
      currentOperand:evaluate(state)
    }
  case ACTION.CHOOSE_OPERATER:
    if(state.previousOperand==null && state.currentOperand==null){
      return state
    }
    if(state.currentOperand==null){
      return {
        ...state,
        operation: payload.operation
      }
    }
    if(state.previousOperand==null){
      return {
        ...state,
        operation:payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: null
      }
    }
      return{
        ...state,
        previousOperand:evaluate(state),
        operation:payload.operation,
        currentOperand: null
    }
    case ACTION.DELETE_DIGIT:
      if(state.currentOperand==null){
        return{
          ...state,
          currentOperand:state.previousOperand,
          previousOperand:null,
          operation:null

        }
      }
      return {
        ...state,
        currentOperand:state.currentOperand.slice(0,-1)
      }
    case ACTION.CLEAR:
      return {}
}

}
function evaluate({operation,previousOperand,currentOperand}){
  console.log(operation,previousOperand,currentOperand);
  const prev=parseFloat(previousOperand);
  const current=parseFloat(currentOperand);
  if(isNaN(prev) && isNaN(current)){
    return '';
  }
  let ans=""
  switch(operation){
    case "+":
      ans=prev+current;
      break;
    case "-":
      ans=prev-current;
      break;
    case "*":
      ans=prev*current;
      break;
    case "/":
      ans=prev/current;
      break;
  }
  return ans.toString();
}
function App(){
  const[{currentOperand,previousOperand,operation},dispatch]=useReducer(reducer,{})
  return(
    <div className="container-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand}{operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({type:ACTION.CLEAR})}>AC</button>
      <button onClick={()=>{
        dispatch({type:ACTION.DELETE_DIGIT})
      }}>DEL</button>
      <OperatorBuffering dispatch={dispatch} operation={"/"}/>

      <DigitBuffering dispatch={dispatch} digit={"1"}/>
      <DigitBuffering dispatch={dispatch} digit={"2"}/>
      <DigitBuffering dispatch={dispatch} digit={"3"}/>
      <OperatorBuffering dispatch={dispatch} operation={"*"}/>

      <DigitBuffering dispatch={dispatch} digit={"4"}/>
      <DigitBuffering dispatch={dispatch} digit={"5"}/>
      <DigitBuffering dispatch={dispatch} digit={"6"}/>
      <OperatorBuffering dispatch={dispatch} operation={"+"}/>
      <DigitBuffering dispatch={dispatch} digit={"7"}/>
      <DigitBuffering dispatch={dispatch} digit={"8"}/>
      <DigitBuffering dispatch={dispatch} digit={"9"}/>
      <OperatorBuffering dispatch={dispatch} operation={"-"}/>
      <DigitBuffering dispatch={dispatch} digit={"."}/>
      <DigitBuffering dispatch={dispatch} digit={"0"}/>
      <button className="span-two" onClick={()=>{dispatch({type:ACTION.EVALUATE})}}>=</button>




    </div>
  );
}
export default App;