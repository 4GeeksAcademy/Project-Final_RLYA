import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { TipoConsulta } from "../pages/tipo_consulta";
import { CalendarioEmpresa } from "../pages/cal_vista_empresa";


export const ValidTpConsulta = ()=> {
    const {store,actions} = useContext(Context)

    useEffect(()=> {
        setTimeout(() => {
            actions.CargarTiposCosnulta(store.user.id,store.user.oficio.id)
        }, 1000);
    },[])
    return (
        <>
            {
                store.tipos_consulta.length > 0 ? <CalendarioEmpresa /> : <TipoConsulta />
            }
        </>
    )
}
