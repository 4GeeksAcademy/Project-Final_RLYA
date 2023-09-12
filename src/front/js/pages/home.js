import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div style={{ marginleft: "25%" }}>

			<div className="w3-container w3-teal">
				<h1>My Page</h1>
			</div>

			<img src="img_car.jpg" alt="Car" style={{ width: "100%" }} />

			<div className="w3-container">
				<h2>Sidebar Navigation Example</h2>
				<p>The sidebar with is set with "style="width:25%".</p>
				<p>The left margin of the page content is set to the same value.</p>
			</div>

		</div>
	);
};
