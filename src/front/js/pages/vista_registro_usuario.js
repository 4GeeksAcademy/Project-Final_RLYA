import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const RegistroUsuario = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [tipoUsuario, setTipoUsuario] = useState(""); 
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();

        if (!tipoUsuario) {
            alert("Por favor, selecciona si eres Usuario o Empresa");
            return;
        }

        if (tipoUsuario === "usuario") {
            navigate("/listprof");
        } else if (tipoUsuario === "empresa") {
            navigate("/DatosEmpresa");
        }
    }

    return (
        <div className="container my-3">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-4 p-5 col-4 border rounded-3 shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <h3 className="text-center mb-3"><strong>Registro</strong></h3>
                            <label for="exampleInputText" className="form-label text-start fs-6">Nombre</label>
                            <input type="text" className="form-control" id="exampleInputText" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputText" className="form-label text-start fs-6">Apellido</label>
                            <input type="text" className="form-control" id="exampleInputText2" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                        </div>
                        <div className="col">
                            <label for="" className="form-label text-start fs-6">Departamento</label>
                            <label className="visually-hidden" for="specificSizeSelect">Departamento</label>
                            <select className="form-select" id="specificSizeSelect">
                                <option selected>Seleccione un Departamento</option>
                                <option value="1">Montevideo</option>
                                <option value="2">Cerro Largo</option>
                                <option value="3">Maldonado</option>
                            </select>
                        </div>
                        <div className="mb-3 mt-3">
                            <label for="exampleInputEmail1" className="form-label text-start fs-6">Email</label>
                            <input type="email" onChange={function (e) { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label text-start fs-6">Password</label>
                            <input type="password" onChange={function (e) { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-2">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="tipoUsuario" id="inlineRadio1" value="usuario" onChange={() => setTipoUsuario("usuario")}/>
                                <label className="form-check-label" htmlFor="inlineRadio1">Usuario</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="tipoUsuario" id="inlineRadio2" value="empresa" onChange={() => setTipoUsuario("empresa")} />
                                <label className="form-check-label" htmlFor="inlineRadio2">Empresa</label>
                            </div>
                        </div>
                        <div id="emailHelp" className="form-text text-center">
                            ¿Ya tienes una cuenta?
                            <a href="/Login" className="text-success text-decoration-none">Inicia sesión</a>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <button type="submit" className="btn btn-dark mt-3">Registrarme</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
