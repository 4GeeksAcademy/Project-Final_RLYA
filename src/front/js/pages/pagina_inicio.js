import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const PaginaInicio = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="">
            <nav className="navbar bg-dark px-3">
                <div className="container-fluid">
                    <h1 className="navbar-brand text-white fs-1 fst-italic">CalendApp</h1>
                    <form className="d-flex" role="search">
                        <a href="/RegistroUsuario" className="nav-link text-white" onClick={(e) => {
                            e.preventDefault();
                            navigate("/RegistroUsuario");
                        }} >Registrarme</a>
                        <a href="/Login" className="nav-link text-white" onClick={(e) => {
                            e.preventDefault();
                            navigate("/Login");
                        }}>Login</a>
                    </form>

                </div>
            </nav>


            <div className="position-relative">
                <img
                    src="https://img.freepik.com/foto-gratis/calendario-planificador-vista-superior-taza-cafe_23-2148693317.jpg?w=740&t=st=1694528287~exp=1694528887~hmac=01e8879a9ec5cb33f214ef7956123f84edae5e91da5c0202b45860f68cd92674"
                    className="card-img opacity-75"
                    alt=""
                    width="20"
                    height="800"
                />

                <div className="position-absolute top-50 start-50 px-3">
                    <h1 className="fst-italic text-dark">Una nueva forma de gestionar la agenda de tu negocio</h1>
                </div>
            </div>

            {/* Footer negro */}
            <footer className="footer bg-dark p-3">

            </footer>
        </div>


    );
};
