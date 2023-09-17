import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const TipoConsulta = ({ }) => {
    const { store, actions } = useContext(Context)
    
    const [statusformAdmin, setStatusFormAdmin] = useState({
        nombre: "",
        descripcion: "",
        duracionHoras: 0,
        duracionMinutos: 0,
        
    });
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!statusformAdmin.nombre) {
            alert("Por favor, ingresa un nombre de consulta.");
            return;
        }
        actions.AgregarTipoConsultaAdmin(statusformAdmin);
    }


    return (
        <div className="container py-5">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-4 p-5 col-4 border rounded-3 shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <h3 className="text-center mb-3"><strong>Añadir tipo de consulta</strong></h3>
                            <label htmlFor="exampleInputText" className="form-label text-start fs-6"><strong>Nombre Consulta</strong></label>
                            <input type="text" className="form-control" id="exampleInputText" value={statusformAdmin.nombre} onChange={(e) => setStatusFormAdmin({...statusformAdmin,nombre:(e.target.value)})} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleTextarea" className="form-label"><strong>Descripción</strong></label>
                            <textarea
                                className="form-control"
                                id="exampleTextarea"
                                name="comments"
                                rows="6"
                                placeholder="Describe tu servicio..."
                                value={statusformAdmin.descripcion}
                                onChange={(e) => setStatusFormAdmin({...statusformAdmin,descripcion:(e.target.value)})}
                            ></textarea>
                        </div>
                        <div className="mb-3 d-flex align-items-center">
                            <div className="me-3">
                                <label htmlFor="duracionHoras" className="form-label"><strong>Duración en horas</strong></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="duracionHoras"
                                    value={statusformAdmin.duracionHoras}
                                    onChange={(e) => setStatusFormAdmin({...statusformAdmin,duracionHoras:(e.target.value)})}
                                />
                            </div>
                            <div>
                                <label htmlFor="duracionMinutos" className="form-label"><strong>Duración en minutos</strong></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="duracionMinutos"
                                    value={statusformAdmin.duracionMinutos}
                                    onChange={(e) => setStatusFormAdmin({...statusformAdmin,duracionMinutos:(e.target.value)})}
                                />
                            </div>
                        </div>
                        <p role="button" className="text.center" onClick={()=> navigate("/view_consultas")}>Ver mis consultas</p>

                        <div className="col d-flex align-items-center justify-content-center">
                            <button type="submit" className="btn btn-outline-dark mt-3">Añadir consulta</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
