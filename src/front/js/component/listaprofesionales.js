import React from "react";
import { Link } from "react-router-dom";

export const ListaProf = () => {
    return (
        <div className=" text-dark list-style-none">
            <ul className="list-unstyled">
                <h2>Lista de Profesionales</h2>
                <li><a type="button" class="btn position-relative rounded-circle"><i class="fa-solid fa-circle-user" style={{ fontSize: "100px" }}></i>
                    <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle" style={{ width: "30px", height: "30px" }}>
                        <span class="visually-hidden">New alerts</span>
                    </span>
                </a></li>
            </ul>
            <div className="d-block p-2">
                <ul className="list-unstyled">
                    <h2>Lista de Profesionales</h2>
                    <li><a type="button" class="btn position-relative rounded-circle"><i class="fa-solid fa-circle-user" style={{ fontSize: "140px" }}></i>
                    </a></li>
                </ul>
            </div>
        </div>

    );
};
