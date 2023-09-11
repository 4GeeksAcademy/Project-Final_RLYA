import React from "react"



export const MessageError = ({ error }) => {
    return (
        <div class="alert alert-danger" role="alert">
            {error}
        </div>
    )
}