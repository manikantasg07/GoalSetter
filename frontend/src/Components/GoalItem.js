import {useDispatch,useSelector} from "react-redux";
import { reset, deleteGoal , getGoals} from "../features/goals/goalSlice";
import { useState } from "react";
import { updateGoal } from "../features/goals/goalSlice";

function GoalItem({goal}) {
  const [update,setUpdate] = useState(false);
  const [text,setText] = useState("")
  const dispatch = useDispatch();

  const onChange = (e)=>{
    setText(e.target.value);
  }
  const onDelete = (e)=>{
    dispatch(deleteGoal(goal._id));
  }
  const onSubmit=(e)=>{
    e.preventDefault();
    dispatch(updateGoal({goalId: goal._id,text : text}));
    setUpdate(false);
  }
  return (
    <div className='goal'>
        <div>
            {new Date(goal.createdAt).toLocaleString('en-US')}
            <h2>{goal.text}</h2>
            {update && <section className="form">
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <input type="text" className="form-control" id="text" name="text" value={text} placeholder="Enter the updated goal" onChange={onChange}/>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-block">submit</button>
                  </div>
                </form>
            </section>}
            {!update && <button className="btn btn-block" onClick={function(){setUpdate(true)}}>Update Goal</button>}
            <button className='close' onClick={onDelete}>X</button>
        </div> 
    </div>
  )
}

export default GoalItem