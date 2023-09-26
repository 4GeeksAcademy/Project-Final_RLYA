import React, { useContext, useEffect } from "react"
import { Spiner } from "../component/Spiner"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"

export const ValidPago = ()=> {
    const {store,actions} = useContext(Context)
    const navigate = useNavigate()
    const validarPago = async() => {
        const valid = await actions.Validpago(store.user)
        if (valid === true) {
            window.location.reload()
        } else {
            sessionStorage.setItem("emailLastRegister",store.user.email)
            navigate("/pagos")
        }
    }
    
    useEffect(()=>{
        validarPago()
    },[])
    
    return (
        <div className="text-center mt-5">Validando Pago {<Spiner/>}</div>
    )
}