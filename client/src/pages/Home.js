import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllcars } from "../redux/action/carsAction";
import  { Row, Col, Divider, DatePicker, Checkbox} from "antd";
import {Link} from "react-router-dom";
import Spinner from "../components/Spinner";
import moment from "moment"

const {RangePicker} = DatePicker;

export default function Home(){

    const {cars} = useSelector(state => state.carsReducer)
    const {loading} = useSelector(state => state.alertReducer)
    const [totalCars, setTotalcars] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllcars())
    }, [])
    

    useEffect(() => {
        setTotalcars(cars)
    }, [cars])

    function setFilter(values){
        var selectedFrom = moment(values[0] , 'MMM DD yyyy HH:mm')
        var selectedTo = moment(values[1] , 'MMM DD yyyy HH:mm')

        var temp=[]

        for(var car of cars){

            if(car.bookedTimeSlots.lenght === 0){
                temp.push(car)
            }
            else{
                for(var booking of car.bookedTimeSlots){
                    if(selectedFrom.isBetween(booking.from , booking.to) ||
                    selectedTo.isBetween(booking.from , booking.to) || 
                    moment(booking.from).isBetween(selectedFrom , selectedTo) ||
                    moment(booking.to).isBetween(selectedFrom , selectedTo)
                    )
                    {

                    }
                    else{
                        temp.push(car)
                    }

                }

           }

     }


     setTotalcars(temp)


 }


    return(
       
        <DefaultLayout> 

            <Row className="mt-3" justify="center">
                <Col lg={20} sm={24} className="d-flex justify-content-left"> 
                    <RangePicker showTime={{format: 'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={setFilter}/>
                 </Col> 
            </Row>
          
            <Row justify="center" gutter={16} className="mt-5">
                {totalCars.map(car=>{
                    return <Col lg={5} sm={24} xs={24}> 
                        <div className="car p-2 bs1 ">
                            <img alt=""src={car.image} className="carimg"/>
                            <div className="car-content d-flex align-items-center justify-content-between">
                                <div className="text-left pl-2"> 
                                    <p>{car.name}</p> 
                                    <p>{car.rentPerHour} Rent Per Hour</p> 
                                </div> 

                                <div> 
                                    <button className="btn1 mt-2"><Link to={`/booking/${car._id}`}>Book now </Link></button> 
                                  
                                </div>

                            </div> 
                        </div> 
                    </Col> 
                })}
            </Row>
        </DefaultLayout> 
    )

}


//<h1>Home Page</h1>
//<h1>the length of cars array is {cars.length}</h1> muestra los carros que estan en la base de datos
//<Button type="primary">Antd Button</Button>