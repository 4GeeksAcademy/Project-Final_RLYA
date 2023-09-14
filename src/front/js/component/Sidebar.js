import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
	return (
		<div className="mx-0 my-0" style={{ height: "100%", width: "300px" }}>
			<div id="sidebar-container" className="bg-dark p-3 " style={{ height: "100%", width: "100%" }}>
				<div className="logo p-3 mx-3" style={{ padding: ".875rem, 1.25rem" }}>
					<img src=""/>
				</div>
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
					{/*Momentaneo*/}
					<a className="d-block p-3 text-decoration-none text-light" href={"/agenda/" + "2"}><i className="fa-solid fa-envelope mr-2 lead text-light"></i>  Ver Agenda User 1</a>
					<a className="d-block p-3 text-decoration-none text-light" href="#"><i className="fa-solid fa-envelope mr-2 lead text-light"></i>  Mensajes</a>
					<a className="d-block p-3 text-decoration-none text-light" href="#"><i class="fa-solid fa-clock mr-2 lead text-light"></i>  Agendas activas</a>
					<a className="d-block p-3 text-decoration-none text-light" href="#"><i class="fa-solid fa-folder-open mr-2 lead text-light"></i>  Historial de agendas</a>
					<a className="d-block p-3 text-decoration-none text-light" href="#"><i className="fa-solid fa-gear mr-2 lead text-light"></i>  Configuración</a>
					<a className="d-block p-3 text-decoration-none text-light" href="#"><i class="fa-solid fa-arrow-right-from-bracket mr-2 lead text-light"></i>  Logout</a>
				</div>
			</div>
		</div>
	);
};
