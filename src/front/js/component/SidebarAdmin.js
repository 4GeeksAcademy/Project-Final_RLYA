import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const SidebarAdmin = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()
	const Salir = ()=> {
		actions.Logout()
		navigate("/")
	}
	return (
		<div className="mx-0 my-0" style={{ width: "300px" }}>
			<div id="sidebar-container" className="bg-dark p-3 " style={{ height: "100%", width: "100%" }}>
				<div className="logo p-2 mx-3 d-flex justify-content-center" style={{ padding: ".875rem, 1.25rem" }}>
					<img src="https://i.imgur.com/kYrhdeT.png" className="align-self-center justify-self-center"  style={{ width: "75px", height: "75px"}} />
				</div>
				<div className="menu" >
					{/*Momentaneo*/}
                    <div className="d-flex flex-column">
							<p role="button" className="d-block p-3 text-decoration-none text-light"  onClick={()=> navigate("/calendario_empresa" + store.user.id)} ><i className="fa-solid fa-envelope mx-2 mx-2 lead text-light"></i> Mi Agenda</p>
							<p role="button" className="d-block p-3 text-decoration-none text-light" href="#"><i className="fa-solid fa-gear mx-2 mx-2 lead text-light"></i> Configuración</p>
							<p role="button" className="d-block p-3 text-decoration-none text-light" onClick={Salir} href="#"><i class="fa-solid fa-arrow-right-from-bracket mx-2 lead text-light"></i>  Logout</p>
					</div>
				</div>
			</div>
		</div>
	);
};