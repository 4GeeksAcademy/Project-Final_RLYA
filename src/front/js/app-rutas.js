import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Listaprofesionales } from "./pages/lista_profesionales";
import { CalendarioEmpresa } from "./pages/cal_vista_empresa";

import { Navbar } from "./component/Navbar";
import { Sidebar } from "./component/Sidebar";
import { UserViewAgenda } from "./pages/UserViewAgenda";
import { Context } from "./store/appContext";
import { ValidTpConsulta } from "./component/Admin_Valid_TpConsulta";
import { ViewConsultas } from "./pages/ViewConsultas";
import { TipoConsulta } from "./pages/tipo_consulta";
import { SidebarAdmin } from "./component/SidebarAdmin";
import { Spiner } from "./component/Spiner";



//create your first component
export const AppRutas = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const { store, actions } = useContext(Context)

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="App" style={{ height: "100%", width: "100%" }}>
            {
                store.user? <BrowserRouter basename={basename}>
                <div className="position-relative d-flex flex-row" style={{ height: "100%", width: "100%" }}>
                    {store.user.rol === "user"? <Sidebar /> : <SidebarAdmin/>}
                    <div className="content " style={{ width: "100%" }}>
                        <Navbar />
                        <Routes>
                            {/* Rutas */}
                            <Route element={store.user.rol === "user"? <Listaprofesionales /> : <ValidTpConsulta tipo_consultas={store.user.tipo_consultas}/> } path="/*" />
                            <Route element={<Listaprofesionales />} path="/listprof" />
                            <Route element={<CalendarioEmpresa />} path="/calendario_empresa" />
                            <Route element={<UserViewAgenda />} path="/agenda/:id_prof" />
                            <Route element={<ViewConsultas />} path="/view_consultas" />
                            <Route element={<TipoConsulta />} path="/add_consulta" />

                        </Routes>
                    </div>
                </div>
            </BrowserRouter > : 
            <Spiner/>
            }
        </div >
    );
};


