import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

const Card = ({ title, location, address, dateTime, isActive }) => {
    const cardBorderColorClass = isActive ? "border-success" : "border-primary";

    return (
        <div className="col-md-4 mb-4">
            <div className={`card my-3 ${cardBorderColorClass}`}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://via.placeholder.com/150x150" className="img-fluid p-2 py-3" alt="Imagen de ejemplo" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h6 className="card-title border-rounded">{title}</h6>
                            <p className="card-text border-rounded">{location}</p>
                            <p className="card-text border-rounded">{address}</p>
                            <p className="card-text">Fecha y Hora: {dateTime}</p>
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

    
    const [agendaData, setAgendaData] = useState({
        title: "Dra. María Rodríguez",
        location: "San José de Mayo",
        address: "18 de Julio 456",
        dateTime: "2023-09-17 16:45"
    });

    const updateAgendaData = (newData) => {
        setAgendaData(newData);
    };
    const altoPagina = window.innerHeight
    const stylePadre = {
        height:altoPagina,
        maxHeight:"500px",
        overflowY:"scroll"

    }

    return (
        <div className="container">
          <div className="row" style={stylePadre}>
          <Card
                    title={agendaData.title}
                    location={agendaData.location}
                    address={agendaData.address}
                    dateTime={agendaData.dateTime}
                 isActive={true}/>
                  <Card
                    title={agendaData.title}
                    location={agendaData.location}
                    address={agendaData.address}
                    dateTime={agendaData.dateTime}
                 isActive={true}/>
                  <Card
                    title={agendaData.title}
                    location={agendaData.location}
                    address={agendaData.address}
                    dateTime={agendaData.dateTime}
                 isActive={true}/>
                  <Card
                    title={agendaData.title}
                    location={agendaData.location}
                    address={agendaData.address}
                    dateTime={agendaData.dateTime}
                 isActive={true}/>
                  <Card
                    title={agendaData.title}
                    location={agendaData.location}
                    address={agendaData.address}
                    dateTime={agendaData.dateTime}
                 isActive={true}/>
                  <Card
                    title={agendaData.title}
                    location={agendaData.location}
                    address={agendaData.address}
                    dateTime={agendaData.dateTime}
                 isActive={true}/>
                  <Card
                    title={agendaData.title}
                    location={agendaData.location}
                    address={agendaData.address}
                    dateTime={agendaData.dateTime}
                 isActive={true}/>
                  <Card
                    title={agendaData.title}
                    location={agendaData.location}
                    address={agendaData.address}
                    dateTime={agendaData.dateTime}
                 isActive={true}/>
                  <Card
                    title={agendaData.title}
                    location={agendaData.location}
                    address={agendaData.address}
                    dateTime={agendaData.dateTime}
                 isActive={true}/>
                
            </div>
        </div>
    );
};

