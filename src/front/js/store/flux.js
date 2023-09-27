import axios from "axios";



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
			messageSuccess:undefined,
			oficio_prof:undefined,
			tipos_consulta: [],
			HistoryAgendasUser:undefined,
			oficios:[],
			planes:[],
      favoritos: [],
			recomendados:[],
			id_user_lastRegister:undefined,
			mercadoPago:{}

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
					const {data} = await axios.post(process.env.BACKEND_URL + "/api/login", {
						"email": email,
						"password": password
					})
					if(data.dataUser) {
						const userData = data.dataUser
						localStorage.setItem("token",userData.token);
						setStore({ statusLogin: true, user: userData })
						return true
					} else if(data.dataProf) {
						const profData = data.dataProf
						setStore({...getStore(),user:profData})
						/*Aqui validaremos el estado de la suscripcion*/
						return "validSuscription"
						
					}
					
				} catch (error) {
					console.log(error)
					if (error.response.status > 399) {
						setStore({ ...getStore(), messageError: error.response.data.msg })
						return false;
					} 
				}
			},
			Validpago:async(profData)=> {
				try {
					const {data} = await axios.get(process.env.BACKEND_URL + "/api/validSuscripcion/" + profData.id)
					if(data.ok === true ) {
						localStorage.setItem("token", profData.token);
						return true
					}
					
				} catch (error) {
					console.log(error)
					if (error.response.status === 401) {
						return false;
					} 
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
						if(data.ok) {
							console.log(data)
							setStore({...getStore(),user:data.info})
						}
					}
				} catch (error) {
					
				}
			},
			TraerAgendaProf:async (id_prof)=> {
				setStore({...getStore(),eventsAdminSpesifique:[]})
				try {
					setTimeout(async() => {
						const {data} = await axios.get(process.env.BACKEND_URL + "/api/consultaProf/" + id_prof )
						if(data.ok === true){
							console.log(data)
							/*Traemos el id del user activo*/
							const userID = getStore().user.id 
							/*Ahora lo que haremos es, por cada uno de las consultas, las pasaremos a un formato que el calendario pueda interpretar, en este caso espesificando el titulo, inicio y fin*/
							const consultas = data.consultas_prof.map((consulta)=> {
								console.log(consulta)
								const formatCalendar = {
									start:new Date(consulta.consultation_date),
									end:new Date(consulta.end_date),
									title: consulta.userInfo.id === getStore().user.id || getStore().user.rol === "admin" ? consulta.id_tipo_consulta : "ocupado",
									bgColor:consulta.userInfo.id === getStore().user.id || getStore().user.rol === "admin" ? "#59CB00" : "#CECECE",
									id_user:consulta.userInfo.id,
									nom_prof:consulta.id_profesional,
									nom_user:consulta.userInfo.nombre,
									notes: consulta.nota,
									rol: getStore().user.rol
								}
								return formatCalendar
							})
							setStore({...getStore(),eventsAdminSpesifique:consultas})
						}
					}, 1000);
				} catch (error) {
					console.log(error)
				}
			},
			Logout: () => {
				localStorage.removeItem("token")
				setStore({ statusLogin: false, user: {},profesionales:[],eventsAdminSpesifique:[],oficio_prof:undefined,tipos_consulta:[]})
			},
			CargarTiposCosnulta:async(id_oficio_prof,id_prof)=>{
				console.log(id_oficio_prof)
				console.log(id_prof)
				try {
					const body = {
						id_user: id_prof
					}
					const {data} = await axios.post(process.env.BACKEND_URL + "/api/tipo_consultas/" + id_oficio_prof,body)
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
				setStore({...getStore(),recomendados:[],profesionales:[]})
				try {
					const response = await axios.get(process.env.BACKEND_URL + "/api/profesionales")
					/*Filtramos separando los profesionales, los que tienen el plan economico de los que tienen el normal o pro*/
					const dat = response.data.info
					dat.map((prof)=> {
						if(prof.plan !== "") {
							if(prof.plan !== "Plan Normal") {
								return setStore({...getStore(),recomendados:[...getStore().recomendados,prof]})
							}
							return setStore({...getStore(),profesionales:[...getStore().profesionales,prof]})
						}
					})

					
					console.log(response.data)
				} catch (error) {
					console.log(error)
				}
			},
			CargarOficios:async ()=> {
				try {
					const {data} = await axios.get(process.env.BACKEND_URL + "/api/oficios") 
					if(data.ok === true) {
						setStore({...getStore(),oficios:data.oficios})
					}
				} catch (error) {
					console.log(error)
				}
			},
			AgendarAdmin:async(from)=> {
				try {
					const {data} = await axios.post(process.env.BACKEND_URL + "/api/registro_prof", from)
					if(data.ok === true){
						return true;
					}
				} catch (error) {
					console.log(error)
					return false;
				}
			},
			AgendarUser:async(from)=> {
				try {
					const {data} = await axios.post(process.env.BACKEND_URL + "/api/registro", from)
					if(data.ok === true){
						return true;
					}
				} catch (error) {
					console.log(error)
					return false;
				}
			},
			AgregarTipoConsultaAdmin:async (form)=> {
				console.log(getStore().user)
				const store = getStore()
				const numberFloatString = form.duracionHoras + "." + form.duracionMinutos
				const finalnumber = parseFloat(numberFloatString)
				try {
					const formatSend = {
						id_oficio:store.user.oficio.id,
						id_profesional:store.user.id,
						nombre:form.nombre,
						descripcion:form.descripcion,
						duracion:finalnumber
					}
					console.log(formatSend)
					const {data} = await axios.post(process.env.BACKEND_URL + "/api/tipo_consulta",formatSend)
					if(data.ok === true){
						setStore({...getStore(),messageSuccess:data.msg})
						/*Traigo de nuevo la peticion de las consultas*/
						getActions().CargarTiposCosnulta(getStore().user.oficio.id,getStore().user.id)
						setTimeout(() => {
							setStore({...getStore(),messageSuccess:undefined})
						}, 3000);
					}
					
				} catch (error) {
					console.log(error)
				}
			},
			ActualizarTipoConsulta:async (form,id_tp_c)=> {
				const store = getStore()
				const numberFloatString = form.duracionHoras + "." + form.duracionMinutos
				const finalnumber = parseFloat(numberFloatString)
				const formatSend = {
					id_oficio:store.user.oficio.id,
					id_profesional:store.user.id,
					nombre:form.nombre,
					descripcion:form.descripcion,
					duracion:finalnumber
				}

				try {
					const {data} = await axios.put(process.env.BACKEND_URL + "/api/tipo_consulta/" + id_tp_c ,formatSend)
					if(data.ok === true) {
						getActions().CargarTiposCosnulta(getStore().user.oficio.id,getStore().user.id)
						setStore({...getStore(),messageSuccess:"Se actualizo"})
						setTimeout(() => {
							setStore({...getStore(),messageSuccess:undefined})
						}, 3000);
					}
				} catch (error) {
					console.log(error)
				}
			},
			BorrarTipoConsulta:async(id_tp_c)=> {
				try {
					const {data} = await axios.delete(process.env.BACKEND_URL + "/api/tipo_consulta/" + id_tp_c)
					if(data.ok === true) {
						getActions().CargarTiposCosnulta(getStore().user.oficio.id,getStore().user.id)
						setStore({...getStore(),messageSuccess:"Se borro el Tipo de consulta exitosamente"})
						setTimeout(() => {
							setStore({...getStore(),messageSuccess:undefined})
						}, 3000);
					}
				} catch (error) {
					console.log(error)
				}
			},
			TraerConsultasUser:async(id_user)=> {
				try {
					const {data} = await axios.get(process.env.BACKEND_URL + "/api/consultas/user/" + id_user)
					if(data.ok === true){
						setStore({...getStore(),HistoryAgendasUser:data.data})
						console.log(data)
					}
				} catch (error) {
					console.log(error)
				}
			},
			UpdateProfile:async (user)=> {
				const store = getStore()
				const datos = {
					name:user.name,
					last_name:user.last_name,
					age:user.age,
					photo:user.photo,
				}

				try {
					const {data} = await axios.put(process.env.BACKEND_URL + "/api/editarperfil/" + getStore().user.id ,datos)
					if(data.ok === true) {
						getActions().loadInfoUserByToken()
					}
				}catch (error) {
					console.log(error)
				}
			
			},

			obtenerFavoritos: async (id_user) => {
				try {
					const {data} = await axios.get(process.env.BACKEND_URL + "/api/user/favoritos/" + id_user)
					console.log(data)
					if(data.ok === true){
						setStore({ favoritos: data.data });
					}
				}
				catch (error) {

					if (error.response.status == 400){
						setStore({ favoritos: [] });
					}

				}
			},
			CargarFavoritos: async (id_user,id_prof) => {
				
				const store = getStore()
				try {
					const {data} = await axios.post(process.env.BACKEND_URL + "/api/favoritos/prof",{
						"id_user":id_user,
						"id_prof":id_prof
					})
					if(data.ok === true){
						setStore({...getStore(),messageSuccess:data.msg})
						/*Traigo de nuevo la peticion de las consultas*/
						await getActions().obtenerFavoritos(id_user)	
						}
				} catch (error) {
					console.log(error)
				}
			},
			IdByEmail:async(email)=> {
				console.log("aqui estamos en la funcion");
				console.log(email)
				try {
					const {data} = await axios.post(process.env.BACKEND_URL + "/api/idByEmail",{email})
					console.log(data)
					if(data.ok === true) {
						console.log(data)
						setStore({...getStore(),id_user_lastRegister:data.id_user})
					}
				} catch (error) {
					console.log(error)
				}
			},
			CargarPlanes:async()=> {
				try {
					const {data} = await axios.get(process.env.BACKEND_URL + "/api/planes")
					if(data.ok === true) {
						setStore({...getStore(),planes:data.planes})
					}

				} catch (error) {
					console.log(error)
				}
			},
			eliminarFavorito: async (id_user, id_prof) => {
				// da la lista de favoritos 
				try {
					let data = await axios.delete(process.env.BACKEND_URL + "/api/user/favoritos",{
						data:{
							"id_user": id_user,
							"id_prof": id_prof
						}
							
						
					} )
					//let data = await axios.delete("https://zany-capybara-4j77gvwg7rxvh5gwj-3001.app.github.dev/api/user/favoritos/1/4")
					console.log(data)
					if(data.status === 200){
						console.log("ok")
						await getActions().obtenerFavoritos(id_user)
						// setStore({ favoritos: data.data.data });
					}
				}
				catch (error) {
					console.log(error)

				}
			},
			ValidPago:async()=> {
				
			},
			pagoMercadoPago: async (total,email) => { 
				try { 
				const response = await axios.post(process.env.BACKEND_URL + "/api/preference", { 
				total: total,email: email  //acá está de nuevo la variable  donde se guarda el total a pagar por el cliente 
				}); 
				console.log(response)
				setStore({ mercadoPago: response.data });  //guardamos  la info en el objeto que creamos en store 
				} catch (error) { 
				console.log(error); 
				} 
			},
			CrearNuevoPagoBackend:async(dataSend)=> {
				try {
					const {data} = await axios.post(process.env.BACKEND_URL + "/api/pagos",dataSend)
					if(data.ok === true) {
						sessionStorage.removeItem("emailLastRegister")
						sessionStorage.removeItem("NewPago")
						console.log("pago creado correctamente");
					}
				} catch (error) {
					console.log(error);
				}
			}
			
		}

	}
};

export default getState;
