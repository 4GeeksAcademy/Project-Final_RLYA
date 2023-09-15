import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const TipoConsulta = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [duracionHoras, setDuracionHoras] = useState(0);
    const [duracionMinutos, setDuracionMinutos] = useState(0);
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!nombre) {
            alert("Por favor, ingresa un nombre de consulta.");
            return;
        }

        const consultaData = {
            nombre,
            descripcion,
            duracionHoras,
            duracionMinutos,
        };

        // actions.registrarConsulta(consultaData);
        navigate("/CalendarioEmpresa");
    }
    

    return (
        <div className="container py-5">
    <div className="row d-flex align-items-center justify-content-center">
        <div className="col-4 p-5 col-4 border rounded-3 shadow">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <h3 className="text-center mb-3"><strong>Añadir tipo de consulta</strong></h3>
                    <label htmlFor="exampleInputText" className="form-label text-start fs-6"><strong>Nombre Consulta</strong></label>
                    <input type="text" className="form-control" id="exampleInputText" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleTextarea" className="form-label"><strong>Descripción</strong></label>
                    <textarea
                        className="form-control"
                        id="exampleTextarea"
                        name="comments"
                        rows="6"
                        placeholder="Describe tu servicio..."
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <div className="me-3">
                        <label htmlFor="duracionHoras" className="form-label"><strong>Duración en horas</strong></label>
                        <input
                            type="number"
                            className="form-control"
                            id="duracionHoras"
                            value={duracionHoras}
                            onChange={(e) => setDuracionHoras(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="duracionMinutos" className="form-label"><strong>Duración en minutos</strong></label>
                        <input
                            type="number"
                            className="form-control"
                            id="duracionMinutos"
                            value={duracionMinutos}
                            onChange={(e) => setDuracionMinutos(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col d-flex align-items-center justify-content-center">
                    <button type="submit" className="btn btn-outline-dark mt-3">Añadir consulta</button>
                </div>
            </form>
        </div>
    </div>
</div>
    );
};
