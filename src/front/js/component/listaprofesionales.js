import React, { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { set } from "date-fns";
import { Spiner } from "./Spiner.js";



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
    const filterRecomendados = store.recomendados.filter((oficio) => oficio.id_oficio.name.toLowerCase().includes(filtrar.toLocaleLowerCase()))

    const results = !search & !filtrar ? store.profesionales : search ? store.profesionales.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase())) : filtrooficio
    const resultsRecomendados = !search && !filtrar ? store.recomendados : search ? store.recomendados.filter((dato) => dato.name.toLowerCase().includes(search.toLocaleLowerCase())) : filterRecomendados
    const stylePadre = {
        width:"95%",
        height:"300px",
        maxHeight:"100%",
        overflow:"auto"

    }
    const styleRecomend = {
        width:"95%",
        height:"250px",
        maxHeight:"100%",
        overflow:"auto"
    }


    useEffect(() => {
        actions.traerInfoProf()
    },[]);
    return (
        <div className=" text-dark list-style-none w-100 p-3" >
            
            <form className="d-flex justify-items-center flex-row d-block">
                <div class="dropdown">
                    <button class="btn dropdown-toggle btn-outline-secondary" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    Filtrar
                    </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item" href="#">Ciudad</a></li>
                            <li><a class="dropdown-item" href="#">Oficio</a></li>
                            <input type="search" placeholder="Search" aria-label="Search" value={filtrar} onChange={flitro}/>
                        </ul>
                </div>
                <input className="form-control me-2 mx-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={searcher}/>
                <button className="btn btn-outline-secondary" type="submit">Buscar</button>
            </form>
            {store.recomendados[0] && <div className="d-block p-2 position-relative w-100" >
            <h2>Recomendados</h2>
                <div className="mx-5 d-flex flex-row flex-wrap" style={styleRecomend} >
                    { resultsRecomendados[0]? resultsRecomendados.map((item, index) => {
                        if(item.plan !== "" && item.tipos_consulta[0])
                        return <div key={"soy index" + index} className="d-flex flex-column m-3">
                        <img className="rounded-circle" style={{ width: "140px", height: "140px" }} src={item.photo}  />
                        <div className="d-flex flex-row justify-content-around align-items-center">
                            <p type="button" onClick={()=> navigate("/agenda/" + item.id)} className="btn position-relative m-0 p-0">{item.name}</p>
                            <button  className="border-0 text-danger bg-transparent"onClick={() => actions.CargarFavoritos(store.user.id, item.id)}><i class="fa-solid fa-heart"></i></button>
                        </div>
                        </div>
                }) : <div className="d-block text-center mt-3 align-self-center">No hay Recomendados...</div>}
                    
                </div>
            </div> }
            <div className="d-block p-2 position-relative w-100" >
            <h2>Lista de Profesionales</h2>
                <div className="mx-5 d-flex flex-row flex-wrap" style={stylePadre} >
                    {results[0]? results.map((item, index) => {
                        if(item.plan !== "" && item.tipos_consulta[0]){
                        console.log(item)
                        return <div key={"soy index" + index} className="d-flex flex-column m-3">
                        <img className="rounded-circle" style={{ width: "140px", height: "140px" }} src={item.photo}  />
                        <div className="d-flex flex-row justify-content-around align-items-center">
                            <p type="button" onClick={()=> navigate("/agenda/" + item.id)} className="btn position-relative m-0 p-0">{item.name}</p>
                            <button  className="border-0 text-danger bg-transparent"onClick={() => actions.CargarFavoritos(store.user.id, item.id)}><i class="fa-solid fa-heart"></i></button>
                        </div>

                        </div>}
                }) : <div className="d-block text-center mt-3 align-self-center">No hay Profesionales...</div>}
                    
                </div>
            </div>
        </div>

    );
};







