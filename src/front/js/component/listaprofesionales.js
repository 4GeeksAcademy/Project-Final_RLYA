import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";



export const ListaProf = () => {

    const { store, actions } = useContext(Context);
    const [state, setState] = useState({
        //initialize state here
    });


    useEffect(() => {
        actions.traerInfoProf()
    },[]);
    return (
        <div className=" text-dark list-style-none">
            
            <ul className="list-unstyled ">
                <h2>Lista de Profesionales</h2>
                <li className="d-inline"><a type="button" className="btn position-relative rounded-circle"><i className="fa-solid fa-circle-user" style={{ fontSize: "90px" }}></i>
                    
                    </a></li>
                <li className="d-inline"><a type="button" className="btn position-relative rounded-circle"><i className="fa-solid fa-circle-user" style={{ fontSize: "90px" }}></i>
                    
                </a></li>
            </ul>
            
            <div className="d-block p-2 position-relative">
            <h2>Lista de Profesionales</h2>
                <div className="mx-5 d-flex flex-row">
                    {store.profesionales.map((item, index) => {
                        return <div className="d-flex flex-column m-3">
                        <img style={{ width: "140px", height: "140px" }} src="https://static.wixstatic.com/media/845052_307fd97f0e644d2a92994edaaae08ee1~mv2_d_1557_1555_s_2.png/v1/crop/x_0,y_20,w_1557,h_1535/fill/w_240,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Eloisa%20Faltoni%20-%20foto%20redonda.png" />
                        <a type="button" className="btn position-relative rounded-circle">{item.name}</a>
                        </div>
                    })}
                    
                    
                </div>
            </div>
        </div>

    );
};
