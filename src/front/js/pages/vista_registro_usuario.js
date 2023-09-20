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



const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length > 15) {
      errors.name = 'Must be 15 characters or less';
    }
    if (!values.last_name) {
        errors.last_name = 'Required';
      } else if (values.last_name.length > 15) {
        errors.last_name = 'Must be 15 characters or less';
      }
    if (!values.age) {
        errors.age = 'Required';
      } else if (values.age.length < 3) {
        errors.age = 'Must be 2 characters or less';
      }
    if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length > 8) {
      errors.password = 'Must be 8 characters or more';
    }
  
    
  
    return errors;
  };


export const RegistroUsuario = () => {
    const [statusReigster, setStatusRegister] = useState("usuario")
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



    const formik = useFormik({
        initialValues: {
          name: '',
          last_name: '',
          age: " ",
          email: '',
          password: '',
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

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
        });


    return (
        <Formik
       initialValues= {stateForm}
      
       validationSchema={SignupSchema}
       onSubmit={values => {
         // same shape as initial values
         console.log(values);
       }}
     >
       {({ errors, touched }) => (
        <div className="container my-3">
            {statusReigster === "usuario" ? <div className="row d-flex align-items-center justify-content-center">
                <div className="col-5 p-5 col-4 border rounded-3 shadow">
                    <form onSubmit={formik.handleSubmit}>
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
                            <Field className="form-control" name="password" />
                                {errors.password && touched.password ? (
                                 <div className="alert alert-danger">{errors.password}</div>
                                ) : null}
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
            </div> : statusReigster === "Datos_Adicionales" ? <DatosEmpresa stateForm={stateForm} setStateForm={setStateForm} setStatusRegister={setStatusRegister} /> : <TipoConsulta />}

        </div>)} 
        </Formik>
        )
};
