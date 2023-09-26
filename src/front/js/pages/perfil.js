
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { ListaProf } from "../component/listaprofesionales";
import { Spiner } from "../component/Spiner";
import { Perfil } from "../component/comp-perfil";


export const EditarPerfil = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-3">
			{
			store.user? <Perfil /> : <Spiner/>
			}

		</div>
	);
};
