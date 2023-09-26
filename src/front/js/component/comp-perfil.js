import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { fileupload } from "../../helpers/uploadFiles.js";

export const Perfil = () => {
  const { store, actions } = useContext(Context)
  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(store.user.photo);
  const [imageSelectedFILE, setimageSelectedFILE] = useState(undefined);



  const [formData, setFormData] = useState({
    name: store.user.name,
    last_name: store.user.last_name,
    age: store.user.age,
    photo: "",
  });

  // useEffect(() => {
  //   // Supongamos que store.profile contiene los datos del perfil
  //   const profileData = store.user;
  //   if (profileData) {
  //     setFormData(profileData);
  //   }
  // }, [store.user]);


  useEffect(() => {
    if (!imageSelectedFILE) {
      return setimageSelectedFILE(undefined)
    }
    /*Creamos la url*/
    const urlImage = URL.createObjectURL(imageSelectedFILE)
    setPreviewImage(urlImage)
    setFormData({ ...formData, photo: imageSelectedFILE })
    return () => URL.revokeObjectURL(urlImage);
  }, [imageSelectedFILE])

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setPhoto = (file) => {
    setFormData({ ...formData, photo: file?.target?.files[0] })
    setimageSelectedFILE(file?.target?.files[0])
  }

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar formData a tu servidor o realizar otras acciones necesarias
    console.log("Datos del formulario:", formData);
  };

  const ActualizarPerfil = async (e) => {
    const photofianl = await fileupload(formData.photo)

  }
  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <div className="container d-flex flex-column justify-content-center">
      <form className="row d-flex flex-column justify-items-center align-content-center">
        <div className="registro d-flex flex-column align-items-start justify-content-center col-md-5" >
          <div className="photoDiv rounded-circle align-self-start " style={{ width: "100px", height: "100px" }}>
            <img src={previewImage} className="rounded-circle" style={{ width: "100%", height: "100%" }} />
          </div>
          <input type="file" style={{ color: "transparent" }} className="form-control m-auto  p-3 border-0 align-self-center"
            id="inputphoto"
            name="photo"
            onChange={setPhoto}
          />
        </div>
        <div className="col-md-5 d-flex flex-column align-items-start">
          <label for="inputEmail4" className="form-label mx-2 ">Nombre</label>
          <input type="text"
            className="form-control"
            disabled={!editMode}
            id="inputName4"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nombre" />
        </div>
        <div className="col-md-5 d-flex flex-column align-items-start">
          <label for="inputLastname" className="form-label mx-2">Apellido</label>
          <input type="text"
            className="form-control"
            disabled={!editMode}
            id="inputLastname"
            name="lastName"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Apellido" />
        </div>
        <div className="col-md-5 d-flex flex-column align-items-start">
          <label for="inputage" className="form-label mx-2">Edad</label>
          <input type="text"
            className="form-control"
            disabled={!editMode}
            id="inputage"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Edad" />
        </div>


      </form>
        <div className="row mt-3">
          <div className="col">
            <button type="button" onClick={handleEditClick} className="btn btn-light mx-2">Editar</button>
            <button type="button" onClick={ActualizarPerfil} className="btn btn-dark  mx-2">Guardar</button>
          </div>

        </div>
    </div>
  )
};