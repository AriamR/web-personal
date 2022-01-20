import React from "react";
import {Row, Col, Form, Input} from "antd";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import{userLogin} from "../redux/action/userAction";
import AOS from "aos";
import "aos/dist/aos.css";
import Spinner from "../components/Spinner";
AOS.init();
export default function Login(){
    //funcion para capturar los datos del formulario
    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.alertReducer)
    function onFinish(values){
        dispatch(userLogin(values))
    }
    return(

        <div className="login">
            {loading && (<Spinner />)}
            <Row gutter={16} className="d-flex align-items-center">

                <Col lg={16} style={{position:"relative"}}>
                    <img 
                    data-aos ="slide-right"
                    data-aos-duration="1500"
                    src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" alt=""/>
                    <h1 className="login-logo">SHEYCARS</h1>
                </Col>
                <Col lg={7} className="text-left P-6">

                    <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
                        <h1>Login</h1>
                        <hr />
                        <Form.Item name="username" label="username" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>

                        <button className="btn1">Login</button>

                        <hr />

                        <Link to="/register">Click here to register</Link>
                    </Form>
                </Col>
                
            </Row>
        </div>
    )

}