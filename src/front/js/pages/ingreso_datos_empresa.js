import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { fileupload } from "../../helpers/uploadFiles";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';


export const DatosEmpresa = ({stateForm}) => {
    const [empresaDataAdd, setEmpresaDataAdd] = useState({
        descripcion: "",
        id_oficio:0
    });
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    useEffect(()=> {
        actions.CargarOficios()
    },[])



    const handleSubmit = async (e) => {
        e.preventDefault()
        const imgCloud = await fileupload(stateForm.photo)
        const statusLogin = await actions.AgendarAdmin({
            name:stateForm.name,
            last_name:stateForm.last_name,
            photo:imgCloud,
            age:stateForm.age,
            registration_date:stateForm.registration_date,
            email:stateForm.email,
            password:stateForm.password,
            descripcion:empresaDataAdd.descripcion,
            id_oficio:empresaDataAdd.id_oficio
        })
        if(statusLogin === true){
            navigate("/Login"); 
        }

    };



    return (
        <div className="container my-3">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-4 p-5 col-4 border rounded-3 shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <h3 className="text-center mb-3"><strong>Registro</strong></h3>
                            <p className="text-center mb-3 mt-3"><strong>Eres un admin, asi que tienes que ingresar algunos datos adicionales</strong></p>
                            <div className="col d-flex align-items-center justify-content-center" role="group">
                                <button id="btnGroupDrop1" type="button" className="btn btn-outline-dark dropdown-toggle my-3" data-bs-toggle="dropdown" aria-expanded="false">
                                    Elegir Oficio
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                    {
                                        store.oficios.length > 0 ? store.oficios.map((oficio,index)=> {
                                            return <li key={"soy index" + index}><a onClick={()=> setEmpresaDataAdd({...empresaDataAdd,id_oficio:oficio.id})} className="dropdown-item" href="#">{oficio.name}</a></li>
                                        }) : <li><a className="dropdown-item" href="#">No hay oficios</a></li>
                                    }

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
                            value={empresaDataAdd.descripcion}
                            onChange={(e) => setEmpresaDataAdd({...empresaDataAdd,descripcion:e.target.value})}
                        ></textarea>
                            </div>
                        </div>
                        <div id="emailHelp" className="form-text text-center">
                            <strong>Antes de registrarte, debes añadir tus tipos de consulta para que los usuarios puedan acceder a ella.</strong>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <button type="submit" className="btn btn-outline-dark mt-3">Registrarme</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
