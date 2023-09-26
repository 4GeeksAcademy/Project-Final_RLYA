import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Spiner } from "../component/Spiner";

const Card = ({agenda}) => {
    const {store,actions} = useContext(Context)
    
    const isActive = ()=> {
        const fechaActual = new Date() 
        const fechaComparar = new Date(agenda.consultation_date)
        console.log(fechaActual.getMinutes())
        console.log(fechaComparar.getMinutes()) 
        if (fechaActual < fechaComparar) {
        return "border-success"
        } else {
            return "border-danger"
        }
    }
    const cardBorderColorClass = isActive()
    
    return (
        <div className="col-md-4 mb-4">
            <div className={`card my-3 border-1 ${cardBorderColorClass}`}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={agenda.photoProf? agenda.photoProf : "https://via.placeholder.com/150x150"} className="img-fluid p-2 py-3" alt="Imagen de ejemplo" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h6 className="card-title border-rounded">{agenda.consulta}</h6>
                            <p className="card-text border-rounded"><i className="fa-solid fa-user-tie me-2"></i> {agenda.profesional}</p>
                            <p className="card-text border-rounded"><i className="fa-solid fa-user me-2"></i> {agenda.user}</p>
                            <p className="card-text"><i className="fa-regular fa-clock me-2"></i>: {agenda.consultation_date}</p>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AgendasActivas = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(()=> {
        actions.TraerConsultasUser(store.user.id)
    },[])

    const altoPagina = window.innerHeight
    const stylePadre = {
        height:altoPagina,
        maxHeight:"500px",
        overflow:"auto"

    }

    return (
        <div className="container">
            <div className="row" style={stylePadre}>
                {
                    store.HistoryAgendasUser !== undefined? store.HistoryAgendasUser.map((agenda,index)=> {
                        return <Card key={index + "Soy index"} agenda={agenda} />
                    }) :<p className="text-center">No hay agendas</p>  
                }
            </div>
        </div>
    );
};

