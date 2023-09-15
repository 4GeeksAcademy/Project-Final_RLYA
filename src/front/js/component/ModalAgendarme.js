import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";


export const ModalAgendarme = ({ CloseModal }) => {
    const { store, actions } = useContext(Context);
    const [selectedConsulta,setSelectedConsulta] = useState("Elegir Tipo Consulta")
    const {id_prof} = useParams()
    const fechaAyer = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
    const [formAddConsult,setFormAddConsult] = useState({
        id_user:store.user.id,
        id_profesional:id_prof,
        nota:"",
        id_tipo_consulta:0,
        realization_date: new Date(),
        consultation_date:""
    })
    useEffect(() => {
        actions.CargarTiposCosnulta(store.oficio_prof.id)
    },[])

    
    const Agendarme = (e)=> {
        e.preventDefault()
        if(formAddConsult.id_tipo_consulta !== 0 && formAddConsult.realization_date !== "" && formAddConsult.consultation_date !== "" ) {
            actions.Agendarme(formAddConsult)
            setTimeout(() => {
                CloseModal()
            }, 500);
        } 
        console.log("debe de ingresar los datos correctamente")
    }
    
    return (
        <div className={`col-3 bg-white position-absolute m-auto p-4 border-secondary shadow-lg `} style={{ top: "29%", left: "34%", zIndex: 5 }} >
            <div className="row">
                <div className="col d-flex flex-row justify-content-end">
                    <p role="button" onClick={() => CloseModal()} className="text-danger opacity-0.5">X</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h1 className="text-center">Agendarme</h1>
                    <form className="d-flex flex-column justify-content-center mt-2" onSubmit={Agendarme}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Elegir Fecha</label>
                        <input type="datetime-local" onChange={(e)=> setFormAddConsult({...formAddConsult,consultation_date:e.target.value})} min={fechaAyer} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="exampleFormControlInput1" className="form-label text-center">Tipo de Consulta</label>
                        <div class="dropdown m-auto" >
                            <a class="btn btn-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {selectedConsulta}
                            </a>

                            <ul class="dropdown-menu " >
                                {
                                store.tipos_consulta.length === 0? <p>Cargando...</p> : store.tipos_consulta.map((tp_cons,index)=> {
                                    return <li key={"index:" + index} onClick={()=> {
                                        setSelectedConsulta(tp_cons.nombre)
                                        setFormAddConsult({...formAddConsult,id_tipo_consulta:tp_cons.id})
                                    }} ><a class="dropdown-item" href="#">{tp_cons.nombre}</a></li>
                                })
                                }

                            </ul>
                        </div>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Nota</label>
                        <textarea onChange={(e)=> setFormAddConsult({...formAddConsult,nota:e.target.value}) } className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                        <input className="m-auto btn btn-primary" type="submit" value="Agendarme" />
                    </form>
                </div>
            </div>
        </div>
    )
}