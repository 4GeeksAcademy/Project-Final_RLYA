import axios from "axios";
import moment from "moment";

// const [photoUrl, setPhotoUrl] = useState(""); // Estado para almacenar la URL de la foto
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			profesionales:[],
			user: {},
			statusLogin: false,
			eventsAdminSpesifique:[],
			messageError: undefined,
			oficio_prof:undefined,
			tipos_consulta: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			//Función de login
			login: async (email, password) => {
				setStore({ ...getStore(), messageError: undefined })
				try {
					let {data} = await axios.post(process.env.BACKEND_URL + "/api/login", {
						"email": email,
						"password": password
					})
					if(data.dataUser) {
						localStorage.setItem("token",data.dataUser.token);
						setStore({ statusLogin: true, user: data.dataUser })
					} else if(data.dataProf) {
						localStorage.setItem("token", data.dataProf.token);
						setStore({ statusLogin: true, user: data.dataProf })
					}
					
					return true;
				} catch (error) {
					console.log(error);
					console.log(error.response.data.msg)
					if (error.response.status > 399) {
						setStore({ ...getStore(), messageError: error.response.data.msg })
					}
					return false;
				}
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			ValidToken: async () => {
				try {
					const token = localStorage.getItem("token")
					const response = await axios.get(process.env.BACKEND_URL + `/api/validToken`, {
						headers: { "Authorization": "Bearer " + token }
					})
					if (response.status == 200) {
						setStore({ ...getStore(), statusLogin: true })
					}
				} catch (error) {
					if (error.response.status > 400) {
						console.log(error)
						getActions().Logout()
					}
				}

			},
			loadInfoUserByToken:async ()=> {
				try {
					const token = localStorage.getItem("token")
					if(token) {
						const {data} = await axios.get(process.env.BACKEND_URL + "/api/infobyToken",{
							headers: { "Authorization": "Bearer " + token }
						})
						setStore({...getStore(),user:data.info})
					}
					console.log("no hay token")
				} catch (error) {
					
				}
			},
			TraerAgendaProf:async (id_prof)=> {
				try {
					const {data} = await axios.get(process.env.BACKEND_URL + "/api/consultaProf/" + id_prof )
					console.log("data")
					if(data.ok === true){
						console.log(data)
						/*Traemos el id del user activo*/
						const userID = getStore().user.id 
						/*Ahora lo que haremos es, por cada uno de las consultas, las pasaremos a un formato que el calendario pueda interpretar, en este caso espesificando el titulo, inicio y fin*/
						data.consultas_prof.map((consulta)=> {
							const formatCalendar = {
								start:new Date(consulta.consultation_date),
								end:new Date(consulta.end_date),
								title: consulta.userInfo.id === userID? consulta.id_tipo_consulta : "ocupado",
								bgColor:consulta.userInfo.id === userID? "#59CB00" : "#CECECE",
								id_user:consulta.userInfo.id,
								nom_prof:consulta.id_profesional,
								notes: consulta.nota
							}
							return setStore({...getStore(),eventsAdminSpesifique:[...getStore().eventsAdminSpesifique,formatCalendar]})
						})
					}
				} catch (error) {
					console.log(error)
				}
			},
			Logout: () => {
				localStorage.removeItem("token")
				setStore({ statusLogin: false, user: {},profesionales:[],eventsAdminSpesifique:[],oficio_prof:undefined,tipos_consulta:[]})
			},
			CargarTiposCosnulta:async(id_oficio_prof)=>{
				try {
					const {data} = await axios.get(process.env.BACKEND_URL + "/api/tipo_consultas/" + id_oficio_prof)
					if(data.ok == true) {
						setStore({...getStore(),tipos_consulta:data.tipo_consultas})
					}
				} catch (error) {
					console.log(error)
				}
			},
			Agendarme: async(form)=> {
				try {
					const {data} = await axios.post(process.env.BACKEND_URL + "/api/consulta", form )
					if(data.ok === true){
						getActions().TraerAgendaProf(form.id_profesional)							
					}
				} catch (error) {
					console.log(error)
				}
			},
			TraerOficioProf:async(id_prof)=> {
				try {
					const {data} = await axios.get(process.env.BACKEND_URL + "/api/oficio_prof/" + id_prof)
					if(data.ok === true) {
						setStore({...getStore(),oficio_prof:data.oficio_prof})
					}
				} catch (error) {
					console.log(error)
				}
			},
			traerInfoProf:async () => {
				try {
					const response = await axios.get(process.env.BACKEND_URL + "/api/profesionales")
					setStore({...getStore(),profesionales:response.data.info})
					console.log(response.data)
				} catch (error) {
					console.log(error)
				}
			},
		}
	}
};

export default getState;
