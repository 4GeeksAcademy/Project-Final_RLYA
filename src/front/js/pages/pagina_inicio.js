import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const PaginaInicio = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="h-100">
            <nav className="navbar bg-dark px-3">
                <div className="container-fluid d-flex justify-content-between">
                    <img className="navbar-brand" src="" />

                    <form className="d-flex" role="search">
                        <a className="nav-link text-white" style={{ fontFamily: 'Raleway, sans-serif' }}>Registrarme</a>
                        <p className="nav-link text-white">/</p>
                        <a href="/Login" className="nav-link text-white" style={{ fontFamily: 'Raleway, sans-serif' }} onClick={(e) => {
                            e.preventDefault();
                            navigate("/Login");
                        }}>Login</a>
                    </form>

                </div>
            </nav>


            <div className="position-relative">
                <img
                    src="https://www.grupobillingham.com/blog/wp-content/uploads/2022/12/planner-agenda-calendario.jpg"
                    className="card-img opacity-75"
                    alt=""
                    width="20"
                    height="650"
                />

                <div className="position-absolute top-0 start-50 px-5 my-5">
                    <h1 className="navbar-brand text-white fst-italic text-center" style={{ fontSize: "60px", fontFamily: 'Raleway, sans-serif' }}>CalendApp</h1>
                    <h1 className="fst-italic text-dark" style={{ fontSize: "60px", fontFamily: 'Raleway, sans-serif' }}>Una nueva forma de gestionar la agenda de tu negocio</h1>
                    <p className="my-1 fs-5 text" style={{ fontFamily: 'Raleway, sans-serif' }}>Odontologos, Centros Estéticos, Gimnasios entre otros nos eligen.</p>
                </div>
            </div>

            {/* Footer negro */}
            <footer className="footer bg-dark p-5 text-white position-relative">
                <p className="my-1 position-absolute top-0 start-0" style={{ fontFamily: 'Raleway, sans-serif' }}>Somos una plataforma que facilita la interacción usuario-empresa, generando un entorno fácil y ágil para gestionar la agenda de cada empresa.</p>

            </footer>
        </div>


    );
};
