import React, { useContext } from "react";
import { Context } from "../store/appContext";


import { useNavigate } from "react-router-dom";
import { PiCalendarCheckFill } from "react-icons/pi"
import "../../styles/inicio.css"
export const PaginaInicio = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="PadreInicio h-100 d-flex flex-column" >
            <div className="PadreBorroso" style={{ backgroundImage: 'none' }}>
                <nav className="navbar px-3 bg-dark">
                    <div className="container-fluid d-flex justify-content-between px-5 ">
                        <PiCalendarCheckFill style={{ color: "#49fb2d" }} fontSize={"50px"} />
                        <form className="d-flex" role="search">
                            <a href="/RegistroUsuario" className="nav-link text-white" style={{ fontFamily: 'Raleway, sans-serif' }}>Registrarme</a>
                            <a href="/Login" className="nav-link text-white" style={{ fontFamily: 'Raleway, sans-serif' }} onClick={(e) => {
                                e.preventDefault();
                                navigate("/Login");

                            }}>Ingresar</a>

                        </form>

                    </div>
                </nav>
                <div className="container my-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="p-3">
                                <h1 className="my-3">Haz tu vida más sencilla, programa tus consultas con un solo click.</h1>
                                <p className="opacity-70 text-secondary">Te proporcionamos una mayor comodidad a la hora de gestionar tus consultas y les brindamos a todo el público el acceso a tu agenda.</p>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <img src="https://cdn.pixabay.com/photo/2016/07/31/20/54/calendar-1559935_1280.png" className="" style={{ width: "250px", height: "250px", marginLeft: "120px"}} />
                        </div>
                    </div>
                </div>
                <div className="margen-superior container" style={{ marginTop: "200px",marginLeft: "120px" }}>
                    <div className="row">
                        <div className="col-md-3 d-flex align-items-center justify-content-center">
                            <div className="card p-3 text-center h-100"  style={{  marginRight: "160px" }}>
                                <img src="https://static.vecteezy.com/system/resources/previews/011/251/765/non_2x/mobile-phone-cartoon-icon-illustration-technology-object-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg" style={{ width: "80px", height: "80px" }} className="mx-auto my-3" alt="Icono 1" />
                                <p>Acceso en cualquier lugar</p>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex align-items-center justify-content-center">
                            <div className="card p-3 text-center h-100"  style={{  marginRight: "160px" }}>
                                <img src="https://static.vecteezy.com/system/resources/previews/009/341/843/non_2x/time-clock-icon-sign-design-free-png.png" style={{ width: "80px", height: "80px" }} className="mx-auto my-3" alt="Icono 2" />
                                <p>Disponibilidad de horarios</p>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex align-items-center justify-content-center">
                            <div className="card p-3 text-center h-100"  style={{  marginRight: "160px" }}>
                                <img src="https://images.vexels.com/media/users/3/136261/isolated/preview/9e3e2706ee96a036c0d2ec18e3b24c8c-icono-de-llave-redonda.png" style={{ width: "80px", height: "80px" }} className="mx-auto my-3" alt="Icono 3" />
                                <p>Acceso fácil y seguro</p>
                            </div>
                        </div>
                        <div className="col-md-3 d-flex align-items-center justify-content-center">
                            <div className="card p-3 text-center h-100"  style={{ marginRight: "160px"}}>
                                <img src="https://cdn-icons-png.flaticon.com/512/6711/6711626.png" style={{ width: "80px", height: "80px" }} className="mx-auto my-3" alt="Icono 4" />
                                <p>Efectiva y confiable</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container margen-superior2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="p-3">
                                <h3 className="my-3">Con CalendApp, la gestión de tus consultas se convierte en una experiencia sin complicaciones.</h3>
                                <p className="opacity-70 text-secondary">Nuestra plataforma te permite buscar y comparar diferentes opciones, ver las disponibilidades de horarios y reservar tus citas de manera conveniente desde cualquier lugar y en cualquier momento.</p>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <img src="https://cdn.pixabay.com/photo/2014/04/03/00/33/arrow-308642_1280.png" className="ml-3 mt-3" style={{ width: "80px", height: "80px", marginRight: "50px" }} />
                            <img src="https://cdn.pixabay.com/photo/2017/06/10/06/39/calender-2389150_1280.png" className="rounded-circle" style={{ width: "300px", height: "300px" }} />
                        </div>
                    </div>
                </div>
                <div className="container margen-superior2">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="p-3">
                                <img src="https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_1280.png" className="ml-3 mt-3" style={{ width: "80px", height: "80px" }} />
                            </div>
                        </div>
                        <div className="col-md-2 p-3">
                            <h3 className="my-3">Registrate</h3>
                        </div>

                        <div className="col-md-2 d-flex align-items-center justify-content-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/320/320141.png" className="ml-3 mt-3" style={{ width: "80px", height: "80px", }} />
                        </div>
                        <div className="col-md-2 p-3">
                            <h3 className="my-3">Ingresa</h3>
                        </div>
                        <div className="col-md-2 d-flex align-items-center justify-content-center">
                            <img src="https://cdn.pixabay.com/photo/2016/07/31/20/54/calendar-1559935_1280.png" className="ml-3 mt-3" style={{ width: "80px", height: "80px" }} />
                        </div>
                        <div className="col-md-2 p-3">
                            <h3 className="my-3">Agendate</h3>
                        </div>
                    </div>
                </div>


                <div className="bg-light w-100 align-self-center shadow-lg d-flex flex-column" style={{ padding: "50px", marginTop: "200px" }}>
                    <h3 className="my-3 text-center text-dark fw-bold">Nuestros Planes Mensuales</h3>
                    <div className="linea"></div>
                    <div className="d-flex flex-row justify-content-around mt-5" style={{ padding: "0px 100px 0px 100px" }}>
                        <div className="uno position-relative d-flex flex-column justify-content-between  p-3" style={{ background: "#647cf7", color: "white", height: "300px", width: "200px" }}>
                            <div className="w-75 p-3 shadow-lg bg-white rounded-3 justify-self-center position-absolute" style={{ height: "100px", color: "#647cf7", borderTop: "5px solid #647cf7", top: "-25px", left: "25px" }}>
                                <p className="text-center p-0 m-0">Plan Normal</p>
                                <p className="text-center p-0 m-0 fw-bold" style={{ fontSize: "25px" }}>$ 29</p>
                            </div>
                            <div className="d-flex flex-column align-items-center fw-semibold" style={{ marginTop: "80px", fontSize: "12px" }}>
                                <p className="">Registro de usuarios</p>
                                <p className="">Ver mi Agenda</p>
                            </div>
                            <button onClick={() => navigate("/Login")} className="btn1 btn ">Obtener</button>

                        </div>
                        <div className="dos position-relative d-flex flex-column justify-content-between p-3" style={{ background: "#68c6c4", color: "white", height: "300px", width: "200px" }}>
                            <div className="w-75 bg-white shadow-lg p-3 rounded-3 justify-self-center position-absolute" style={{ height: "100px", color: "#68c6c4", borderTop: "5px solid #68c6c4", top: "-25px", left: "25px" }}>
                                <p className="text-center p-0 m-0">Plan Medio</p>
                                <p className="text-center p-0 m-0 fw-bold" style={{ fontSize: "25px" }}>$ 48</p>
                            </div>
                            <div className="d-flex flex-column align-items-center fw-semibold" style={{ marginTop: "80px", fontSize: "12px" }}>
                                <p className="">Registro de usuarios</p>
                                <p className="">Ver mi Agenda</p>
                                <p className="">Recomendar mis servicios</p>
                            </div>
                            <button onClick={() => navigate("/Login")} className="btn2 btn">Obtener</button>
                        </div>
                        <div className="tres position-relative d-flex flex-column justify-content-between p-3" style={{ background: "#d65278", color: "white", height: "300px", width: "200px" }}>
                            <div className="w-75 bg-white shadow-lg p-3 rounded-3 justify-self-center position-absolute" style={{ height: "100px", color: "#d65278", borderTop: "5px solid #d65278", top: "-25px", left: "25px" }}>
                                <p className="text-center p-0 m-0">Plan Pro</p>
                                <p className="text-center p-0 m-0 fw-bold" style={{ fontSize: "25px" }}>$ 99</p>
                            </div>
                            <div className="d-flex flex-column align-items-center fw-semibold" style={{ marginTop: "80px", fontSize: "12px" }}>
                                <p className="">Registro de usuarios</p>
                                <p className="">Ver mis Agenda</p>
                                <p className="">Recomendar mis Servicios</p>
                                <p className="">Cambiar tema de mi agenda</p>
                            </div>
                            <button onClick={() => navigate("/Login")} className="btn3 btn">Obtener</button>
                        </div>

                    </div>

                </div>







                <footer className="footer mt-5 bg-dark text-white position-relative d-flex flex-row justify-content-between" style={{ padding: "50px 300px 50px 300px", }}>
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
