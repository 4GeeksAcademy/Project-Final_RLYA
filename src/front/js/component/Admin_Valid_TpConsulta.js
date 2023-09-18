import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { TipoConsulta } from "../pages/tipo_consulta";
import { CalendarioEmpresa } from "../pages/cal_vista_empresa";
import { Spiner } from "./Spiner";


export const ValidTpConsulta = ({})=> {
    const {store,actions} = useContext(Context)
    console.log(store.user)
    
    return (
        <div className="container-fluid">
            {
            store.user.tipos_consulta ? (store.user.tipos_consulta.length === 0 ? <TipoConsulta/> : <CalendarioEmpresa />) : <Spiner/>
            }
        </div>
    )
}
