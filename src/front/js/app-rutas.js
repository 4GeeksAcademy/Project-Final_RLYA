import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Listaprofesionales } from "./pages/lista_profesionales";
import { CalendarioEmpresa } from "./pages/cal_vista_empresa";
import { CalendarioUsuario } from "./pages/cal_vista_usuario";
import { Navbar } from "./component/Navbar";
import { Sidebar } from "./component/Sidebar";



//create your first component
export const AppRutas = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="App" style={{ height: "100%", width: "100%" }}>
            <BrowserRouter basename={basename}>
                <div className="position-relative d-flex flex-row" style={{ height: "100%", width: "100%" }}>
                    <Sidebar />
                    <div className="content " style={{ width: "100%" }}>
                        <Navbar />
                        <Routes>
                            {/* Rutas */}
                            <Route element={<Listaprofesionales />} path="/*" />
                            <Route element={<Listaprofesionales />} path="/listprof" />
                            <Route element={<CalendarioEmpresa />} path="/calendario_empresa" />
                            <Route element={<CalendarioUsuario />} path="/calendario_usuario" />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter >
        </div >
    );
};


