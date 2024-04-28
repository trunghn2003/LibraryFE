import { useDispatch, useSelector } from "react-redux";
import { down, reset, up } from "../../actions/couter";

function Couter () {
    const couter  = useSelector(state => state.couterReducer);
    console.log(couter);
    const dispatch = useDispatch();
    return (
        <>
        <h2>Couter : {couter}</h2>
        <button onClick={() => dispatch(up())}>UP</button>
        <button onClick={() => dispatch(down())}>DOWN</button>
        <button onClick={() => dispatch(reset())}>RESET</button>
        </>
    )
}
export default Couter;