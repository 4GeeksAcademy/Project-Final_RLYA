import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { TipoConsulta } from "../pages/tipo_consulta";
import { CalendarioEmpresa } from "../pages/cal_vista_empresa";


export const ValidTpConsulta = ({})=> {
    const {store,actions} = useContext(Context)

    return (
        <>
            {
				store.user.tipo_consultas ? <CalendarioEmpresa /> : <TipoConsulta />
			}
        </>
    )
}
