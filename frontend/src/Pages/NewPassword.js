import { useState,useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { fullReset, changePassword } from '../features/passowrdChange/passwordChangeSlice';
import {toast} from "react-toastify";
import Spinner from "../Components/Spinner";

function NewPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { email,isLoading,otpSent,otpVerified,passwordChanged,isError,message} = useSelector((state)=> state.changePassword);
    useEffect(()=>{
        if(!email){
          navigate("/login");
        }
        if(passwordChanged){
        toast.success(message);
          navigate("/login");
        }
        if(isError){
          toast.error(message);
        }
        return ()=>{
          dispatch(fullReset());
        }
      },[isError,message,passwordChanged,navigate,dispatch])
    const [password,setPassword] = useState({
        password : "",
        confirmPassword : ""
    });
    const onChange=(e)=>{
        setPassword((previousState)=>({
            ...previousState,
            [e.target.name]:e.target.value
        }))
    }
    const onSubmit = (e)=>{
        e.preventDefault();
        dispatch(changePassword(password))
    }
    if(isLoading){
        return <Spinner />
    }
  return (
    <div>
    <section className="form">
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input type="password" className="form-control" id="password" name="password" value={password.password} placeholder="Enter new Password" onChange={onChange}/>
      </div>
      <div className="form-group">
        <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={password.confirmPassword} placeholder="Confirm Password" onChange={onChange}/>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-block">submit</button>
      </div>
    </form>
</section>
</div>
  )
}

export default NewPassword