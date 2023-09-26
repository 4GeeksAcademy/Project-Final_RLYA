import "../../styles/home.css";
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ListaProf } from "../component/listaprofesionales";
import { Spiner } from "../component/Spiner";
import { Favorites } from "../component/favoritos";


export const PageFav = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-3">
			{
			store.favoritos? <Favorites /> : <Spiner/>
			}

		</div>
	);
};
