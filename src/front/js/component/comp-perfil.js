import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

export const Perfil = () => {
    const {store,actions} = useContext(Context)
    const [editMode, setEditMode] = useState(false);
    const [previewImage, setPreviewImage] = useState(undefined);
    const [imageSelectedFILE, setimageSelectedFILE] = useState(undefined);



    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        age: "",
        photo: "",
      });

      useEffect(() => {
        // Supongamos que store.profile contiene los datos del perfil
        const profileData = store.user;
        if (profileData) {
          setFormData(profileData);
        }
      }, [store.user]);


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

  // Manejar el envío del formulario
    const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar formData a tu servidor o realizar otras acciones necesarias
        console.log("Datos del formulario:", formData);
    };  

    const ActualizarPerfiles = (e)=> {
        e.preventDefault();
        actions.ActualizarPerfil(formData)
    }
    const handleEditClick = () => {
    setEditMode(true);
    };

    return (
        <div className="d-flex justify-content-center">
        <form onSubmit={ActualizarPerfiles} className="row g-3 w-50 p-3 ">
        <div className="col-md-6">
          <label for="inputEmail4" className="form-label">Nombre</label>
          <input  type="text"
            className="form-control"
            disabled={!editMode}
            id="inputName4"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nombre"/>
        </div>
        <div className="col-md-6">
          <label for="inputLastname" className="form-label">Apellido</label>
          <input type="text"
            className="form-control"
            disabled={!editMode}
            id="inputLastname"
            name="lastName"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Apellido"/>
        </div>
        <div className="col-6">
          <label for="inputage" className="form-label">Edad</label>
          <input type="text"
            className="form-control"
            disabled={!editMode}
            id="inputage"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Edad"/>
        </div>
         {/* <div className="registro d-flex flex-column justify-content-center align-items-center">
                            <div className="photoDiv rounded-circle" style={{ width: "100px", height: "100px" }}>
                                <img src={previewImage} className="rounded-circle" style={{ width: "100%", height: "100%" }} />
                            </div>
                            <label role="button" className=" mt-3 d-flex flex-row text-center">
                                <span className="text-white rounded-pill ">
                                    <p className="px-2">Seleccionar Imagen</p>
                                </span>
                                <input type="file" style={{ color: "transparent" }}  className="form-control"
                                    id="inputphoto"
                                    name="photo"
                                    value={formData.photo}
                                    onChange={handleInputChange}
                                    placeholder="Foto"/>
                            </label>
         </div>   */}
        
        <div className="col-12">
            <button type="button" onClick={handleEditClick} className="mx-3 border-0 rounded p-2 btn-outline-secondary" disabled={editMode}>Editar</button>
            <button role="button" className="mx-3 border-0 rounded p-2 btn-outline-secondary">Guardar</button>
          
        </div>
      </form>
      </div>
)
};