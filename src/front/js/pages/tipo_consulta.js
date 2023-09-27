import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { MdArrowBackIosNew } from "react-icons/md"



export const TipoConsulta = ({ selectedTp_consulta, openModalViewConsultas, CloseModal }) => {
    const { store, actions } = useContext(Context)
    const ExistSelected = selectedTp_consulta && selectedTp_consulta.nombre? true : false
    const stylePadre = { right: "0px", left:"0px",top:"10px", margin:"auto", zIndex: 5 }
    const duracionArr = ExistSelected === true? (selectedTp_consulta?.duracion.toString()).split(".") : null
    
    const [statusformAdmin, setStatusFormAdmin] = useState({
        nombre: ExistSelected === true? selectedTp_consulta.nombre : "",
        descripcion: ExistSelected === true? selectedTp_consulta.descripcion : "",
        duracionHoras:  ExistSelected === true? parseInt(duracionArr[0]) : 0,
        duracionMinutos: ExistSelected === true? parseInt(duracionArr[1]) : 0,
    });
    const [canUpdate,setCanUpdate] = useState(false)

    /*Ahora cada vez que cambiemos algo podremos actualizar nuestro tipo de consulta */ 
    
    useEffect(()=> {
        setCanUpdate(true)
    },[statusformAdmin])
    
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if(ExistSelected === true) {
            actions.ActualizarTipoConsulta(statusformAdmin,selectedTp_consulta.id)
        } else {
            if (!statusformAdmin.nombre) {
                alert("Por favor, ingresa un nombre de consulta.");
                return;
            }
            actions.AgregarTipoConsultaAdmin(statusformAdmin);
            CloseModal()
        }
        
    }
    const GoBack = () => {
        CloseModal()
        openModalViewConsultas()
    }

    return (
        <>
           
                <div className="row">
                    <div  className=" p-2 col-4 border rounded-3 bg-white shadow position-absolute d-flex flex-column align-items-center justify-content-center" style={stylePadre}>
                        {ExistSelected ? <div className="row " style={{ width: "100%" }}>
                            <div className="col d-flex flex-row justify-content-between align-content-center">
                                <MdArrowBackIosNew role="button" onClick={GoBack} />
                                <div className="col-2 text-center"><p role="button" onClick={() => CloseModal()} className="text-danger opacity-50">X</p></div>
                            </div>
                        </div>: <div className="col-12 d-flex flex-row justify-content-end align-content-center">
                            
                                <div className="row d-flex text-center justify-content-end"><p role="button" onClick={() => CloseModal()} className="text-danger opacity-50">X</p></div>
                            </div>}
                        <div className="row">
                            <form className="col p-3" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <h3 className="text-center mb-3"><strong>Añadir tipo de consulta</strong></h3>
                                    {
                                        store.messageSuccess && <div class="alert alert-success" role="alert">
                                            {store.messageSuccess}
                                        </div>
                                    }
                                    {
                                        !ExistSelected && <p className="text-center" style={{fontSize:"12px"}}>Eres un administrador, Por tanto neceitan insertar minimo un tipo de consulta para continuar, cuando lo hagas recarga la pagina</p>
                                    }
                                    <label htmlFor="exampleInputText" className="form-label text-start fs-6"><strong>Nombre Consulta</strong></label>
                                    <input type="text" className="form-control" id="exampleInputText" value={statusformAdmin.nombre} onChange={(e) => setStatusFormAdmin({ ...statusformAdmin, nombre: (e.target.value) })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleTextarea" className="form-label"><strong>Descripción</strong></label>
                                    <textarea
                                        className="form-control"
                                        id="exampleTextarea"
                                        name="comments"
                                        rows="3"
                                        placeholder="Describe tu servicio..."
                                        value={statusformAdmin.descripcion}
                                        onChange={(e) => setStatusFormAdmin({ ...statusformAdmin, descripcion: (e.target.value) })}
                                    ></textarea>
                                </div>
                                <div className="mb-3 d-flex flex-row justify-content-between">
                                    <div className="me-3">
                                        <label htmlFor="duracionHoras" className="form-label"><strong>Duración en horas</strong></label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="duracionHoras"
                                            value={statusformAdmin.duracionHoras}
                                            onChange={(e) => setStatusFormAdmin({ ...statusformAdmin, duracionHoras: (e.target.value) })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="duracionMinutos" className="form-label"><strong>Duración en minutos</strong></label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="duracionMinutos"
                                            value={statusformAdmin.duracionMinutos}
                                            onChange={(e) => setStatusFormAdmin({ ...statusformAdmin, duracionMinutos: (e.target.value) })}
                                        />
                                    </div>
                                </div>
                                {ExistSelected === false && <p onClick={()=> navigate("/view_consultas")} role="button" className="text-center">Ver mis consultas</p>}
                                {
                                    ExistSelected === true? (canUpdate === true? <div className="col d-flex align-items-center justify-content-center">
                                    <button type="submit" className="btn btn-outline-dark mt-3">Actualizar</button>
                                </div> : <div className="col d-flex align-items-center justify-content-center">
                                    <button type="submit" disabled className="btn btn-outline-dark mt-3">Actualizar</button>
                                </div> ): <div className="col d-flex align-items-center justify-content-center">
                                    <button type="submit" className="btn btn-outline-dark mt-3">Añadir consulta</button>
                                </div>
                                }
                                
                            </form>
                        </div>
                    </div>
                </div> 
        </>
    );
};
