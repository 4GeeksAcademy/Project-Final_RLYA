import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { set } from "date-fns";



export const ListaProf = () => {

    const { store, actions } = useContext(Context);
    const [state, setState] = useState({
        //initialize state here
    });
    const navigate = useNavigate()


    const [prof, setProf] = useState([]);//hice estas constantes
    const [search, setSearch] = useState("");
    const [filtrar, setFiltrar] = useState("");


    const searcher = (e) => {//esta funcion es la que busca
        setSearch(e.target.value)
        console.log(e.target.value)
        }

    const flitro = (e) => {
            setFiltrar(e.target.value)
        }
    const filtrooficio = store.profesionales.filter((oficio) => oficio.id_oficio.name.toLowerCase().includes(filtrar.toLocaleLowerCase()))

    const results = !search & !filtrar ? store.profesionales : search ? store.profesionales.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase())) : filtrooficio

  


    useEffect(() => {
        actions.traerInfoProf()
    },[]);
    return (
        <div className=" text-dark list-style-none w-50 p-3">
            
            <form className="d-flex justify-items-center flex-row d-block">
                <div class="dropdown">
                    <button class="btn dropdown-toggle btn-outline-secondary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Filtrar
                    </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">Ciudad</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <input type="search" placeholder="Search" aria-label="Search" value={filtrar} onChange={flitro}/>
    
                        </ul>
                </div>
                <input className="form-control me-2 mx-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={searcher}/>
                <button className="btn btn-outline-secondary" type="submit">Search</button>
            </form>
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
