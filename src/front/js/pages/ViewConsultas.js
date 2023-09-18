import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import {AiOutlineArrowRight,AiFillDelete} from "react-icons/ai"
import { useNavigate } from "react-router-dom";



export const ViewConsultas = ()=> {
    const {store,actions} = useContext(Context)
    const navigate = useNavigate()

    

    return (
        <div className="row">
            <div className="col-4 m-auto mt-5 bg-white shadow p-3 d-flex flex-column justify-content-between " style={{height:"500px", minHeight:"500px"}}>
                <div className="row ">
                <h1 className="text-center">Consultas</h1>
                    <div className="col p-2">
                        {
                            store.tipos_consulta.length > 0 ? store.tipos_consulta.map((consulta,index)=> {
                                return <div key={"soy index" + index} className="d-flex flex-row justify-content-between">
                                    <p>Consulta 1</p>
                                    <div className="d-flex flex-row">
                                        <AiFillDelete className="mx-3"/>
                                        <AiOutlineArrowRight/>
                                    </div>
                                </div>
                            }) : <p className="text-center">No hay consultas</p>
                        }
                        
                    </div>
                </div>
                <div className="row justify-self-end">
                    <div className="col-4 m-auto">
                        <button onClick={()=>navigate("add_consulta")} className="btn btn-dark">Agregar Consultas </button>
                    </div>
                </div>
            </div>
        </div>
    )
}