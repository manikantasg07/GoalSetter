import React, { useState,useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { requestOtp, reset } from '../features/passowrdChange/passwordChangeSlice';
import {toast} from "react-toastify"
import Spinner from "../Components/Spinner";

function Forgotpassword() {
    const [mail,setEmail] = useState("") 
    const { email,isLoading,otpSent,otpVerified,passwordChanged,isError,message} = useSelector((state)=> state.changePassword);
    const navigate= useNavigate();
    const dispatch=useDispatch();

    useEffect(()=>{
      if(otpSent){
        navigate("/enterOtp");
      }
      if(isError){
        toast.error(message);
      }
      return ()=>{
        dispatch(reset());
      }
    },[isError,message,otpSent,navigate,dispatch])

    const onChange = (e)=>{
        setEmail(e.target.value)
    }
    const onSubmit=async(e)=>{
        e.preventDefault();
        dispatch(requestOtp(mail));

    }
    if(isLoading){
      return <Spinner />
    }
  return (
    <div>
        <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="email" className="form-control" id="email" name="email" value={mail} placeholder="Enter your email" onChange={onChange}/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">submit</button>
          </div>
        </form>
    </section>
    </div>
  )
}

export default Forgotpassword