import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { fileupload } from "../../helpers/uploadFiles";
import { TipoConsulta } from "./tipo_consulta";
import { DatosEmpresa } from "./ingreso_datos_empresa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const TipoMembresia = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate();


    const [selectedDate, setSelectedDate] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(""); // Estado para almacenar el método de pago seleccionado
    const [name, setName] = useState(""); // Estado para almacenar el nombre del usuario
    const [cardNumber, setCardNumber] = useState(""); // Estado para almacenar el número de tarjeta
    const [ccv, setCcv] = useState(""); // Estado para almacenar el CCV
    const [selectedMembership, setSelectedMembership] = useState("mensual");
    const [selectedCardType, setSelectedCardType] = useState("Visa");


    const handleDateChange = (date) => {
        setSelectedDate(date);

    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleCardNumberChange = (e) => {
        setCardNumber(e.target.value);
    };

    const handleCcvChange = (e) => {
        setCcv(e.target.value);
    };

    const handleCardTypeChange = (e) => {
        setSelectedCardType(e.target.value);
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };


    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar que se haya seleccionado un método de pago
        if (!paymentMethod) {
            alert("Por favor, selecciona un método de pago.");
            return;
        }
        // Validar que los campos estén completos
        if (!name || !cardNumber || !ccv || !selectedDate) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        // Validar la fecha de vencimiento (por ejemplo, verificar si no está vencida)
        const currentDate = new Date();
        if (selectedDate <= currentDate) {
            alert("La tarjeta está vencida. Por favor, selecciona una fecha de vencimiento válida.");
            return;
        }
        // Simular el procesamiento de pago
        const paymentData = {
            method: paymentMethod,
            name,
            cardNumber,
            ccv,
            selectedDate,
        };

        // Puedes realizar una llamada a un servicio de pago aquí

        // Mostrar un mensaje de éxito
        alert("Pago exitoso");

        // Redirigir al usuario a una página de confirmación u otras acciones según tus necesidades
        navigate('/listprof');
    };

    const handleMembershipSelection = (membershipType) => {
        setSelectedMembership(membershipType);
    };


    return (
        <div className="container my-3">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-5 p-5 col-4 border rounded-3 shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <h3 className="text-center mb-3"><strong>Pagos</strong></h3>
                        </div>
                        <div className="d-flex align-items-center justify-content-between px-5">
                            <div
                                className={`d-flex flex-column align-items-center border border p-3 rounded ${selectedMembership === "mensual" ? "border-primary" : ""
                                    }`}
                                onClick={() => handleMembershipSelection("mensual")}
                            >
                                <p className="text-center mb-3">Mensual</p>
                                <h4 className="text-center mb-3"><strong>$ 15</strong></h4>
                                <p className="text-center mb-3">por mes</p>
                            </div>
                            <div
                                className={`d-flex flex-column align-items-center border border p-3 rounded ${selectedMembership === "anual" ? "border-primary" : ""
                                    }`}
                                onClick={() => handleMembershipSelection("anual")}
                            >
                                <p className="text-center mb-3">Anual</p>
                                <h4 className="text-center mb-3"><strong>$ 120</strong></h4>
                                <p className="text-center mb-3">por año</p>
                            </div>
                        </div>
                        <label htmlFor="paymentMethod" className="form-label text-start mt-3 fs-6">Método de Pago</label>
                        <div>
                            <select class="form-select" aria-label="Default select example" value={paymentMethod}
                                onChange={handlePaymentMethodChange}>
                                <option selected>Elige tu método de pago..</option>
                                <option value="1">Tarjeta de Crédito</option>
                                <option value="2">Tarjeta de Débito</option>
                            </select>
                        </div>
                        <div className="form-check d-flex my-3">
                            <div className="form-check mx-3">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Visa"
                                    checked={selectedCardType === "Visa"}
                                    onChange={handleCardTypeChange} />
                                <label className="form-check-label" for="flexRadioDefault1">
                                    Visa
                                </label>
                            </div>
                            <div className="form-check mx-3">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Mastercard"
                                    checked={selectedCardType === "Mastercard"}
                                    onChange={handleCardTypeChange} />
                                <label className="form-check-label" for="flexRadioDefault2">
                                    Mastercard
                                </label>
                            </div>
                            <div className="form-check mx-3">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Oca"
                                    checked={selectedCardType === "Oca"}
                                    onChange={handleCardTypeChange} />
                                <label className="form-check-label" for="flexRadioDefault2">
                                    Oca
                                </label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputText" className="form-label text-start fs-6">Nombre</label>
                            <input type="text" className="form-control" id="exampleInputText" value={name}
                                onChange={handleNameChange} />
                        </div>

                        <div className="mb-3">
                            <label for="exampleInputText" className="form-label text-start fs-6">Número de tarjeta</label>
                            <input type="text" className="form-control" id="exampleInputText2" value={cardNumber}
                                onChange={handleCardNumberChange} />
                        </div>
                        <div className="d-flex align-items-center form-group">
                            <div className="col-md-6">
                                <p className="mb-2">Fecha de vencimiento</p>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    minDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-6">
                                <label for="exampleInputText" className="form-label text-start mb-2 fs-6">CCV</label>
                                <input type="text" className="form-control" id="exampleInputText2" value={ccv}
                                    onChange={handleCcvChange} />
                            </div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center mt-3">
                            <button type="submit" className="btn btn-dark mt-3">Pagar</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};
