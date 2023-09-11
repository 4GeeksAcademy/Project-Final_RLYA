import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("") 
	const { store, actions } = useContext(Context)
  const navigate =useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()
    let logged = await actions.login(email, password)
    if (logged === true) {
    navigate("/")
    }
  }

	return (
		<div className="d-flex align-items-center justify-content-center vh-100">
		<div className="container p-5 col-4 border rounded-3 shadow">
			<form onSubmit={handleSubmit}>
  <div className="mb-3">
	<h3 className="text-center mb-5"><strong>Iniciar Sesión</strong></h3>
    <label for="exampleInputEmail1" className="form-label text-start fs-6"><strong>Email</strong></label>
    <input type="email" onChange={function (e) { setEmail(e.target.value) }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text"></div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label text-start fs-6"><strong>Password</strong></label>
    <input type="password" onChange={function (e) { setPassword(e.target.value) }} className="form-control" id="exampleInputPassword1"/>
  </div>
	<div id="emailHelp" className="form-text text-center">¿No tienes una cuenta?<strong className="text-success">Crear una cuenta</strong></div>
	<div className="text-center">
  <button type="submit" className="btn btn-dark mt-3">Iniciar sesión</button>
  </div>
</form>
		</div>
		</div>
	);
};
