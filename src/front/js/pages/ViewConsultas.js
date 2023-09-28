import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import {AiOutlineArrowRight,AiFillDelete} from "react-icons/ai"
import { useNavigate } from "react-router-dom";



export const ViewConsultas = ({CloseModal = undefined,OpenModalAddConsultas=undefined,setSelectedTp_consulta})=> {
    const {store,actions} = useContext(Context)
    const navigate = useNavigate()
    const stylePadre = {height:"500px", maxHeight:"500px",overflow:"auto",zIndex:5,top:"75px",left:"0px",right: "0px", margin:"auto"}

    useEffect(()=> {
        setTimeout(() => {
            actions.CargarTiposCosnulta(store.user.oficio.id,store.user.id)
        }, 1000);
    },[])

    const modalAñadirConsulta = (consulta)=> {
        if(consulta === "navegar"){
            navigate("/")
        }
        if(consulta) {
            setSelectedTp_consulta(consulta)
            CloseModal()
            OpenModalAddConsultas()
        } else {
            CloseModal()
            OpenModalAddConsultas()
        }
    }

    const BorrarTipoConsulta = (id)=> {
        actions.BorrarTipoConsulta(id)
    }
    
    return (
            <div className=" position-absolute col-4 m-auto mt-5 bg-white shadow p-3 d-flex flex-column justify-content-between" style={stylePadre}>
                <div className="row ">
                {
                    CloseModal && <div className="col-12 d-flex flex-row justify-content-end">
                                        <div className="col-2 text-center"><p role="button" onClick={()=> CloseModal()} className="text-danger opacity-50">X</p></div>
                                </div>
                }
                <h1 className="text-center">Consultas</h1>
                    <div className="col p-5 d-flex flex-column">
                        {
                            store.messageSuccess && <div className="alert alert-success">{store.messageSuccess}</div>
                        }
                        {
                            store.tipos_consulta.length > 0 ? store.tipos_consulta.map((consulta,index)=> {
                                return <div key={"soy index" + index} className="d-flex flex-row justify-content-between">
                                    <p>{consulta.nombre}</p>
                                    <div className="d-flex flex-row">
                                        <AiFillDelete onClick={()=> BorrarTipoConsulta(consulta.id)} role="button" className="mx-3"/>
                                        <AiOutlineArrowRight role="button" onClick={()=> modalAñadirConsulta(consulta)}/>
                                    </div>
                                </div>
                            }) : <p className="text-center">No hay consultas</p>
                        }
                        
                    </div>
                </div>
                <div className="row justify-self-end">
                    <div className="col-4 m-auto">
                        {
                        setSelectedTp_consulta ? <button onClick={modalAñadirConsulta} className="btn btn-dark">Agregar Consultas </button> : <button onClick={()=>modalAñadirConsulta("navegar")} className="btn btn-dark">Agregar Consultas </button>
                        }
                    </div>
                </div>
            </div>
    )
}