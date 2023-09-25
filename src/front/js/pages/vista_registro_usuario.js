import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { fileupload } from "../../helpers/uploadFiles";
import { TipoConsulta } from "./tipo_consulta";
import { DatosEmpresa } from "./ingreso_datos_empresa";
import { TipoMembresia } from "./TipoMembresia";


export const RegistroUsuario = () => {
    const [statusReigster, setStatusRegister] = useState("usuario")
    const [statusFormAdmin,setStatusFormAdmin] = useState({})
    const [stateForm, setStateForm] = useState({
        name: "",
        last_name: "",
        photo: "",
        age: undefined,
        registration_date: new Date(),
        email: "",
        password: ""

    });
    const imageDefect = "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-No-Background.png"
    const [imageSelectedFILE, setimageSelectedFILE] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(undefined);
    const [tipoUsuario, setTipoUsuario] = useState("");
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();


    /*Este efecto, lo que hara es que cuando seleccione una imagen, la convierto en url para mostrarla por defecto y despues  */
    useEffect(() => {
        if (!imageSelectedFILE) {
            return setimageSelectedFILE(undefined)
        }
        /*Creamos la url*/
        const urlImage = URL.createObjectURL(imageSelectedFILE)
        setPreviewImage(urlImage)
        setStateForm({ ...stateForm, photo: imageSelectedFILE })
        return () => URL.revokeObjectURL(urlImage);
    }, [imageSelectedFILE])


    async function handleSubmit(e) {
        e.preventDefault();

        if (!tipoUsuario) {
            alert("Por favor, selecciona si eres Usuario o Empresa");
            return;
        }
        if (tipoUsuario === "usuario") {
            /*navigate("/listprof");*/
            /*con esta url que generamos, lo que haremos en convertirla a una url de clouddinary*/
            const imgCloud = await fileupload(stateForm.photo)
            
            setStateForm({...stateForm,photo:imgCloud})
            console.log(stateForm)
            const statusRegister = await actions.AgendarUser({
                name:stateForm.name,
                last_name:stateForm.last_name,
                photo:imgCloud,
                age:stateForm.age,
                registration_date:stateForm.registration_date,
                email:stateForm.email,
                password:stateForm.password
                
            })
            if(statusRegister === true) {
                navigate("/Login")
            }
        } else if (tipoUsuario === "empresa") {
            setStatusRegister("Datos_Adicionales")
        }
    }

    return (
        <div className="container my-3">
            {statusReigster === "usuario" ? <div className="row d-flex align-items-center justify-content-center">
                <div className="col-5 p-5 col-4 border rounded-3 shadow">
                    <form onSubmit={handleSubmit}>
                        <h3 className="text-center mb-3"><strong>Registro</strong></h3>
                        <div className="registro d-flex flex-column justify-content-center align-items-center">
                            <div className="photoDiv rounded-circle" style={{ width: "100px", height: "100px" }}>
                                <img src={previewImage || imageDefect} className="rounded-circle" style={{ width: "100%", height: "100%" }} />
                            </div>
                            <label role="button" className=" mt-3 d-flex flex-row text-center">
                                <span className="text-white rounded-pill ">
                                    <p className="px-2">Seleccionar Imagen</p>
                                </span>
                                <input type="file" style={{ color: "transparent" }} onChange={(file) => setimageSelectedFILE(file?.target?.files[0])} />
                            </label>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputText" className="form-label text-start fs-6">Nombre</label>
                            <input type="text" className="form-control" id="exampleInputText" value={stateForm.name} onChange={(e) => setStateForm({ ...stateForm, name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputText" className="form-label text-start fs-6">Apellido</label>
                            <input type="text" className="form-control" id="exampleInputText2" value={stateForm.last_name} onChange={(e) => setStateForm({ ...stateForm, last_name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputText" className="form-label text-start fs-6">Edad</label>
                            <input type="number" className="form-control" id="exampleInputText2" value={stateForm.age} onChange={(e) => setStateForm({ ...stateForm, age: e.target.value })} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label for="exampleInputEmail1" className="form-label text-start fs-6">Email</label>
                            <input type="email" onChange={function (e) { setStateForm({ ...stateForm, email: e.target.value }) }} className="form-control" id="exampleInputEmail1" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label text-start fs-6">Password</label>
                            <input type="password" onChange={function (e) { setStateForm({ ...stateForm, password: e.target.value }) }} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-2">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="tipoUsuario" id="inlineRadio1" value="usuario" onChange={() => setTipoUsuario("usuario")} />
                                <label className="form-check-label" htmlFor="inlineRadio1">Usuario</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="tipoUsuario" id="inlineRadio2" value="empresa" onChange={() => setTipoUsuario("empresa")} />
                                <label className="form-check-label" htmlFor="inlineRadio2">Empresa</label>
                            </div>
                        </div>
                        <div id="emailHelp" className="form-text text-center">
                            ¿Ya tienes una cuenta?
                            <a href="/Login" className="text-success text-decoration-none">Inicia sesión</a>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <button type="submit" className="btn btn-dark mt-3">Registrarme</button>
                        </div>
                    </form>
                </div>
            </div> : statusReigster === "Datos_Adicionales" ? <DatosEmpresa stateForm={stateForm} setStatusFormAdmin={setStatusFormAdmin} setStatusRegister={setStatusRegister} /> : <TipoMembresia statusFormAdmin={statusFormAdmin} />}

        </div>
    );
};
