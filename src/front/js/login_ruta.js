import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login";
import { PaginaInicio } from "./pages/pagina_inicio";
import { RegistroUsuario } from "./pages/vista_registro_usuario";
import { DatosEmpresa } from "./pages/ingreso_datos_empresa";
import { TipoConsulta } from "./pages/tipo_consulta";
import { PayFailure } from "./pages/Failure";
import { PaySuccess } from "./pages/Success";
import { PayPending } from "./pages/Pending";
import { TipoMembresia } from "./pages/TipoMembresia";
import { ValidPago } from "./pages/ValidPago";

//create your first component
export const LoginRutas = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className=" w-100 h-100" >
            <BrowserRouter basename={basename}>
                    <Routes>
                        <Route element={<PaginaInicio/>} path="/*" />
                        <Route element={<Login />} path="/Login" />
                        <Route element={<RegistroUsuario />} path="/RegistroUsuario" />
                        <Route element={<PayPending />} path="/pay_pending" />
                        <Route element={<PaySuccess />} path="/pay_success" />
                        <Route element={<PayFailure />} path="/pay_failure" />
                        <Route element={<TipoMembresia />} path="/pagos" />
                        <Route element={<ValidPago />} path="/validSuscription" />
                    </Routes>
            </BrowserRouter>
        </div>
    );
};


