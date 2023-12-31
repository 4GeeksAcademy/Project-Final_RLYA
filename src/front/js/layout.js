import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext, { Context } from "./store/appContext";

import { Navbar } from "./component/Navbar";
import { Footer } from "./component/footer";
import appRutas from "./app-rutas";
import { AppRutas } from "./app-rutas"
import { LoginRutas } from "./login_ruta";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    const user = true;
    const { store, actions } = useContext(Context)
    const token = localStorage.getItem("token")

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="" style={{ height: "100%", width: "100%" }} >
            {
                token ? <AppRutas /> : <LoginRutas />
                // 
            }
        </div>
    );
};

export default injectContext(Layout);


