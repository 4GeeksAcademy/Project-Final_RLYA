import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const DatosEmpresa = () => {
    const [imagenSeleccionada, setImagenSeleccionada] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const empresaData = {
            imagen: imagenSeleccionada,
            descripcion: descripcion,
        };
        // await actions.registrarEmpresa(empresaData);

        navigate("/TipoConsulta"); //Cambiar aquí
    };


    return (
        <div className="container my-3">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-4 p-5 col-4 border rounded-3 shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <h3 className="text-center mb-3"><strong>Registro</strong></h3>
                            <div className="text-center">
                                <img
                                    src={imagenSeleccionada || "https://img.freepik.com/foto-gratis/calendario-planificador-vista-superior-taza-cafe_23-2148693317.jpg?w=740&t=st=1694528287~exp=1694528887~hmac=01e8879a9ec5cb33f214ef7956123f84edae5e91da5c0202b45860f68cd92674"}
                                    className="img-fluid rounded-circle"
                                    alt="..."
                                    style={{ width: "100px", height: "100px" }}
                                />
                            </div>
                            <div className="col d-flex align-items-center justify-content-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control"
                                    id="fileInput"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const imageUrl = URL.createObjectURL(file);
                                            setImagenSeleccionada(imageUrl);
                                        }
                                    }}
                                />
                                <label htmlFor="fileInput" className="btn btn-outline-dark mt-3">
                                    Cargar Foto
                                </label>
                            </div>
                            <div className="col d-flex align-items-center justify-content-center" role="group">
                                <button id="btnGroupDrop1" type="button" className="btn btn-outline-dark dropdown-toggle my-3" data-bs-toggle="dropdown" aria-expanded="false">
                                    Elegir Oficio
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                    <li><a className="dropdown-item" href="#">Escribanía</a></li>
                                    <li><a className="dropdown-item" href="#">Odontología</a></li>
                                </ul>
                            </div>
                            <div className="">
                                <p className="mb-1"><strong>Descripción</strong></p>
                                <textarea
                            className="form-control"
                            id="myTextarea"
                            name="comments"
                            rows="6"
                            placeholder="Describe tu servicio..."
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        ></textarea>
                            </div>
                        </div>
                        <div id="emailHelp" className="form-text text-center">
                            <strong>Antes de registrarte, debes añadir tus tipos de consulta para que los usuarios puedan acceder a ella.</strong>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <button type="submit" className="btn btn-outline-dark mt-3">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
