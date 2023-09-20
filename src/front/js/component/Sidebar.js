import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Sidebar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()
	return (
		<div className="mx-0 my-0" style={{ height: "100%", width: "300px" }}>
			<div id="sidebar-container" className="bg-dark p-3 " style={{ height: "100%", width: "100%" }}>
				<div className="logo p-3 mx-3" style={{ padding: ".875rem, 1.25rem" }}>
					<img src="" />
				</div>
				<div className="menu" >
					{/*Momentaneo*/}

					<div className="d-flex flex-column">
						<Link to="/listprof" className="d-block p-3 text-decoration-none text-light">
						<i class="fa-solid fa-earth-americas"></i> Servicios
						</Link>
						<Link to="/agendas_activas" className="d-block p-3 text-decoration-none text-light">
							<i className="far fa-calendar lead text-light"></i> Agendas activas
						</Link>
						<a className="d-block p-3 text-decoration-none text-light" onClick={() => actions.Logout()} href="#"><i class="fa-solid fa-arrow-right-from-bracket lead text-light"></i>  Logout</a>
					</div>

				</div>
			</div>
		</div>
	);
};
