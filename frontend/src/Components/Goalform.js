import { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {createGoal} from "../features/goals/goalSlice"


function Goalform() {

  const [text,setText]  = useState("");

  const dispatch = useDispatch();

  function onSubmit(e){
    e.preventDefault();
    dispatch(createGoal({text}));
    setText("");
  }

  return (
   <>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Goal</label>
                <input type="text" name="text" id="text" value={text} placeholder="" onChange={function(e){
                    setText(e.target.value)}
                    }/>
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">Add Goal</button>
            </div>
        </form>
    </section>
   </>
  )
}

export default Goalform