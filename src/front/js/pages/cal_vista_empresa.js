import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
import esEs from 'date-fns/locale/es'
import moment from 'moment-timezone'
import { ModalInfoCita } from "../component/ModalInfoCita";

import { AiOutlineCheck } from "react-icons/ai"
const localizer = momentLocalizer(moment)

export const CalendarioEmpresa = () => {
	const { store, actions } = useContext(Context);
	const [stateModalViewCite, setStateModalViewCite] = useState(false)
	const [citaSelected, setCitaSelected] = useState(false)
	useEffect(() => {
		actions.TraerAgendaProf(store.user.id)
	}, [])

	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroundColor: event.bgColor
		}

		return {
			style
		}
	}

	const OpenModalInfoCita = (event) => {
		setStateModalViewCite(true)
		setCitaSelected(event)
	}
	const CloseModalInfoCita = () => {
		setStateModalViewCite(false)
	}
	console.log(store.eventsAdminSpesifique);
	return (
		<>
			{
				store.user ? <div className="container-fluid">
					<div className="row">
						<div className="col-8 z-1">
							<Calendar
								/* Culture es para espesificar el idioma*/
								culture="es"
								/*En events, mandaremos mi evento o mis eventos */
								events={store.eventsAdminSpesifique}
								localizer={localizer}
								startAccessor="start"
								endAccessor="end"
								/* Para añadirle propiedades a cada evento, en este caso lo que mandemos en el return seran nuestros estilos */
								eventPropGetter={eventStyleGetter}
								style={{ height: 500, zIndex: 1 }}
								onSelectEvent={OpenModalInfoCita}
							/>
						</div>
						<div className="col-3 shadow p-2 rounded position-relative" style={{ background: "#FE7A98", height: "500px", margin: "auto", marginTop: "70px" }} >
							<div className="position-absolute rounded-pill" style={{ width: "50%", marginLeft: "23%", height: "75px", top: "-50px", background: "#C4C4C4" }}>
								<div className="position-absolute rounded-circle  " style={{ width: "25%", padding: "10px", background: "#C4C4C4", marginLeft: "37%", height: "50px", top: "-25%" }}>
									<div className="w-100 h-100 bg-white rounded-circle"></div>
								</div>
							</div>
							<div className="bg-white p-3 rounded d-flex flex-column" style={{ width: "100%", height: "100%", maxHeight: "100%" }}>
								<h1 className="text-center mb-3">Tareas Hoy:</h1>
								<div className="d-flex flex-column d-flex flex-row">
									{
										store.eventsAdminSpesifique.length > 0 ? store.eventsAdminSpesifique.map((item,index) => {
											const fechaActual = new Date()
											const fechaComparar = new Date(item.start)
											if (fechaComparar.getDate() === fechaActual.getDate() && fechaComparar.getMonth() === fechaActual.getMonth() && fechaComparar.getFullYear() === fechaActual.getFullYear()) {
												return <div key={"soy index" + index} className="d-flex flex-row my-2 border-bottom border-dark pb-2 opacity-60">
													<div className="border border-secondary d-flex flex-row justify-content-center align-content-center" style={{ background: "transparent", padding: "2px", height: "20px", width: "20px" }}>
														{
															fechaActual > fechaComparar && <AiOutlineCheck color="#00C208" />
														}
													</div>
													<p className="m-0 p-0 ps-2">{item.title}-{fechaComparar.getHours().toString()}</p>
												</div>
											}
										}) : <p className="text-center mt-3">Cargando...:...</p>
									}
								</div>
							</div>
						</div>

					</div>
					<div className="row z-5">
						{
							stateModalViewCite == true && <ModalInfoCita CloseModal={CloseModalInfoCita} infoSelected={citaSelected} />
						}
					</div>
				</div> : <p className="text-center">Cargando...</p>
			}
		</>
	);
};
