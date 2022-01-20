import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllcars } from "../redux/action/carsAction";
import { useParams } from 'react-router-dom';
import DefaultLayout from "../components/DefaultLayout";
import  { Row, Col, Divider, DatePicker, Checkbox, Modal } from "antd";
import moment from "moment";
import { bookCar } from "../redux/action/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

//v5 para tomar el id de car <h1>Car Id = {match.params.carid}</h1>

const {RangePicker} = DatePicker; //formato de calendario

export default function BookingCar({match}){

    const { carid } = useParams();

    const {cars} = useSelector(state => state.carsReducer)
    const {loading} = useSelector(state => state.alertReducer)
    const [car, setcar] = useState({})
    const dispatch = useDispatch()
    const [from, setFrom] = useState()
    const [to, setTo] = useState()
    const [totalHours, setTotalHours] = useState(0)
    const [driver, setdriver] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getAllcars())
        if(cars.length>0){
            setcar(cars.find(o=>o._id === carid))
        }
    }, [cars])
     
    useEffect(()=>{
        
        setTotalAmount((totalHours * car.rentPerHour))
        if(driver){
            setTotalAmount(totalAmount + (30 * totalHours))
        }

    }, [driver, totalHours])

    function selectTimeSlots(values){
        console.log(moment(values[0]).format("MMM DD yyyy HH:mm"))
        console.log(moment(values[1]).format("MMM DD yyyy HH:mm"))
        setFrom(moment(values[0]).format("MMM DD yyyy HH:mm"))
        setFrom(moment(values[1]).format("MMM DD yyyy HH:mm"))

        setTotalHours(values[1].diff(values[0], "hours"))
    }

    /*function bookNow(){
        const reqObj = {
            user: JSON.parse(localStorage.getItem("user"))._id,
            car: car._id,
            totalHours,
            totalAmount,
            driverRequire : driver,
            bookedTimeSlots : {
                from,
                to
            }
        }
        dispatch(bookCar(reqObj))
    }*/


    function onToken(token){
        const reqObj = {
            token,
            user: JSON.parse(localStorage.getItem("user"))._id,
            car: car._id,
            totalHours,
            totalAmount,
            driverRequired: driver,
            bookedTimeSlots: {
              from,
              to,
            },
          };
      
          dispatch(bookCar(reqObj));
      }

    return(

        <DefaultLayout> 
           
             <Row justify="center" className="d-flex align-items-center" style={{minHeight:"80vh"}}>
                <Col lg={10} sm={24} xs={24} className="p-3"> 

                    <img alt=""src={car.image} className="carimg2 bs1 w-100" data-aos="flip-left" data-aos-duration="1000"/>
                               
                </Col>
                
                <Col lg={10} sm={24} xs={24} className="text-right">
                    <Divider type="horizontal" dashed>Car Info</Divider>
                    <div style={{textAlign:"right"}}> 
                        <p>{car.name}</p> 
                        <p>{car.rentPerHour} Rent Per Hour</p>
                        <p>Fuel:{car.fuelType}</p>
                        <p>Max Persons{car.capacity}</p>   
                    </div>    

                    <Divider type="horizontal" dashed>Car Info</Divider>
                    <RangePicker showTime={{format: "HH:mm"}} format="MMM DD yyyy HH:mm" onChange={selectTimeSlots}/>  
                    <br />   
                    <button className="btn1 mt-2"   
                    onClick={() => {
                         setShowModal(true);
                        }}>See Booked Slots  </button>   
                    <div>   
                         <p>Total Hours: <b>{totalHours}</b></p>  
                         <p>Rent Per Hour: <b>{car.rentPerHour}</b></p>  
                         <Checkbox onChange={(e)=>{
                             if(e.target.checked)
                             {
                                 setdriver(true);
                             }
                             else{
                                setdriver(false)
                             }
                         }}>Driver Required</Checkbox> 

                        <h3>Total Amount : {totalAmount} </h3>  

                        <StripeCheckout
                            shippingAddress
                            token={onToken}
                            currency='inr'
                            amount={totalAmount * 100}
                            stripeKey="pk_test_51KJPyYKuxaHkptQbM43KkEeWut7ZmUj3SnvNoWDE6Jdp7ZW51NW3jjF8fqSAuFJ435UouVZteqzSLe2WVEJwmliL00Zjs3XrQN"
                            >
                            <button className="btn1">Book now</button>     
                        </StripeCheckout> 

                        
                    </div>   
                </Col>
                  
             </Row>

    
            
        
            
        
        </DefaultLayout> 
      
    )

}