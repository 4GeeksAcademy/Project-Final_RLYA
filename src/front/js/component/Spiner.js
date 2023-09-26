import React from "react"


export const Spiner = ()=> {

    return (
        <div className="row">
            <div className="col-2 spinner-border m-auto mt-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        )
    }