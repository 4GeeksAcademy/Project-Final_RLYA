import React, { useContext, useEffect } from "react"
import "../../styles/success.css"
import { useNavigate } from "react-router-dom"
import { Context } from "../store/appContext"
export const PaySuccess = ()=> {
    const {store,actions} = useContext(Context)
    const navigate = useNavigate()
    const NewPago = JSON.parse(sessionStorage.getItem("NewPago"))
    console.log(NewPago);
    useEffect(()=> {
        actions.CrearNuevoPagoBackend(NewPago)
    },[])
    
    return (
        <div className="Padre" style={{width:"100%",height:"100%"}}>
            <div className="PadreB w-100 h-100">
            <div className="row " style={{width:"100%",height:"100%"}}>
                <div className="col-6 m-auto mt-5">
                    <div className="row ">
                        <div className="col m-auto d-flex flex-column text-center "style={{fontSize:"25px"}}>
                            <i className="fa-solid fa-check text-success"></i>
                            <p className="">¡Pago <strong className="fw-bold">Exitoso</strong>! </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col m-auto text-center">
                            <div className="alert alert-primary">Eres parte esencial de lo que hacemos en CalendApp por eso, nos mantenemos pendientes de lo que necesitas y actuamos para brindarte soluciones relevantes</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4 m-auto d-flex flex-row justify-content-center">
                            <button onClick={()=> navigate("/inicio")} className="btn btn-dark">Volver al Inicio</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}