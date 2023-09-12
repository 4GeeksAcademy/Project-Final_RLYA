import React from "react";
import { Link } from "react-router-dom";

export const LayoutNegro = () => {
	return (
		<div className="d-flex text-light bg-secondary ">
			<div id="sidebar-container" className="bg-dark p-3" style={{ minHeight: "100vh", width: "300px" }}>
				<dic className="logo p-3 mx-3" style={{ padding: ".875rem, 1.25rem" }}>
					<h4> @ CApp</h4>
				</dic>
				<div className="menu" >
					<a className="d-block p-3 text-decoration-none text-light" href="#"><i className="fa-solid fa-calendar-days mr-2 lead text-light"></i>  Mi agenda</a>
					<div className="dropdown">
						<button class="btn btn-dark dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-list m-2"></i>
							Servicios
						</button>
						<div className="dropdown-menu">
							<a className="dropdown-item" href="#"></a>
							<a className="dropdown-item" href="#">Agendas activas</a>
							<a className="dropdown-item" href="#">Something else here</a>
						</div>
					</div>
					<a className="d-block p-3 text-decoration-none text-light" href="#"><i className="fa-solid fa-envelope mr-2 lead text-light"></i>  Mensajes</a>
					<a className="d-block p-3 text-decoration-none text-light" href="#"><i class="fa-solid fa-pen mr-2 lead text-light"></i>  Ediatr consultas</a>
					<a className="d-block p-3 text-decoration-none text-light" href="#"><i class="fa-solid fa-folder-open mr-2 lead text-light"></i>  Historial de agendas</a>
                    <a className="d-block p-3 text-decoration-none text-light" href="#"><i class="fa-solid fa-newspaper mr-2 lead text-light"></i>  publicidad</a>
                    <a className="d-block p-3 text-decoration-none text-light" href="#"><i class="fa-solid fa-credit-card mr-2 lead text-light"></i>  Pagos</a>
					<a className="d-block p-3 text-decoration-none text-light" href="#"><i className="fa-solid fa-gear mr-2 lead text-light"></i>  Configuración</a>
					<a className="d-block p-3 text-decoration-none text-light" href="#"><i class="fa-solid fa-arrow-right-from-bracket mr-2 lead text-light"></i>  Logout</a>
				</div>
			</div>
			<div className="bg-light d-flex" style={{ width: "100%", height: "130px", padding: "20px" }}>
				<nav className="navbar navbar-expand-lg bg-body-tertiary align-self-start mb-3 sticky-top nav ">
					<div className="container-fluid">
						<a className="navbar-brand text-dark fs-1 pb-3" href="#" style={{ fontFamily: "fantasy" }}> Bienvenido Luciano!</a>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNavDropdown" style={{ marginLeft: "650px" }}>
							<img style={{ width: "50px", height: "50px" }} src="https://static.wixstatic.com/media/845052_307fd97f0e644d2a92994edaaae08ee1~mv2_d_1557_1555_s_2.png/v1/crop/x_0,y_20,w_1557,h_1535/fill/w_240,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Eloisa%20Faltoni%20-%20foto%20redonda.png" />
							<ul className="navbar-nav ">
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										Luciano Rodirguez
									</a>
									<ul className="dropdown-menu ">
										<li><a className="dropdown-item" href="#">Action</a></li>
										<li><a className="dropdown-item" href="#">Another action</a></li>
										<li><a className="dropdown-item" href="#">Something else here</a></li>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
};
