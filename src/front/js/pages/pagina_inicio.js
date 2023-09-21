import React, { useContext } from "react";
import { Context } from "../store/appContext";


import { useNavigate } from "react-router-dom";
import {PiCalendarCheckFill} from "react-icons/pi"
import "../../styles/inicio.css"
export const PaginaInicio = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="PadreInicio h-100 d-flex flex-column" >
            <div className="PadreBorroso">
            <nav className="navbar px-3 bg-dark">
                <div className="container-fluid d-flex justify-content-between px-5 ">
                    <PiCalendarCheckFill style={{color:"#49fb2d"}} fontSize={"50px"}/>
                    <form className="d-flex" role="search">
                        <a href="/RegistroUsuario" className="nav-link text-white" style={{ fontFamily: 'Raleway, sans-serif' }}>Registrarme</a>
                        <a href="/Login" className="nav-link text-white" style={{ fontFamily: 'Raleway, sans-serif' }} onClick={(e) => {
                            e.preventDefault();
                            navigate("/Login");

                        }}>Ingresar</a>

                    </form>

                </div>
            </nav>
            <div className="bg-white m-auto w-50 align-self-center shadow-lg d-flex flex-row justify-content-between" style={{height:"500px",borderRadius:"50px",padding:"50px" }}>
                <div className="p-3 w-50">
                    <h3 className="my-3">¿Qué ofrecemos?</h3>
                    <p className="opacity-70 text-secondary">Te proporcionamos una mayor comidad a la hora de gestionar tus consultas y les brindamos a todo público el acceso a tu agenda. También contamos con distintos planes para hacer de tu experiencia algo mucho mejor. </p>
                </div>
                <div className="p-3 w-50 d-flex flex-row justify-content-center align-content-center">
                    <img src="https://acumbamail.com/blog/wp-content/uploads/2021/05/calendario-contenido.jpeg" className="rounded-circle" style={{width:"250px",height:"250px"}}/>
                </div>
            </div>


            <div className="bg-dark w-100 align-self-center shadow-lg d-flex flex-column" style={{padding:"50px", marginTop:"200px" }}>
                <h3 className="my-3 text-center text-white fw-bold">Nuestros Planes Mensuales</h3>
                <div className="linea"></div>
                <div className="d-flex flex-row justify-content-around mt-5" style={{padding:"0px 100px 0px 100px"}}>
                    <div className="uno position-relative d-flex flex-column justify-content-between  p-3" style={{background:"#647cf7",color:"white", height:"300px",width:"200px"}}>
                        <div className="w-75 p-3 shadow-lg bg-white rounded-3 justify-self-center position-absolute" style={{height:"100px",color:"#647cf7",borderTop:"5px solid #647cf7",top:"-25px",left:"25px"}}>
                            <p className="text-center p-0 m-0">Plan Normal</p>
                            <p className="text-center p-0 m-0 fw-bold" style={{fontSize:"25px"}}>$ 29</p>
                        </div>
                        <div className="d-flex flex-column align-items-center fw-semibold" style={{marginTop:"80px",fontSize:"12px"}}>
                            <p className="">Registro de usuarios</p>
                            <p className="">Ver mi Agenda</p>
                        </div>
                        <button onClick={()=> navigate("/Login")} className="btn1  ">Obtener</button>
                        
                    </div>
                    <div className="dos position-relative d-flex flex-column justify-content-between p-3" style={{background:"#68c6c4",color:"white",height:"300px",width:"200px"}}>
                        <div className="w-75 bg-white shadow-lg p-3 rounded-3 justify-self-center position-absolute" style={{height:"100px",color:"#68c6c4",borderTop:"5px solid #68c6c4", top:"-25px",left:"25px"}}>
                            <p className="text-center p-0 m-0">Plan Medio</p>
                            <p className="text-center p-0 m-0 fw-bold" style={{fontSize:"25px"}}>$ 48</p>
                        </div>
                        <div className="d-flex flex-column align-items-center fw-semibold" style={{marginTop:"80px",fontSize:"12px"}}>
                            <p className="">Registro de usuarios</p>
                            <p className="">Ver mi Agenda</p>
                            <p className="">Recomendar mis servicios</p>
                        </div>
                        <button onClick={()=> navigate("/Login")} className="btn2">Obtener</button>
                    </div>
                    <div className="tres position-relative d-flex flex-column justify-content-between p-3" style={{background:"#d65278",color:"white",height:"300px",width:"200px"}}>
                        <div className="w-75 bg-white shadow-lg p-3 rounded-3 justify-self-center position-absolute" style={{height:"100px",color:"#d65278",borderTop:"5px solid #d65278",top:"-25px",left:"25px"}}>
                            <p className="text-center p-0 m-0">Plan Pro</p>
                            <p className="text-center p-0 m-0 fw-bold" style={{fontSize:"25px"}}>$ 99</p>
                        </div>
                        <div className="d-flex flex-column align-items-center fw-semibold" style={{marginTop:"80px",fontSize:"12px"}}>
                            <p className="">Registro de usuarios</p>
                            <p className="">Ver mis Agenda</p>
                            <p className="">Recomendar mis Servicios</p>
                            <p className="">Cambiar tema de mi agenda</p>
                        </div>
                        <button onClick={()=> navigate("/Login")} className="btn3 ">Obtener</button>
                    </div>

                </div>

            </div>

            


           
  

            <footer className="footer bg-dark text-white position-relative d-flex flex-row justify-content-between" style={{padding:"50px 300px 50px 300px",}}>
                <div className="d-flex flex-column text-white">
                    <h5 className="" >Esta es tu página de confianza.</h5>
                    <p className="opacity-25 mx-3">@CalendApp</p>
                </div>
                <div className="translate-middle-x d-flex flex-row justify-content-between"> 
                    <i className="fa-brands fa-facebook d-inline p-2 fs-5 text"></i>
                    <i className="fa-brands fa-twitter d-inline p-2 fs-5 text"></i>
                    <i className="fa-brands fa-instagram d-inline p-2 fs-5 text"></i>
                </div>
            </footer>
            </div>
        </div>


    );
};
