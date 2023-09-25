import React, { useContext } from "react";
import { Context } from "../store/appContext";


import { useNavigate } from "react-router-dom";
import {PiCalendarCheckFill} from "react-icons/pi"
import "../../styles/inicio.css"
export const PaginaInicio = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="PadreInicio d-flex flex-column" >
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
            <div className="bg-white m-auto w-50 align-self-center shadow-lg d-flex flex-row justify-content-between" style={{height:"500px",borderRadius:"25px",padding:"50px",marginBottom:"100px"}}>
                <div className="p-3 w-50">
                    <h3 className="my-3">¿Quienes somos?</h3>
                    <p className="opacity-70 text-secondary">En CApp, somos un equipo dedicado a simplificar la vida tanto de profesionales como de clientes. Nos enorgullece facilitar conexiones significativas y eficientes entre ambos grupos. Entendemos las necesidades y desafíos que enfrentan en su día a día. Nuestra plataforma de gestión de agenda digital está diseñada para optimizar su productividad y ayudarles a alcanzar sus metas profesionales de manera eficaz, junto a una búsqueda y contratación de profesionales cualificados, permitiéndoles acceder a los servicios que necesitan de manera eficiente y conveniente.</p>
                </div>
                <div className="p-3 w-50 d-flex flex-row justify-content-center align-content-center">
                    <img src="https://previews.123rf.com/images/kraphix/kraphix1310/kraphix131000004/22733031-dibujos-animados-de-la-gente-de-negocios-d%C3%A1ndose-la-mano-presentar-idea-para-hacer-dinero.jpg" className="rounded-circle" style={{width:"250px",height:"250px"}}/>
                </div>
            </div>

            <div className="bg-white m-auto w-50 mt-5 align-self-center shadow-lg d-flex flex-row justify-content-between" style={{height:"500px",borderRadius:"25px",padding:"50px" }}>
                <div className="p-3 w-50">
                    <h3 className="my-3">¿Por qué Elegirnos?</h3>
                    <p className="opacity-70 text-secondary">Nuestra plataforma se destaca por su facilidad de uso, permitiéndote comenzar de inmediato sin complicaciones. Fomentamos la colaboración efectiva al facilitar la interacción con profesionales y clientes, simplificando la programación de citas y compartiendo calendarios. Tu privacidad y la seguridad de tus datos son fundamentales para nosotros, y garantizamos su protección en todo momento </p>
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
                <div className="w-50 d-flex flex-column align-items-center"> 
                    <p className="text-center">¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte. No dudes en ponerte en contactocon nuestro equipo de soporte</p>
                    <div className="linea"></div>
                    <div className="iconos d-flex flex-row justify-content-between w-50">
                        <a className="fa" href="#"><i className="fa-brands fa-facebook d-inline p-2 fs-5 text"></i></a>
                        <a className="tw" href="#"><i className="fa-brands fa-twitter d-inline p-2 fs-5 text"></i></a>
                        <a className="in" href="#"><i className="fa-brands fa-instagram d-inline p-2 fs-5 text"></i></a>
                    </div>

                </div>
            </footer>
            </div>
        </div>


    );
};
