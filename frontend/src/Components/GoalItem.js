import {useDispatch,useSelector} from "react-redux";
import { reset, deleteGoal , getGoals} from "../features/goals/goalSlice";

function GoalItem({goal}) {
  const dispatch = useDispatch();
  const onDelete = (e)=>{
    dispatch(deleteGoal(goal._id));
    // dispatch(getGoals());
  }
  return (
    <div className='goal'>
        <div>
            {new Date(goal.createdAt).toLocaleString('en-US')}
            <h2>{goal.text}</h2>
            <button className='close' onClick={onDelete}>X</button>
        </div> 
    </div>
  )
}

export default GoalItem