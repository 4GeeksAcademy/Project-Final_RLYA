import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";




export const Favorites = () => {
    const {store,actions} = useContext(Context);


    
   useEffect (()=> {
    actions.obtenerFavoritos(store.user.id)
   }, [])
   
    
    return(
    <div className=" text-center">
        <div className="mx-5 d-flex flex-row">
                    {store.favoritos.length > 0 ? store.favoritos.map((item, index) => {
                        return <div key={"soy index" + index} className="d-flex flex-column m-3">
                        <img className="rounded-circle" style={{ width: "140px", height: "140px" }} src={item.photo}  />
                        <p type="button" onClick={()=> navigate("/agenda/" + item.id)} className="btn position-relative rounded-circle">{item.name}</p>
                        <button type="button" className="border-0 bg-transparent" onClick={() => actions.eliminarFavorito(store.user.id, item.id)}><i class="fa-solid fa-trash"></i></button>
                        </div>
                }) : <p>No hay favoritos agregados</p>}
                    
                </div>
      </div>
  )
};


