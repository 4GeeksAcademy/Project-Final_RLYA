import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


export const ModalInfoCita = ({ CloseModal, infoSelected }) => {
    const { store, actions } = useContext(Context);
    const EditForm = (e)=> {
        e.preventDefault()
    }
    console.log(infoSelected)

    return (
        <div className={`col-3 bg-white position-absolute m-auto p-2 border-secondary shadow-lg `} style={{ top: "10px", left: "0%", right: "0px", margin:"auto", zIndex: 5 }} >
            <div className="row">
                <div className="col d-flex flex-row justify-content-end">
                    <p role="button" onClick={() => CloseModal()} className="text-danger opacity-0.5">X</p>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex flex-column ">
                    <h3 className="text-center">Informacion Cita</h3>
                    <form onChange={EditForm} className="">
                        <div class="mb-3 mt-2">
                            <label for="exampleFormControlInput1" class="form-label">Fecha</label>
                            <input type="text" class="form-control" value={new Date(infoSelected.start)} disabled id="exampleFormControlInput1" />
                        </div>
                        <div class="mb-3">
                            <label for="end" class="form-label">Finalizacion Aproximada</label>
                            <input type="text" class="form-control" value={new Date(infoSelected.end)} disabled id="end" />
                        </div>
                        <div class="mb-3">
                            <label for="Tipo_Consulta" class="form-label">Tipo Consulta</label>
                            <input type="text" class="form-control" value={infoSelected.title} disabled id="Tipo_Consulta" />
                        </div>
                        <div class="mb-3">
                            <label for="Profesional" class="form-label">{infoSelected.rol === "admin" ? "Cliente" : "Profesional"}</label>
                            <input type="text" class="form-control" id="Profesional" disabled value={infoSelected.rol === "admin" ? infoSelected.nom_user : infoSelected.nom_prof} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="notes" className="form-label">Nota</label>
                            <textarea className="form-control" disabled value={infoSelected.notes !== "" ? infoSelected.notes : "No hay notas..."} id="notes" rows="3"></textarea>
                        </div>
                    </form>
                    <button onClick={CloseModal} className="btn btn-dark">Cerrar</button>
                </div>
            </div>
        </div>
    )
}