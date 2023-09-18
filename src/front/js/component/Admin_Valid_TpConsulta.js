import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { TipoConsulta } from "../pages/tipo_consulta";
import { CalendarioEmpresa } from "../pages/cal_vista_empresa";


export const ValidTpConsulta = ({})=> {
    const {store,actions} = useContext(Context)
    console.log(store.user)
    return (
        <>
            {
                store.user.tipos_consulta ? <CalendarioEmpresa /> : <TipoConsulta />
            }
        </>
    )
}
