import React from 'react'
import { useState,useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { reset, verifyOtp } from '../features/passowrdChange/passwordChangeSlice';
import {toast} from "react-toastify";
import Spinner from "../Components/Spinner";

function Enterotp() {

  const [otp,setOtp] = useState("");
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const { email,isLoading,otpSent,otpVerified,passwordChanged,isError,message} = useSelector((state)=> state.changePassword);
  useEffect(()=>{
    if(otpVerified){
      navigate("/newPassword");
    }
    // if(!otpVerified){
    //   navigate("/forgotpassword")
    // }
    if(!email){
      navigate("/login");
    }
    if(isError){
      toast.error(message);
    }
    return ()=>{
      dispatch(reset());
    }
  },[isError,message,otpVerified,navigate,dispatch])
  const onChange = (e)=>{
    setOtp(e.target.value)
  }
  const onSubmit = (e)=>{
    e.preventDefault();
    dispatch(verifyOtp(otp));
  }
  if(isLoading){
    return <Spinner />
  }
  return (
    <div>
    <section className="form">
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" id="text" name="text" value={otp} placeholder="Enter the otp" onChange={onChange}/>
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-block">submit</button>
      </div>
    </form>
</section>
</div>
  )
}

export default Enterotp