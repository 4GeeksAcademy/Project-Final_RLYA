import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { fileupload } from "../../helpers/uploadFiles";
import { TipoConsulta } from "./tipo_consulta";
import { DatosEmpresa } from "./ingreso_datos_empresa";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import ReactDOM from 'react-dom';
// import { FileInput, ImageInput } from "formik-file-and-image-input/lib";
import { contrast } from "@cloudinary/url-gen/actions/adjust";
import { TipoMembresia } from "./TipoMembresia";




const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    last_name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    age: Yup.number()
        .max(100, 'Too Long!')
        .integer("deben ser solo numeros")
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password:Yup.string()    
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/, "debe tener mayúsculas, minúsculas, números y caracteres especiales")
        .required('Required'),
    // image: Yup.mixed().required(),



    });

  
const CustomImageInputWrapper = ({onClick, fileName, src}) => {
    return (
        <div onClick={onClick}>
            {!src && <button onClick={onClick}>Choose Image</button>}
            <img src={src} />
            <p>{fileName}</p>
        </div>
        )
    } 


export const RegistroUsuario = () => {
    const [statusReigster, setStatusRegister] = useState("usuario")
    const [photo, setPhoto] = useState("");
    const imageDefect = "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-No-Background.png"
    const [imageSelectedFILE, setimageSelectedFILE] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(undefined);
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [datosAdicionales, setDatosAdicionales] = useState(undefined);
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    // const imageFormats = ["image/png", "image/svg", "image/jpeg"];



    /*Este efecto, lo que hara es que cuando seleccione una imagen, la convierto en url para mostrarla por defecto y despues  */
    useEffect(() => {
        if (!imageSelectedFILE) {
            return setimageSelectedFILE(undefined)
        }
        /*Creamos la url*/
        const urlImage = URL.createObjectURL(imageSelectedFILE)
        setPreviewImage(urlImage)
        setPhoto(imageSelectedFILE )
        return () => URL.revokeObjectURL(urlImage);
    }, [imageSelectedFILE])


    async function handleSubmit(data) {
        // e.preventDefault();
        console.log(data.picked)
        if (data.picked === "") {
            alert("Por favor, selecciona si eres Usuario o Empresa");
            return;
        }
         if (data.picked === "usuario") {
            /*navigate("/listprof");*/
        //    /*con esta url que generamos, lo que haremos en convertirla a una url de clouddinary*/
            const imgCloud = await fileupload(photo)
            
            // setPhoto(imgCloud)
            
            const statusRegister = await actions.AgendarUser({
                name:data.name,
                last_name:data.last_name,
                photo:imgCloud,
                age:data.age,
                registration_date: new Date(),
                email:data.email,
                password:data.password
                
            })
            if(statusRegister === true) {
                navigate("/Login")
            }
        } else if (data.picked === "empresa") {
            setDatosAdicionales(data)
            setStatusRegister("Datos_Adicionales")
        }
    }




    return (
        <div className="PadreInicio" >
        <div className="PadreBorroso" style={{
            backgroundImage: 'none', backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
        }}>
        <Formik
       initialValues= {{
        name: "",
        last_name: "",
        photo: "",
        age: undefined,
        registration_date: new Date(),
        email: "",
        password: "",
        picked: '',
        // image: null, 

    }}
      
       validationSchema={SignupSchema}
       onSubmit={async (values) => {
        handleSubmit(values)
        
      }}

     >
       {({ errors, touched,values }) => (
        <div className="">
            {statusReigster === "usuario" ? <div className="row d-flex align-items-center justify-content-center">
                <div className="col-5 p-5 col-4 border rounded-3 shadow my-3" style={{ backgroundColor: 'white' }}>
                    <Form>
                        <h3 className="text-center mb-3"><strong>Registro</strong></h3>
                        <div className="form-group">
                            {/* <label for="file">File upload</label>
                            <ImageInput
                                name="image"
                                validFormats={imageFormats}
                                component={CustomImageInputWrapper}
                /> */}
                         </div>
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
                            <Field name="name" className="form-control" />
                                {errors.name && touched.name ? (
                                <div className="alert alert-danger">{errors.name}</div>
                                ) : null}
                        </div>
                        <div className="mb-3">
                            <label for="last_name" className="form-label text-start fs-6">Apellido</label>
                            <Field name="last_name" className="form-control" />
                                {errors.last_name && touched.last_name? (
                                <div className="alert alert-danger">{errors.last_name}</div>
                                ) : null}
                        </div>
                        <div className="mb-3">
                            <label for="age" className="form-label text-start fs-6">Edad</label>
                            <Field className="form-control" name="age" />
                                {errors.age && touched.age ? (
                                 <div className="alert alert-danger">{errors.age}</div>
                                ) : null}
                        </div>
                        <div className="mb-3 mt-3">
                            <label for="email" className="form-label text-start fs-6">Email</label>
                            <Field name="email" className="form-control" type="email" />
                            {errors.email && touched.email ? <div className="alert alert-danger">{errors.email}</div> : null}
                        </div>
                        <div className="mb-3">
                            <label for="password" className="form-label text-start fs-6">Contraseña</label>
                            <Field className="form-control" name="password" type="password" />
                                {errors.password && touched.password ? (
                                 <div className="alert alert-danger">{errors.password}</div>
                                ) : null}
                        </div>
                         <div id="my-radio-group" className="d-flex align-items-center justify-content-center mb-2">
                            <div role="group" aria-labelledby="my-radio-group" className="form-check form-check-inline">
                            <label>
                                <Field type="radio" name="picked" value="usuario" />
                                 Usuario
                            </label>
                            </div>
                            <div role="group" aria-labelledby="my-radio-group" className="form-check form-check-inline">
                            <label>
                                <Field type="radio" name="picked" value="empresa" />
                                 Empresa
                            </label>
                            </div>
                        </div>
                        <div id="emailHelp" className="form-text text-center">
                            ¿Ya tienes una cuenta?
                            <a href="/Login" className="text-success text-decoration-none">Inicia sesión</a>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <button type="submit" className="btn btn-dark mt-3">Registrarme</button>
                        </div>
                    </Form>
                </div>

            </div> : statusReigster === "Datos_Adicionales" ? <DatosEmpresa stateForm={datosAdicionales}  setStatusRegister={setStatusRegister} /> : <TipoMembresia />}


        </div>)} 
        </Formik>
        </div>
        </div>
        )
};

