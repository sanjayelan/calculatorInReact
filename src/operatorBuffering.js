import { ACTION } from "./App";
export default function OperatorBuffering({dispatch,operation}){
    return (
        <>
        <button onClick={()=>dispatch({type:ACTION.CHOOSE_OPERATER, payload:{operation}})}>
            {operation}
        </button>
        </>
    )
}
