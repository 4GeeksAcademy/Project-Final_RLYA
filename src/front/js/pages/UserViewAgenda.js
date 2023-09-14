import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import esEs from 'date-fns/locale/es'
import { addHours } from "date-fns";
import moment from 'moment-timezone'
import { ModalAgendarme } from "../component/ModalAgendarme";
import { ModalInfoCita } from "../component/ModalInfoCita";


const locales = {
  'es': esEs,
}

const localizer = momentLocalizer(moment)

export const UserViewAgenda = () => {
  const { store, actions } = useContext(Context);
  const { id_prof } = useParams();
  /*Este state es para abrir y cerrar el modal de agendarme a una cita */
  const [stateModalAddCite, setStateModalAddCite] = useState(false)
  /*Este state es para abrir y cerrar el modal de ver datos de una cita */
  const [stateModalViewCite, setStateModalViewCite] = useState(false)
  /*Este state es para saber cuando un usuario da click en una cita a la cual el y solo el esta registrado */
  const [citaSelected, setCitaSelected] = useState(false)


  useEffect(() => {
    actions.TraerAgendaProf(id_prof)
    actions.TraerOficioProf(id_prof)
  }, [])

  const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
		  backgroundColor: event.bgColor
		}
	
		return {
		  style
		}
	}

  const OpenModal = (modal)=> {
    setStateModalAddCite(true)
  }
  const CloseModal = (modal)=> {
    setStateModalAddCite(false)
  }

  const OpenModalInfoCita = (event)=> {
    if(event.id_user === store.user.id) {
      setStateModalViewCite(true)
      setCitaSelected(event)
    }
  }
  const CloseModalInfoCita = ()=> {
      setStateModalViewCite(false)
  }
  
  
  return (
    <div className="container-fluid position-relative z-1">
      <div className="row z-1">
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
          style={{ height: 500, zIndex:1 }}
          onSelectEvent={OpenModalInfoCita}
        />
        </div>
        <div className="col-4 p-3">
          <div className="row mt-4 mb-4 bg-white shadow-sm">
            <div className="col p-4 d-flex flex-column">
              <div className="d-flex flex-row align-content-center">
                <div className="rounded bg-success" style={{height:"25px",width:"25px"}}></div>
                <p className="mx-2">Mis consultas</p>
              </div>

              <div className="d-flex flex-row align-content-center">
                <div className="rounded bg-secondary" style={{height:"25px",width:"25px"}}></div>
                <p className="mx-2">Ocupado</p>
              </div>

              <div className="d-flex flex-row align-content-center">
                <div className="rounded bg-danger" style={{height:"25px",width:"25px"}}></div>
                <p className="mx-2">No Disponible</p>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-4 m-auto">
            <button onClick={OpenModal} className="btn btn-light">Agregar Agenda</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row z-5">
        {
          stateModalAddCite == true && <ModalAgendarme CloseModal={CloseModal} />
        }
        {
          stateModalViewCite == true && <ModalInfoCita CloseModal={CloseModalInfoCita} infoSelected = {citaSelected} />
        }
      </div>


    </div>

  );
};