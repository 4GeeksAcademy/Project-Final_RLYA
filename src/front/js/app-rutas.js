import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Footer } from "./component/footer";
import { Listaprofesionales } from "./pages/lista_profesionales";
import { CalendarioEmpresa } from "./pages/cal_vista_empresa";
import { CalendarioUsuario } from "./pages/cal_vista_usuario";
import { LayoutNegro } from "./component/layout";


//create your first component
export const AppRutas = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>

                {/* <Navbar /> */}
                <LayoutNegro />
                <Routes>
                    {/* <Route element={<Home />} path="/" /> */}
                    <Route element={<Listaprofesionales />} path="/listprof" />
                    <Route element={<CalendarioEmpresa />} path="/calendario_empresa" />
                    <Route element={<CalendarioUsuario />} path="/calendario_usuario" />
                </Routes>

            </BrowserRouter>
        </div>
    );
};


