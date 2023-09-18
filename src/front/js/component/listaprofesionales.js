import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";



export const ListaProf = () => {

    const { store, actions } = useContext(Context);
    const [state, setState] = useState({
        //initialize state here
    });
    const navigate = useNavigate()

    useEffect(() => {
        actions.traerInfoProf()
    },[]);
    return (
        <div className=" text-dark list-style-none">
            
            <div className="d-block p-2 position-relative">
            <h2>Lista de Profesionales</h2>
                <div className="mx-5 d-flex flex-row">
                    {store.profesionales[0]? store.profesionales.map((item, index) => {
                        return <div className="d-flex flex-column m-3">
                        <img style={{ width: "140px", height: "140px" }} src="https://static.wixstatic.com/media/845052_307fd97f0e644d2a92994edaaae08ee1~mv2_d_1557_1555_s_2.png/v1/crop/x_0,y_20,w_1557,h_1535/fill/w_240,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Eloisa%20Faltoni%20-%20foto%20redonda.png" />
                        <p type="button" onClick={()=> navigate("/agenda/" + item.id)} className="btn position-relative rounded-circle">{item.name}</p>
                        </div>
                    }) : <p clas>Cargando...</p>}
                    
                </div>
            </div>
        </div>

    );
};
