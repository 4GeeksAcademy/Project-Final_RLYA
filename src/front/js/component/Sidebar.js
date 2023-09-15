import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Sidebar = () => {
	const { store, actions } = useContext(Context)
	return (
		<div className="mx-0 my-0" style={{ height: "100%", width: "300px" }}>
			<div id="sidebar-container" className="bg-dark p-3 " style={{ height: "100%", width: "100%" }}>
				<div className="logo p-3 mx-3" style={{ padding: ".875rem, 1.25rem" }}>
					<img src=""/>
				</div>
				<div className="menu" >
					{/*Momentaneo*/}
					{
						store.user.rol == "user"? <div className="d-flex flex-column">
							<a className="d-block p-3 text-decoration-none text-light" href="/listprof"><i class="fa-solid fa-earth-americas"></i> Servicios</a>
							<a className="d-block p-3 text-decoration-none text-light" onClick={()=> actions.Logout()} href="#"><i class="fa-solid fa-arrow-right-from-bracket mx-2 lead text-light"></i>  Logout</a>
						</div> : <div className="d-flex flex-column">
							<a className="d-block p-3 text-decoration-none text-light"  href={"/calendario_empresa" + store.user.id}><i className="fa-solid fa-envelope mx-2 mx-2 lead text-light"></i> Configuración</a>
							<a className="d-block p-3 text-decoration-none text-light" href="#"><i className="fa-solid fa-gear mx-2 mx-2 lead text-light"></i> Configuración</a>
							<a className="d-block p-3 text-decoration-none text-light" onClick={()=> actions.Logout()} href="#"><i class="fa-solid fa-arrow-right-from-bracket mx-2 lead text-light"></i>  Logout</a>
						</div>
					} 
				</div>
			</div>
		</div>
	);
};
