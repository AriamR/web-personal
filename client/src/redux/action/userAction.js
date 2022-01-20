import axios from "axios";
import {message} from "antd";

export const userLogin = (reqObj)=>async dispatch=>{
    dispatch({type: "LOADING", payload:true})

    try {
        const response = await axios.post("/api/users/login", reqObj)
        localStorage.setItem("user", JSON.stringify(response.data))
        message.success("login sucess")
        dispatch({type: "LOADING", payload:false})
        setTimeout(()=>{
            window.location.href="/"
        }, 500);
    } catch (error) {
        console.log(error) 
        message.error("Something went wrong") 
        dispatch({type: "LOADING", payload:false})
    }
}

export const userRegister = (reqObj)=>async dispatch=>{
    dispatch({type: "LOADING", payload:true})

    try {
        const response = await axios.post("/api/users/register", reqObj)
        localStorage.setItem("user", JSON.stringify(response.data))
        //message.success("register sucess")
        setTimeout(()=>{
            message.success("register sucess")
        }, 500);
        window.location.href="/login"
        dispatch({type: "LOADING", payload:false})
    } catch (error) {
        console.log(error) 
        message.error("Something went wrong") 
        dispatch({type: "LOADING", payload:true})
    }
}