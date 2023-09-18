import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { ListaProf } from "../component/listaprofesionales";


export const Listaprofesionales = () => {
	const { store, actions } = useContext(Context);

	return (

		<div className="text-center mt-3">
			<ListaProf />

		</div>
	);
};
