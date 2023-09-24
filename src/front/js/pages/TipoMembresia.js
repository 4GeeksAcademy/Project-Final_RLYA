import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { fileupload } from "../../helpers/uploadFiles";
import { TipoConsulta } from "./tipo_consulta";
import { DatosEmpresa } from "./ingreso_datos_empresa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const TipoMembresia = ({}) => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const [selectedPlan,setSelectedPlan] = useState(undefined)
    const handleSubmit = async(e) => {

    };
    const email = sessionStorage.getItem("emailLastRegister")
    console.log(email)


    const pagar = async () => {
        console.log("xd")
        if(selectedPlan) {
            let total = selectedPlan.price;  //aca creamos la  variable total que guarda la suma a pagar por el cliente 
            await actions.pagoMercadoPago(total,email); 
            let direccion = await store.mercadoPago.init_point;  //  direccion guarda la url que trae init_point 
            console.log(direccion); 
            if(direccion) {
                window.location.replace(direccion);  // window es para renderizar y mandar al cliente a la url de pagar 
            }
        } 
    }

    useEffect(()=> {
        actions.IdByEmail(email)
        actions.CargarPlanes()
    },[])
    

    
    return (
        <div className="container my-3">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-5 p-5 col-4 border rounded-3 shadow">
                    <div className="row">
                            <h3 className="text-center mb-3"><strong>Pagos</strong></h3>
                        </div>
                        <div className="row d-flex flex-row justify-content-around">
                            {
                            store.planes? store.planes.map((plan,index)=> {
                                        return <div role="button" onClick={()=>setSelectedPlan(plan)} key={index + "index"} className="col-3 d-flex flex-column align-items-center justify-content-center border border p-3 rounded ">
                                            <p className="text-center mb-3">{plan.name}</p>
                                            <h4 className="text-center mb-3"><strong>$ {plan.price}</strong></h4>
                                            <p className="text-center mb-3">por Mes</p>
                                        </div>
                            }) : <p className="mt-2 text-center">No hay planes</p>
                            }
                        </div>
                        <div className="row">
                            <button onClick={pagar} className="text-center btn btn-dark mt-3 ">Pagar</button>
                        </div>
                    </div>
            </div>

        </div>
    );
};  
