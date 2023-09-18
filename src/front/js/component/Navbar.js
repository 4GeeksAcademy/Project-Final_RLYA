import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Navbar = () => {
    const {store,actions} = useContext(Context)

    
    return (
    <nav className="navbar py-2 px-5 navbar-expand-lg bg-light sticky-top nav d-flex flex-row justify-content-between  " style={{ width: "100%" }}>
        <a className="navbar-brand text-dark fs-1 pb-3" href="#" style={{ fontFamily: "fantasy" }}> Bienvenido {store.user.name}!</a>
        <div className="d-flex flex-row " >
            <img className="rounded-circle" style={{ width: "50px", height: "50px" }} src={ store.user.photo? store.user.photo : "https://static.wixstatic.com/media/845052_307fd97f0e644d2a92994edaaae08ee1~mv2_d_1557_1555_s_2.png/v1/crop/x_0,y_20,w_1557,h_1535/fill/w_240,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Eloisa%20Faltoni%20-%20foto%20redonda.png" } /> 
            
            <ul className="navbar-nav ">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {store.user.name + " " + store.user.last_name}
                    </a>
                    <ul className="dropdown-menu ">
                        <li><a className="dropdown-item" href="#">Perfil</a></li>
                        <li><a className="dropdown-item" href="#">Favoritos</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </nav>
)
};
